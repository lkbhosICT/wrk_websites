package controllers

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

// สร้างลายเซ็นใหม่จากชื่อไฟล์ + expires
func isValidSignature(c *fiber.Ctx, secret string) bool {
	filename := c.Params("filename")
	expires := c.Query("expires")
	signature := c.Query("signature")

	// ต้อง match path เดิมตอนสร้าง URL
	pathToSign := "/api/file/" + filename
	stringToSign := pathToSign + "?expires=" + expires

	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(stringToSign))
	expectedSignature := base64.URLEncoding.EncodeToString(h.Sum(nil))

	return hmac.Equal([]byte(expectedSignature), []byte(signature))
}

func GetFileContent(c *fiber.Ctx) error {
	_ = godotenv.Load()
	secret := os.Getenv("SECRET_KEY")

	expires := c.Query("expires")
	signature := c.Query("signature")

	if expires == "" || signature == "" {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Missing signature or expires"})
	}

	expUnix, err := strconv.ParseInt(expires, 10, 64)
	if err != nil || time.Now().Unix() > expUnix {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "URL has expired"})
	}

	if !isValidSignature(c, secret) {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"error": "Invalid signature"})
	}

	filename := filepath.Clean(c.Params("filename"))
	filePath := filepath.Join("files", filename)

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "File not found"})
	}

	return c.SendFile(filePath, true)
}
