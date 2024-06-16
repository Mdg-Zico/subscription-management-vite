import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/aedc-logo.png'; // Ensure the path to your image is correct

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Example authentication logic (replace with your actual logic)
    if (email === "user@example.com" && password === "password") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="login-page" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <div className="login-container" style={{ width: "30%", textAlign: "center", boxShadow: "0 0 10px rgba(0, 0, 255, 0.5)", padding: "20px", borderRadius: "10px", backgroundColor: "#ffffff" }}>
        <div style={{ marginBottom: "20px" }}>
          <img
            className="d-none d-lg-block"
            style={{ width: '100px', height: '26px', marginRight: '10px' }}
            src={logo}
            alt="AEDC Logo"
          />
          <p style={{ fontFamily: "OpenSans", fontSize: "15px", fontWeight: "bold", margin: 0, color: "darkblue" }}>Subscription Management System</p>
        </div>
        <h2 style={{ color: "darkblue", marginBottom: "10px" }}>Login</h2>
        <p style={{ fontFamily: "openSans", marginBottom: "20px" }}>Please log in to continue</p>
        <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
          <div className="form-group">
            <label style={{ marginBottom: "5px", fontFamily: "OpenSans", fontWeight: "bolder" }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              style={{ opacity: 0.7, borderRadius: "10px", border: "1px solid #ced4da", padding: "8px", width: "100%" }}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px", fontFamily: "OpenSans", fontWeight: "bolder" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              style={{ opacity: 0.7, borderRadius: "10px", border: "1px solid #ced4da", padding: "8px", width: "100%" }}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#0a58ca", color: "white", marginTop: "10px", width: "100%" }}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
