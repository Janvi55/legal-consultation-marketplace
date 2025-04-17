import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "../../assets/css/lawyer/lawyerdashboard.css";

const Appointments = () => {
  const { lawyerData } = useOutletContext();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/appointment/lawyer/myappointments?filter=${filter}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setAppointments(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [filter]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/appointment/lawyer/${appointmentId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAppointments(appointments.map(appt => 
        appt._id === appointmentId ? { ...appt, status: newStatus } : appt
      ));
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading appointments...</div>;
  }

  return (
    <div className="appointments-container">
      <div className="section-header">
        <h2>Appointments</h2>
        <div className="filter-buttons">
          <button 
            className={filter === "upcoming" ? "active" : ""}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </button>
          <button 
            className={filter === "completed" ? "active" : ""}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button 
            className={filter === "cancelled" ? "active" : ""}
            onClick={() => setFilter("cancelled")}
          >
            Cancelled
          </button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <div className="no-data">
          <p>No {filter} appointments found</p>
        </div>
      ) : (
        <div className="appointments-list">
          {appointments.map(appointment => (
            <div key={appointment._id} className="appointment-card">
              <div className="appointment-info">
                <h3>{appointment.name}</h3>
                <p className="service">{appointment.reason}</p>
                <p className="date-time">
                  {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                </p>
                <span className={`status ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>
              <div className="appointment-actions">
                {appointment.status === "pending" && (
                  <>
                    <button 
                      className="btn-confirm"
                      onClick={() => handleStatusChange(appointment._id, "confirmed")}
                    >
                      Confirm
                    </button>
                    <button 
                      className="btn-cancel"
                      onClick={() => handleStatusChange(appointment._id, "cancelled")}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {appointment.status === "confirmed" && (
                  <button 
                    className="btn-complete"
                    onClick={() => handleStatusChange(appointment._id, "completed")}
                  >
                    Mark Complete
                  </button>
                )}
                <button className="btn-details">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;