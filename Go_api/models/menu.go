package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Submenu struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	Name string `bson:"name" json:"name"`
	Path string `bson:"path" json:"path"`
}

type Children struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	Name    string    `bson:"name" json:"name"`
	Icon    string    `bson:"icon" json:"icon"`
	Patch   string    `bson:"patch" json:"patch"`
	Submenu []Submenu `bson:"submenu" json:"submenu"`
}

type Menu struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	Name      string             `bson:"name" json:"name"`
	Icon      string             `bson:"icon" json:"icon"`
	Patch     string             `bson:"patch" json:"-"`
	Childrens []Children         `bson:"childrens" json:"childrens"`
}
