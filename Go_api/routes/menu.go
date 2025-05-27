package routes

import (
	"go-api/controllers"
	"go-api/middleware"

	"github.com/gofiber/fiber/v2"
)

func MenuRoute(app *fiber.App) {
	api := app.Group("/api")

	api.Post("/menu",middleware.AuthMiddle, controllers.CreateMenu)
	api.Get("/menu",middleware.AuthMiddle, controllers.GenerateSignedURLHandler)
}