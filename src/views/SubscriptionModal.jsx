import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';


const modalDialogStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: "100%",
  width: "100%"
};

const modalContentStyles = {
  width: '90%',
  maxWidth: 'none',
  margin: 'auto',
  maxHeight: '90vh',
  overflowY: 'auto',
  padding: '20px'
};

const headerStyles = {
  backgroundColor: '#012970',
  color: '#fff',
  height: "50px",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const closeButtonStyles = {
  color: '#fff',
  fontSize: '1.5rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  marginTop: "-15px",
  paddingTop: "0"
};

const labelStyles = {
  color: '#012970',
  fontFamily: 'Poppins',
  fontWeight: '500',
};

const inputStyles = {
  borderColor: '#012970',
};

const buttonStyles = {
  backgroundColor: '#012970',
  borderColor: '#012970',
  marginTop: "40px",
  color: "white"
};

function SubscriptionModal({ show, handleClose, formData, handleInputChange, handleSubmit, isEditing }) {
  console.log(formData.expiry_date);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal-width"
      style={modalDialogStyles}
    >
      <Modal.Header style={headerStyles}>
        <Modal.Title style={{ color: "#fff", fontFamily: "Nunito", fontWeight: "700", marginTop: "0" }}>
          {isEditing ? "Edit Subscription" : "View Subscription"}
        </Modal.Title>
        <button onClick={handleClose} style={closeButtonStyles}>&times;</button> {/* Custom close button */}
      </Modal.Header>
      <Modal.Body style={modalContentStyles}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <label style={labelStyles}>Subscription Name</label>
                <Form.Control
                  placeholder="Subscription"
                  type="text"
                  name="subscription_name"
                  value={formData.subscription_name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={inputStyles}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <label style={labelStyles}>Stakeholder Emails</label>
                <Form.Control
                  placeholder="Emails"
                  type="text"
                  name="emails"
                  value={formData.users}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={inputStyles}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <label style={labelStyles}>Start Date</label>
                <Form.Control
                  type="datetime"
                  name="startDate"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={inputStyles}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <label style={labelStyles}>Expiry Date</label>
                <Form.Control
                  type="datetime"
                  name="expiryDate"
                  value={formData.expiry_date}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={inputStyles}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group>
                <label style={labelStyles}>Subscription Description</label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  name="description"
                  value={formData.subscription_description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={inputStyles}
                />
              </Form.Group>
            </Col>
          </Row>
          {isEditing && (
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="info" style={buttonStyles}>
                Save Changes
              </Button>
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SubscriptionModal;
