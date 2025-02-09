const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const { Temperature } = require("./Models");
const { PORT, DB_URL } = require("./Config");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
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
            
            console.log("📡 Emitting Data to Clients:", newReading);
            io.emit("temperatureUpdate", newReading);
        } catch (error) {
            console.log('❌ Error: ' + error.message);
        }
    });

    socket.on("disconnect", () => {
        console.log("❌ Client Disconnected");
    });
});


server.listen(PORT, () => console.log(`🚀 WebSocket Service running on port ${PORT}`));
