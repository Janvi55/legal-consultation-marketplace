import React from "react";
import '../../assets/css/services.css'; // Import CSS file

// Header Component
const Header = () => {
  return (
    <header className="header">
      Legal Consultation Services
    </header>
  );
};

// Service Card Component
const ServiceCard = ({ title, description, price }) => {
  return (
    <div className="service-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <p className="price">Price: {price}</p>
    </div>
  );
};

// Static Services List Component
const ServicesList = () => {
  const services = [
    { title: "Legal Advice", description: "Get expert legal advice online.", price: "$50/hr" },
    { title: "Contract Review", description: "We review your legal contracts.", price: "$100/session" },
    { title: "Court Representation", description: "Hire a lawyer for representation.", price: "$500/case" },
    { title: "Real Estate Consultation", description: "Get legal help on property matters.", price: "$200/session" },
    { title: "Business Law", description: "Legal advice for startups & businesses.", price: "$150/hr" },
  ];

  return (
    <div className="services-container">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      &copy; 2024 Legal Consultation Marketplace
    </footer>
  );
};

// Main Service Page Component
const Services = () => {
  return (
    <div className="service-page">
      <Header />
      <ServicesList />
      <Footer />
    </div>
  );
};

export default Services;