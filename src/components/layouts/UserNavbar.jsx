import React from "react";
import hamburgermenu from "../../assets/images/hamburgermenu.png";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export const UserNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("role");

    toast.success("Logged out successfully!", {
      position: "top-center",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });

    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  return (
    <nav
      style={{ background: "linear-gradient(135deg, #2c3e50, #4ca1af)" }}
      className="app-header navbar navbar-expand-lg"
    >
      <ToastContainer />

      <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
        {/* Left: Sidebar toggle + branding */}
        <div className="d-flex align-items-center">
          {!isSidebarOpen && (
            <button
              className="btn btn-light me-2"
              onClick={toggleSidebar}
              style={{
                padding: "5px 10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <img
                src={hamburgermenu}
                alt="Sidebar"
                style={{ height: "25px", width: "25px" }}
              />
            </button>
          )}
          <Link className="navbar-brand text-white fw-bold" to="/user/userDashBoard">
            Legal Consultation
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="navbar-nav d-none d-lg-flex align-items-center">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/user/userDashBoard">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/contactUs">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-danger ms-2">
              LOGOUT
            </button>
          </li>
        </ul>

        {/* Mobile Dropdown Menu (3-dot menu) without arrow */}
        <div className="d-lg-none dropdown">
          <button
            className="btn mr-2 fs-1"
            type="button"
            id="mobileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style={{
              background: "transparent",
              color: "white",
              fontSize: "24px",
              border: "none",
              boxShadow: "none",
              padding: 0,
              margin: 0,
            }}
          >
            &#8942; {/* 3-dot vertical menu without arrow */}
          </button >

          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="mobileDropdown"
            style={{
              background: "linear-gradient(135deg, #2c3e50, #4ca1af)",
              border: "none",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <li>
              <Link className="dropdown-item text-white" to="/user/userDashBoard">
                Home
              </Link>
            </li>
            <li>
              <Link className="dropdown-item text-white" to="/contactUs">
                Contact
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="dropdown-item text-white btn btn-link"
                style={{ textAlign: "left" }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//-----------------------------------------------------------------Mine

// import React from "react";
// import { Link } from "react-router-dom";
// import { FaUser, FaSignInAlt } from "react-icons/fa";
// import "../../assets/css/navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm p-3">
//       <Link className="navbar-brand fw-bold" to="/">
//         Legal Consultation Marketplace
//       </Link>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarSupportedContent"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item">
//             <Link className="nav-link" to="/">Home</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/About">About Us</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/Contact">Contact Us</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/Services">Services</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to="/Appointment">Appointment</Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-liink btn btn-danger text-white mx-2 px-3 py-2 d-flex align-items-center justify-content-center" to="/login" style={{ minWidth: "120px" }}>
//               <FaSignInAlt className="me-2" /> Login
//             </Link>
//           </li>
//           <li className="nav-item">

//             <Link className="nav-liink btn btn-danger text-white mx-2 px-3 py-2 d-flex align-items-center justify-content-center" to="/signup"style={{ minWidth: "120px" }}>
//               <FaUser className="me-2" /> Signup
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

