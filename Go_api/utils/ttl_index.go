package utils

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func DropTTLIndex(collection *mongo.Collection) {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.Indexes().DropOne(ctx, "createdAt_1")
	if err != nil {
		log.Println("⚠️ ไม่สามารถลบ TTL index เดิม:", err)
	} else {
		log.Println("🗑️ TTL Index เดิมถูกลบแล้ว")
	}
}

func CreateTTLIndex(collection *mongo.Collection, ttlSeconds int32) {
	indexModel := mongo.IndexModel{
		Keys: bson.M{"createdAt": 1},
		Options: options.Index().
			SetExpireAfterSeconds(ttlSeconds),
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	_, err := collection.Indexes().CreateOne(ctx, indexModel)
	if err != nil {
		log.Fatal("❌ ไม่สามารถสร้าง TTL index:", err)
	} else {
		log.Printf("✅ TTL index ใหม่ถูกสร้าง (expire หลัง %d วินาที)\n", ttlSeconds)
	}
}