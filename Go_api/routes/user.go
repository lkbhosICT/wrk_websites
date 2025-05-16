package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
)

func UserRoute(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/users", controllers.GetUsers)
	api.Post("/users", controllers.CreateUser)
}
