package controllers

import (
	"context"
	"go-api/database"
	"go-api/models"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
    "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ReadMoit(c *fiber.Ctx) error {
	yearParam := c.Params("year")
	yearInt, err := strconv.Atoi(yearParam)
	if err != nil {
		return c.Status(400).SendString("Invalid year")
	}
	fcYear := int32(yearInt)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	filter := bson.M{"fc_year": fcYear}
	findOptions := options.Find().SetSort(bson.D{{"nums", 1}})

	cursor, err := database.MoitCollection.Find(ctx, filter, findOptions)
	if err != nil {
		return c.Status(500).SendString("Failed to query moit")
	}
	defer cursor.Close(ctx)

	var moits []models.Moit
	if err := cursor.All(ctx, &moits); err != nil {
		return c.Status(500).SendString("Failed to parse moit data")
	}

	return c.JSON(moits)
}

func ListMoit(c *fiber.Ctx) error {
	yearParam := c.Params("year")
	idParam := c.Params("id")

	yearInt, err := strconv.Atoi(yearParam)
	if err != nil {
		return c.Status(400).SendString("Invalid year")
	}
	fcYear := int32(yearInt)

	subtitleId, err := primitive.ObjectIDFromHex(idParam)
	if err != nil {
		return c.Status(400).SendString("Invalid ID")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	pipeline := mongo.Pipeline{
		{{"$match", bson.D{{"fc_year", fcYear}}}},
		{{"$facet", bson.D{
			{"subtitles", mongo.Pipeline{
				{{"$unwind", "$childrens"}},
				{{"$unwind", "$childrens.subtitle"}},
				{{"$match", bson.D{{"childrens.subtitle._id", subtitleId}}}},
				{{"$project", bson.D{
					{"subtitle_id", "$childrens.subtitle._id"},
					{"subtitle_nums", "$childrens.subtitle.nums"},
					{"subtitle_title", "$childrens.subtitle.title"},
					{"subtitle_path", "$childrens.subtitle.path"},
					{"subtitle_pdfurl", "$childrens.subtitle.pdfurl"},
					{"subtitle_fc_year", "$childrens.subtitle.fc_year"},
					{"subtitle_make_by", "$childrens.subtitle.make_by"},
					{"subtitle_count_view", "$childrens.subtitle.count_view"},
					{"subtitle_count_download", "$childrens.subtitle.count_download"},
					{"children_nums", "$childrens.nums"},
					{"doc_nums", "$nums"},
					{"doc_fc_year", "$fc_year"},
					{"_id", 0},
				}}},
			}},
			{"childrens", mongo.Pipeline{
				{{"$unwind", "$childrens"}},
				{{"$match", bson.D{{"childrens._id", subtitleId}}}},
				{{"$project", bson.D{
					{"children_id", "$childrens._id"},
					{"children_nums", "$childrens.nums"},
					{"children_title", "$childrens.title"},
					{"children_path", "$childrens.path"},
					{"children_pdfurl", "$childrens.pdfurl"},
					{"children_fc_year", "$childrens.fc_year"},
					{"children_make_by", "$childrens.make_by"},
					{"children_count_view", "$childrens.count_view"},
					{"children_count_download", "$childrens.count_download"},
					{"doc_nums", "$nums"},
					{"doc_fc_year", "$fc_year"},
					{"_id", 0},
				}}},
			}},
		}}},
	}

	cursor, err := database.MoitCollection.Aggregate(ctx, pipeline)
	if err != nil {
		return c.Status(500).SendString("Database error: " + err.Error())
	}
	defer cursor.Close(ctx)

	var rawResults []bson.M
	if err := cursor.All(ctx, &rawResults); err != nil {
		return c.Status(500).SendString("Error reading results: " + err.Error())
	}

	if len(rawResults) == 0 {
		return c.Status(404).SendString("No data found")
	}

	if subtitles, ok := rawResults[0]["subtitles"].(primitive.A); ok && len(subtitles) > 0 {
		return c.JSON(subtitles)
	}
	if childrens, ok := rawResults[0]["childrens"].(primitive.A); ok && len(childrens) > 0 {
		return c.JSON(childrens)
	}
	return c.Status(404).SendString("No matching data found")
}

func PutUpdateview (c *fiber.Ctx) error {
	id := c.Params("id")
    subtitleID, err := primitive.ObjectIDFromHex(id)
    if err != nil {
        return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Invalid ID format"})
    }

    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()

    // Try updating where childrens._id = subtitleID and count_view is string
    update := bson.M{"$set": bson.M{"childrens.$.count_view": 0}}
    filter := bson.M{"childrens._id": subtitleID, "childrens.count_view": bson.M{"$type": "string"}}

    result, err := database.MoitCollection.UpdateOne(ctx, filter, update)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    if result.MatchedCount == 0 {
        // Try updating subtitle
        filter = bson.M{"childrens.subtitle._id": subtitleID, "childrens.subtitle.count_view": bson.M{"$type": "string"}}
        update = bson.M{
            "$set": bson.M{"childrens.$[].subtitle.$[sub].count_view": 0},
        }
        arrayFilters := options.Update().SetArrayFilters(options.ArrayFilters{
            Filters: []interface{}{bson.M{"sub._id": subtitleID}},
        })

        result, err = database.MoitCollection.UpdateOne(ctx, filter, update, arrayFilters)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }
    }

    // Try increment view in childrens._id
    filter = bson.M{"childrens._id": subtitleID}
    update = bson.M{"$inc": bson.M{"childrens.$.count_view": 1}}
    result, err = database.MoitCollection.UpdateOne(ctx, filter, update)
    if err != nil {
        return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
    }

    if result.MatchedCount == 0 {
        // Try increment in subtitle
        filter = bson.M{"childrens.subtitle._id": subtitleID}
        update = bson.M{"$inc": bson.M{"childrens.$[].subtitle.$[sub].count_view": 1}}
        arrayFilters := options.Update().SetArrayFilters(options.ArrayFilters{
            Filters: []interface{}{bson.M{"sub._id": subtitleID}},
        })

        result, err = database.MoitCollection.UpdateOne(ctx, filter, update, arrayFilters)
        if err != nil {
            return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": err.Error()})
        }
    }

    if result.ModifiedCount > 0 {
        return c.JSON(fiber.Map{
            "success": true,
        })
    }

    return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
        "success": false,
    })
}