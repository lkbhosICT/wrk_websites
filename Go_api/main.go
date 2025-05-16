package main

import (
	"context"
	"log"
	"time"

	"github.com/gofiber/fiber/v2" // สำหรับการเชื่อมต่อ MongoDB
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"

	"go-api/database" // เพิ่ม import database package
	"go-api/models"   // ใช้ package models
	"go-api/routes"
	"go-api/tasks"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file:", err)
	}


	app := fiber.New()

	app.Use(cors.New())
	database.ConnectMongo()

	// ตั้งค่ารูท
	routes.UserRoute(app)
	routes.MenuRoute(app)
	routes.FileRoutes(app)
	routes.GetApikeyRoute(app)
	routes.LogoRoutes(app)
	routes.BannerRoute(app)
	routes.MoitRoute(app)
	routes.GenUrlRoute(app)
	routes.ConvertRoutes(app)
	routes.TaskConvert(app)
	routes.DownloadCountRoute(app)
	routes.DownloadRoute(app)
	routes.DownloadFormRoute(app)
	

	// ฟังก์ชันที่เกี่ยวกับ API Key
	
	ctx := context.Background()
	_, err = models.GetOrCreateApiKey(ctx)
	if err != nil {
		log.Fatal("Error initializing API key:", err)
	}
	models.WatchApiKeyDeletions(ctx)

	// ✅ ตรวจสอบ API Key ทุก 1 นาที
	go func() {
		ticker := time.NewTicker(1 * time.Minute)
		defer ticker.Stop()
		for range ticker.C {
			_, err := models.GetOrCreateApiKey(ctx)
			if err != nil {
				log.Println("🔁 Periodic API Key check failed:", err)
			}
		}
	}()

	// ✅ ลบ orphaned images ทุก 5 นาที
	go func() {
		ticker := time.NewTicker(5 * time.Minute)
		defer ticker.Stop()
		for range ticker.C {
			log.Println("🧹 Running orphaned image cleanup...")
			tasks.CleanupExpiredFiles()
		}
	}()

	// ✅ Start Fiber app
	log.Fatal(app.Listen(":8081"))
}
