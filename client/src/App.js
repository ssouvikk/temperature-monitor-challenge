import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import TemperatureChart from "./components/TemperatureChart";
import { BASE_API } from "./utils/constants";

const socket = io("http://localhost:5000");

const App = () => {
  const [temperatureData, setTemperatureData] = useState([]);

  useEffect(() => {
    axios.get(BASE_API + "temperature")
      .then(response => setTemperatureData(response.data))
      .catch(error => console.error("Error fetching data:", error));

    socket.on("temperatureUpdate", (newTemp) => {
      setTemperatureData(prevData => [newTemp, ...prevData].slice(0, 10));
    });

    return () => socket.off("temperatureUpdate");
  }, []);

  return (
    <div style={{ maxHeight: "85vh" }} >
      <h1>🌡️ Real-Time Temperature Monitoring</h1>
      <TemperatureChart data={temperatureData} />
    </div>
  );
};

export default App;
