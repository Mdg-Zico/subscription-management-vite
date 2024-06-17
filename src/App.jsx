import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './views/Dashboard';
import SubscriptionForm from './views/SubscricptionForm'
import Login from './views/Login';
import Sidebar from './components/sidebar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function LoadingSpinner() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

  useEffect(() => {
    // Simulate async behavior (e.g., checking auth state)
    setTimeout(() => {
      setIsLoading(false); // Set loading to false after simulating async behavior
      // Assume authentication logic here; set isLoggedIn based on actual authentication status
      // For demo purposes, assuming user is logged in after 1 second
      setIsLoggedIn(true);
    }, 1000); // Adjust timeout as needed
  }, []);

  if (isLoading) {
    
  }

  // Redirect to login if user is not logged in
  if (!isLoggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  // Render only when isLoggedIn is true and not on the login page
  return (
    <>
      {isLoggedIn && location.pathname !== '/login' && <Header />}
      {isLoggedIn && location.pathname !== '/login' && (
        <div style={{ marginTop: "50px" }}>
          <Sidebar />
        </div>
      )}
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<SubscriptionForm />} />
      </Routes>
    </>
  );
}

export default App;
