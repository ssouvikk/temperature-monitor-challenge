const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { PORT, DB_URL } = require("../Config");
const { Temperature } = require("../Models");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(DB_URL).then(() => console.log("✅ Database Connected!"));

app.post("/api/temperatures", async (req, res) => {
    try {
        const { sensorId, temperature, timestamp } = req.body;
        const newReading = new Temperature({ sensorId, temperature, timestamp });
        await newReading.save();

        res.status(201).json({ message: "✅ Temperature data saved!", data: newReading });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/api/temperatures", async (req, res) => {
    try {
        const data = await Temperature.find().sort({ timestamp: -1 }).limit(10);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "❌ Could not fetch data" });
    }
});

app.listen(PORT, () => console.log(`🔥 Temperature Service running on port ${PORT}`));
