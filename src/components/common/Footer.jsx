import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer_section">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Legal Consultation Marketplace. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};