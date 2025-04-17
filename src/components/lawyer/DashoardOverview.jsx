import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "../../assets/css/lawyer/lawyerdashboard.css"

const DashboardOverview = () => {
    const { lawyerData } = useOutletContext();
    const [stats, setStats] = useState({
      upcomingAppointments: 0,
      completedAppointments: 0,
      pendingConsultations: 0,
      activeServices: 0,
      rating: 0,
      verificationStatus: 'pending'
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchStats = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "http://localhost:3000/lawyer/dashboard/stats", 
            {
              headers: { Authorization: `Bearer ${token}` }
            }
          );
  
          if (response.data.success) {
            setStats({
              upcomingAppointments: response.data.data.upcomingAppointments || 0,
              completedAppointments: response.data.data.completedAppointments || 0,
              pendingConsultations: response.data.data.pendingConsultations || 0,
              activeServices: response.data.data.activeServices || 0,
              rating: response.data.data.rating || 0,
              verificationStatus: response.data.data.verificationStatus || 'pending'
            });
          } else {
            setError(response.data.error || 'Failed to load stats');
          }
        } catch (err) {
          setError(err.response?.data?.error || err.message || 'Network error');
          console.error("Fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchStats();
    }, []);
  
    if (loading) {
      return <div className="loading-stats">Loading dashboard...</div>;
    }
  
    if (error) {
      return <div className="error-message">Error: {error}</div>;
    }
  
    return (
      <div className="dashboard-overview">
        <div className="stats-grid">
          {/* Stat cards with proper null checks */}
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-calendar"></i>
            </div>
            <div className="stat-content">
              <h3>Upcoming Appointments</h3>
              <p>{stats.upcomingAppointments}</p>
            </div>
          </div>
  
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-content">
              <h3>Completed</h3>
              <p>{stats.completedAppointments}</p>
            </div>
          </div>
  
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-briefcase"></i>
            </div>
            <div className="stat-content">
              <h3>Active Services</h3>
              <p>{stats.activeServices}</p>
            </div>
          </div>
  
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-file-alt"></i>
            </div>
            <div className="stat-content">
              <h3>Pending</h3>
              <p>{stats.pendingConsultations}</p>
            </div>
          </div>
        </div>
  
        {/* Recent Activity Section */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">
                <i className="fas fa-calendar-plus"></i>
              </div>
              <div className="activity-details">
                <p>New appointment booked</p>
                <span className="activity-time">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
export default DashboardOverview;