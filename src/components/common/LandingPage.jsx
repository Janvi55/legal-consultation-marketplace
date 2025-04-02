// import "../../assets/landingpage.css"
// import "../../assets/landing/css/responsive.css"
// import "../../assets/landing/css/style.css"
// import about2image from "../../assets/landing/images/about-img2.png";
// import sliderImage from "../../assets/landing/images/slider-img.png";
// import aboutimage from "../../assets/landing/images/about-img.png"
// import { Link } from "react-router-dom";


// const LandingPage = () => {
//     return (
//       <div className="hero_area">
//         <header className="header_section">
//           <div className="container-fluid">
//             <nav className="navbar navbar-expand-lg custom_nav-container ">
//               <a className="navbar-brand" href="index.html">
//                 <span>
//                   E-Advertisement
//                 </span>
//               </a>
//               <button
//                 className="navbar-toggler"
//                 type="button"
//                 data-toggle="collapse"
//                 data-target="#navbarSupportedContent"
//                 aria-controls="navbarSupportedContent"
//                 aria-expanded="false"
//                 aria-label="Toggle navigation"
//               >
//                 <span className="s-1"> </span>
//                 <span className="s-2"> </span>
//                 <span className="s-3"> </span>
//               </button>
//               <div
//                 className="collapse navbar-collapse"
//                 id="navbarSupportedContent"
//               >
//                 <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
//                   <ul className="navbar-nav  ">
//                     {/* <li className="nav-item active">
//                 <a className="nav-link" href="index.html">
//                   Home <span className="sr-only">(current)</span>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="about.html">
//                   {" "}
//                   About
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="service.html">
//                   {" "}
//                   Services{" "}
//                 </a>
//               </li> */}
//                     {/* <li className="nav-item">
//                 <a className="nav-link" href="#contactLink">
//                   Contact Us
//                 </a>
//               </li> */}
//                   </ul>
//                 </div>
//                 <div className="quote_btn-container ">
//                   <div className="btn-box">
//                     <Link to="/login" className="btn-1">
//                       Login
//                     </Link>
//                     <Link to="/signup" className="btn-2">
//                       Signup
//                     </Link>
//                   </div>
//                   <form className="form-inline">
//                     <button
//                       className="btn  my-2 my-sm-0 nav_search-btn"
//                       type="submit"
//                     />
//                   </form>
//                 </div>
//               </div>
//             </nav>
//           </div>
//         </header>
  
//         <section className=" slider_section ">
//           <div
//             id="carouselExampleIndicators"
//             className="carousel slide"
//             data-ride="carousel"
//           >
//             <div className="carousel-inner">
//               <div className="carousel-item active carousel-item-left">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-md-6 ">
//                       <div className="detail_box">
//                         <h1>E-ADVERTISEMENT</h1>
//                         <p>
//                           It is a long established fact that a reader will be
//                           distracted by the readable content of a page when
//                           looking
//                         </p>
//                         <div className="btn-box">
//                           <a href="" className="btn-1">
//                             Contact Us
//                           </a>
//                           <a href="" className="btn-2">
//                             Get A Quote
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="img-box">
//                         <img src="images/slider-img.png" alt="" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="carousel-item carousel-item-next carousel-item-left">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-md-6 ">
//                       <div className="detail_box">
//                         <h1>The best marketing</h1>
//                         <p>
//                           It is a long established fact that a reader will be
//                           distracted by the readable content of a page when
//                           looking
//                         </p>
//                         <div className="btn-box">
//                           <a href="" className="btn-1">
//                             Contact Us
//                           </a>
//                           <a href="" className="btn-2">
//                             Get A Quote
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="img-box">
//                         <img src="images/slider-img.png" alt="" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="carousel-item">
//                 <div className="container">
//                   <div className="row">
//                     <div className="col-md-6 ">
//                       <div className="detail_box">
//                         <h1>The best marketing</h1>
//                         <p>
//                           It is a long established fact that a reader will be
//                           distracted by the readable content of a page when
//                           looking
//                         </p>
//                         <div className="btn-box">
//                           <a href="" className="btn-1">
//                             Contact Us
//                           </a>
//                           <a href="" className="btn-2">
//                             Get A Quote
//                           </a>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="img-box">
//                         <img src="images/slider-img.png" alt="" />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="carousel_btn-container">
//               <a
//                 className="carousel-control-prev"
//                 href="#carouselExampleIndicators"
//                 role="button"
//                 data-slide="prev"
//               >
//                 <span className="sr-only">Previous</span>
//               </a>
//               <a
//                 className="carousel-control-next"
//                 href="#carouselExampleIndicators"
//                 role="button"
//                 data-slide="next"
//               >
//                 <span className="sr-only">Next</span>
//               </a>
//             </div>
//           </div>
//         </section>
//         <section className="about_section ">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-6">
//                 <div className="img-box">
//                   <img src={about2image} alt="" />
//                 </div>
//               </div>
//               <div className="col-md-6">
//                 <div className="detail-box">
//                   <div className="heading_container">
//                     <h2>About Us</h2>
//                   </div>
//                   <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//                     do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                     Ut enim ad minim veniam, quis nostrud
//                   </p>
//                   <a href="">Read More</a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     );
//   };
  
  // export default LandingPage;

  
 
