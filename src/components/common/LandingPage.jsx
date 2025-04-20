

import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/landingPage.css";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import about2image from "../../assets/landing/images/about-img2.png";
import sliderImage from "../../assets/landing/images/slider-img.png";
import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="hero_area">
      <header className="header_section">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand " href="#">
              <span className=''>LEGAL-CONSULTATION</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item ">
                  <Link className="nav-link" to="/Home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/selectLoginRole">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/selectRole">SignUp</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <section className="slider_section">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <div className="detail_box">
                      <h1>Legal Consultation Marketplace</h1>
                      <p>
                      Join a platform where finding the right legal expert is seamless.
                      Book consultations, seek advice, and get the justice you deserve.
                      </p>
                      <div className="btn-box">
                        <Link to="/contactUs" className="btn-1">Contact Us</Link>
                        <a href="#" className="btn-2">Get A Quote</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="Slider" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      <section className="about_section" id="about">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={about2image} alt="About BuyerTalk" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2 className='about'>About Us</h2>
                </div>
                <p>
                Legal Consultation Marketplace is your trusted digital platform connecting clients with verified legal professionals.
                Whether you need legal advice, book consultations, or resolve legal matters, our platform makes the process effortless.
                Additionally, we empower users by educating them on their legal rights and procedures.
                </p>
                <a href="#">Read More</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


export default LandingPage;

//------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import '../../assets/css/home.css';
// import axios from 'axios';

// const LandingPage = () => {
//     const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
//     const [responseMessage, setResponseMessage] = useState("");
//     const [searchTerm, setSearchTerm] = useState("");
//     const [topLawyers, setTopLawyers] = useState([]);
//     const [activeTab, setActiveTab] = useState('all');
//     const [showPhonePopup, setShowPhonePopup] = useState(false);

//     useEffect(() => {
//         axios.get("http://localhost:3000/lawyer/")
//             .then(response => setTopLawyers(response.data.data))
//             .catch(error => console.error("Error fetching lawyers:", error));
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post("http://localhost:3000/contact", formData);
//             setResponseMessage(response.data.message || "Thank you for your query! We'll contact you shortly.");
//             setFormData({ name: "", phone: "", email: "", message: "" });
//         } catch (error) {
//             setResponseMessage("Error submitting the form. Please try again.");
//         }
//     };

//     const filteredLawyers = topLawyers.filter(lawyer => {
//         const matchesSearch = `${lawyer.userId?.firstName} ${lawyer.userId?.lastName} ${lawyer.specialization} ${lawyer.location}`
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase());
        
//         if (activeTab === 'all') return matchesSearch;
//         return matchesSearch && lawyer.specialization?.toLowerCase().includes(activeTab);
//     });

//     const specializations = [
//         { id: 'all', name: 'All Lawyers' },
//         { id: 'family', name: 'Family Law' },
//         { id: 'criminal', name: 'Criminal Law' },
//         { id: 'corporate', name: 'Corporate Law' },
//         { id: 'property', name: 'Property Law' },
//         { id: 'employment', name: 'Employment Law' }
//     ];

//     return (
//         <div className="landing-container">
//             {/* Hero Banner */}
//             <section className="hero-banner">
//                 <div className="hero-content">
//                     <h1>India's Most Trusted Legal Platform</h1>
//                     <p>Get expert legal advice from 10,000+ verified lawyers across 700+ cities</p>
//                     <div className="hero-buttons">
//                         <Link to="/lawyer/" className="cta-button">Find a Lawyer</Link>
//                         <button className="cta-button secondary" onClick={() => setShowPhonePopup(true)}>
//                             Call for Legal Help
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Practice Areas */}
//             <section className="practice-areas">
//                 <h2>Legal Practice Areas</h2>
//                 <div className="areas-grid">
//                     <div className="area-card">
//                         <div className="icon">👨‍👩‍👧</div>
//                         <h3>Family Law</h3>
//                         <p>Divorce, Child Custody, Alimony</p>
//                     </div>
//                     <div className="area-card">
//                         <div className="icon">⚖️</div>
//                         <h3>Criminal Law</h3>
//                         <p>Bail, FIR, Criminal Cases</p>
//                     </div>
//                     <div className="area-card">
//                         <div className="icon">🏢</div>
//                         <h3>Corporate Law</h3>
//                         <p>Startups, Contracts, Compliance</p>
//                     </div>
//                     <div className="area-card">
//                         <div className="icon">🏠</div>
//                         <h3>Property Law</h3>
//                         <p>Rent, Sale, Land Disputes</p>
//                     </div>
//                     <div className="area-card">
//                         <div className="icon">💼</div>
//                         <h3>Employment Law</h3>
//                         <p>Termination, Harassment, Contracts</p>
//                     </div>
//                     <div className="area-card">
//                         <div className="icon">💰</div>
//                         <h3>Tax Law</h3>
//                         <p>Income Tax, GST, Disputes</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Lawyer Search Section */}
//             <section className="lawyer-search-section">
//                 <h2>Find the Right Lawyer for Your Case</h2>
//                 <div className="search-container">
//                     <input
//                         type="text"
//                         placeholder="Search by name, specialization, or location..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="search-input"
//                     />
//                     <button className="search-button">Search</button>
//                 </div>

