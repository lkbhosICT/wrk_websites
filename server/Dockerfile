# ใช้ Node.js เวอร์ชันล่าสุดบน Alpine (น้ำหนักเบา)
FROM node:21-alpine

# ติดตั้ง dependencies ที่จำเป็น รวมถึง poppler
RUN apk add --no-cache tzdata dcron supervisor poppler

# ตั้งค่า Timezone (เปลี่ยนเป็นของคุณได้)
ENV TZ=Asia/Bangkok

# กำหนดโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์โปรเจกต์ไปยัง container
COPY . .

# ติดตั้ง dependencies โดยใช้ npm ci (เสถียรกว่า npm install)
RUN npm ci

# คัดลอกไฟล์ cron jobs และตั้งค่าการรัน
COPY crontab /etc/crontabs/root
RUN chmod 0644 /etc/crontabs/root

# คัดลอก Supervisord config
COPY supervisord.conf /etc/supervisord.conf

# เปิดพอร์ต API
EXPOSE 8081

# ใช้ Supervisord เพื่อจัดการ node server.js และ cron
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
