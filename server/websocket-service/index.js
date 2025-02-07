const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// WebSocket Connection Handling
io.on("connection", (socket) => {
    console.log("✅ New WebSocket Client Connected");

    socket.on("disconnect", () => {
        console.log("❌ Client Disconnected");
    });
});

// Fetch Temperature Data from API and Emit to Clients
setInterval(async () => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/temperatures");
        if (data.length > 0) {
            io.emit("temperatureUpdate", data[0]);
            console.log("📡 Sent Data to Clients:", data[0]);
        }
    } catch (error) {
        console.error("❌ WebSocket Error:", error.message);
    }
}, 5000);

// Start Server
const PORT = 6000;
server.listen(PORT, () => console.log(`🚀 WebSocket Service running on port ${PORT}`));
