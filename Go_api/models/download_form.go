package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DownloadForm struct {
    ID        primitive.ObjectID `bson:"_id,omitempty" json:"_id"`
    FormName  string             `bson:"form_name" json:"form_name"`
    FileName  string             `bson:"file_name" json:"file_name"`
    FileType  string             `bson:"file_type" json:"file_type"`
    MadeBy    string             `bson:"make_by" json:"make_by"`
    CreatedAt time.Time          `bson:"createdAt" json:"createdAt"`
    UpdatedAt time.Time          `bson:"updateAt" json:"updateAt"`
}
