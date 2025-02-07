import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { BACK_URL, BASE_API } from "../utils/constants";

const socket = io(BACK_URL);

const TemperatureMonitor = () => {
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        axios.get(BASE_API + "/temperature")
            .then(response => setTemperatureData(response.data))
            .catch(error => console.error("Error fetching data:", error));

        socket.on("temperatureUpdate", (newTemp) => {
            setTemperatureData(prevData => [newTemp, ...prevData].slice(0, 10));
        });

        return () => socket.off("temperatureUpdate");
    }, []);

    return (
        <div>
            <h2>🌡️ Real-Time Temperature Monitor</h2>
            <ul>
                {temperatureData.map((temp, index) => (
                    <li key={index}>
                        {temp.timestamp} - {temp.temperature}°C
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TemperatureMonitor;
