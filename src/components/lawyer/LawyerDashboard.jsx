import React from 'react';
import "../../assets/lawyerDashBoard.css"; 
import { Link } from 'react-router-dom';

export const LawyerDashBoard = () => {
  return (
    <>
      <div className="hello">
        {/* Dark overlay text wrapper */}
        <div className="hero-content">
          <h1>MANAGE YOUR CLIENT APPOINTMENTS WITH EASE</h1>
          <p>Review, accept, and schedule consultations efficiently.</p>
          <Link to="/lawyer/viewAppointments">
            <button> View Your Appointments</button>
          </Link>
        </div>
      </div>

      <div className="contact-section">
        <div className="contact-box">
          <h2>Offer Your Legal Expertise</h2>
          <p>
          Connect with clients, provide consultations, and help them navigate legal challenges.
          Your expertise makes a difference!
          </p>
        </div>
        <div className="contact-box">
          <h2>Connect With Us</h2>
          <p>
          Have questions about managing your appointments or growing your legal practice?  
          Reach out to us at{" "}
            <Link to="mailto:legalconsultationteam@gmail.com">legalconsultationteam@gmail.com</Link>
          </p>
          <p>We're here to support your journey in providing expert legal services.</p>
        </div>
      </div>
    </>
  );
};










// import React, { useEffect, useState } from "react";
// import { useNavigate, Link, Outlet } from "react-router-dom";
// import axios from "axios";
// import "../../assets/css/lawyer/lawyerdashboard.css";

// const LawyerDashboard = () => {
//   const [lawyerData, setLawyerData] = useState(null);
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const navigate = useNavigate();

//   // Check authentication and fetch lawyer data
//   useEffect(() => {
//     const fetchLawyerData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const response = await axios.get("http://localhost:3000/lawyer/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         console.log("API Response:", response.data);
//         setLawyerData(response.data.data);
//       } catch (error) {
//         console.error("Error fetching lawyer data:", error);
//         localStorage.removeItem("token");
//         navigate("/login");
//       }
//     };

//     fetchLawyerData();
//   }, [navigate]);

//   if (!lawyerData) {
//     return <div className="loading">Loading lawyer dashboard...</div>;
//   }

//   return (
//     <div className="lawyer-dashboard">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <div className="profile-summary">
//           <div className="avatar">
//           {lawyerData.userId?.firstName?.charAt(0) || 'D'}
//           {lawyerData.userId?.lastName?.charAt(0) || ''}
//           </div>
//           <h3>{lawyerData.userId?.firstName || 'User'}
//           {lawyerData.userId?.lastName ? ` ${lawyerData.userId.lastName}` : ''}</h3>
//           <p className="specialization">{lawyerData.specialization}</p>
//           <p className="status">{lawyerData.verification.isVerified ? "Verified" : "Not Verified"}</p>
//         </div>

//         <nav>
//           <button 
//             className={activeTab === "dashboard" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("dashboard");
//               navigate("/lawyer/dashboard");
//             }}
//           >
//             <i className="fas fa-tachometer-alt"></i> Dashboard
//           </button>

//           <button 
//             className={activeTab === "services" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("services");
//               navigate("/lawyer/services");
//             }}
//           >
//             <i className="fas fa-briefcase"></i> My Services
//           </button>

//           <button 
//             className={activeTab === "appointments" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("appointments");
//               navigate("/lawyer/appointments");
//             }}
//           >
//             <i className="fas fa-calendar-check"></i> Appointments
//           </button>

//           <button 
//             className={activeTab === "consultations" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("consultations");
//               navigate("/lawyer/consultations");
//             }}
//           >
//             <i className="fas fa-comments"></i>  My Consultations
//           </button>

//           <button 
//             className={activeTab === "availability" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("availability");
//               navigate("/lawyer/availability");
//             }}
//           >
//             <i className="fas fa-clock"></i> Availability
//           </button>

//           <button 
//             className={activeTab === "profile" ? "active" : ""}
//             onClick={() => {
//               setActiveTab("profile");
//               navigate("/lawyer/profile");
//             }}
//           >
//             <i className="fas fa-user"></i> Profile Settings
//           </button>

//           <button 
//             className="logout"
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/login");
//             }}
//           >
//             <i className="fas fa-sign-out-alt"></i> Logout
//           </button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="main-content">
//         <header>
//           <h1>
//             {activeTab === "dashboard" && "Dashboard Overview"}
//             {activeTab === "services" && "My Legal Services"}
//             {activeTab === "appointments" && "Appointments"}
//             {activeTab === "consultations" && "My Consultations"}
//             {activeTab === "availability" && "Availability Settings"}
//             {activeTab === "profile" && "Profile Settings"}
//           </h1>
//           <div className="notifications">
//             <i className="fas fa-bell"></i>
//             <span className="badge">3</span>
//           </div>
//         </header>

//         <div className="content-area">
//           <Outlet context={{ lawyerData }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LawyerDashboard;