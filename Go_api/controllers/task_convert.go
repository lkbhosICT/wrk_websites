package controllers

import (
	"context"
	"crypto/aes"
	"crypto/cipher"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"go-api/database"
	"go-api/models"
	"go-api/utils"
	"image"
	"image/draw"
	"os"
	"os/exec"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"
	

	"github.com/disintegration/imaging"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func absInt(n int64) int64 {
	if n < 0 {
		return -n
	}
	return n
}

type TaskRequests struct {
	ID        string `json:"id"`
	Filename  string `json:"filename"`
	Timestamp int64  `json:"timestamp"`
	Signature string `json:"signature"`
}

type TaskRequest struct {
	ID        string `json:"id"`
	Timestamp int64  `json:"timestamp"`
	Signature string `json:"signature"`
}



func CreateConvertTask(c *fiber.Ctx) error {
	secretKey := os.Getenv("API_IMG_KEYS")
	if secretKey == "" {
		fmt.Println("❌ API_IMG_KEYS not found in environment")
	}

	aesKey := os.Getenv("AES_KEY")
	aesIV := os.Getenv("AES_IV")
	if aesKey == "" || aesIV == "" {
		return c.Status(500).SendString("Server configuration error: missing encryption keys")
	}
	var resp TaskRequests
	if err := c.BodyParser(&resp); err != nil {
		return c.Status(400).SendString("Invalid request body")
	}

	if resp.ID == "" || resp.Filename == "" {
		return c.Status(400).SendString("Missing ID or Filename")
	}

	idDecrypted, err := decryptAES(resp.ID, aesKey, aesIV)
	if err != nil {
		return c.Status(400).SendString("Invalid encrypted ID")
	}

	filenameDecrypted, err := decryptAES(resp.Filename, aesKey, aesIV)
	if err != nil {
		return c.Status(400).SendString("Invalid encrypted filename")
	}

	now := time.Now().Unix()
	if absInt(now-resp.Timestamp) > 1800 {
		return c.Status(401).SendString("Expired timestamp")
	}

	raw := resp.ID + resp.Filename + strconv.FormatInt(resp.Timestamp, 10)
	mac := hmac.New(sha256.New, []byte(secretKey))
	mac.Write([]byte(raw))
	expectedSig := hex.EncodeToString(mac.Sum(nil))
	if resp.Signature != expectedSig {
		return c.Status(401).SendString("Invalid signature")
	}

	inputPath := filepath.Join("files", filenameDecrypted)
	if _, err := os.Stat(inputPath); os.IsNotExist(err) {
		return c.Status(404).SendString("PDF not found")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"items_id": idDecrypted}
	var existing models.Imgconvert
	err = database.ImgconvertCollection.FindOne(ctx, filter).Decode(&existing)
	if err == nil {
		if existing.Status != "done" && existing.Status != "processing" {
			go processConversion(existing.ID, filenameDecrypted)
		}

		for i, img := range existing.Img_name {
			if img.Img_name != "" {
				if url, err := utils.GenerateConvertSignedURL(img.Img_name); err == nil {
					existing.Img_name[i].Img_name = url
				}
			}
		}
		return c.JSON(existing)
	}
	numpage, _ := getTotalPages(inputPath)
	task := models.Imgconvert{
		Items_id:  idDecrypted,
		Location:  "convert",
		Status:    "pending",
		Numpage: numpage,
		Img_name:  []models.Imgstore{},
		CreatedAt: time.Now(),
	}

	res, err := database.ImgconvertCollection.InsertOne(ctx, task)
	if err != nil {
		return c.Status(500).SendString("Failed to insert task")
	}

	objectID := res.InsertedID.(primitive.ObjectID)
	go processConversion(objectID, filenameDecrypted)

	
	return c.JSON(fiber.Map{"status": "pending", "numpage": numpage, "id": objectID.Hex()})
}

func processConversion(taskID primitive.ObjectID, filename string) {
	inputPath := filepath.Join("files", filename)
	outputDir := "convert"
	watermarkPath := filepath.Join("files", "watermark.png")
	totalPages, err := getTotalPages(inputPath)
	if err != nil {
		fmt.Println("❌ Get total pages error:", err)
		return
	}

	os.MkdirAll(outputDir, os.ModePerm)
	var wg sync.WaitGroup
	var mu sync.Mutex
	currentPage := 0
	semaphore := make(chan struct{}, 4) // Limit concurrency

	for page := 1; page <= totalPages; page++ {
		wg.Add(1)
		semaphore <- struct{}{}

		go func(p int) {
			defer wg.Done()
			defer func() { <-semaphore }()

			outputPrefix := fmt.Sprintf("%s/%s-%d", outputDir, fileNameWithoutExt(filename), p)
			cmd := exec.Command("pdftocairo", "-png", "-r", "150", "-f", strconv.Itoa(p), "-l", strconv.Itoa(p), inputPath, outputPrefix)
			if err := cmd.Run(); err != nil {
				fmt.Printf("❌ Convert error page %d: %v\n", p, err)
				return
			}

			files, _ := filepath.Glob(outputPrefix + "*.png")
			if len(files) == 0 {
				fmt.Printf("❌ PNG not found for page %d\n", p)
				return
			}

			if err := waitUntilFileIsReady(files[0], 10*time.Second); err != nil {
				fmt.Printf("❌ File not ready page %d: %v\n", p, err)
				return
			}

			if err := addWatermark(files[0], watermarkPath); err != nil {
				fmt.Printf("❌ Watermark error page %d: %v\n", p, err)
				return
			}

			mu.Lock()
			currentPage++
			imgName := filepath.Base(files[0])
			update := bson.M{
				"$set":  bson.M{"status": "processing", "progress": currentPage, "total": totalPages},
				"$push": bson.M{"img_name": models.Imgstore{Img_name: imgName}},
			}
			database.ImgconvertCollection.UpdateOne(context.Background(), bson.M{"_id": taskID}, update)
			mu.Unlock()
		}(page)
	}
	wg.Wait()
	
	database.ImgconvertCollection.UpdateOne(context.Background(), bson.M{"_id": taskID}, bson.M{"$set": bson.M{"status": "done", "progress": totalPages, "total": totalPages}})
}

func GetTask(c *fiber.Ctx) error {
	secretKey := os.Getenv("API_IMG_KEYS")
	if secretKey == "" {
		return c.Status(500).SendString("Server configuration error: missing encryption secrekey")
	}
	aesKey := os.Getenv("AES_KEY")
	aesIV := os.Getenv("AES_IV")
	if aesKey == "" || aesIV == "" {
		return c.Status(500).SendString("Server configuration error: missing encryption keys")
	}

	var req TaskRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).SendString("Invalid request body")
	}

	if req.ID == "" {
		return c.Status(400).SendString("Missing ID")
	}

	idDecrypted, err := decryptAES(req.ID, aesKey, aesIV)
	if err != nil {
		return c.Status(400).SendString("Invalid encrypted ID")
	}

	now := time.Now().Unix()
	if absInt(now-req.Timestamp) > 1800 {
		return c.Status(401).SendString("Expired timestamp")
	}

	raw := req.ID + strconv.FormatInt(req.Timestamp, 10)
	mac := hmac.New(sha256.New, []byte(secretKey))
	mac.Write([]byte(raw))
	expectedSig := hex.EncodeToString(mac.Sum(nil))
	if req.Signature != expectedSig {
		return c.Status(401).SendString("Invalid signature")
	}

	var task models.Imgconvert
	err = database.ImgconvertCollection.FindOne(context.Background(), bson.M{"items_id": idDecrypted}).Decode(&task)
	if err != nil {
		return c.Status(404).SendString("Task not found")
	}

	sort.Slice(task.Img_name, func(i, j int) bool {
		return extractPageNumber(task.Img_name[i].Img_name) < extractPageNumber(task.Img_name[j].Img_name)
	})

	for i, img := range task.Img_name {
		if img.Img_name != "" {
			if url, err := utils.GenerateConvertSignedURL(img.Img_name); err == nil {
				task.Img_name[i].Img_name = url
			}
		}
	}
	return c.JSON(task)
}

