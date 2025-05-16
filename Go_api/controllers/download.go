package controllers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"go-api/utils"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)


type downlaodRequests struct {
	ID        string `json:"id"`
	Filename  string `json:"filename"`
	Timestamp int64  `json:"timestamp"`
	Signature string `json:"signature"`
}

func Download(c *fiber.Ctx) error{
	secretKey := os.Getenv("API_IMG_KEYS")
	if secretKey == "" {
		return c.Status(500).SendString("Server configuration error: missing encryption secretkeys")
	}
	aesKey := os.Getenv("AES_KEY")
	aesIV := os.Getenv("AES_IV")
	if aesKey == "" || aesIV == "" {
		return c.Status(500).SendString("Server configuration error: missing encryption keys")
	}

	var req downlaodRequests
	
	if err := c.BodyParser(&req); err != nil {
		return c.Status(400).SendString("Invalid request body")
	}

	if req.Filename == "" {
		return c.Status(400).SendString("Missing ID or Filename or Signature")
	}

	
	now := time.Now().Unix()
	if absInt(now-req.Timestamp) > 1800 {
		return c.Status(401).SendString("Expired timestamp")
	}

	raw := req.ID + req.Filename + strconv.FormatInt(req.Timestamp, 10)
	mac := hmac.New(sha256.New, []byte(secretKey))
	mac.Write([]byte(raw))
	expectedSig := hex.EncodeToString(mac.Sum(nil))
	if req.Signature != expectedSig {
		return c.Status(401).SendString("Invalid signature")
	}

	filenameRaw, err := decryptAES(req.Filename, aesKey, aesIV)
	if err != nil{
		return c.Status(400).SendString("Invalid encrypted filename")
	}
	
	filenameRe := filepath.Clean(filenameRaw)
	baseDir := "files"
	fullPath := filepath.Join(baseDir, filenameRe)

	absBase, _ := filepath.Abs(baseDir)
	absFull, _ := filepath.Abs(fullPath)
	if !strings.HasPrefix(absFull, absBase) {
		return c.Status(400).SendString("Invalid file path")
	}
	if _, err := os.Stat(fullPath); os.IsNotExist(err) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "File not found"})
	}

	url, err := utils.GenerateSignedURL(filenameRe)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to generate signed URL"})
	}
	return c.JSON(fiber.Map{
		"link": url,
	})

}  