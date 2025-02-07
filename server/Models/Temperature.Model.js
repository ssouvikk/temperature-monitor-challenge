const { Schema, model } = require('mongoose');

const schema = new Schema({
    sensorId: String,
    temperature: Number,
    timestamp: { type: Date, default: Date.now }
});


module.exports = model('Temperature', schema);