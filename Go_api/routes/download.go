package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func DownloadRoute(app *fiber.App){
	api := app.Group("/api")
	api.Post("/download",controllers.Download)
}