//                 <div className="specialization-tabs">
//                     {specializations.map(spec => (
//                         <button
//                             key={spec.id}
//                             className={activeTab === spec.id ? 'active' : ''}
//                             onClick={() => setActiveTab(spec.id)}
//                         >
//                             {spec.name}
//                         </button>
//                     ))}
//                 </div>

//                 <div className="lawyer-grid">
//                     {filteredLawyers.length > 0 ? (
//                         filteredLawyers.slice(0, 6).map((lawyer) => (
//                             <div key={lawyer._id} className="lawyer-card">
//                                 <div className="lawyer-avatar">
//                                     {lawyer.userId?.firstName?.charAt(0)}{lawyer.userId?.lastName?.charAt(0)}
//                                 </div>
//                                 <div className="lawyer-info">
//                                     <h3>Adv. {lawyer.userId?.firstName} {lawyer.userId?.lastName}</h3>
//                                     <p className="specialization">{lawyer.specialization || 'General Practice'}</p>
//                                     <p className="experience">{lawyer.experience || '5+'} years experience</p>
//                                     <div className="rating">
//                                         ⭐ {lawyer.rating || '4.5'} ({lawyer.reviewsCount || '50'} reviews)
//                                     </div>
//                                     <p className="location">{lawyer.location || 'Delhi'}</p>
//                                 </div>
//                                 <div className="lawyer-actions">
//                                     <Link to={`/lawyer/${lawyer._id}`} className="view-profile">
//                                         View Profile
//                                     </Link>
//                                     <Link to={`/appointment/${lawyer._id}`} className="book-consultation">
//                                         Book Consultation
//                                     </Link>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="no-results">No lawyers found matching your criteria.</p>
//                     )}
//                 </div>
//                 <div className="view-all">
//                     <Link to="/lawyer/" className="view-all-button">View All Lawyers →</Link>
//                 </div>
//             </section>

//             {/* How It Works */}
//             <section className="how-it-works">
//                 <h2>How It Works</h2>
//                 <div className="steps-container">
//                     <div className="step">
//                         <div className="step-number">1</div>
//                         <h3>Describe Your Issue</h3>
//                         <p>Tell us about your legal problem in simple terms</p>
//                     </div>
//                     <div className="step">
//                         <div className="step-number">2</div>
//                         <h3>Connect With Lawyer</h3>
//                         <p>Get matched with the right legal expert</p>
//                     </div>
//                     <div className="step">
//                         <div className="step-number">3</div>
//                         <h3>Get Solution</h3>
//                         <p>Receive expert advice via call, chat or meeting</p>
//                     </div>
//                 </div>
//             </section>

//             {/* Testimonials */}
//             <section className="testimonials">
//                 <h2>What Our Clients Say</h2>
//                 <div className="testimonial-container">
//                     <div className="testimonial">
//                         <div className="quote">"The lawyer I found helped me win my property case after 5 years of struggle."</div>
//                         <div className="client">- Ramesh Kumar, Delhi</div>
//                     </div>
//                     <div className="testimonial">
//                         <div className="quote">"Got my divorce settled amicably with expert guidance at affordable fees."</div>
//                         <div className="client">- Priya Sharma, Mumbai</div>
//                     </div>
//                     <div className="testimonial">
//                         <div className="quote">"Corporate legal advice saved my startup from costly compliance mistakes."</div>
//                         <div className="client">- Arjun Patel, Bangalore</div>
//                     </div>
//                 </div>
//             </section>

