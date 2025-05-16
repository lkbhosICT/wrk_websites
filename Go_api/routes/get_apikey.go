package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
	"go-api/middleware"
)

func GetApikeyRoute(app *fiber.App){
	api := app.Group("/api")

	api.Get("/getapikey",middleware.AuthApikey, controllers.GetApiKey)
}
