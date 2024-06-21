import React from 'react';
import '../header/header.css'; // Assuming you have custom styles
import logo from '../header/aedc-logo.png';
import { Dropdown } from 'react-bootstrap';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.email);
  return (
    <div className='header'>
    <div style={{display: "flex", alignItems:"center"}}>
      <img className='img' src={logo} alt="AEDC Logo" />
      <h6 style={{ marginTop: '5px', fontSize: '20px', color: 'rgb(1, 41, 112)', fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
        Subscription Management System
      </h6>
    </div>
      <div >
      <Dropdown style={{marginRight: "40px"}}>
  <Dropdown.Toggle variant="default" id="dropdown-basic">
    <span style={{ color: '#012970' }} className="no-icon">
      {user.email}
    </span>
  </Dropdown.Toggle>

  <Dropdown.Menu style={{ maxWidth: '200px' }}>
    <Dropdown.Item href="#pablo" onClick={(e) => e.preventDefault()}>
      My Profile
    </Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item href="/logout" onClick={(e) => e.preventDefault()}>
      Log Out
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>

      </div>

    </div>
  );
}

export default Header;
