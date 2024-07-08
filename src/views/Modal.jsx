// Modal.jsx
import React from 'react';

const Modal = ({ show, onClose, onConfirm }) => {
  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete?</p>
            <div className="modal-buttons">
              <button className="modal-btn-confirm" onClick={onConfirm}>
                Confirm
              </button>
              <button className="modal-btn-cancel" onClick={onClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
