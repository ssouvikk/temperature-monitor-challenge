const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const { Temperature } = require("../Models");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// MongoDB কানেকশন
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

        // MongoDB-তে সেভ করা
        const newReading = new Temperature(data);
        await newReading.save();

        // লাইভ আপডেট ব্রডকাস্ট করা
        io.emit("temperatureUpdate", newReading);
    });

    socket.on("disconnect", () => {
        console.log("❌ Client Disconnected");
    });
});

// Start Server
const PORT = 6001;
server.listen(PORT, () => console.log(`🚀 WebSocket Service running on port ${PORT}`));
