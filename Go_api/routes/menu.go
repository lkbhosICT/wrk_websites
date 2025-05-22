package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
)

func MenuRoute(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/menu", controllers.CreateMenu)
	api.Get("/menu", controllers.GenerateSignedURLHandler)
}