import React from 'react';
import "../sidebar/sideBar.css"; // Ensure this CSS file exists and styles the sidebar correctly
import logo from '../sidebar/aedc-logo.png'; // Import the image file
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar" >
      <div>
        <img
          className="d-none d-lg-block"
          src={logo}
          alt="AEDC Logo"
          style={{ width: '100%', marginBottom: '20px' }}
        />
      </div>
      <ul className="sidebar-nav">
        <li className="active">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Dashboard
          </Link>
        </li>
        <li className="active">
          <Link to="/form" style={{ color: 'white', textDecoration: 'none' }}>
            Subscription Form
          </Link>
        </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
