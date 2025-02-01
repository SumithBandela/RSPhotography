import { useState, useEffect } from "react";
import axios from "axios";
import './carousel.css';

export function CarouselDemo() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch images from JSON
  useEffect(() => {
    axios.get("/images.json")
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  }, []);

  // Auto-slide images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images]);

  return (
    <div className="carousel-container d-flex justify-content-center align-items-center">
      {images.length > 0 ? (
        <div className="carousel-card card m-2 p-2 shadow-lg">
          <div className="card-body">
            <div className="row align-items-center">
              {/* Center image */}
              <div className="col-12 text-center">
                <img
                  src={images[currentIndex]?.img_src}
                  alt={`Slide ${images[currentIndex]?.id}`}
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