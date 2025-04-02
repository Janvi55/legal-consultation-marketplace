/* eslint-disable no-unused-vars */
import React from "react";
import "../../assets/css/About.css"

const About = () => {
  return (
    <div className="about-container">
      {/* Header Section */}
      <header className="about-header">
        <h2>About Us</h2>
        <p>We are dedicated to connecting you with the best legal professionals.</p>
      </header>

      {/* Company Overview */}
      <section className="about-content">
        <div className="about-text">
          <h3>Who We Are</h3>
          <p>
            Legal Consultation Marketplace is an online platform that helps you connect
            with experienced lawyers for professional legal advice. Whether you need
            help with family law, corporate issues, or personal disputes, we make
            it easy to find the right legal assistance.
          </p>
        </div>
        <div className="about-image">
          <img src="https://www.shutterstock.com/image-vector/advocate-lawyer-emblem-vector-illustration-260nw-2277630761.jpg" alt="Legal Team" />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission-section">
        <h3>Our Mission</h3>
        <p>
          Our mission is to make legal help accessible, affordable, and
          transparent for everyone. We strive to build trust and provide a seamless
          experience for both clients and legal professionals.
        </p>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h3>Meet Our Team</h3>
        <div className="team-container">
          <div className="team-member">
            <img src="https://elements-resized.envatousercontent.com/envato-shoebox/b1e2/42d1-affd-48bf-86d1-da606c774c47/DSC06197.jpg?w=500&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=58791c8fb007546c5a8e503adca9804e70bf739426d88170b4f00c162b836ea6" alt="Team Member" />
            <h4>John Doe</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://media.istockphoto.com/id/1326920136/photo/shot-of-a-business-women-using-laptop-working-at-home-stock-photo.jpg?s=612x612&w=0&k=20&c=tDhOPNMfBUlZLy5titrUrOXfHVbhVosEoQveTwuuL1Y=" alt="Team Member" />
            <h4>Jane Smith</h4>
            <p>Chief Legal Officer</p>
          </div>
          <div className="team-member">
            <img src="https://media.istockphoto.com/id/1326920136/photo/shot-of-a-business-women-using-laptop-working-at-home-stock-photo.jpg?s=612x612&w=0&k=20&c=tDhOPNMfBUlZLy5titrUrOXfHVbhVosEoQveTwuuL1Y=" alt="Team Member" />
            <h4>Michael Brown</h4>
            <p>Head of Operations</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
