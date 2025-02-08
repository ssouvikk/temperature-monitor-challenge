require('dotenv').config();

const PORT = process.env.PORT || 5001

module.exports = {
    PORT,
    SOCKET_URL: process.env.SOCKET_URL || "http://localhost:6001",
}