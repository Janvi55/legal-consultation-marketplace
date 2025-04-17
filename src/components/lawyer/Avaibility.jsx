import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import "../../assets/css/lawyer/lawyerdashboard.css";

const Availability = () => {
  const { lawyerData } = useOutletContext();
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSlot, setNewSlot] = useState({
    date: "",
    startTime: "",
    endTime: "",
    consultationType: "virtual"
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/lawyer/availability", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAvailability(response.data.data.availableSlots || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching availability:", error);
        setLoading(false);
      }
    };

    fetchAvailability();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSlot(prev => ({ ...prev, [name]: value }));
  };

  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.startTime || !newSlot.endTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/lawyer/availability",
        { availableSlots: [...availability, newSlot] },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAvailability(response.data.data.availableSlots);
      setNewSlot({
        date: "",
        startTime: "",
        endTime: "",
        consultationType: "virtual"
      });
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  const handleRemoveSlot = async (index) => {
    try {
      const updatedSlots = [...availability];
      updatedSlots.splice(index, 1);

      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/api/lawyer/availability",
        { availableSlots: updatedSlots },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAvailability(response.data.data.availableSlots);
    } catch (error) {
      console.error("Error removing slot:", error);
    }
  };

  if (loading) {
    return <div className="loading">Loading availability...</div>;
  }

  return (
    <div className="availability-container">
      <h2>Availability Settings</h2>
      
      <div className="add-slot-form">
        <h3>Add New Time Slot</h3>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={newSlot.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Start Time</label>
          <input
            type="time"
            name="startTime"
            value={newSlot.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>End Time</label>
          <input
            type="time"
            name="endTime"
            value={newSlot.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Consultation Type</label>
          <select
            name="consultationType"
            value={newSlot.consultationType}
            onChange={handleInputChange}
          >
            <option value="virtual">Virtual</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>
        <button 
          onClick={handleAddSlot}
          disabled={!newSlot.date || !newSlot.startTime || !newSlot.endTime}
        >
          Add Slot
        </button>
      </div>

      <div className="current-availability">
        <h3>Current Availability</h3>
        {availability.length === 0 ? (
          <p>No availability slots set</p>
        ) : (
          <div className="slots-grid">
            {availability.map((slot, index) => (
              <div key={index} className="slot-card">
                <div className="slot-info">
                  <p><strong>Date:</strong> {new Date(slot.date).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {slot.startTime} - {slot.endTime}</p>
                  <p><strong>Type:</strong> {slot.consultationType}</p>
                </div>
                <button 
                  className="remove-slot"
                  onClick={() => handleRemoveSlot(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Availability;