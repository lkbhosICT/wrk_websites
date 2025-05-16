package controllers

import (
	"context"
	"go-api/database"
	"go-api/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetDownloadForm(c *fiber.Ctx) error{
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := database.DownloadFormCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).SendString("Failed to query Data")
	}
	defer cursor.Close(ctx)

	var data []models.DownloadForm
	if err := cursor.All(ctx, &data); err != nil {
		return c.Status(500).SendString("Failed to parse menu data")
	}

	return c.JSON(data)
}
func CreateMultipleDownloadForms(c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var forms []models.DownloadForm

	// Parse JSON array -> slice of structs
	if err := c.BodyParser(&forms); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	var documents []interface{}
	now := time.Now()

	for i := range forms {
		forms[i].ID = primitive.NewObjectID()
		forms[i].CreatedAt = now
		forms[i].UpdatedAt = now
		documents = append(documents, forms[i])
	}

	// Insert all into MongoDB
	_, err := database.DownloadFormCollection.InsertMany(ctx, documents)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to insert forms",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(forms)
}