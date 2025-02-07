const axios = require("axios");

const generateRandomTemperature = () => (Math.random() * (40 - 10) + 10).toFixed(2);

setInterval(async () => {
    const sensorData = {
        sensorId: "sensor-123",
        temperature: generateRandomTemperature(),
        timestamp: new Date().toISOString()
    };

    console.log("📡 Sending data:", sensorData);

    try {
        await axios.post("http://localhost:5000/api/temperatures", sensorData);
        console.log("✅ Data sent successfully");
    } catch (error) {
        console.error("❌ Problem in sending data", error.message);
    }
}, 5000);
