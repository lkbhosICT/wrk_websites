package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
	"go-api/middleware"
)


func LogoRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/logo",controllers.ListLogo)
}