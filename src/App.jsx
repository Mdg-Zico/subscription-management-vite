import React from 'react';
import './App.css';
import Dashboard from './views/Dashboard';
import SubscricptionForm from './views/SubscricptionForm';
import Login from './views/Login';
import Sidebar from './components/sidebar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/header/Header';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  return (
    <Router>
      <Header/>
   
      <div style={{ marginTop: "50px" }}>
        {isLoggedIn && <Sidebar />} {/* Conditionally render the Sidebar */}
        <Routes>
          {!isLoggedIn ? (
            <Route path="/login" element={<Login />} />
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/form" element={<SubscricptionForm />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
