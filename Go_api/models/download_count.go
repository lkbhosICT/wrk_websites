package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type DownloadCount struct {
	ID 				primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	ItemID 			string `bson:"itemid" json:"-"`
	Source 			string `bson:"source" json:"-"`
	Download_count 	int32 `bson:"download_count" json:"download_count"`
}