//             {/* Contact Form */}
//             <section className="contact-section">
//                 <div className="contact-container">
//                     <div className="contact-info">
//                         <h2>Need Legal Help?</h2>
//                         <p>Our team will help you find the right legal solution</p>
//                         <div className="contact-methods">
//                             <div className="contact-method">
//                                 <div className="icon">📞</div>
//                                 <div>
//                                     <h3>Call Us</h3>
//                                     <p>+91 9773148769</p>
//                                 </div>
//                             </div>
//                             <div className="contact-method">
//                                 <div className="icon">✉️</div>
//                                 <div>
//                                     <h3>Email Us</h3>
//                                     <p>help@legalmarketplace.com</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="contact-form-container">
//                         <form onSubmit={handleSubmit} className="contact-form">
//                             <h3>Send Us Your Query</h3>
//                             <div className="form-group">
//                                 <input type="text" name="name" placeholder="Your Name" required value={formData.name} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} />
//                             </div>
//                             <div className="form-group">
//                                 <textarea name="message" placeholder="Describe your legal issue..." required value={formData.message} onChange={handleChange}></textarea>
//                             </div>
//                             <button type="submit" className="submit-button">Get Legal Help</button>
//                         </form>
//                         {responseMessage && <div className="response-message">{responseMessage}</div>}
//                     </div>
//                 </div>
//             </section>

//             {/* Phone Popup */}
//             {showPhonePopup && (
//                 <div className="phone-popup">
//                     <div className="popup-content">
//                         <button className="close-popup" onClick={() => setShowPhonePopup(false)}>×</button>
//                         <h3>Call for Immediate Legal Assistance</h3>
//                         <p>Our legal experts are available 24/7 to help you</p>
//                         <div className="phone-number">+91 9773148769</div>
//                         <button className="call-button" onClick={() => window.location.href = 'tel:+919773148769'}>
//                             Call Now
//                         </button>
//                     </div>
//                 </div>
//             )}

//             {/* Footer */}
//             <footer className="main-footer">
//                 <div className="footer-container">
//                     <div className="footer-section">
//                         <h3>Quick Links</h3>
//                         <ul>
//                             <li><Link to="/">Home</Link></li>
//                             <li><Link to="/lawyer">Find a Lawyer</Link></li>
//                             <li><Link to="/appointment">Book Consultation</Link></li>
//                             <li><Link to="/about">About Us</Link></li>
//                             <li><Link to="/contact">Contact</Link></li>
//                         </ul>
//                     </div>
//                     <div className="footer-section">
//                         <h3>Legal Areas</h3>
//                         <ul>
//                             <li><Link to="/lawyer?specialization=family">Family Law</Link></li>
//                             <li><Link to="/lawyer?specialization=criminal">Criminal Law</Link></li>
//                             <li><Link to="/lawyer?specialization=corporate">Corporate Law</Link></li>
//                             <li><Link to="/lawyer?specialization=property">Property Law</Link></li>
//                             <li><Link to="/lawyer?specialization=employment">Employment Law</Link></li>
//                         </ul>
//                     </div>
//                     <div className="footer-section">
//                         <h3>Company</h3>
//                         <ul>
//                             <li><Link to="/privacy">Privacy Policy</Link></li>
//                             <li><Link to="/terms">Terms of Use</Link></li>
//                             <li><Link to="/refund">Refund Policy</Link></li>
//                             <li><Link to="/careers">Careers</Link></li>
//                         </ul>
//                     </div>
//                     <div className="footer-section">
//                         <h3>Connect With Us</h3>
//                         <div className="social-links">
//                             <a href="#"><span>📱</span></a>
//                             <a href="#"><span>💬</span></a>
//                             <a href="#"><span>📘</span></a>
//                             <a href="#"><span>🐦</span></a>
//                         </div>
//                         <div className="app-download">
//                             <p>Download Our App</p>
//                             <div className="app-buttons">
//                                 <button className="app-store">App Store</button>
//                                 <button className="play-store">Play Store</button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="footer-bottom">
//                     <p>© 2025 Legal Consultation Marketplace. All Rights Reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;