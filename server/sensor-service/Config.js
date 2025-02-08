require('dotenv').config();

const PORT = process.env.PORT || 5001

module.exports = {
    PORT,
    // SOCKET_URL: process.env.SOCKET_URL || "http://localhost:6001",
    SOCKET_URL: process.env.SOCKET_URL || "http://websocket-service:6001",
    DB_URL: process.env.DB_URL || "mongodb://mongodb:27017/temperatureDB",
}