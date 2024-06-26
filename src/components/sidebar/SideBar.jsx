import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faFileAlt, faSignOutAlt, faBars, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';
import { useDrag } from '@use-gesture/react'; // Import useDrag for gesture handling
import '../styles.css';
import logo from '../sidebar/aedc-logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  // Handle sliding gesture to close sidebar
  const bind = useDrag(({ down, movement: [mx] }) => {
    if (!down && mx < -50) {
      setIsOpen(false);
    }
  });

  return (
    <div>
      {/* Toggle button for opening and closing sidebar */}
      <button className="toggle-button" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      {/* Sidebar with conditional 'open' class for animation */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div>
          <img className="d-none d-lg-block" src={logo} alt="AEDC Logo" />
        </div>
        {/* Sidebar navigation links */}
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
          {user && user.role === 'admin' && (
            <li className="active">
              <Link to="/my_subscription">
                <FontAwesomeIcon icon={faUserShield} style={{ marginRight: '10px' }} />
                My Subscription
              </Link>
            </li>
          )}
        </ul>
      </div>
      {/* Overlay to close sidebar when clicking on free space */}
      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      {/* Main content area */}
      <div className={`main-content ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Your main content here */}
      </div>
    </div>
  );
};

export default Sidebar;
