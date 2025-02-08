const io = require("socket.io-client");

const socket = io("http://localhost:6001"); 

const generateRandomTemperature = () => (Math.random() * (40 - 10) + 10).toFixed(2);

setInterval(() => {
    const sensorData = {
        sensorId: "sensor-123",
        temperature: generateRandomTemperature(),
        timestamp: new Date().toISOString()
    };

    console.log("📡 Sending data via WebSocket:", sensorData);

    socket.emit("newTemperatureData", sensorData);
}, 10000);
