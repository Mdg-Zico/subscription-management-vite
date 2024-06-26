import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import TableList from "./TableList";
import Sidebar from "../components/sidebar/SideBar";
import '../components/styles.css';
import ip_initials from "./config";

function MySubscription() {
  const [subscriptionCounts, setSubscriptionCounts] = useState({ Active: 0, Inactive: 0, Expired: 0 });

  return (
    <div className="main-content-wrapper">
      <Sidebar />
      <div className="main-content">
        <Container fluid className="dashboard-container">
          <div className="card-deck">
            <Card className="card-stats card-status left-text custom-card-size" style={{ width: "500px", flexWrap: "wrap" }}>
              <Card.Body className="card-body">
                <div>
                  <i style={{ fontSize: "20px", color: "#012970" }} className="fas fa-list-alt mr-3 icon-style"></i>
                  <p style={{ color: "#012970", fontFamily: "Poppins", fontWeight: "500" }} className="text-style">All Subscriptions</p>
                </div>
              </Card.Body>
              <Card.Footer className="card-footer">
                <div className="stats">
                  <Card.Title as="h3" style={{ color: "#012970" }} className="title-style">
                    {Object.values(subscriptionCounts).reduce((acc, count) => acc + count, 0)}
                  </Card.Title>
                </div>
              </Card.Footer>
            </Card>

            <Card className="card-stats card-status left-text custom-card-size" style={{ width: "500px" }}>
              <Card.Body className="card-body">
                <div>
                  <i style={{ fontSize: "20px", color: "#012970" }} className="fas fa-clipboard-check mr-3 icon-style"></i>
                  <p style={{ color: "#012970", fontFamily: "Poppins", fontWeight: "500" }} className="text-style">Active Subscriptions</p>
                </div>
              </Card.Body>
              <Card.Footer className="card-footer">
                <div className="stats">
                  <Card.Title as="h3" style={{ color: "#012970" }} className="title-style">
                    {subscriptionCounts.Active}
                  </Card.Title>
                </div>
              </Card.Footer>
            </Card>

            <Card className="card-stats card-status left-text custom-card-size" style={{ width: "500px" }}>
              <Card.Body className="card-body">
                <div>
                  <i style={{ fontSize: "20px", color: "#012970" }} className="fas fa-calendar-times mr-3 icon-style"></i>
                  <p style={{ color: "#012970", fontFamily: "Poppins", fontWeight: "500" }} className="text-style">Expired Subscriptions</p>
                </div>
              </Card.Body>
              <Card.Footer className="card-footer">
                <div className="stats">
                  <Card.Title as="h3" style={{ color: "#012970" }}>
                    {subscriptionCounts.Expired}
                  </Card.Title>
                </div>
              </Card.Footer>
            </Card>
          </div>

          {/* TableList Component */}
          <TableList setSubscriptionCounts={setSubscriptionCounts} showActions={true} url={`${ip_initials}/api/v1/subscription/my_subscriptions`}/>
        </Container>
      </div>
    </div>
  );
}

export default MySubscription;
