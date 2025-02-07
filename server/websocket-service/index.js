const http = require("http");
const socketIo = require("socket.io");

const server = http.createServer();
const io = socketIo(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
});


const axios = require("axios");
setInterval(async () => {
    try {
        const { data } = await axios.get("http://localhost:5000/api/temperatures");
        if (data.length > 0) {
            io.emit("temperatureUpdate", data[0]);
        }
    } catch (error) {
        console.error("❌ WebSocket Error:", error.message);
    }
}, 5000);

server.listen(6000, () => console.log("🔄 WebSocket Service running on port 6000"));
