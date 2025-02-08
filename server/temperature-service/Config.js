require('dotenv').config();

const PORT = process.env.PORT || 5000

module.exports = {
    PORT,
    BACK_URL: process.env.BACK_URL || `http://localhost:${PORT}`,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/temperatureDB",
    API_BASE_URL: process.env.API_BASE_URL || `http://localhost:${PORT}/api`,
}