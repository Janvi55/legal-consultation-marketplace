import React from 'react';
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import about2image from "../../assets/landing/images/about-img2.png";
import { Header } from './Header';
import { Footer } from './Footer';

export const About = () => {
  return (
    <div className="hero_area">
      <Header />
      
      <section className="about_section">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="img-box">
                <img src={about2image} alt="About Legal Consultation" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="detail-box">
                <div className="heading_container">
                  <h2 className='about'>About Us</h2>
                </div>
                <p>
                  Legal Consultation Marketplace is your trusted digital platform connecting clients 
                  with verified legal professionals. Whether you need legal advice, book consultations, 
                  or resolve legal matters, our platform makes the process effortless. Additionally, we 
                  empower users by educating them on their legal rights and procedures.
                </p>
                <p>
                  Our mission is to make legal services accessible to everyone by providing a transparent 
                  and efficient marketplace where clients can find the right legal experts for their needs.
                </p>
                <div className="btn-box">
                  <Link to="/" className="btn-1">Back to Home</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional About Page Sections Can Be Added Here */}
      
      <Footer />
    </div>
  );
};

export default About;