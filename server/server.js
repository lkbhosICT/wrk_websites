const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const cors = require("cors");
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const { readdirSync, existsSync, lstatSync } = require('fs');
const path = require('path');
const cron = require('node-cron')
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 20 });
const connectDB = require('./Config/db')
const verifyApiKey = require('./Config/checkkey')
const WEBSITE_URI = process.env.WEBSITE_URI;
const app = express();

connectDB()

app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [WEBSITE_URI], 
    credentials: true,
}));
app.use(bodyParser.json({limit: '10mb'}))
app.use("/moit", limiter);
const routesPath = path.join(__dirname, 'Routes');

readdirSync(routesPath).forEach((name) => {
    const fullPath = path.join(routesPath, name);
    
    if (existsSync(fullPath) && lstatSync(fullPath).isFile()) {
        try {
            app.use('/api', require(fullPath));
        } catch (err) {
            console.error(`Error loading route ${name}:`, err);
        }
    } else {
        console.warn(`Warning: Route file ${name} not found or not a file.`);
    }
});


cron.schedule("* * * * *",()=>{
    verifyApiKey()
})


app.use((req, res) => {
    res.status(404).json({ error: "API route not found. Please check the URL." });
});

app.listen(5000,()=> console.log('Server running is ports 8081'))