### 📜 **README.md** (Temperature Monitoring System)  

---

# **🌡️ Temperature Monitoring System**  

A **real-time temperature monitoring application** built with **microservices architecture**, where the **server** handles data and WebSockets, and the **client** displays real-time temperature updates.  

---

## 📌 **Project Structure**  
```bash
📦 temperature-monitor  
 ┣ 📂 client      # (React Frontend - UI)  
 ┣ 📂 server      # (Node.js Backend - API & WebSocket)  
 ┣ 📜 README.md   # (This file)  
```

---

## 🔧 **Prerequisites**  
Make sure the following tools are installed on your system:  
1️⃣ **[Node.js (v20.11.1)](https://nodejs.org/)**  
2️⃣ **[MongoDB](https://www.mongodb.com/try/download/community)** (Must be running)  

---

## 🚀 **Installation & Running the Application**  

### 1️⃣ **Clone the Repository**  
```bash
git clone <repo-url>
cd temperature-monitor
```

### 2️⃣ **Install Dependencies**  
```bash
cd server
npm install
cd ../client
npm install
```

### 3️⃣ **Start MongoDB**  
- **MongoDB must be running**  
- If MongoDB is **not installed**, [click here](https://www.mongodb.com/try/download/community) to install it.  
- **Start MongoDB locally (default port `27017`)**  
  ```bash
  mongod --dbpath <your-db-path>
  ```

### 4️⃣ **Start the Server**  
```bash
cd server
node index.js
```
- The server will run at **http://localhost:5000/**  


### 4️⃣ **Start the IOT Script**  
```bash
cd server
node sensorDataGenerator.js
```

### 5️⃣ **Start the Frontend**  
```bash
cd client
npm start
```
- The application will run in your browser at **http://localhost:3000/**  

---

## ⚡ **Features**  
✔️ **Real-time temperature updates** (using WebSockets)  
✔️ **MongoDB for data storage**  
✔️ **"Last updated X seconds ago" updates every second**  
✔️ **Beautiful UI with React-Bootstrap**  
✔️ **🔥 And much more!**  

---

## 🛠 **Tech Stack**  

📌 **Backend:** Node.js (v20.11.1), Express.js, MongoDB, WebSockets  
📌 **Frontend:** React.js, React-Bootstrap, Socket.io-client  
📌 **Database:** MongoDB  

---

## 💡 **Need Help?**  
If you **face any issues** or find **bugs**, please open an **Issue** or contact me! 😊  

---

**✍️ Developed by Souvik Mondal** 🚀