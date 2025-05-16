FROM mongo:6.0

# สร้างโฟลเดอร์สำหรับเก็บ keyfile
RUN mkdir -p /mongodb-keyfile && \
    chown mongodb:mongodb /mongodb-keyfile && \
    chmod 700 /mongodb-keyfile

# ตั้งค่า working directory
WORKDIR /data

# คำสั่งเริ่มต้นสำหรับ container (จะถูก override โดย docker-compose)
CMD ["mongod", "--replSet", "rs0", "--bind_ip_all", "--keyFile", "/mongodb-keyfile/mongodb-keyfile", "--auth"]