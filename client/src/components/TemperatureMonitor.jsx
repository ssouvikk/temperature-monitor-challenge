import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Container, Card, ListGroup, Badge, Row, Col } from "react-bootstrap";
import { getTimeAgo } from "../utils/timeUtils";

const socket = io("http://localhost:5000");

const getStatus = (temperature) => {
    if (temperature >= 24) return { text: "HIGH", variant: "warning" };
    return { text: "NORMAL", variant: "success" };
};

const TemperatureMonitor = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [currentTemp, setCurrentTemp] = useState(null);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/temperatures")
            .then(response => {
                setTemperatureData(response.data);
                if (response.data.length > 0) {
                    setCurrentTemp(response.data[0]);
                    setLastUpdated(response.data[0].timestamp);
                }
            })
            .catch(error => console.error("Error fetching data:", error));

        socket.on("temperatureUpdate", (newTemp) => {
            setTemperatureData(prevData => [newTemp, ...prevData].slice(0, 10));
            setCurrentTemp(newTemp);
            setLastUpdated(newTemp.timestamp);
        });

        return () => socket.off("temperatureUpdate");
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (lastUpdated) {
                setLastUpdated(lastUpdated); 
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [lastUpdated]);

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    <h2 className="text-center mb-3">Temperature Monitor</h2>

                    {/* Current Temperature */}
                    <Card className="mb-4 text-center shadow">
                        <Card.Body>
                            <Card.Title>Current Temperature</Card.Title>
                            <h1 className="display-4">{currentTemp?.temperature}°C</h1>
                            <Badge bg={getStatus(currentTemp?.temperature).variant} className="fs-6">
                                {getStatus(currentTemp?.temperature).text}
                            </Badge>
                            <p className="text-muted mt-2">Last updated: {getTimeAgo(lastUpdated)}</p>
                        </Card.Body>
                    </Card>

                    {/* Recent Readings */}
                    <Card className="shadow">
                        <Card.Header className="fw-bold">Recent Readings</Card.Header>
                        <ListGroup variant="flush">
                            {temperatureData.map((temp, index) => (
                                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0">{temp.temperature}°C</h5>
                                        <small className="text-muted">{getTimeAgo(temp.timestamp)}</small>
                                    </div>
                                    <Badge bg={getStatus(temp.temperature).variant}>
                                        {getStatus(temp.temperature).text}
                                    </Badge>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TemperatureMonitor;
