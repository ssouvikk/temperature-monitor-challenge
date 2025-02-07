import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import TemperatureMonitor from "./components/TemperatureMonitor";


const App = () => {
    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <TemperatureMonitor />
        </div>
    );
};

export default App;
