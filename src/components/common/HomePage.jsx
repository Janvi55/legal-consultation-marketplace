

import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../../assets/landing/css/style.css";
import "../../assets/landing/css/responsive.css";
import sliderImage from "../../assets/landing/images/slider-img.png";
import { Link } from "react-router-dom";
import { Header } from './Header';
import { Footer } from './Footer';

export const Home = () => {
  return (
    <div className="hero_area">
      <Header />
      
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
                        <Link to="/about" className="btn-2">Learn More</Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="img-box">
                      <img src={sliderImage} alt="Legal Consultation" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Home Page Sections Can Be Added Here */}
      
      <Footer />
    </div>
  );
};

export default Home;