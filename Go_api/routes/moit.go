package routes

import (
	"go-api/controllers"
	"go-api/middleware"

	"github.com/gofiber/fiber/v2"
)

func MoitRoute(app *fiber.App){
	api := app.Group("/api")

	api.Get("/moit/:year",middleware.AuthMiddle, controllers.ReadMoit)
	api.Get("/moit/:year/:id",middleware.AuthMiddle,controllers.ListMoit)
	api.Put("/moit/update-view/:id",middleware.AuthMiddle,controllers.PutUpdateview)
}