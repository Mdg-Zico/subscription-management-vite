import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faFileAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "../sidebar/sideBar.css";
import logo from '../sidebar/aedc-logo.png';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        <img className="d-none d-lg-block" src={logo} alt="AEDC Logo" />
      </div>
      <ul className="sidebar-nav">
        <li className="active">
          <Link to="/">
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
          <Link to="/logout">
            <FontAwesomeIcon icon={faSignOutAlt} style={{ marginRight: '10px' }} />
            Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
