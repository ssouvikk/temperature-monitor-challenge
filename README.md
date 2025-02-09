# Temperature Monitoring System

This is a **real-time temperature monitoring system** that consists of three main services:
- **Sensor Service**: Simulates temperature sensors and sends data via WebSocket.
- **WebSocket Service**: Receives temperature data & stores in DB and broadcasts it to clients.
- **Temperature Service**: Stored temperature data sends to client via API.

It is fully **Dockerized** and can be deployed using **Docker Compose**.

## Features
- Real-time data transmission using **WebSockets**.
- Stores data in **MongoDB**.
- Uses **Node.js** and **Express.js** for backend services.
- **Docker Compose** for containerized deployment.

---

## **Project Structure**
```
./
├── server/
│   ├── sensor-service/      # Simulates temperature sensors
│   ├── temperature-service/ # Stores temperature data
│   ├── websocket-service/   # Handles real-time communication
├── client/                  # Frontend (React)
├── docker-compose.yml       # Docker configuration
```

---

## **Installation & Setup**

### **1️⃣ Prerequisites**
- Install **Docker** & **Docker Compose**


### **3️⃣ Start the Services**
```sh
docker-compose up --build
```
This will start all services inside **Docker containers**.

### **4️⃣ Access Services**
| Service                 | URL                         |
|------------------------|----------------------------|
| Temperature API        | http://localhost:5000      |
| WebSocket Server      | ws://localhost:6001        |
| Frontend (React)      | http://localhost:3000      |
| MongoDB (Local)      | mongodb://localhost:27018  |

---

## **Services & Functionality**

### **1️⃣ Sensor Service** (Generates Temperature Data)
- Sends temperature data **via WebSockets** to `websocket-service`.
- Uses `socket.io-client` to establish a connection.


### **2️⃣ Temperature Service** (API & Database)
- Sends temperature data from **MongoDB**.
- Provides an API endpoint to fetch the latest readings.

📌 **Endpoints:**
- `GET /api/temperatures` → Fetches the latest readings.

### **3️⃣ WebSocket Service** (Real-Time Communication)
- Listens for `newTemperatureData` events from **sensor-service**.
- Stores the received data in **MongoDB**.
- Broadcasts data to connected clients.

📌 **WebSocket Events:**
```js
io.on("connection", (socket) => {
    socket.on("newTemperatureData", async (data) => {
        const newReading = new Temperature(data);
        await newReading.save();
        io.emit("temperatureUpdate", newReading);
    });
});
```

---


## **Troubleshooting**
✅ **WebSocket Not Connecting?**
- Ensure `SOCKET_URL` is set to **`http://websocket-service:6001`** (not localhost).
- Restart the containers: `docker-compose down && docker-compose up --build`.

✅ **MongoDB Connection Issues?**
- Check if MongoDB is running: `docker ps`
- Verify logs: `docker logs mongodb`

✅ **Logs & Debugging**
```sh
docker-compose logs -f
```

---

## **Future Enhancements**
- Add authentication & security for WebSockets.
- Improve data visualization in the frontend.
- Deploy using **Kubernetes**.

---

## **Contributors**
- [Souvik Mondal](https://github.com/ssouvikk)


