import { useState, useEffect } from "react";
import axios from "axios";
import './carousel.css';

export function Carousel() {
  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from the JSON file
  useEffect(() => {
    axios.get("images.json") // Updated to fetch from the combined JSON file
      .then(response => {
        setPhotos(response.data.slides); // Accessing the photos array from the JSON
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

  return (
    <div className="carousel-container d-flex justify-content-center align-items-center">
      {photos.length > 0 ? (
        <div className="carousel-card card m-2 p-2 shadow-lg">
          <div className="card-body">
            <div className="row align-items-center">
              {/* Center image */}
              <div className="col-12 text-center">
                <img
                  src={photos[currentIndex]?.img_src} // Updated to use the photos array
                  alt={`Slide ${currentIndex + 1}`}
                  className="carousel-image img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
}
