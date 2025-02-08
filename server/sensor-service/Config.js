require('dotenv').config();

const PORT = process.env.PORT || 5001

module.exports = {
    PORT,
    BACK_URL: process.env.BACK_URL || `http://localhost:${PORT}`,
    API_BASE_URL: process.env.API_BASE_URL || `http://localhost:${PORT}/api`,
}