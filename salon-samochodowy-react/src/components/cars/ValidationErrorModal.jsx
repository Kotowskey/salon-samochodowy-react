import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const ValidationErrorsModal = ({ errors, onClose }) => {
  return (
    <Modal show={errors.length > 0} onHide={onClose} style={{ zIndex: 1060 }}>
      <Modal.Header closeButton>
        <Modal.Title>Validation Errors</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ValidationErrorsModal.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ValidationErrorsModal;
