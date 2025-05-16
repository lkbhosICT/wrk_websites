package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
)

func FileRoutes(app *fiber.App) {
	api := app.Group("/api")
	
	api.Get("/file/:filename", controllers.GetFileContent)
}