package controllers

import (
	"go-api/utils"
	"os"
	"path/filepath"

	"github.com/gofiber/fiber/v2"
)

func GenerateUrl(c *fiber.Ctx) error {
	filename := filepath.Clean(c.Params("filename"))
	if filename == "" {
		return c.Status(400).JSON(fiber.Map{"error": "Missing filename parameter"})
	}

	baseDir := "files"
	filePath := filepath.Join(baseDir, filename)

	// Path traversal protection
	absBase, _ := filepath.Abs(baseDir)
	absFile, _ := filepath.Abs(filePath)
	if !filepath.HasPrefix(absFile, absBase) {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid file path"})
	}

	if _, err := os.Stat(filePath); os.IsNotExist(err) {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"error": "File not found"})
	}

	url, err := utils.GenerateSignedURL(filename)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Failed to generate signed URL"})
	}

	return c.JSON(fiber.Map{"url": url})
}
