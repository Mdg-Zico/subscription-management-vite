import React from 'react';
import { Navbar } from 'react-bootstrap';
import Sidebar from '../components/sidebar/SideBar';

function Dashboard() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: '1', top: "-400px"}}>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand className="ml-4">Subscription Management</Navbar.Brand>
          </Navbar>
          {/* Add your existing content here */}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
