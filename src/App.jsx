import React from 'react';

import './App.css';
import Dashboard from './views/Dashboard';
import SubscricptionForm from './views/SubscricptionForm';
import Logout from './views/Logout';
import Sidebar from './components/sidebar/SideBar';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

function App() {
  return (
    <>
    
      <Router>
  
  
        <Sidebar /> {/* Ensure Sidebar is rendered here */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/form" element={<SubscricptionForm />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
