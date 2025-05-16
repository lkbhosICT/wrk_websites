package controllers

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	
	"go-api/database"
	"go-api/models"
	"go-api/utils" 
)

func ListLogo (c *fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := database.LogoCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).SendString("Failed to query Logos")
	}
	defer cursor.Close(ctx)

	var logos []models.Logo
	if err := cursor.All(ctx, &logos); err != nil {
		return c.Status(500).SendString("Failed to parse logo data")
	}

	for mIndex, logo := range logos{
		
		if logo.Icon != ""{
			url, err := utils.GenerateSignedURL(logo.Icon)
			if err == nil {
				logos[mIndex].Icon = url
			}
		}
	}
	return c.JSON(logos)

}