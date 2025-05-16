package controllers

import (
	"context"
	"go-api/database"
	"go-api/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)

func GetApiKey(c *fiber.Ctx) error{
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var apikey models.ApiKey
	err := database.ApiKeyCollection.FindOne(ctx, bson.M{}).Decode(&apikey)
	if err != nil {
		return c.Status(500).SendString("Failed to query ApiKey")
	}
	return c.JSON(fiber.Map{
		"apiKey" : apikey.Key,
		"signature": apikey.Signature,
	})
}
