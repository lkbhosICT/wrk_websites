package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
)

func ConvertRoutes (app *fiber.App) {
	api := app.Group("/api")
	api.Get("/converts/:filename",controllers.GetConvertContent)
}