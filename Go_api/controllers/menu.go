package controllers

import (
	"context"
	"time"

	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"go-api/database"
	"go-api/models"
	"go-api/utils" 
)

func GenerateSignedURLHandler(c *fiber.Ctx) error {
	// Context สำหรับ timeout
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// ดึงข้อมูลจาก MenuCollection
	cursor, err := database.MenuCollection.Find(ctx, bson.M{})
	if err != nil {
		return c.Status(500).SendString("Failed to query menus")
	}
	defer cursor.Close(ctx)

	// เก็บผลลัพธ์ลงใน menus
	var menus []models.Menu
	if err := cursor.All(ctx, &menus); err != nil {
		return c.Status(500).SendString("Failed to parse menu data")
	}

	// สร้าง Signed URL ให้กับทุก icon ใน menus และ children
	for mIndex, menu := range menus {
		// Signed URL for menu icon
		if menu.Icon != "" {
			url, err := utils.GenerateSignedURL(menu.Icon)
			if err == nil {
				menus[mIndex].Icon = url
			}
		}
		for cIndex, child := range menu.Childrens {
			// Signed URL for child icon
			if child.Icon != "" {
				url, err := utils.GenerateSignedURL(child.Icon)
				if err == nil {
					menus[mIndex].Childrens[cIndex].Icon = url
				}
			}
		}
	}

	// ส่งข้อมูลออกเป็น JSON
	return c.JSON(menus)
}

func CreateMenu(c *fiber.Ctx) error {
	collection := database.MongoInstance.Database(database.DBName).Collection("menus")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var menu models.Menu
	if err := c.BodyParser(&menu); err != nil {
		return c.Status(400).JSON(fiber.Map{"error": err.Error()})
	}

	// ตั้งค่า ID ของ menu
	menu.ID = primitive.NewObjectID()

	// ตั้งค่า ID ให้กับ Children และ Submenu
	for i := range menu.Childrens {
		menu.Childrens[i].ID = primitive.NewObjectID() // ตั้งค่า ID ของ Children
		for j := range menu.Childrens[i].Submenu {
			menu.Childrens[i].Submenu[j].ID = primitive.NewObjectID() // ตั้งค่า ID ของ Submenu
		}
	}

	// Insert menu ลงใน MongoDB
	_, err := collection.InsertOne(ctx, menu)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}

	// ส่งคืน menu ที่ถูก insert
	return c.JSON(menu)
}
