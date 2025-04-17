import React, { useEffect, useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import axios from "axios";
import "../../assets/css/lawyer/lawyerdashboard.css";

const MyServices = () => {
  const { lawyerData } = useOutletContext();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/legal-service/lawyer/myservices", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setServices(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="loading">Loading services...</div>;
  }

  return (
    <div className="my-services">
      <div className="services-header">
        <h2>My Legal Services</h2>
        <Link to="/lawyer/services/new" className="add-service-btn">
          <i className="fas fa-plus"></i> Add New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="no-services">
          <p>You haven't created any services yet.</p>
          <Link to="/lawyer/services/new" className="btn-primary">
            Create Your First Service
          </Link>
        </div>
      ) : (
        <div className="services-grid">
          {services.map(legalservice => (
            <div key={legalservice._id} className="service-card">
              <h3>{legalservice.title}</h3>
              <p className="practice-area">{legalservice.practiceArea}</p>
              <p className="description">{legalservice.description}</p>
              <div className="service-footer">
                <span className="price">${legalservice.price}</span>
                <div className="service-actions">
                  <Link to={`/lawyer/services/edit/${legalservice._id}`} className="btn-edit">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <button className="btn-delete">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyServices;