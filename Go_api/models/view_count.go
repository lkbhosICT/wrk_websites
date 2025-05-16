package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type ViewCount struct {
	ID             primitive.ObjectID `bson:"_id,omitempty" json:"-"`
	ItemID         string `bson:"itemid" json:"-"`
	Source         string `bson:"source" json:"-"`
	View_count int32  `bson:"view_count" json:"view_count"`
}