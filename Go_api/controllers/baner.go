package controllers

import (
	"context"
	"go-api/database"
	"go-api/models"
	"go-api/utils" 
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
)


func ListBanner (c * fiber.Ctx) error {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := database.BannerCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).SendString("Failed to query Banner")
	}
	defer cursor.Close(ctx)

	var banners []models.Banner
	if err := cursor.All(ctx, &banners); err != nil {
		return c.Status(500).SendString("Failed to parse logo data")
	}
	for mIndex , banner := range banners{
		for cIndex , img := range banner.Imgbanner {
			if img.Path != ""{
				url, err := utils.GenerateSignedURL(img.Path)
				if err == nil {
					banners[mIndex].Imgbanner[cIndex].Path = url
				}
			}
		}
	}
	return c.JSON(banners)
}