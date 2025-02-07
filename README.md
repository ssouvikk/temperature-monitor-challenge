# Temperature Monitoring System (Microservices-Based)

This is a **Microservices-Based Temperature Monitoring System** that consists of three independent services:

1. **Sensor Service** - Generates random temperature data and sends it to the API.
2. **Temperature Service** - Stores temperature data in MongoDB and provides RESTful APIs.
3. **WebSocket Service** - Handles real-time temperature updates using WebSockets.

It also includes a **React-based frontend** that displays real-time temperature readings.

---

## 📁 Folder Structure
```
📦 temperature-monitor-microservices
 ┣ 📂 sensor-service       # (Sensor data generator)
 ┣ 📂 temperature-service  # (API & Database Service)
 ┣ 📂 websocket-service    # (Real-time WebSocket updates)
 ┣ 📂 client               # (React Frontend)
 ┣ 📜 README.md
```

---

## 🚀 Prerequisites

Make sure you have the following installed:

- **Node.js v20.11.1**
- **MongoDB** (Running locally or using a cloud provider like MongoDB Atlas)

---

## ⚙️ Installation & Setup

Follow these steps to install and run the services.



### 2️⃣ Install Dependencies
Run the following commands in **root** folder & in **each** service folder (`temperature-service`, `sensor-service`, `websocket-service`, and `client`).

```bash
npm install
```

---

## 🏃 Running the Services

### 1️⃣ Start Temperature Service (API & Database)
```bash
cd temperature-service
node index.js
```

### 2️⃣ Start WebSocket Service (Real-time updates)
```bash
cd websocket-service
node index.js
```

### 3️⃣ Start Sensor Service (Data Generator)
```bash
cd sensor-service
node index.js
```

### 4️⃣ Start Frontend (React Application)
```bash
cd client
npm start
```

---

## 🔗 API Endpoints (Temperature Service)

| Method | Endpoint                 | Description                         |
|--------|--------------------------|-------------------------------------|
| `POST` | `/api/temperatures`       | Add a new temperature reading      |
| `GET`  | `/api/temperatures`       | Get the latest 10 temperature data |

Example **POST request**:
```json
{
  "sensorId": "sensor-123",
  "temperature": 22.5,
  "timestamp": "2024-02-07T12:34:56Z"
}
```

---

## 🌐 WebSocket Events (Real-time updates)

| Event Name          | Description |
|---------------------|-------------|
| `temperatureUpdate` | Sends the latest temperature data to all connected clients |

Example:
```javascript
socket.on("temperatureUpdate", (data) => {
    console.log("New Temperature: ", data);
});
```

---

## 📌 Features & Benefits
✅ **Microservices Architecture** - Independent services for better scalability.  
✅ **Real-time Updates** - Uses WebSockets for live temperature monitoring.  
✅ **MongoDB Database** - Stores temperature readings efficiently.  
✅ **React Frontend** - Displays real-time data in a user-friendly UI.  
✅ **Easy Deployment** - No Docker required, runs on simple Node.js services.  

---

## 🎯 Next Steps & Improvements
- Implement **RabbitMQ/Kafka** for better microservices communication.
- Add **Authentication & Authorization** for security.
- Deploy services using **Kubernetes or Cloud Functions**.

---

## 📜 License
This project is open-source and available under the **MIT License**.

---

### 💡 Need Help?
If you have any questions, feel free to open an issue or contribute to the project!

🚀 Happy Coding!