/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../../assets/css/home.css';
// import axios from 'axios';

// const LandingPage = () => {
//     const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//     const [responseMessage, setResponseMessage] = useState("");

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch("http://localhost:3000/contact", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });
//             const data = await response.json();
//             setResponseMessage(data.message);
//         } catch (error) {
//             setResponseMessage("Error submitting the form");
//         }
//     };

//     return (
//         <div className="landing-container">
//             <header className="landing-header">
//                 <h1>Find Expert Legal Help Anytime, Anywhere</h1>
//                 <p>Connect with top-rated lawyers and get professional legal advice online.</p>
//                 <Link to="/login" className="cta-button">Get Started</Link>
//             </header>

//             <section className="features">
//                 <div className="feature-box">
//                     <h3>🏛️ Verified Lawyers</h3>
//                     <p>Browse through profiles of experienced and verified legal professionals.</p>
//                     <Link to="/lawyer" className="feature-link">View Lawyers</Link>
//                 </div>
//                 <div className="feature-box">
//                     <h3>🔒 Secure Consultations</h3>
//                     <p>Book private and secure consultations via chat, voice, or video calls.</p>
//                     <Link to="/appointment" className="feature-link">Book Appointment</Link>
//                 </div>
//                 <div className="feature-box">
//                     <h3>💰 Affordable Services</h3>
//                     <p>Transparent pricing with no hidden fees. Choose a payment plan that suits you.</p>
//                     <Link to="/services" className="feature-link">Explore Services</Link>
//                 </div>
//             </section>

//             {/* About Us Section */}
//             <section className="about-section">
//                 <h2>About Us</h2>
//                 <p>We are dedicated to connecting you with the best legal professionals.</p>
//                 <p>Legal Consultation Marketplace helps you connect with experienced lawyers for professional legal advice, whether it's family law, corporate issues, or personal disputes.</p>
//                 <h3>Our Mission</h3>
//                 <p>Our mission is to make legal help accessible, affordable, and transparent for everyone.</p>
//                 <div className="about-image">
//                     <img src="https://www.shutterstock.com/image-vector/advocate-lawyer-emblem-vector-illustration-260nw-2277630761.jpg" alt="Legal Team" />
//                 </div>
//                 <h3>Meet Our Team</h3>
//                 <div className="team-container">
//                     <div className="team-member">
//                         <img src="https://elements-resized.envatousercontent.com/envato-shoebox/b1e2/42d1-affd-48bf-86d1-da606c774c47/DSC06197.jpg" alt="Team Member" />
//                         <h4>John Doe</h4>
//                         <p>Founder & CEO</p>
//                     </div>
//                     <div className="team-member">
//                         <img src="https://media.istockphoto.com/id/1326920136/photo/shot-of-a-business-women-using-laptop-working-at-home-stock-photo.jpg" alt="Team Member" />
//                         <h4>Jane Smith</h4>
//                         <p>Chief Legal Officer</p>
//                     </div>
//                     <div className="team-member">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTolJyvMrb1E7mksM2fzeaP2q6n0xuxrfesv5FEh62Fa1lzI65acqgg72cy9HdKHJ5PmYU&usqp=CAU" alt="Team Member" />
//                         <h4>Michael Brown</h4>
//                         <p>Head of Operations</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Contact Us Section */}
//             <section className="contact-section">
//                 <h2>Contact Us</h2>
//                 <p>We'd love to hear from you! Reach out to us anytime.</p>
//                 <form onSubmit={handleSubmit} className="contact-form">
//                     <div className="form-group">
//                         <label>Name</label>
//                         <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label>Email</label>
//                         <input type="email" name="email" placeholder="Your Email" required onChange={handleChange} />
//                     </div>
//                     <div className="form-group">
//                         <label>Message</label>
//                         <textarea name="message" placeholder="Your Message" rows="5" required onChange={handleChange}></textarea>
//                     </div>
//                     <button type="submit" className="btn-submit">Send Message</button>
//                 </form>
//                 {responseMessage && <p>{responseMessage}</p>}
//                 <div className="map-container">
//                     <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093645!2d144.9537353155042!3d-37.81627974202106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5770d13cdd6770!2sMelbourne%20Central!5e0!3m2!1sen!2sau!4v1644578514513!5m2!1sen!2sau" allowFullScreen="" loading="lazy"></iframe>
//                 </div>
//             </section>

