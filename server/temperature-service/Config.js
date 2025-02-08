require('dotenv').config();

const PORT = process.env.PORT || 5000

module.exports = {
    PORT,
    DB_URL: process.env.DB_URL || "mongodb://mongodb:27017/temperatureDB",

    
    BACK_URL: process.env.BACK_URL || `http://localhost:${PORT}`,
    API_BASE_URL: process.env.API_BASE_URL || `http://localhost:${PORT}/api`,
}