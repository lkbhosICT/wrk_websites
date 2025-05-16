// mongo-init.js
print("Starting replica set initialization with authentication");

// รอให้ MongoDB เริ่มทำงาน
sleep(5000);

// กำหนดค่า admin user (จะถูกสร้างโดย environment variables MONGO_INITDB_ROOT_USERNAME และ MONGO_INITDB_ROOT_PASSWORD)
const adminUser = "admin";
const adminPassword = "password";

// สร้างฟังก์ชั่นสำหรับการ retry
function connectWithRetry(maxAttempts, delay) {
  let attempt = 0;
  while (attempt < maxAttempts) {
    try {
      const db = db.getSiblingDB('admin');
      // ในขั้นตอนนี้ เรายังไม่จำเป็นต้องทำการ authenticate เพราะ mongo-init.js รันใน context ของ admin
      return db;
    } catch (err) {
      print(`Attempt ${attempt + 1}/${maxAttempts}: Failed to connect. Retrying in ${delay/1000} seconds...`);
      sleep(delay);
      attempt++;
    }
  }
  throw new Error(`Could not connect after ${maxAttempts} attempts`);
}

// เชื่อมต่อกับ MongoDB
try {
  const db = connectWithRetry(30, 2000);
  print("Connected to MongoDB successfully");

  // ตรวจสอบสถานะ replica set หลังจากที่ keyFile ถูกตั้งค่า
  try {
    const rsStatus = rs.status();
    print("Current replica set status:");
    printjson(rsStatus);
  } catch (err) {
    print("Replica set not yet initialized. Will be initialized by init-replica.sh");
    print("Error: " + err.message);
  }
} catch (err) {
  print("Failed to initialize replica set: " + err.message);
}

print("MongoDB init script completed");