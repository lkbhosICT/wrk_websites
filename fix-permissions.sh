#!/bin/bash
# fix-permissions.sh

echo "Fixing permissions for MongoDB keyfile..."

# ตรวจสอบว่า container ทำงานอยู่
if ! docker ps | grep -q mongodb_replica; then
  echo "Error: MongoDB container is not running!"
  exit 1
fi

# หา user ID ที่ MongoDB ใช้ใน container
MONGODB_UID=$(docker exec mongodb_replica id -u mongodb)
echo "MongoDB user ID in container: $MONGODB_UID"

# คัดลอก keyfile จากภายนอกเข้าไปใน container เพื่อให้แน่ใจว่าสิทธิ์ถูกต้อง
echo "Copying keyfile into container with proper permissions..."
docker cp mongodb-keyfile/mongodb-keyfile mongodb_replica:/tmp/mongodb-keyfile
docker exec mongodb_replica bash -c "chmod 600 /tmp/mongodb-keyfile && chown mongodb:mongodb /tmp/mongodb-keyfile && cp /tmp/mongodb-keyfile /mongodb-keyfile/mongodb-keyfile && chmod 600 /mongodb-keyfile/mongodb-keyfile && chown mongodb:mongodb /mongodb-keyfile/mongodb-keyfile"

echo "Permission details for keyfile inside container:"
docker exec mongodb_replica ls -la /mongodb-keyfile/mongodb-keyfile

echo "Permission fix completed. Restarting MongoDB..."
docker restart mongodb_replica

# รอให้ MongoDB restart
sleep 5
echo "MongoDB restarted. Checking status..."
docker logs mongodb_replica | tail -20