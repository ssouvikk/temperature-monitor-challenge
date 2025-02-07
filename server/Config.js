require('dotenv').config();

module.exports = {
    FRONT_URL: process.env.FRONT_URL || 'http://localhost:3000',
    BACK_URL: process.env.FRONT_URL || 'http://localhost:5000',
    
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL || "mongodb://localhost:27017/temperatureDB",

}