//             <footer className="landing-footer">
//                 <p>&copy; 2025 Legal Consultation Marketplace. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "../../assets/css/home.css";
// import axios from "axios";

// const LandingPage = () => {
//     const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//     const [responseMessage, setResponseMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [topLawyers, setTopLawyers] = useState([]);

//     useEffect(() => {
//         // Fetch top-rated lawyers from backend
//         axios.get("http://localhost:3000/lawyer/top-rated")
//             .then(response => setTopLawyers(response.data.data))
//             .catch(error => console.error("Error fetching top-rated lawyers:", error));
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:3000/contact", formData);
//             setResponseMessage(response.data.message || "Thank you for reaching out! We will get back to you soon.");
//             setFormData({ name: "", email: "", message: "" });
//         } catch (error) {
//             setResponseMessage("Error submitting the form. Please try again.");
//         }
//     };

//     // Filter top-rated lawyers based on search input
//     const filteredLawyers = topLawyers.filter(lawyer =>
//         `${lawyer.userId?.firstName} ${lawyer.userId?.lastName} ${lawyer.specialization} ${lawyer.location}`
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="landing-container">
//             <header className="landing-header">
//                 <h1>Find Expert Legal Help Anytime, Anywhere</h1>
//                 <p>Connect with top-rated lawyers and get professional legal advice online.</p>
//                 <Link to="/login" className="cta-button">Get Started</Link>
//             </header>

//             {/* 🔹 Search for Top-Rated Lawyers Section */}
//             <section className="top-lawyer-search">
//                 <h2>Search for Top-Rated Lawyers</h2>
//                 <input
//                     type="text"
//                     placeholder="Search by name, specialization, or location..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="search-bar"
//                 />
//                 <div className="lawyer-list">
//                     {filteredLawyers.length > 0 ? (
//                         filteredLawyers.map((lawyer) => (
//                             <div key={lawyer._id} className="lawyer-card">
//                                 <h3>{lawyer.userId?.firstName} {lawyer.userId?.lastName}</h3>
//                                 <p><strong>Specialization:</strong> {lawyer.specialization}</p>
//                                 <p><strong>Location:</strong> {lawyer.location || "Not Available"}</p>
//                                 <p><strong>Rating:</strong> ⭐ {lawyer.rating || "N/A"}</p>

//                                 {/* View Profile Button */}
//                                 <Link to={`/lawyer/${lawyer._id}`} className="profile-button">
//                                     View Profile
//                                 </Link>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No top-rated lawyers found.</p>
//                     )}
//                 </div>
//             </section>

//             {/* 🔹 Other Sections (About Us, Contact, etc.) */}
//             <section className="features">
//                 <div className="feature-box">
//                     <h3>🏛️ Verified Lawyers</h3>
//                     <p>Browse through profiles of experienced and verified legal professionals.</p>
//                     <Link to="/lawyer" className="feature-link">View Lawyers</Link>
//                 </div>
//                 <div className="feature-box">
//                     <h3>🔒 Secure Consultations</h3>
//                     <p>Book private and secure consultations via chat, voice, or video calls.</p>
//                     <Link to="/appointment" className="feature-link">Book Appointment</Link>
//                 </div>
//                 <div className="feature-box">
//                     <h3>💰 Affordable Services</h3>
//                     <p>Transparent pricing with no hidden fees. Choose a payment plan that suits you.</p>
//                     <Link to="/services" className="feature-link">Explore Services</Link>
//                 </div>
//             </section>

//             <footer className="landing-footer">
//                 <p>&copy; 2025 Legal Consultation Marketplace. All rights reserved.</p>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/home.css';
import axios from 'axios';

