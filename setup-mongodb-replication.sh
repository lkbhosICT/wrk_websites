#!/bin/bash
# setup-mongodb-replication.sh
#
# สคริปต์นี้จะทำการตั้งค่า MongoDB Replica Set แบบ 1 node ทั้งหมดในขั้นตอนเดียว

echo "========================================"
echo "MongoDB Replica Set Setup Script"
echo "========================================"

# 1. สร้าง keyFile
echo -e "\n[1/8] Creating keyFile..."
chmod +x create-keyfile.sh
./create-keyfile.sh

# 2. ตั้งค่า permissions ที่ถูกต้อง
echo -e "\n[2/8] Setting correct permissions..."
chmod 600 mongodb-keyfile/mongodb-keyfile
ls -la mongodb-keyfile/mongodb-keyfile

# 3. สร้างและเริ่มต้น container
echo -e "\n[3/8] Building and starting MongoDB container..."
docker compose down -v 2>/dev/null
docker compose build mongodb
docker compose up -d mongodb

# 4. รอให้ container เริ่มทำงาน
echo -e "\n[4/8] Waiting for MongoDB to start..."
sleep 10
docker logs mongodb_replica | tail -10

# 5. แก้ไขสิทธิ์ของ keyFile (ถ้าจำเป็น)
echo -e "\n[5/8] Fixing permissions for keyFile..."
chmod +x fix-permissions.sh
./fix-permissions.sh

# 6. ตั้งค่า replica set
echo -e "\n[6/8] Initializing replica set..."
chmod +x init-replica.sh
./init-replica.sh

# 7. สร้างและเริ่มต้น Go API container
echo -e "\n[7/8] Building and starting Go API container..."
docker compose build go_api
docker compose up -d go_api
sleep 5
docker logs go_api | tail -10

# 8. สร้างและเริ่ม Next.js container
echo -e "\n[8/8] Building and starting Next.js container..."
docker compose build nextjs
docker compose up -d nextjs
sleep 5
docker logs website | tail -10

echo -e "\n========================================" 
echo "MongoDB Replica Set & Go API setup completed!" 
echo "========================================" 
echo "MongoDB Connection string: mongodb://admin:password@localhost:27017/admin?replicaSet=rs0&authSource=admin" 
echo "To verify the replica set status:" 
echo "docker exec mongodb_replica mongosh -u admin -p password --authenticationDatabase admin --eval 'rs.status()'"
echo ""
echo "Go API is available at: http://localhost:8081"
echo "Next.js:     http://localhost:3000"
echo "========================================"