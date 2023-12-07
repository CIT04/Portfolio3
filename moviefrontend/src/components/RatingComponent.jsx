import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const RatingComponent = ({ userRating, onRatingChange, onSaveRating, onDeleteRating }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSaveRating = () => {
    setShowModal(false);
    onSaveRating();
  };

  const handleDeleteRating = () => {
    setShowModal(false);
    onDeleteRating();
  };

  return (
    <div className="rating-component">
   
      <Button onClick={() => setShowModal(true)}>Edit Rating</Button>

      {/* Rating Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Rating</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formRating">
            <Form.Label>Select Rating:</Form.Label>
            <Form.Control as="select" value={userRating} onChange={(e) => onRatingChange(Number(e.target.value))}>
              {[...Array(11).keys()].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveRating}>
            Save Rating
          </Button>
          <Button variant="danger" onClick={handleDeleteRating}>
            Delete Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RatingComponent;
