const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const { Temperature } = require("./Models");
const { PORT, FRONT_URL, DB_URL } = require("./Config");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: FRONT_URL,
        methods: ["GET", "POST"]
    }
});

mongoose.connect(DB_URL).then(() => {
    console.log("✅ Database Connected!");
});

app.use(cors());
app.use(express.json());

app.get('/db', (req, res) => res.json(DB_URL))

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
