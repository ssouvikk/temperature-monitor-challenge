# 📡 Temperature Monitoring System (Microservices-Based)

## 🚀 Overview
This project is a **microservices-based** real-time **temperature monitoring system** using **WebSocket** for efficient data transmission. It eliminates unnecessary API calls by sending sensor data **directly to the WebSocket service**, which then stores it in **MongoDB** and broadcasts live updates to the client.

---

## 📂 Folder Structure
```
/temperature-monitoring-system
│── /client               # Frontend (React.js)
│── /sensor-service       # Simulates temperature sensor
│── /temperature-service  # Stores and serves temperature data
│── /websocket-service    # Handles real-time WebSocket communication
│── /models               # MongoDB Schema Models
│── /config               # Configuration Files (PORTs, DB URLs, etc.)
```

---

## 🛠️ Technologies Used
- **Node.js** (v20.11.1)
- **Express.js**
- **Socket.IO** (WebSocket communication)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **React.js** (Frontend UI)
- **Axios** (HTTP Requests)

---

## 🏗️ Installation & Setup
### 1️⃣ Install Dependencies
Run the following command in root folder & inside each microservice folder (**sensor-service, temperature-service, websocket-service, and client**):
```sh
npm install
```

### 2️⃣ Start the Microservices
#### 🔥 Start the **Temperature Service** (Port: `5000`)
```sh
cd temperature-service
node index.js
```
#### 📡 Start the **WebSocket Service** (Port: `6001`)
```sh
cd websocket-service
node websocket-service.js
```
#### 🌡️ Start the **Sensor Service** (Simulates Temperature Readings)
```sh
cd sensor-service
node sensor-service.js
```
#### 🎨 Start the **Client (React Frontend)** (Port: `3000`)
```sh
cd client
npm start
```

### 3️⃣ Ensure MongoDB is Running
Make sure **MongoDB** is installed and running. If not, install it and start it:
```sh
mongod --dbpath /path/to/database
```

---

## 📌 How It Works
1️⃣ **Sensor Service** generates random temperature data and sends it **directly via WebSocket** to **WebSocket Service**.
2️⃣ **WebSocket Service** stores the received data into **MongoDB** and **broadcasts** live updates to all connected clients.
3️⃣ **Temperature Service** provides historical data via API (`GET /api/temperatures`).
4️⃣ **Client Application** listens for WebSocket updates and displays real-time temperature.

---

## 📡 WebSocket Events
| Event Name              | Origin Service  | Description |
|-------------------------|----------------|-------------|
| `newTemperatureData`    | Sensor Service | Sent when new temperature data is generated |
| `temperatureUpdate`     | WebSocket Service | Broadcasts live temperature updates to all clients |

---

## 🔥 API Endpoints (Temperature Service)
| Method | Endpoint                 | Description |
|--------|--------------------------|-------------|
| GET    | `/api/temperatures`       | Fetch last 10 temperature readings |

---

## 🛠️ Future Improvements
- Add authentication & authorization
- Implement **Kafka/RabbitMQ** for message queuing
- Store historical data in **InfluxDB** (Time-Series Database)
- Improve UI with advanced charts & graphs

---

## 🎯 Conclusion
This project demonstrates an **efficient, scalable, and optimized** approach for **real-time data streaming** using **WebSockets** instead of frequent API polling.

For any issues, feel free to contribute or raise an issue. 🚀

Happy Coding! 😊

