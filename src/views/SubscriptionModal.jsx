import React, { useState } from 'react';
import { Modal, Button, Form, Col, Row, Alert } from 'react-bootstrap';
import Select from 'react-select';

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
  fontSize: '1.9rem',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  marginTop: "10px",
  paddingTop: "0",
  marginRight: "-40px"
};

const labelStyles = {
  color: '#012970',
  fontFamily: 'Poppins',
  fontWeight: '500',
  marginBottom: '-10px',
  marginTop: "10px"
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
  const [alertVisible, setAlertVisible] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setAlertVisible(true);
    setTimeout(() => {
      setAlertVisible(false);
      handleClose();
    }, 3000); // Hide alert and close modal after 3 seconds
  };

  const emailOptions = [
    { value: 'isaac.medugu@abujaelectricity.com', label: 'isaac.medugu@abujaelectricity.com' },
    { value: 'justin.ebedi@abujaelectricity.com', label: 'justin.ebedi@abujaelectricity.com' },
    { value: 'ibrahim.ali@abujaelectricity.com', label: 'ibrahim.ali@abujaelectricity.com' }
  ];

  const handleMultiSelectChange = (selectedOptions) => {
    const selectedEmails = selectedOptions ? selectedOptions.map(option => option.value) : [];
    handleInputChange({
      target: {
        name: 'users',
        value: selectedEmails
      }
    });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal-width"
      style={modalDialogStyles}
    >
      <Modal.Header style={headerStyles}>
        <Modal.Title style={{ color: "#fff", fontFamily: "Nunito", fontWeight: "700" }}>
          {isEditing ? "Edit Subscription" : "View Subscription"}
        </Modal.Title>
        <button onClick={handleClose} style={closeButtonStyles}>&times;</button> {/* Custom close button */}
      </Modal.Header>
      <Modal.Body style={modalContentStyles}>
        {alertVisible && (
          <Alert variant="success">
            Changes saved successfully!
          </Alert>
        )}
        <Form onSubmit={onSubmit}>
          <Row>
            <Col md={12}>
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
            <Col md={12}>
              <Form.Group>
                <label style={labelStyles}>Stakeholder Emails</label>
                <Select
                  isMulti
                  name="users"
                  options={emailOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={emailOptions.filter(option => formData.users.includes(option.value))}
                  onChange={handleMultiSelectChange}
                  isDisabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Form.Group>
                <label style={labelStyles}>Start Date</label>
                <Form.Control
                  type="datetime-local"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  style={inputStyles}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group>
                <label style={labelStyles}>Expiry Date</label>
                <Form.Control
                  type="datetime-local"
                  name="expiry_date"
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
                  name="subscription_description"
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
















// import React, { useState } from 'react';
// import { Modal, Button, Form, Col, Row, Alert } from 'react-bootstrap';

// const modalDialogStyles = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   height: "100%",
//   width: "100%"
// };

// const modalContentStyles = {
//   width: '90%',
//   maxWidth: 'none',
//   margin: 'auto',
//   maxHeight: '90vh',
//   overflowY: 'auto',
//   padding: '20px'
// };

// const headerStyles = {
//   backgroundColor: '#012970',
//   color: '#fff',
//   height: "50px",
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between'
// };

// const closeButtonStyles = {
//   color: '#fff',
//   fontSize: '1.9rem',
//   background: 'none',
//   border: 'none',
//   cursor: 'pointer',
//   marginTop: "10px",
//   paddingTop: "0",
//   marginRight: "-40px"
// };

// const labelStyles = {
//   color: '#012970',
//   fontFamily: 'Poppins',
//   fontWeight: '500',
//   marginBottom: '-10px',
//   marginTop: "10px"
// };

// const inputStyles = {
//   borderColor: '#012970',
// };

// const buttonStyles = {
//   backgroundColor: '#012970',
//   borderColor: '#012970',
//   marginTop: "40px",
//   color: "white"
// };

// function SubscriptionModal({ show, handleClose, formData, handleInputChange, handleSubmit, isEditing }) {
//   const [alertVisible, setAlertVisible] = useState(false);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(e);
//     setAlertVisible(true);
//     setTimeout(() => {
//       setAlertVisible(false);
//       handleClose();
//     }, 3000); // Hide alert and close modal after 3 seconds
//   };

//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       centered
//       dialogClassName="custom-modal-width"
//       style={modalDialogStyles}
//     >
//       <Modal.Header style={headerStyles}>
//         <Modal.Title style={{ color: "#fff", fontFamily: "Nunito", fontWeight: "700" }}>
//           {isEditing ? "Edit Subscription" : "View Subscription"}
//         </Modal.Title>
//         <button onClick={handleClose} style={closeButtonStyles}>&times;</button> {/* Custom close button */}
//       </Modal.Header>
//       <Modal.Body style={modalContentStyles}>
//         {alertVisible && (
//           <Alert variant="success">
//             Changes saved successfully!
//           </Alert>
//         )}
//         <Form onSubmit={onSubmit}>
//           <Row>
//             <Col md={12}>
//               <Form.Group>
//                 <label style={labelStyles}>Subscription Name</label>
//                 <Form.Control
//                   placeholder="Subscription"
//                   type="text"
//                   name="subscription_name"
//                   value={formData.subscription_name}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   style={inputStyles}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={12}>
//               <Form.Group>
//                 <label style={labelStyles}>Stakeholder Emails</label>
//                 <Form.Control 
//                   placeholder="Emails"
//                   type="text"
//                   name="users"
//                   value={formData.users}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   style={inputStyles}
//                 />
              
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={12}>
//               <Form.Group>
//                 <label style={labelStyles}>Start Date</label>
//                 <Form.Control
//                   type="datetime-local"
//                   name="start_date"
//                   value={formData.start_date}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   style={inputStyles}
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={12}>
//               <Form.Group>
//                 <label style={labelStyles}>Expiry Date</label>
//                 <Form.Control
//                   type="datetime-local"
//                   name="expiry_date"
//                   value={formData.expiry_date}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   style={inputStyles}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Row>
//             <Col md={12}>
//               <Form.Group>
//                 <label style={labelStyles}>Subscription Description</label>
//                 <Form.Control
//                   as="textarea"
//                   rows="4"
//                   name="subscription_description"
//                   value={formData.subscription_description}
//                   onChange={handleInputChange}
//                   disabled={!isEditing}
//                   style={inputStyles}
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           {isEditing && (
//             <div className="d-flex justify-content-end">
//               <Button type="submit" variant="info" style={buttonStyles}>
//                 Save Changes
//               </Button>
//             </div>
//           )}
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }

// export default SubscriptionModal;
