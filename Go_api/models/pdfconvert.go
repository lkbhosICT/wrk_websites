package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Imgstore struct {
	Img_name string `bson:"img" json:"img"`
}

type Imgconvert struct {
	ID        primitive.ObjectID  `bson:"_id,omitempty" json:"-"`
	Items_id  string              `bson:"items_id" json:"-"`
	Location  string              `bson:"location,omitempty" json:"-"`
	Status    string			  `bson:"status" json:"status"`
	Progress  int                 `bson:"progress" json:"progress"`     
	Total     int                 `bson:"total" json:"total"` 
	Numpage   int          		  `bson:"numpage" json:"numpage"`
	Img_name  []Imgstore          `bson:"img_name" json:"img_name"`
	CreatedAt time.Time           `bson:"createdAt" json:"-"` 
}

