package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Logo struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	Nameth  string `bson:"nameth" json:"nameth"`
	Nameen string `bson:"nameen" json:"nameen"`
	Icon string `bson:"icon" json:"icon"`
	Path string `bson:"path" json:"path"`
}