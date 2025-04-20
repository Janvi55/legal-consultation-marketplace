


import React, { useState } from "react";
import { UserNavbar } from "./UserNavbar";
import { Link, Outlet } from "react-router-dom";

export const UserSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // sidebar is initially closed

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Pass isSidebarOpen as prop to hide hamburger when sidebar is open */}
      <UserNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

      <aside
        className={`app-sidebar bg-body-secondary shadow ${
          isSidebarOpen ? "open" : "d-none"
        }`}
        data-bs-theme="dark"
      >
        <div className="sidebar-brand d-flex justify-content-between align-items-center px-3 py-2">
          <Link to="/" className="brand-link d-flex align-items-center">
            <span className="brand-text fw-light">Legal-Consultation</span>
          </Link>
          <button
            className="btn btn-sm btn-light ms-2"
            onClick={toggleSidebar}
            style={{ fontSize: "16px", lineHeight: "1", borderRadius: "50%" }}
          >
            &times;
          </button>
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to="/user/addAppointment" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Book Appointment</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/user/viewMyAppointments" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Appointments</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/user/addQuery" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p> Add Legal Query</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link to="/user/viewMyQueries" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>View My Queries</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/addReview" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>Add Review</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/viewMyReviews" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>View My Reviews</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/viewAllLawyers" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>View All Lawyers</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/user/viewMyPayments" className="nav-link">
                  <i className="nav-icon bi bi-circle" />
                  <p>My Payments</p>
                </Link>
              </li>
              <li className="nav-item">
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/info-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>info Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
};













//-----------------------------------------------mine

// import React from 'react'
// import { UserNavbar } from './UserNavbar'
// import { Outlet } from 'react-router-dom'

// export const UserSidebar = () => {
//   return (
//    <>
//    <UserNavbar></UserNavbar>
//    <aside
//         className="app-sidebar bg-body-secondary shadow"
//         data-bs-theme="dark"
//       >
//         <div className="sidebar-brand">
          
//           <a href="./index.html" className="brand-link">
            
//             <img
//               src="../../dist/assets/img/AdminLTELogo.png"
//               alt="AdminLTE Logo"
//               className="brand-image opacity-75 shadow"
//             />
            
//             <span className="brand-text fw-light">AdminLTE 4</span>
            
//           </a>
          
//         </div>

//         <div
//           className=""
//           data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
//           tabIndex={-1}
//           style={{
//             marginRight: "-16px",
//             marginBottom: "-16px",
//             marginLeft: 0,
//             top: "-8px",
//             right: "auto",
//             left: "-8px",
//             width: "calc(100% + 16px)",
//             padding: 8,
//           }}
//         >
//           <nav className="mt-2">
            
//             <ul
//               className="nav sidebar-menu flex-column"
//               data-lte-toggle="treeview"
//               role="menu"
//               data-accordion="false"
//             >
//               <li className="nav-item menu-open">
//                 <a href="#" className="nav-link active">
//                   <i className="nav-icon bi bi-speedometer" />
//                   <p>
//                     Dashboard
//                     <i className="nav-arrow bi bi-chevron-right" />
//                   </p>
//                 </a>
//                 <ul className="nav nav-treeview">
//                   <li className="nav-item">
//                     <a href="./index.html" className="nav-link active">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Dashboard v1</p>
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a href="./index2.html" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Dashboard v2</p>
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a href="./index3.html" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Dashboard v3</p>
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//               <li className="nav-item">
//                 <a href="./generate/theme.html" className="nav-link">
//                   <i className="nav-icon bi bi-palette" />
//                   <p>Theme Generate</p>
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="#" className="nav-link">
//                   <i className="nav-icon bi bi-box-seam-fill" />
//                   <p>
//                     Widgets
//                     <i className="nav-arrow bi bi-chevron-right" />
//                   </p>
//                 </a>
//                 <ul className="nav nav-treeview">
//                   <li className="nav-item">
//                     <a href="./widgets/small-box.html" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Small Box</p>
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a href="./widgets/info-box.html" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>info Box</p>
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a href="./widgets/cards.html" className="nav-link">
//                       <i className="nav-icon bi bi-circle" />
//                       <p>Cards</p>
//                     </a>
//                   </li>
//                 </ul>
//               </li>
//             </ul>
            
//           </nav>
//         </div>
//       </aside>
//       <main class='app-main'>
//         <Outlet></Outlet>
//       </main>
//    </>
//   )
// }
// import React from 'react'

