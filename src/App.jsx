import React, { useState, useEffect } from 'react';
import './App.css';
import Dashboard from './views/Dashboard';
import SubscriptionForm from './views/SubscricptionForm'
import Login from './views/Login';
import Sidebar from './components/sidebar/SideBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/header/Header';
import MySubscription from './views/MySubscription';
import { UserProvider } from './components/UserContext';

function App() {
  return (
  <UserProvider>
    <Router>
      <AppContent />
    </Router>
  </UserProvider>
  );
}


function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn from localStorage
    return JSON.parse(localStorage.getItem('isLoggedIn')) || false;
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      // Simulate setting isLoggedIn to true after login
      setIsLoggedIn(true);
      // Store isLoggedIn in localStorage
      localStorage.setItem('isLoggedIn', JSON.stringify(true));
    }, 1000);
  }, []);

  
  if (!isLoggedIn && location.pathname !== '/login') {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoggedIn && location.pathname !== '/login' && <Header />}
      {isLoggedIn && location.pathname !== '/login' && (
        <div style={{ marginTop: "50px" }}>
          <Sidebar />
        </div>
      )}

      <Routes>
        <Route path="/login" element={<Login  />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<SubscriptionForm />} />
        <Route path="/my_subscription" element={<MySubscription />} />
      </Routes>
    
    </>
  );
}

export default App;
