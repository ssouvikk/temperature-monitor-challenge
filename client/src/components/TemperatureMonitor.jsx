import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { Container, Card, ListGroup, Badge, Row, Col } from "react-bootstrap";

const socket = io("http://localhost:5000"); // Backend URL

const getStatus = (temperature) => {
    if (temperature >= 24) return { text: "HIGH", variant: "warning" };
    return { text: "NORMAL", variant: "success" };
};

const TemperatureMonitor = () => {
    const [temperatureData, setTemperatureData] = useState([]);
    const [currentTemp, setCurrentTemp] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/temperatures")
            .then(response => {
                setTemperatureData(response.data);
                if (response.data.length > 0) setCurrentTemp(response.data[0]); // সর্বশেষ ডাটা
            })
            .catch(error => console.error("Error fetching data:", error));

        socket.on("temperatureUpdate", (newTemp) => {
            setTemperatureData(prevData => [newTemp, ...prevData].slice(0, 10));
            setCurrentTemp(newTemp);
        });

        return () => socket.off("temperatureUpdate");
    }, []);

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={8}>
                    {/* Header */}
                    <h2 className="text-center mb-3">Temperature Monitor</h2>

                    {/* Current Temperature */}
                    <Card className="mb-4 text-center shadow">
                        <Card.Body>
                            <Card.Title>Current Temperature</Card.Title>
                            <h1 className="display-4">{currentTemp?.temperature}°C</h1>
                            <Badge bg={getStatus(currentTemp?.temperature).variant} className="fs-6">
                                {getStatus(currentTemp?.temperature).text}
                            </Badge>
                            <p className="text-muted mt-2">Last updated: 2 seconds ago</p>
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
                                        <small className="text-muted">2 minutes ago</small>
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
