import React, { useState } from "react";
import './subscriptionStyle.css';
import Sidebar from "../components/sidebar/SideBar";
import AsyncSelect from 'react-select/async';
import { components } from 'react-select';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ip_initials from "./config";

function SubscriptionForm() {
  const [formData, setFormData] = useState({
    subscription_name: "",
    users: "", // Single input for multiple emails
    start_date: "",
    expiry_date: "",
    subscription_description: "",
    subscription_cost: ""
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [loading, setLoading] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const token = localStorage.getItem('token');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.subscriptionName || formData.emails.length === 0 || !formData.startDate || !formData.expiryDate || !formData.description || !formData.subscriptionCost) {
      setSubmissionStatus({ message: "Please fill out all required fields.", type: "error" });
      scrollToTop();
      return;
    }

    if (new Date(formData.expiryDate) < new Date(formData.startDate)) {
      setSubmissionStatus({ message: "Expiry date cannot be earlier than start date.", type: "error" });
      scrollToTop();
      return;
    }

    setLoading(true);
    const url = `http://localhost:5000/api/v1/subscriptions`;

    const emailsString = formData.emails.map(emailObj => emailObj.value).join(', ');

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
          setSubmissionStatus({ message: "Form submitted successfully", type: "success" });
          setFormData({
            subscription_name: "",
            users: [],
            start_date: "",
            expiry_date: "",
            subscription_description: "",
            subscription_cost: ""
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          setSubmissionStatus({ message: "Error on Submission", type: "error" });
        }
        scrollToTop();
      })
      .catch(error => {
        console.error("Error:", error);
        setSubmissionStatus({ message: "Error on Submission", type: "error" });
        scrollToTop();
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

  const handleEmailsChange = (selectedOptions) => {
    setFormData({
      ...formData,
      emails: selectedOptions
    });
  };

  const loadOptions = () => {
    // Replace with your API endpoint to fetch email suggestions
    console.log(token);
    fetch(`${ip_initials}/users`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
      .then(response => {
        console.log(response.json())
        console.log(response);
      })
      .then(data => {
        const options = data.map(user => ({ value: user.email, label: email }));
      })
      .catch(error => {
        console.log("ERROR STATUS", error);
        if (error.response.status === 401) {
          navigate('/login');
        }
        console.error("Error fetching email suggestions:", error);
        // callback([]);
      });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {submissionStatus && (
        <div className={`alert alert-${submissionStatus.type} alert-dismissible fade show`} role="alert">
          {submissionStatus.message}
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setSubmissionStatus(null)}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <div className="form-main-content" >
        <div className="container form-body" style={{ marginLeft: "100px", width: "90%", textAlign: "left" }}>
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card">
                <div className="card-header" style={{ backgroundColor: "#012970", color: "white", fontFamily: "Roboto, sans-serif", padding: "15px 20px" }}>
                  <h4 className="card-title" style={{ color: "white", margin: "0" }}>Subscription Form</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="flex-input-divs">
                      <div className="form-group flex-input-sub-divs" >
                        <label style={{ fontFamily: "Roboto, sans-serif" }}>Subscription Name</label>
                        <input
                          placeholder="Subscription"
                          type="text"
                          name="subscriptionName"
                          value={formData.subscriptionName}
                          onChange={handleInputChange}
                          style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                        />
                      </div>
                      <div className="form-group flex-input-sub-divs" >
                        <label style={{ fontFamily: "Roboto, sans-serif" }}>Stakeholder Email Addresses</label>
                        {/* // (comma-separated) */}
                        <AsyncSelect className="async"
                          isMulti
                          cacheOptions
                          defaultOptions
                          loadOptions={loadOptions}
                          onChange={handleEmailsChange}
                          value={formData.users}
                          styles={{
                              fontFamily: "Roboto, sans-serif",
                              width: "100%",
                              padding: "0.5rem"
                     
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex-input-divs">
                      <div className="form-group flex-input-sub-divs" >
                        <label style={{ fontFamily: "Roboto, sans-serif" }}>Start Date</label>
                        <input
                          type="datetime-local"
                          id="start-date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                        />
                      </div>
                      <div className="form-group flex-input-sub-divs" >
                        <label style={{ fontFamily: "Roboto, sans-serif" }}>Expiry Date</label>
                        <input
                          type="datetime-local"
                          id="expiry-date"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                        />
                      </div>
                    </div>
                <div className="flex-input-divs">
                    <div className="form-group flex-input-sub-divs" >
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
                    <div className="form-group flex-input-sub-divs" >
                      <label style={{ fontFamily: "Roboto, sans-serif" }}>Subscription Description</label>
                      <textarea
                        placeholder="Description"
                        rows="1"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        style={{ fontFamily: "Roboto, sans-serif", width: "100%", padding: "0.5rem" }}
                      ></textarea>
                    </div>
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
