package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
)

func GenUrlRoute(app *fiber.App){
	api := app.Group("/api")
	api.Get("/geturl/:filename",controllers.GenerateUrl)
}