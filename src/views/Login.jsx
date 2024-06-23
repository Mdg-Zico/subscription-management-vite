import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/img/aedc-logo.png'; // Ensure the path to your image is correct
import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the username and password when the component mounts
    setUsername("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!username || !password) {
      setError("Enter Username and Password");
      return;
    }

    // Default credentials for testing
    const defaultUsername = "testUser";
    const defaultPassword = "testPass";

    if (username === defaultUsername && password === defaultPassword) {
      // Simulate a successful login
      const data = { username }; // You can add more user data here if needed
      localStorage.setItem("user", JSON.stringify(data));
      setTimeout(() => {localStorage.removeItem('user')}, (1000 * 60 * 60));
      setShowSuccessModal(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); // Redirect after 2 seconds
    } else {
      setError("Incorrect Username/Password");
    }
  };
//   try {
  //     const response = await fetch('http://localhost:5000/api/v1/users', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Incorrect Username/Password');
  //     }

  //     const data = await response.json();
  //     localStorage.setItem("user", JSON.stringify(data));
  //     setTimeout(() => {localStorage.removeItem('user')}, (1000 * 60 * 60));
  //     setShowSuccessModal(true);
  //     setTimeout(() => {
  //       navigate("/dashboard");
  //     }, 2000); // Redirect after 2 seconds
  //   } catch (error) {
  //     if (error.message === 'Incorrect Username/Password') {
  //       setError("Incorrect Username/Password");
  //     } else {
  //       setError("Network error. Please try again later.");
  //     }
  //   }
  // };



  return (
    <div className="login-page gray-background" style={{ width: "100%", height: "150%", position: "relative" }}>
      {!showSuccessModal && (
        <>
          <div style={{ marginBottom: "20px", display: "flex" }}>
            <img
              className="d-none d-lg-block"
              style={{ width: '100px', height: '26px', marginLeft: "-5px", marginRight: '2px' }}
              src={logo}
              alt="AEDC Logo"
            />
            <p style={{ fontFamily: "OpenSans", fontSize: "15px", fontWeight: "bold", margin: "0", marginTop: "1px", color: "darkblue" }}>Subscription Management System</p>
          </div>
          <div className="login-container" style={{ width: "100%", textAlign: "center", boxShadow: "0 0 10px rgba(0, 0, 255, 0.5)", padding: "20px", borderRadius: "10px", backgroundColor: "#ffffff" }}>
            <h2 style={{ color: "darkblue", marginBottom: "10px" }}>Login</h2>
            {error && <p style={{ color: "red", fontFamily: "OpenSans" }}>{error}</p>}
            <p style={{ fontFamily: "OpenSans", marginBottom: "20px" }}>Please log in to continue</p>
            <form onSubmit={handleLogin} style={{ textAlign: "left" }}>
              <div className="form-group">
                <label style={{ marginBottom: "5px", fontFamily: "OpenSans", fontWeight: "bolder" }}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#0a58ca", color: "white", marginTop: "10px" }}>Login</button>
            </form>
          </div>
        </>
      )}
      {showSuccessModal && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={modalContentStyle}>
            <div className="success-icon" style={successIconStyle}>
              ✓
            </div>
            <p style={{color: "#012970", fontFamily:'cursive', marginTop: '10px', fontSize: "20px" }}>Login Successful</p>
          </div>
        </div>
      )}
    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: '25%',
  right: '25%',
  bottom: 0,
  width: "50%",
  height: "100%",
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  width:"250px",
  height: "250px",
  boxShadow:"#012970"
};

const successIconStyle = {
  width: '70px',
  height: '70px',
  backgroundColor: '#012970',
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '30px',
  marginBottom: '10px',
};

export default Login;
