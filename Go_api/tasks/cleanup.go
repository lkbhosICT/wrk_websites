package tasks

import (
	"context"
	"io/fs"
	"log"
	"os"
	"path/filepath"
	"time"

	"go-api/database"
	"go.mongodb.org/mongo-driver/bson"
)

func CleanupExpiredFiles() {
	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	convertDir := "./convert"

	if _, err := os.Stat(convertDir); os.IsNotExist(err) {
		err := os.MkdirAll(convertDir, 0755)
		if err != nil {
			log.Println("❌ Error creating Convert directory:", err)
			return
		}
		log.Println("📁 Created Convert directory:", convertDir)
	}

	var files []string
	err := filepath.WalkDir(convertDir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if !d.IsDir() {
			files = append(files, filepath.Base(path))
		}
		return nil
	})
	if err != nil {
		log.Println("⚠️ Error walking through Convert directory:", err)
		return
	}

	cursor, err := database.ImgconvertCollection.Aggregate(ctx, bson.A{
		bson.M{"$unwind": "$img_name"},
		bson.M{"$project": bson.M{"fileName": "$img_name.img"}},
	})
	if err != nil {
		log.Println("❌ Error querying MongoDB:", err)
		return
	}
	defer cursor.Close(ctx)

	activeFiles := map[string]bool{}
	for cursor.Next(ctx) {
		var result struct {
			FileName string `bson:"fileName"`
		}
		if err := cursor.Decode(&result); err == nil {
			activeFiles[result.FileName] = true
		}
	}

	for _, file := range files {
		if _, found := activeFiles[file]; !found {
			fullPath := filepath.Join(convertDir, file)
			if err := os.Remove(fullPath); err != nil {
				log.Println("⚠️ Error deleting file:", fullPath, err)
			} else {
				log.Println("🗑️ Deleted:", fullPath)
			}
		}
	}
}
