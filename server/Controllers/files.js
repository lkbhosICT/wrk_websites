
const fs = require('fs')
const path = require('path')

exports.GetFileurl = async (req,res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../files', filename);
    
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: "404 File not found!" });
        }
    
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range; // ตรวจสอบว่า Client ส่ง Range header มาหรือไม่
    
        // ตรวจสอบประเภทไฟล์
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.png': 'image/png',
          '.webp': 'image/webp',
          '.pdf': 'application/pdf'
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
    
        if (range) {
          // ถ้ามีการขอ Range (รองรับการโหลดเป็นช่วง)
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
          const chunkSize = end - start + 1;
    
          const fileStream = fs.createReadStream(filePath, { start, end });
    
          res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": contentType,
          });
    
          fileStream.pipe(res);
        } else {
          // ส่ง Accept-Ranges: bytes เสมอ เพื่อให้เบราว์เซอร์รองรับการขอไฟล์เป็นช่วงในครั้งถัดไป
          res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": contentType,
            "Accept-Ranges": "bytes"  // บังคับให้เบราว์เซอร์รู้ว่ารองรับ Range Requests
          });
    
          fs.createReadStream(filePath).pipe(res);
        }
      } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ message: "Server Error!" });
      }
}