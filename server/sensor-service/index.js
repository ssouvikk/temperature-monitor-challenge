const io = require("socket.io-client");
const { SOCKET_URL } = require("./Config");

let socket;

const connectToSocket = () => {
    console.log("🔄 Trying to connect to WebSocket...");
    socket = io(SOCKET_URL, {
        reconnectionAttempts: 10,  // সর্বোচ্চ ১০ বার পুনরায় চেষ্টা করবে
        reconnectionDelay: 3000  // প্রতিবার ৩ সেকেন্ড পর পর চেষ্টা করবে
    });

    socket.on("connect", () => {
        console.log("✅ Connected to WebSocket Server!");
    });

    socket.on("connect_error", (error) => {
        console.error("❌ WebSocket Connection Failed, Retrying...", error.message);
        setTimeout(connectToSocket, 5000);
    });
};

connectToSocket();

const generateRandomTemperature = () => (Math.random() * (40 - 10) + 10).toFixed(2);

setInterval(() => {
    const sensorData = {
        sensorId: "sensor-123",
        temperature: generateRandomTemperature(),
        timestamp: new Date().toISOString()
    };

    console.log("📡 Sending data via WebSocket:", sensorData);

    socket.emit("newTemperatureData", sensorData);
}, 5000);
