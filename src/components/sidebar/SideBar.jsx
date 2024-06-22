import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faFileAlt, faSignOutAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../styles.css';
import logo from '../sidebar/aedc-logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <img className="d-none d-lg-block" src={logo} alt="AEDC Logo" />
        </div>
        <ul className="sidebar-nav">
          <li className="active">
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faChartPie} style={{ marginRight: '10px' }} />
              Dashboard
            </Link>
          </li>
          <li className="active">
            <Link to="/form">
              <FontAwesomeIcon icon={faFileAlt} style={{ marginRight: '10px' }} />
              Subscription Form
            </Link>
          </li>
          <li className="active">
            <Link to="/login">
              <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
              Log Out
            </Link>
          </li>
        </ul>
      </div>
      <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default Sidebar;
