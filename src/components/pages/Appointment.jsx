/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../../assets/css/appointment.css"; // Ensure correct import path

const Appointment = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      lawyerId: "",
      date: "",
      time: "",
      reason: "",
    });
  
    const [lawyers, setLawyers] = useState([]); // Store available lawyers
    const [message, setMessage] = useState("");
  
    // Fetch available lawyers when the component loads
    useEffect(() => {
      document.body.classList.remove("appointment-bg")
      fetch("http://localhost:3000/lawyer/") // Adjust API endpoint
        .then((res) => res.json())
        .then((data) => setLawyers(data.data))
        .catch((err) => console.error("Error fetching lawyers:", err));
        document.body.classList.remove("appointment-bg")
    }, []);
  
    // Handle input changes
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/appointment/addappointments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage("Error booking appointment");
        console.error(error);
      }
    };
  return (
    <div className="appointment-container">
    <div className="appointment-box">
      <h2>Book an Appointment</h2> 
      <p>Schedule a consultation with an expert lawyer.</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input type="text" name="name" placeholder="Enter your name" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" placeholder="Enter your email" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Select Lawyer</label>
          <select name="lawyerId" required onChange={handleChange}>
            <option value="">Select a Lawyer</option>
            {lawyers.map((lawyer) => (
              <option key={lawyer._id} value={lawyer._id}>
                 {lawyer.userId?.firstName} {lawyer.userId?.lastName}  - {lawyer.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label>Appointment Date</label>
          <input type="date" name="date" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Time Slot</label>
          <input type="time" name="time" required onChange={handleChange} />
        </div>

        <div className="input-group">
          <label>Reason for Appointment</label>
          <textarea name="reason" placeholder="Brief description of your issue" required onChange={handleChange}></textarea>
        </div>

        <button type="submit" className="book-appointment-btn">Book Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  </div>
);
};

export default Appointment;
