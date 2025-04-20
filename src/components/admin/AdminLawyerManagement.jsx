import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../assets/viewAllLawyers.css'; // Reuse same styling

const AdminLawyerManagement = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await axios.get('/admin/getAllLawyers'); // Backend route to get all lawyers
        setLawyers(res.data.data || []);
      } catch (err) {
        console.error('Failed to fetch lawyers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <div className="view-lawyers-container">
      <h2 className="lawyer-heading" style={{ textAlign: 'center' }}>Manage Lawyers</h2>

      {loading ? (
        <div className="loader-container">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <div className="lawyer-card-container">
          {lawyers.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No lawyers found.</p>
          ) : (
            lawyers.map((lawyer) => (
              <Link
                to={`/admin/lawyerProfile/${lawyer._id}`}
                key={lawyer._id}
                className="lawyer-link"
              >
                <Card className="lawyer-card">
                  <Card.Img
                    variant="top"
                    src={lawyer.imageURL}
                    className="lawyer-img"
                    alt={`${lawyer.name}'s profile`}
                  />
                  <Card.Body>
                    <div className="lawyer-details">
                      <div className="lawyer-name">{lawyer.name}</div>
                      <div className="lawyer-specialization">{lawyer.specialization}</div>
                      <div className="lawyer-rating">
                        ⭐ {lawyer.rating?.toFixed(1) || 'N/A'}
                      </div>
                      {lawyer.isBlocked && (
                        <div className="text-danger mt-2 fw-bold">Blocked</div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminLawyerManagement;