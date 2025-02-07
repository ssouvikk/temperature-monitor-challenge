require('dotenv').config();

module.exports = {
    FRONT_URL: process.env.FRONT_URL || 'http://localhost:3000',
    BACK_URL: process.env.BACK_URL || 'http://localhost:5000',
    API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:5000/api',
    
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/temperatureDB",

}