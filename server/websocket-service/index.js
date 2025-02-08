const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const { Temperature } = require("./Models");
const { PORT, FRONT_URL } = require("./Config");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: FRONT_URL,
        methods: ["GET", "POST"]
    }
});

mongoose.connect("mongodb://localhost:27017/temperatureDB").then(() => {
    console.log("✅ Database Connected!");
});

app.use(cors());
app.use(express.json());

// WebSocket Connection Handling
io.on("connection", (socket) => {
    console.log("✅ New WebSocket Client Connected");

    socket.on("newTemperatureData", async (data) => {
        console.log("📡 Received Data from Sensor:", data);
        try {
            const newReading = new Temperature(data);
            await newReading.save();
            
            io.emit("temperatureUpdate", newReading);
        } catch (error) {
            console.log('Error ---------- ' + error.message)            
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ Client Disconnected");
    });
});

// const PORT = 6001;
server.listen(PORT, () => console.log(`🚀 WebSocket Service running on port ${PORT}`));
