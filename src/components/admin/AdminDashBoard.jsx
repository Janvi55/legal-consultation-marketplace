import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { AdminDashboardCharts } from "./AdminDashboardCharts";
import {
  FaUser,
  FaGavel,
  FaCalendarAlt,
  FaStar,
  FaQuestionCircle,
  FaRupeeSign,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "../../assets/adminDashBoard.css"

const AdminDashBoard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/adminDashBoard");
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch admin stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-light");
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers,
      icon: <FaUser size={30} className="text-primary mb-2" />,
    },
    {
      title: "Total Lawyers",
      value: stats?.totalLawyers,
      icon: <FaGavel size={30} className="text-success mb-2" />,
    },
    {
      title: "Total Appointments",
      value: stats?.totalAppointments,
      icon: <FaCalendarAlt size={30} className="text-warning mb-2" />,
    },
    {
      title: "Total Legal Queries",
      value: stats?.totalQueries || 0,
      icon: <FaQuestionCircle size={30} className="text-info mb-2" />,
    },
    {
      title: "Total Reviews",
      value: stats?.totalReviews,
      icon: <FaStar size={30} className="text-warning mb-2" />,
    },
    {
      title: "Total Payments",
      value: `₹${Number(stats?.totalEarnings || 0).toFixed(2)}`,
      icon: <FaRupeeSign size={30} className="text-danger mb-2" />,
    },
  ];

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!stats) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">Failed to load dashboard data.</Alert>
      </Container>
    );
  }

  return (
    <Container className={`mt-4 ${darkMode ? "bg-dark text-light" : ""}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Admin Dashboard</h2>
        <Button
          variant={darkMode ? "light" : "dark"}
          onClick={toggleDarkMode}
        >
          {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light" : "Dark"} Mode
        </Button>
      </div>

      {/* <Row className="g-4"> */}
      <Row className="g-4 justify-content-center stat-grid-row">
        {statCards.map((card, index) => (
          // <Col key={index} xs={12} sm={6} md={3}>
          <Col key={index} xs={12} sm={6} md={4} lg={4} xl={4}>

            <Card
              className={`text-center shadow-sm h-100 ${
                darkMode ? "bg-secondary text-light" : ""
              }`}
            >
              <Card.Body className="d-flex flex-column align-items-center">
                {card.icon}
                <Card.Title className="mt-2">{card.title}</Card.Title>
                <h3 className="fw-bold mt-1">{card.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-5">
        <AdminDashboardCharts darkMode={darkMode} />
      </div>
    </Container>
  );
};

export default AdminDashBoard;