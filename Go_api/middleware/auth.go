package middleware

import (
	"context"
	"go-api/database"
	"go-api/models"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func AuthMiddle(c *fiber.Ctx) error {
	authHeader := c.Get("Authorization")

	if !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - missing Bearer token",
		})
	}

	// แยก key กับ signature (คาดว่าอยู่ในรูปแบบ "key:signature")
	rawToken := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))
	parts := strings.Split(rawToken, ":")
	if len(parts) != 2 {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - invalid token format",
		})
	}

	key := parts[0]
	signature := parts[1]

	// ตรวจสอบว่ามี key นี้อยู่ในฐานข้อมูลหรือไม่
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var apiKey models.ApiKey
	err := database.ApiKeyCollection.FindOne(ctx, bson.M{"key": key}).Decode(&apiKey)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - API key not found",
		})
	}

	// ตรวจสอบลายเซ็น
	if !models.ValidateApiKey(key, signature) {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - invalid signature",
		})
	}

	return c.Next()
}

func AuthApikey(c *fiber.Ctx) error{
	authHeader := c.Get("Authorization")
	lkbhosKey := c.Get("lkbhos-api-key")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - missing Bearer token",
		})
	}
	if lkbhosKey == "" {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - missing Key ",
		})
	}
	apikey := os.Getenv("API_SECRET_KEY")
	seconKey := os.Getenv("API_SECON_KEY")

	token := strings.TrimPrefix(authHeader, "Bearer ")
	token = strings.TrimSpace(token)

    
	if token != apikey && lkbhosKey != seconKey{
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}
	return c.Next()
}

