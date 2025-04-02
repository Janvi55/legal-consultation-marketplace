import React, { useState } from "react";
import "../../assets/contact.css"


const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage("Error submitting the form");
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We'd love to hear from you! Reach out to us anytime.</p>

      <div className="contact-content">
        <div className="contact-form">
          <h3>Send us a message</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea name="message" placeholder="Your Message" rows="5" required onChange={handleChange}></textarea>
            </div>
            <button type="submit" className="btn-submit">Send Message</button>
          </form>
          {responseMessage && <p>{responseMessage}</p>}
        </div>
        <div className="contact-info">
          <h3>Our Contact Details</h3>
          <p><strong>Address:</strong> 123 Legal Street, Law City, 56789</p>
          <p><strong>Email:</strong> support@legalmarketplace.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p><strong>Working Hours:</strong> Mon-Fri, 9AM - 6PM</p>
        </div>
      </div>
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093645!2d144.9537353155042!3d-37.81627974202106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5770d13cdd6770!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1644578514513!5m2!1sen!2sau"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