func decryptAES(cipherTextBase64, keyString, ivString string) (string, error) {
	cipherText, err := base64.StdEncoding.DecodeString(cipherTextBase64)
	if err != nil {
		return "", err
	}

	key := []byte(keyString)
	iv := []byte(ivString)

	if len(key) != 16 && len(key) != 24 && len(key) != 32 {
		return "", errors.New("key length must be 16, 24, or 32 bytes")
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	if len(cipherText)%aes.BlockSize != 0 {
		return "", errors.New("cipherText is not a multiple of the block size")
	}

	mode := cipher.NewCBCDecrypter(block, iv)
	decrypted := make([]byte, len(cipherText))
	mode.CryptBlocks(decrypted, cipherText)

	padLen := int(decrypted[len(decrypted)-1])
	if padLen > len(decrypted) {
		return "", errors.New("invalid padding")
	}
	return string(decrypted[:len(decrypted)-padLen]), nil
}

func fileNameWithoutExt(filename string) string {
	return filename[:len(filename)-len(filepath.Ext(filename))]
}

func getTotalPages(pdfPath string) (int, error) {
	cmd := exec.Command("pdfinfo", pdfPath)
	output, err := cmd.Output()
	if err != nil {
		return 0, err
	}
	for _, line := range strings.Split(string(output), "\n") {
		if strings.HasPrefix(line, "Pages:") {
			parts := strings.Fields(line)
			if len(parts) >= 2 {
				return strconv.Atoi(parts[1])
			}
		}
	}
	return 0, fmt.Errorf("page count not found")
}

func addWatermark(targetPath, watermarkPath string) error {
	bgImg, err := imaging.Open(targetPath)
	if err != nil {
		return err
	}
	wmImg, err := imaging.Open(watermarkPath)
	if err != nil {
		return err
	}

	newW := bgImg.Bounds().Dx()
	newH := int(float64(wmImg.Bounds().Dy()) * float64(newW) / float64(wmImg.Bounds().Dx()))
	resizedWm := imaging.Resize(wmImg, newW, newH, imaging.Lanczos)
	offset := image.Pt((bgImg.Bounds().Dx()-resizedWm.Bounds().Dx())/2, (bgImg.Bounds().Dy()-resizedWm.Bounds().Dy())/2)
	result := image.NewNRGBA(bgImg.Bounds())
	draw.Draw(result, result.Bounds(), bgImg, image.Point{}, draw.Src)
	draw.Draw(result, resizedWm.Bounds().Add(offset), resizedWm, image.Point{}, draw.Over)

	return imaging.Save(result, targetPath)
}

func waitUntilFileIsReady(path string, timeout time.Duration) error {
	start := time.Now()
	for {
		info, err := os.Stat(path)
		if err == nil && info.Size() > 0 {
			return nil
		}
		if time.Since(start) > timeout {
			return fmt.Errorf("timeout waiting for file: %s", path)
		}
		time.Sleep(100 * time.Millisecond)
	}
}
func extractPageNumber(name string) int {
    re := regexp.MustCompile(`-(\d+)(?:-\d+)?\.png$`)
    matches := re.FindStringSubmatch(name)
    if len(matches) >= 2 {
        if num, err := strconv.Atoi(matches[1]); err == nil {
            return num
        }
    }
    return 0
}