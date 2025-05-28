package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)


func LogoRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/logo",controllers.ListLogo)
}