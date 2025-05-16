package database

import (
	"context"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"go-api/utils"
)

var MongoInstance *mongo.Client
var DBName = "lkbhosdb"


var ApiKeyCollection *mongo.Collection
var MenuCollection *mongo.Collection
var LogoCollection *mongo.Collection
var BannerCollection *mongo.Collection
var MoitCollection *mongo.Collection
var ImgconvertCollection *mongo.Collection
var DownloadcountCollection *mongo.Collection
var ViewcountCollection *mongo.Collection
var DownloadFormCollection *mongo.Collection

func ConnectMongo() {
	
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://admin:password@localhost:27017/admin?replicaSet=rs0&authSource=admin"))
	if err != nil {
		log.Fatal(err)
	}

	
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	MongoInstance = client

	MenuCollection = client.Database(DBName).Collection("menus")

	ApiKeyCollection = client.Database(DBName).Collection("apikeys")

	LogoCollection = client.Database(DBName).Collection("logos")

	BannerCollection = client.Database(DBName).Collection("banners")

	MoitCollection = client.Database(DBName).Collection("moits")

	ImgconvertCollection = client.Database(DBName).Collection("imgconverts")

	DownloadcountCollection = client.Database(DBName).Collection("downloadcounts")

	ViewcountCollection = client.Database(DBName).Collection("viewcounts")

	DownloadFormCollection = client.Database(DBName).Collection("downloadforms")

	

	utils.DropTTLIndex(ImgconvertCollection)
	utils.CreateTTLIndex(ImgconvertCollection, 1800)


	indexModel := mongo.IndexModel{
		Keys: bson.D{{Key: "items_id", Value: 1}},
		Options: options.Index().SetUnique(true),
	}
	ctx2, cancel2 := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel2()
	_, err = ImgconvertCollection.Indexes().CreateOne(ctx2, indexModel)
	if err != nil {
		log.Println("⚠️ Failed to create unique index on items_id:", err)
	} else {
		log.Println("✅ Unique index on items_id on ImgconvertCollection created (or already exists)")
	}

	indexModel2 := mongo.IndexModel{
		Keys: bson.D{{Key: "itemid", Value: 1}}, // ต้องเป็น itemid ตรงกับ struct
		Options: options.Index().SetUnique(true),
	}
	ctx3, cancel3 := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel3()
	_, err = DownloadcountCollection.Indexes().CreateOne(ctx3, indexModel2)
	if err != nil {
		log.Println("⚠️ Failed to create unique index on itemid:", err)
	} else {
		log.Println("✅ Unique index on itemid on DownloadcountCollection created (or already exists)")
	}

	indexModel3 := mongo.IndexModel{
		Keys: bson.D{{Key: "itemid", Value: 1}}, // ต้องเป็น itemid ตรงกับ struct
		Options: options.Index().SetUnique(true),
	}
	ctx4, cancel4 := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel4()
	_, err = ViewcountCollection.Indexes().CreateOne(ctx4, indexModel3)
	if err != nil {
		log.Println("⚠️ Failed to create unique index on itemid:", err)
	} else {
		log.Println("✅ Unique index on itemid on ViewcountCollection created (or already exists)")
	}


	
	
	log.Println("✅ Connected to MongoDB!")

}
