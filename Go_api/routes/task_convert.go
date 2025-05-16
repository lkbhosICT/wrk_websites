package routes

import (
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
)


func TaskConvert (app *fiber.App){
	api := app.Group("/api")
	api.Post("/tasks",controllers.CreateConvertTask)
	api.Post("/task",controllers.GetTask)
}
