// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import "../sidebar/sideBar.css" // You can create this CSS file to style the sidebar

const Sidebar = () => {
  return (
    <div className="sidebar" >
      <ul className="sidebar-nav">
        <li  ClassName="active">
         
            Dashboard
         
        </li>
        <li  ClassName="active">
         
         Profile
      
     </li>
        {/* Add more sidebar items as needed */}
      </ul>
    </div>
  );
};

export default Sidebar;
