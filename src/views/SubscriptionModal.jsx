import React from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';

const SubscriptionModal = ({ show, handleClose, formData, handleInputChange, handleSubmit, loading, submissionStatus, isEditing }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton style={{ backgroundColor: '#012970', color: '#fff', borderBottom: 'none' }}>
        <Modal.Title style={{ fontFamily: 'Nunito', fontWeight: '700', fontSize: '1.5rem', marginTop: '10px', marginBottom: '10px' }}>{isEditing ? "Edit Subscription" : "View Subscription"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ padding: '20px' }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formSubscriptionName">
              <Form.Label>Subscription Name</Form.Label>
              <Form.Control
                type="text"
                name="subscriptionName"
                placeholder="Subscription"
                value={formData.subscriptionName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formEmails">
              <Form.Label>Stakeholder Email Addresses</Form.Label>
              <Form.Control
                type="text"
                name="emails"
                placeholder="Emails"
                value={formData.emails}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formDates">
              <Row>
                <Col>
                  <Form.Label >Start Date</Form.Label>
                  <Form.Control
                    style={{marginBottom: "10px"}}
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Col>
                <Col>
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </Col>
              </Row>
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Subscription Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </Form.Group>
          {isEditing && (
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button variant="primary" type="submit" disabled={loading} style={{backgroundColor: "#012970"}}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionModal;
