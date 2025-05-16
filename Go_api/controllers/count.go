package controllers

import (
	"context"
	"go-api/database"
	"go-api/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetDownloadCount(c *fiber.Ctx) error {

	itemID := c.Params("id")
	source := c.Params("source")
	if itemID == "" || source == ""{
		return c.Status(400).SendString("Item ID and Source is required")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"itemid": itemID}
	update := bson.M{
		"$inc": bson.M{"download_count": 1},
		"$setOnInsert": bson.M{
			"itemid": itemID,
			"source": source,
		},
	}

	opts := options.Update().SetUpsert(true)

	_, err := database.DownloadcountCollection.UpdateOne(ctx, filter, update, opts)
	if err != nil {
		return c.Status(500).SendString("Failed to update or insert document")
	}

	var result models.DownloadCount
	err = database.DownloadcountCollection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		return c.Status(500).SendString("Failed to retrieve updated document")
	}

	return c.JSON(result)

}


func GetDownload(c *fiber.Ctx) error {

	itemID := c.Params("id")
	source := c.Params("source")

	if itemID == "" || source == ""{
		return c. Status(404).SendString("Item ID and Source is required")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()


	filter := bson.M{"itemid": itemID}

	var results models.DownloadCount

	err := database.DownloadcountCollection.FindOne(ctx,filter).Decode(&results)

	if err != nil {
		return c.JSON(fiber.Map{
			"download_count": 0,
		})
	}

	return c.JSON(results)

}



func GetViewCount(c *fiber.Ctx) error {
	itemID := c.Params("id")
	source := c.Params("source")

	if itemID =="" || source =="" {
		return c.Status(404).SendString("Item ID and Source is required")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	filter := bson.M{"itemid": itemID}
	update := bson.M{
		"$inc": bson.M{"view_count":1},
		"$setOnInsert": bson.M{
			"itemid": itemID,
			"source": source,
		},
	}
	opts := options.Update().SetUpsert(true)

	_, err := database.ViewcountCollection.UpdateOne(ctx, filter, update, opts)
	if err != nil {
		return c.Status(500).SendString("Failed to update or insert document")
	}

	var result models.ViewCount
	err = database.ViewcountCollection.FindOne(ctx, filter).Decode(&result)
	if err != nil {
		return c.Status(500).SendString("Failed to retrieve updated document")
	}
	return c.JSON(result)
}
