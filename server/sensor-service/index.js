const io = require("socket.io-client");
const { SOCKET_URL } = require("./Config");

const socket = io(SOCKET_URL);

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
