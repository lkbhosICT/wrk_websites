package utils

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"net/url"
	"os"
	"path"
	"time"

	"github.com/joho/godotenv"
)

func GenerateSignedURL(filename string) (string, error) {
	_ = godotenv.Load()

	baseURL := os.Getenv("BASE_URL") 
	secretKey := os.Getenv("SECRET_KEY")
	expireInSeconds := int64(1800)

	if baseURL == "" && secretKey == "" {
		return "", fmt.Errorf("Missing BASE_URL or SECRET_KEY in env")
	}


	u, err := url.Parse(baseURL)
	if err != nil {
		return "", err
	}
	u.Path = path.Join(u.Path, filename)


	expiration := time.Now().Add(time.Duration(expireInSeconds) * time.Second).Unix()

	query := u.Query()
	query.Set("expires", fmt.Sprintf("%d", expiration))

	stringToSign := u.Path + "?expires=" + query.Get("expires")
	h := hmac.New(sha256.New, []byte(secretKey))
	h.Write([]byte(stringToSign))
	signature := base64.URLEncoding.EncodeToString(h.Sum(nil))

	query.Set("signature", signature)
	u.RawQuery = query.Encode()

	return u.String(), nil
}

func GenerateConvertSignedURL(filename string) (string, error) {
	_ = godotenv.Load()

	baseURL := os.Getenv("BASE_CONVERT_URL") 
	secretKey := os.Getenv("SECRET_KEY")
	expireInSeconds := int64(1800)

	if baseURL == "" && secretKey == "" {
		return "", fmt.Errorf("Missing BASE_URL or SECRET_KEY in env")
	}


	u, err := url.Parse(baseURL)
	if err != nil {
		return "", err
	}
	u.Path = path.Join(u.Path, filename)


	expiration := time.Now().Add(time.Duration(expireInSeconds) * time.Second).Unix()

	query := u.Query()
	query.Set("expires", fmt.Sprintf("%d", expiration))

	stringToSign := u.Path + "?expires=" + query.Get("expires")
	h := hmac.New(sha256.New, []byte(secretKey))
	h.Write([]byte(stringToSign))
	signature := base64.URLEncoding.EncodeToString(h.Sum(nil))

	query.Set("signature", signature)
	u.RawQuery = query.Encode()

	return u.String(), nil
}