package models

import "go.mongodb.org/mongo-driver/bson/primitive"


type Imgbanner struct {
	ID primitive.ObjectID `bson:"_id, omitempty" json:"-"`
	Name string `bson:"name" json:"name"`
	Path string `bson:"path" json:"path"`
}


type Banner struct {
	ID primitive.ObjectID `bson:"_id, omitempty" json:"-"`
	Wellcome string `bson:"wellcome" json:"wellcome"`
	Hosname string `bson:"hosname" json:"hosname"`
	Location string `bson:"location" json:"location"`
	Title string `bson:"title" json:"title"`
	Vision string `bson:"vision" json:"vision"`
	Imgbanner []Imgbanner `bson:"imgbanner" json:"imgbanner"`
}