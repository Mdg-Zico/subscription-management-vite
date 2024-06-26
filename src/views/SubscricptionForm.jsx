import React, { useState } from "react";
import './subscriptionStyle.css'
import Sidebar from "../components/sidebar/SideBar";

function SubscriptionForm() {
  const [formData, setFormData] = useState({
    subscription_name: "",
    users: "", // Single input for multiple emails
    start_date: "",
    expiry_date: "",
    subscription_description: "",
    subscription_cost: ""
  });

  const user = JSON.parse(localStorage.getItem('user'))

  

  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.subscription_name || !formData.users || !formData.start_date || !formData.expiry_date || !formData.subscription_description || !formData.subscription_cost) {
      setSubmissionStatus("Please fill out all required fields.");
      return;
    }

    if (new Date(formData.expiry_date) < new Date(formData.start_date)) {
      setSubmissionStatus("Expiry date cannot be earlier than start date.");
      return;
    }

    setLoading(true);
    const url = `http://localhost:5000/api/v1/subscriptions`;

    const emailsString = formData.users.split(',').map(email => email.trim()).join(' ');
    const token = `Bearer ${localStorage.getItem('token')}`
    console.log(emailsString);

    const payload = {
      ...formData,
      emails: emailsString
    };

    console.log("Form Data:", payload);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        console.log("Response Data:", data);
        if (data.status === "success") {
          setSubmissionStatus("success");
          setFormData({
            subscription_name: "",
            users: "",
            start_date: "",
            expiry_date: "",
            subscription_description: "",
            subscription_cost: ""
          });
           // Reload the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        } else {
          setSubmissionStatus("error");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        setSubmissionStatus("error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <>
      {loading && <div className="loading">Submitting...</div>}
      {submissionStatus && (
        <div className={`submission-status ${submissionStatus}`}>
          {submissionStatus === "success" ? "Form submitted successfully" : submissionStatus}
        </div>
      )}
    <div className="main-content-wrapper">
    
      <div className="container" style={{marginLeft: "220px", width: "90%", textAlign: "left"}}>
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="card">
              <div className="card-header" style={{ backgroundColor: "#012970", color: "white", fontFamily: "Roboto, sans-serif", padding: "15px 20px" }}>
                <h4 className="card-title" style={{ color: "white", margin: "0" }}>Subscription Form</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div className="form-group" style={{ flex: "1" }}>
                      <label style={{ fontFamily: "Roboto, sans-serif" }}>Subscription Name</label>
                      <input
                        placeholder="Subscription"
                        type="text"
                        name="subscription_name"
                        value={formData.subscription_name}
                        onChange={handleInputChange}
                        style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                      />
                    </div>
                    <div className="form-group" style={{ flex: "1" }}>
                      <label style={{ fontFamily: "Roboto, sans-serif" }}>Stakeholder Email Addresses (comma-separated)</label>
                      <input
                        placeholder="Emails"
                        type="text"
                        name="users"
                        value={formData.users}
                        onChange={handleInputChange}
                        style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div className="form-group" style={{ flex: "1" }}>
                      <label style={{ fontFamily: "Roboto, sans-serif" }}>Start Date</label>
                      <input
                        type="datetime-local"
                        id="start-date"
                        name="start_date"
                        value={formData.start_date}
                        onChange={handleInputChange}
                        style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                      />
                    </div>
                    <div className="form-group" style={{ flex: "1" }}>
                      <label style={{ fontFamily: "Roboto, sans-serif" }}>Expiry Date</label>
                      <input
                        type="datetime-local"
                        id="expiry-date"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={handleInputChange}
                        style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                      />
                    </div>
                  </div>
                  <div className="form-group" style={{ flex: "1" }}>
                      <label style={{ fontFamily: "Roboto, sans-serif" }}>Subscription Cost</label>
                      <input
                        placeholder="Subscription Cost"
                        type="number"
                        name="subscription_cost"
                        value={formData.subscription_cost}
                        onChange={handleInputChange}
                        style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                      />
                    </div>
                  <div className="form-group">
                    <label style={{ fontFamily: "Roboto, sans-serif" }}>Subscription subscription_description</label>
                    <textarea
                      placeholder="Here can be your subscription_description"
                      rows="4"
                      name="subscription_description"
                      value={formData.subscription_description}
                      onChange={handleInputChange}
                      style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                    ></textarea>
                  </div>
                 
                  <button
                    type="submit"
                    style={{ backgroundColor: "#012970", border: "none", fontFamily: "Roboto, sans-serif", color: "white", padding: "0.5rem 1rem", cursor: "pointer" }}
                  >
                    {loading ? "Submitting..." : "Submit"}
                    
                  </button>
                  <div className="clearfix"></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default SubscriptionForm;
