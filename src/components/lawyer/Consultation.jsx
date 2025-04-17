import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "../../assets/css/lawyer/lawyerdashboard.css";

const Consultations = () => {
  const { lawyerData } = useOutletContext();
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:3000/consultation/lawyer/myconsultations?filter=${filter}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setConsultations(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching consultations:", error);
        setLoading(false);
      }
    };

    fetchConsultations();
  }, [filter]);

  const handleStatusChange = async (consultationId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:3000/consultation/lawyer/${consultationId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setConsultations(consultations.map(cons => 
        cons._id === consultationId ? { ...cons, status: newStatus } : cons
      ));
      // Update the selected consultation if it's the one being changed
      if (selectedConsultation?._id === consultationId) {
        setSelectedConsultation({...selectedConsultation, status: newStatus});
      }
    } catch (error) {
      console.error("Error updating consultation:", error);
    }
  };

  const handleAddNote = async (consultationId) => {
    if (!newNote.trim()) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/consultation/lawyer/${consultationId}/notes`,
        { note: newNote },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setConsultations(consultations.map(cons => 
        cons._id === consultationId ? response.data.data : cons
      ));
      
      // Update the selected consultation if it's the one being modified
      if (selectedConsultation?._id === consultationId) {
        setSelectedConsultation(response.data.data);
      }
      
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading consultations...</div>;
  }

  return (
    <div className="consultations-container">
      <div className="section-header">
        <h2>My Consultations</h2>
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

      <div className="consultations-layout">
        <div className="consultations-list">
          {consultations.length === 0 ? (
            <div className="no-data">
              <p>No {filter} consultations found</p>
            </div>
          ) : (
            consultations.map(consultation => (
              <div 
                key={consultation._id} 
                className={`consultation-card ${selectedConsultation?._id === consultation._id ? "active" : ""}`}
                onClick={() => setSelectedConsultation(consultation)}
              >
                <h3>{consultation.clientId?.firstName} {consultation.clientId?.lastName}</h3>
                <p className="service">{consultation.legalServiceId?.title}</p>
                <p className="date-time">
                  {new Date(consultation.date).toLocaleDateString()} at {consultation.startTime}
                </p>
                <span className={`status ${consultation.status}`}>
                  {consultation.status}
                </span>
              </div>
            ))
          )}
        </div>

        {selectedConsultation && (
          <div className="consultation-details">
            <h3>Consultation Details</h3>
            <div className="detail-section">
              <h4>Client Information</h4>
              <p>{selectedConsultation.clientId?.firstName} {selectedConsultation.clientId?.lastName}</p>
              <p>{selectedConsultation.clientId?.email}</p>
              <p>{selectedConsultation.clientId?.phone || "Not provided"}</p>
            </div>

            <div className="detail-section">
              <h4>Service Details</h4>
              <p>{selectedConsultation.legalServiceId?.title}</p>
              <p>{selectedConsultation.legalServiceId?.description}</p>
              <p>Price: ${selectedConsultation.price}</p>
            </div>

            <div className="detail-section">
              <h4>Time & Date</h4>
              <p>{new Date(selectedConsultation.date).toLocaleDateString()}</p>
              <p>{selectedConsultation.startTime} - {selectedConsultation.endTime}</p>
              <p>Type: {selectedConsultation.consultationType}</p>
              {selectedConsultation.meetingLink && (
                <p>
                  Meeting Link: <a href={selectedConsultation.meetingLink} target="_blank" rel="noreferrer">
                    {selectedConsultation.meetingLink}
                  </a>
                </p>
              )}
            </div>

            <div className="detail-section">
              <h4>Status</h4>
              <select
                value={selectedConsultation.status}
                onChange={(e) => handleStatusChange(selectedConsultation._id, e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="detail-section">
              <h4>Notes</h4>
              <div className="notes-list">
                {selectedConsultation.notes?.length > 0 ? (
                  selectedConsultation.notes.map((note, index) => (
                    <div key={index} className="note">
                      <p>{note}</p>
                    </div>
                  ))
                ) : (
                  <p>No notes yet</p>
                )}
              </div>
              <div className="add-note">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a new note..."
                />
                <button 
                  onClick={() => handleAddNote(selectedConsultation._id)}
                  disabled={!newNote.trim()}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Consultations;