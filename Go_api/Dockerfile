# Dockerfile
FROM golang:1.24.2

# ติดตั้ง pdftocairo และ dependencies
RUN apt-get update && apt-get install -y \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# สร้าง working directory
WORKDIR /app

# คัดลอก go.mod และ go.sum (ถ้ามี)
COPY go.mod go.sum ./
RUN go mod download

# คัดลอก source code
COPY . .

# สร้าง binary
RUN go build -o main .

# เปิดพอร์ต ถ้ามี
EXPOSE 8081

# คำสั่งเริ่มรันแอป
CMD ["./main"]

