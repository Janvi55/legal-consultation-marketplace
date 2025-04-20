
import React, { useState } from "react";
import { LawyerNavbar } from "./LawyerNavbar";
import { Link, Outlet } from "react-router-dom";

export const LawyerSidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // sidebar is initially closed

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Pass isSidebarOpen as prop to hide hamburger when sidebar is open */}
      <LawyerNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />

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
                    <Link to="/lawyer/myProfile" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>My Profile</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/lawyer/viewAppointments" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>View My Appointment</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/lawyer/viewAllQueries" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>View All Legal Queries</p>
                    </Link>
                  </li>
                </ul>
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