package routes

import (
	"go-api/controllers"
	"go-api/middleware"

	"github.com/gofiber/fiber/v2"
)

func DownloadCountRoute(app *fiber.App){
	api := app.Group("/api")
	api.Post("/download-count/:source/:id",middleware.AuthMiddle,controllers.GetDownloadCount)
	api.Get("/download-count/:source/:id",middleware.AuthMiddle,controllers.GetDownload)

	api.Get("/view-count/:source/:id",middleware.AuthMiddle,controllers.GetViewCount)

}