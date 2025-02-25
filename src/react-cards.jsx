import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./react-cards.css";
import { CloseButton } from "react-bootstrap";

export function ReactCards({ images }) {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClose = () => {
    setShow(false);
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const handleShow = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
    setShow(true);
  };

  const handleSwipe = (direction) => {
    let newIndex = currentIndex + (direction === "next" ? 1 : -1);
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImage(images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="cards-container">
      {images.length > 0 ? (
        images.map((image, index) => (
          <Card
            key={index}
            className="image-card"
            onClick={() => handleShow(image, index)}
            aria-selected={selectedImage === image}
          >
            <Card.Img variant="top" src={image.img_src} alt={image.alt || "Image"} className="card-img"/>
          </Card>
        ))
      ) : (
        <p>No images available</p>
      )}
      <Modal show={show} onHide={handleClose} animation centered>
        <Modal.Body className="modal-body">
          {selectedImage && (
            <div className="image-container">
              <img
                src={selectedImage.img_src}
                alt={selectedImage.alt || "Selected"}
                className="modal-image"
                onClick={(e) =>
                  e.clientX > window.innerWidth / 2
                    ? handleSwipe("next")
                    : handleSwipe("prev")
                }
              />
              <span className="close-button" onClick={handleClose}><CloseButton variant="white"/></span>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}