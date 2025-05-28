package routes

import (
	"go-api/controllers"
	"go-api/middleware"

	"github.com/gofiber/fiber/v2"
)

func DownloadFormRoute(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/download-form",middleware.AuthMiddle, controllers.GetDownloadForm)
	api.Post("/download-form",middleware.AuthMiddle, controllers.CreateMultipleDownloadForms)
}