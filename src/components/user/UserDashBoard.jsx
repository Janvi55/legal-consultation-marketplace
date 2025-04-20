

import React, { useEffect, useState } from 'react';
import "../../assets/userDashBoard.css";
import { Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export const UserDashBoard = () => {
  const [topLawyers, setTopLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/lawyer/topRated")
      .then((res) => {
        setTopLawyers(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch top-rated lawyers:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <h1>DEFEND YOUR CONSTITUTIONAL RIGHT WITH LEGAL HELP</h1>
          <p>Your Legal Solution starts here!</p>
          <Link to="/user/addAppointment">
            <button>Make An Appointment</button>
          </Link>
        </div>
      </div>

      <div className="contact-section">
        <div className="contact-box">
          <h2>Need Legal Services?</h2>
          <p>
            Find expert legal professionals, book consultations, and share your experiences through reviews.
            Get the guidance you need today!
          </p>
        </div>
        <div className="contact-box">
          <h2>Get in Touch</h2>
          <p>
            Have questions or need assistance? Email us at{" "}
            <Link to="mailto:legalconsultationteam@gmail.com">legalconsultationteam@gmail.com</Link>
          </p>
          <p>Join us in making informed legal decisions with confidence.</p>
        </div>
      </div>

      <div className="lawyer-section">
        <h2 className="lawyer-heading">Top Rated Lawyers</h2>
        <div className="lawyer-card-container">
          {loading ? (
            <Spinner animation="border" variant="warning" />
          ) : (
            topLawyers.length > 0 ? (
              topLawyers.map((lawyer, index) => (
                <Link to={`/user/lawyer/${lawyer._id}`} key={index} className="lawyer-card-link">
                  <Card className="lawyer-card">
                    <Card.Img variant="top" src={lawyer.imageURL} className="lawyer-img" />
                    <Card.Body>
                      <div className="lawyer-details">
                        <div className="lawyer-name">{lawyer.name}</div>
                        <div className="lawyer-specialization">{lawyer.specialization}</div>
                        <div className="lawyer-rating">⭐ {lawyer.rating?.toFixed(1) || 'N/A'}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </Link>
              ))
            ) : (
              <p>No top-rated lawyers found.</p>
            )
          )}
        </div>
        <div className="view-more-btn-container">
          <Link to="/user/viewAllLawyers">
            <Button variant="warning" className="view-more-btn">VIEW MORE LAWYERS</Button>
          </Link>
        </div>
      </div>
    </>
  );
};