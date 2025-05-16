#!/bin/bash
# create-keyfile.sh

echo "Creating MongoDB keyfile..."

# สร้างโฟลเดอร์ถ้ายังไม่มี
mkdir -p mongodb-keyfile

# สร้าง keyfile ด้วยการสร้างข้อมูลแบบสุ่ม
openssl rand -base64 756 > mongodb-keyfile/mongodb-keyfile

# สำคัญมาก: ตั้งค่าสิทธิ์ที่ถูกต้อง (600 ไม่ใช่ 400) 
# เพื่อให้ user ที่ MongoDB process รันสามารถอ่านไฟล์ได้
chmod 600 mongodb-keyfile/mongodb-keyfile

# เพิ่มสิทธิ์สำหรับทุกคนที่จะอ่านไฟล์ภายใน container 
# (เป็นวิธีแก้ปัญหาชั่วคราวสำหรับการทดสอบ)
chmod 644 mongodb-keyfile/mongodb-keyfile

echo "MongoDB keyfile created successfully at mongodb-keyfile/mongodb-keyfile"
echo "File permissions:"
ls -la mongodb-keyfile/mongodb-keyfile