const LandingPage = () => {
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
    const [responseMessage, setResponseMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [topLawyers, setTopLawyers] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [showPhonePopup, setShowPhonePopup] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3000/lawyer/")
            .then(response => setTopLawyers(response.data.data))
            .catch(error => console.error("Error fetching lawyers:", error));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/contact", formData);
            setResponseMessage(response.data.message || "Thank you for your query! We'll contact you shortly.");
            setFormData({ name: "", phone: "", email: "", message: "" });
        } catch (error) {
            setResponseMessage("Error submitting the form. Please try again.");
        }
    };

    const filteredLawyers = topLawyers.filter(lawyer => {
        const matchesSearch = `${lawyer.userId?.firstName} ${lawyer.userId?.lastName} ${lawyer.specialization} ${lawyer.location}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        
        if (activeTab === 'all') return matchesSearch;
        return matchesSearch && lawyer.specialization?.toLowerCase().includes(activeTab);
    });

    const specializations = [
        { id: 'all', name: 'All Lawyers' },
        { id: 'family', name: 'Family Law' },
        { id: 'criminal', name: 'Criminal Law' },
        { id: 'corporate', name: 'Corporate Law' },
        { id: 'property', name: 'Property Law' },
        { id: 'employment', name: 'Employment Law' }
    ];

    return (
        <div className="landing-container">
            {/* Hero Banner */}
            <section className="hero-banner">
                <div className="hero-content">
                    <h1>India's Most Trusted Legal Platform</h1>
                    <p>Get expert legal advice from 10,000+ verified lawyers across 700+ cities</p>
                    <div className="hero-buttons">
                        <Link to="/lawyer" className="cta-button">Find a Lawyer</Link>
                        <button className="cta-button secondary" onClick={() => setShowPhonePopup(true)}>
                            Call for Legal Help
                        </button>
                    </div>
                </div>
            </section>

            {/* Practice Areas */}
            <section className="practice-areas">
                <h2>Legal Practice Areas</h2>
                <div className="areas-grid">
                    <div className="area-card">
                        <div className="icon">👨‍👩‍👧</div>
                        <h3>Family Law</h3>
                        <p>Divorce, Child Custody, Alimony</p>
                    </div>
                    <div className="area-card">
                        <div className="icon">⚖️</div>
                        <h3>Criminal Law</h3>
                        <p>Bail, FIR, Criminal Cases</p>
                    </div>
                    <div className="area-card">
                        <div className="icon">🏢</div>
                        <h3>Corporate Law</h3>
                        <p>Startups, Contracts, Compliance</p>
                    </div>
                    <div className="area-card">
                        <div className="icon">🏠</div>
                        <h3>Property Law</h3>
                        <p>Rent, Sale, Land Disputes</p>
                    </div>
                    <div className="area-card">
                        <div className="icon">💼</div>
                        <h3>Employment Law</h3>
                        <p>Termination, Harassment, Contracts</p>
                    </div>
                    <div className="area-card">
                        <div className="icon">💰</div>
                        <h3>Tax Law</h3>
                        <p>Income Tax, GST, Disputes</p>
                    </div>
                </div>
            </section>

            {/* Lawyer Search Section */}
            <section className="lawyer-search-section">
                <h2>Find the Right Lawyer for Your Case</h2>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by name, specialization, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button">Search</button>
                </div>

                <div className="specialization-tabs">
                    {specializations.map(spec => (
                        <button
                            key={spec.id}
                            className={activeTab === spec.id ? 'active' : ''}
                            onClick={() => setActiveTab(spec.id)}
                        >
                            {spec.name}
                        </button>
                    ))}
                </div>

                <div className="lawyer-grid">
                    {filteredLawyers.length > 0 ? (
                        filteredLawyers.slice(0, 6).map((lawyer) => (
                            <div key={lawyer._id} className="lawyer-card">
                                <div className="lawyer-avatar">
                                    {lawyer.userId?.firstName?.charAt(0)}{lawyer.userId?.lastName?.charAt(0)}
                                </div>
                                <div className="lawyer-info">
                                    <h3>Adv. {lawyer.userId?.firstName} {lawyer.userId?.lastName}</h3>
                                    <p className="specialization">{lawyer.specialization || 'General Practice'}</p>
                                    <p className="experience">{lawyer.experience || '5+'} years experience</p>
                                    <div className="rating">
                                        ⭐ {lawyer.rating || '4.5'} ({lawyer.reviewsCount || '50'} reviews)
                                    </div>
                                    <p className="location">{lawyer.location || 'Delhi'}</p>
                                </div>
                                <div className="lawyer-actions">
                                    <Link to={`/lawyer/${lawyer._id}`} className="view-profile">
                                        View Profile
                                    </Link>
                                    <Link to={`/appointment/${lawyer._id}`} className="book-consultation">
                                        Book Consultation
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-results">No lawyers found matching your criteria.</p>
                    )}
                </div>
                <div className="view-all">
                    <Link to="/lawyer" className="view-all-button">View All Lawyers →</Link>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Describe Your Issue</h3>
                        <p>Tell us about your legal problem in simple terms</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Connect With Lawyer</h3>
                        <p>Get matched with the right legal expert</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Get Solution</h3>
                        <p>Receive expert advice via call, chat or meeting</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <h2>What Our Clients Say</h2>
                <div className="testimonial-container">
                    <div className="testimonial">
                        <div className="quote">"The lawyer I found helped me win my property case after 5 years of struggle."</div>
                        <div className="client">- Ramesh Kumar, Delhi</div>
                    </div>
                    <div className="testimonial">
                        <div className="quote">"Got my divorce settled amicably with expert guidance at affordable fees."</div>
                        <div className="client">- Priya Sharma, Mumbai</div>
                    </div>
                    <div className="testimonial">
                        <div className="quote">"Corporate legal advice saved my startup from costly compliance mistakes."</div>
                        <div className="client">- Arjun Patel, Bangalore</div>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="contact-section">
                <div className="contact-container">
                    <div className="contact-info">
                        <h2>Need Legal Help?</h2>
                        <p>Our team will help you find the right legal solution</p>
                        <div className="contact-methods">
                            <div className="contact-method">
                                <div className="icon">📞</div>
                                <div>
                                    <h3>Call Us</h3>
                                    <p>+91 9773148769</p>
                                </div>
                            </div>
                            <div className="contact-method">
                                <div className="icon">✉️</div>
                                <div>
                                    <h3>Email Us</h3>
                                    <p>help@legalmarketplace.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="contact-form-container">
                        <form onSubmit={handleSubmit} className="contact-form">
                            <h3>Send Us Your Query</h3>
                            <div className="form-group">
                                <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <textarea name="message" placeholder="Describe your legal issue..." required value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="submit-button">Get Legal Help</button>
                        </form>
                        {responseMessage && <div className="response-message">{responseMessage}</div>}
                    </div>
                </div>
            </section>

            {/* Phone Popup */}
            {showPhonePopup && (
                <div className="phone-popup">
                    <div className="popup-content">
                        <button className="close-popup" onClick={() => setShowPhonePopup(false)}>×</button>
                        <h3>Call for Immediate Legal Assistance</h3>
                        <p>Our legal experts are available 24/7 to help you</p>
                        <div className="phone-number">+91 9773148769</div>
                        <button className="call-button" onClick={() => window.location.href = 'tel:+919773148769'}>
                            Call Now
                        </button>
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer className="main-footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/lawyer">Find a Lawyer</Link></li>
                            <li><Link to="/appointment">Book Consultation</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Legal Areas</h3>
                        <ul>
                            <li><Link to="/lawyer?specialization=family">Family Law</Link></li>
                            <li><Link to="/lawyer?specialization=criminal">Criminal Law</Link></li>
                            <li><Link to="/lawyer?specialization=corporate">Corporate Law</Link></li>
                            <li><Link to="/lawyer?specialization=property">Property Law</Link></li>
                            <li><Link to="/lawyer?specialization=employment">Employment Law</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Company</h3>
                        <ul>
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Use</Link></li>
                            <li><Link to="/refund">Refund Policy</Link></li>
                            <li><Link to="/careers">Careers</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Connect With Us</h3>
                        <div className="social-links">
                            <a href="#"><span>📱</span></a>
                            <a href="#"><span>💬</span></a>
                            <a href="#"><span>📘</span></a>
                            <a href="#"><span>🐦</span></a>
                        </div>
                        <div className="app-download">
                            <p>Download Our App</p>
                            <div className="app-buttons">
                                <button className="app-store">App Store</button>
                                <button className="play-store">Play Store</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>© 2025 Legal Consultation Marketplace. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;