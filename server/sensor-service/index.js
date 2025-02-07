const io = require("socket.io-client");

// WebSocket Server-এ কানেক্ট করা
const socket = io("http://localhost:6001"); // WebSocket Service Port

const generateRandomTemperature = () => (Math.random() * (40 - 10) + 10).toFixed(2);

setInterval(() => {
    const sensorData = {
        sensorId: "sensor-123",
        temperature: generateRandomTemperature(),
        timestamp: new Date().toISOString()
    };

    console.log("📡 Sending data via WebSocket:", sensorData);

    // WebSocket দিয়ে সরাসরি ডাটা পাঠানো
    socket.emit("newTemperatureData", sensorData);
}, 5000);
