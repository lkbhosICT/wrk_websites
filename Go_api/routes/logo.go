package routes

import (
	"go-api/controllers"
	"go-api/middleware"

	"github.com/gofiber/fiber/v2"
)


func LogoRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Get("/logo",middleware.AuthMiddle,controllers.ListLogo)
}