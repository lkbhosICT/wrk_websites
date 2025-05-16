package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Subtitle struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Num float64 `bson:"nums" json:"nums"`
	Title string `bson:"title" json:"title"`
	Make_by string `bson:"make_by" json:"make_by"`
	Path string `bson:"path" json:"path"`
    Pdfurl string `bson:"pdfurl" json:"pdfurl"`
	Fc_year string `bson:"fc_year" json:"fc_year"`
    Count_view int32 `bson:"count_view" json:"count_view"`
    Count_download int32 `bson:"count_download" json:"count_download"`
}

type Childrens struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Nums int32 `bson:"nums" json:"nums"`
	Title string `bson:"title" json:"title"`
	Make_by string `bson:"make_by" json:"make_by"`
    Path string `bson:"path" json:"path"`
    Pdfurl string `bson:"pdfurl" json:"pdfurl"`
	Check string `bson:"check" json:"check"`
    Fc_year string `bson:"fc_year" json:"fc_year"`
    Count_view int32 `bson:"count_view" json:"count_view"`
    Count_download int32 `bson:"count_download" json:"count_download"`
	Subtitle []Subtitle `bson:"subtitle" json:"subtitle"`
}

type Moit struct {
	ID primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
	Nums int32 `bson:"nums" json:"nums"`
	Title string `bson:"title" json:"title"`
	Fc_year int32 `bson:"fc_year" json:"fc_year"`
	Childrens []Childrens `bson:"childrens" json:"childrens"`
}