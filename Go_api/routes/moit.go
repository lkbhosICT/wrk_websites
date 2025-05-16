package routes

import(
	"github.com/gofiber/fiber/v2"
	"go-api/controllers"
)

func MoitRoute(app *fiber.App){
	api := app.Group("/api")

	api.Get("/moit/:year",controllers.ReadMoit)
	api.Get("/moit/:year/:id",controllers.ListMoit)
	api.Put("/moit/update-view/:id",controllers.PutUpdateview)
}