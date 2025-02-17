import { useState, useEffect } from "react";
import axios from "axios";
import './carousel.css';

export function Carousel() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from the JSON file
  useEffect(() => {
    axios.get("images.json")
      .then(response => {
        setPhotos(response.data.slides);
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  }, []);

  // Auto-slide images every 3 seconds
  useEffect(() => {
    if (photos.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);
    
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [photos]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  return (
    <div className="carousel-wrapper d-flex justify-content-center align-items-center">
      {photos.length > 0 ? (
        <div className="carousel-card card">
          <div className="card-body">
            <button className="btn btn-lg carousel-nav-button prev" onClick={handlePrevious}>
              &#10094;
            </button>
            <div className="carousel-inner-container">
              <div className="carousel-image-container">
                <img
                  src={photos[currentIndex]?.img_src}
                  alt={`Slide ${currentIndex + 1}`}
                  className="carousel-image img-fluid"
                />
              </div>
            </div>
            <button className="btn btn-lg carousel-nav-button next" onClick={handleNext}>
              &#10095;
            </button>
          </div>
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
}
