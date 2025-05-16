package routes

import (
	"go-api/controllers"

	"github.com/gofiber/fiber/v2"
)

func DownloadFormRoute(app *fiber.App) {
	api := app.Group("/api")

	api.Get("/download-form",controllers.GetDownloadForm)
	api.Post("/download-form",controllers.CreateMultipleDownloadForms)
}