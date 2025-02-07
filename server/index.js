const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const mongoose = require('mongoose')
const { PORT, DB_URL, FRONT_URL } = require('./Config');
const { Temperature } = require("./app/Models");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(DB_URL);


const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
});

app.get("/", (req, res) => res.send("Server is running"));

app.post("/api/temperature", async (req, res) => {
    try {
        const { sensorId, temperature, timestamp } = req.body;
        const newReading = new Temperature({ sensorId, temperature, timestamp });
        await newReading.save();

        io.emit("temperatureUpdate", newReading);

        res.status(201).json({ message: "✅ Temperature data saved!", data: newReading });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get("/api/temperature", async (req, res) => {
    try {
        const data = await Temperature.find().sort({ timestamp: -1 }).limit(10);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "❌ Could not fetch data" });
    }
});


app.all('*', (req, res) => res.status(501).json({ status: 501, success: false, data: null, message: 'Not implemented!' }))

server.listen(PORT, () => console.log("Server running on port 5000"));


/*
|-------------------------------------------
| Error handling  Here
|-------------------------------------------
*/
app.use((err, req, res, next) => {
    if (!err) {
        return next();
    }
    if (typeof err === 'string') {
        return res.status(400).json({ status: 400, success: false, data: null, message: err });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ status: 400, success: false, data: null, message: err.message });
    } else if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ status: 401, success: false, data: null, message: 'Invalid Token' });
    } else if (err.name === 'CastError') {
        return res.status(404).json({ status: 404, success: false, data: null, message: 'Data was not found' });
    }
    return res.status(404).json({ status: 404, success: false, data: null, message: err.message });
});