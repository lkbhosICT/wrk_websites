package models

import (
	"context"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"log"
	"os"
	"time"

	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go-api/database"
)

var apiKeyCollection *mongo.Collection

type ApiKey struct {
	Key       string    `bson:"key"`
	Signature string    `bson:"signature"`
	CreatedAt time.Time `bson:"createdAt"`
}

// ดึง secret key จาก ENV
var secretKey = []byte(os.Getenv("API_SECRET_KEY"))

// ฟังก์ชันสร้างลายเซ็น HMAC
func generateSignature(key string) string {
	h := hmac.New(sha256.New, secretKey)
	h.Write([]byte(key))
	return hex.EncodeToString(h.Sum(nil))
}

func ValidateApiKey(key, signature string) bool {
	expectedSig := generateSignature(key)
	return hmac.Equal([]byte(expectedSig), []byte(signature))
}

// ฟังก์ชันสำหรับเชื่อมต่อ MongoDB และสร้าง API Key + Signature
func GetOrCreateApiKey(ctx context.Context) (*ApiKey, error) {
	var result ApiKey
	err := database.ApiKeyCollection.FindOne(ctx, bson.M{}).Decode(&result)

	if err == mongo.ErrNoDocuments {
		log.Println("🔹 No API key found. Creating new key...")

		newUUID := uuid.New().String()
		signature := generateSignature(newUUID)

		newKey := ApiKey{
			Key:       newUUID,
			Signature: signature,
			CreatedAt: time.Now(),
		}
		_, err := database.ApiKeyCollection.InsertOne(ctx, newKey)
		if err != nil {
			return nil, err
		}
		log.Println("✅ New API Key Created:", newKey.Key)
		return &newKey, nil
	} else if err != nil {
		return nil, err
	}

	return &result, nil
}

// ฟังก์ชันดูการลบ API Key แล้วสร้างใหม่
func WatchApiKeyDeletions(ctx context.Context) {
	pipeline := mongo.Pipeline{
		{{Key: "$match", Value: bson.M{"operationType": "delete"}}},
	}

	stream, err := database.ApiKeyCollection.Watch(ctx, pipeline)
	if err != nil {
		log.Println("❌ Change stream error:", err)
		log.Println("⚠️ MongoDB might not be in replica set mode")
		return
	}

	go func() {
		defer stream.Close(ctx)
		log.Println("✅ API Key change stream setup complete")

		for stream.Next(ctx) {
			log.Println("🔴 API Key deleted. Creating new key...")

			count, err := database.ApiKeyCollection.CountDocuments(ctx, bson.M{})
			if err != nil {
				log.Println("Error counting documents:", err)
				continue
			}

			if count == 0 {
				newUUID := uuid.New().String()
				signature := generateSignature(newUUID)

				newKey := ApiKey{
					Key:       newUUID,
					Signature: signature,
					CreatedAt: time.Now(),
				}
				_, err := database.ApiKeyCollection.InsertOne(ctx, newKey)
				if err != nil {
					log.Println("Error creating new key:", err)
				} else {
					log.Println("✅ New API Key Created:", newKey.Key)
				}
			} else {
				log.Println("⚠️ API key already exists, skip creation")
			}
		}
	}()
}
