package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
	"go-api/middleware"
)

func BannerRoute(app *fiber.App){
	api := app.Group("/api")
	api.Get("/banner", middleware.AuthMiddle, controllers.ListBanner)
}