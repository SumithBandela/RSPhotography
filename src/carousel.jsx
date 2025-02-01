import { useState, useEffect } from "react";
import axios from "axios";
import './carousel.css';

export function Carousel() {
  const [images, setImages] = useState([
    {id:1,img_src:"images/Image-1.png"},
    {id:2,img_src:"images/Image-2.png"},
    {id:3,img_src:"images/Image-3.png"},
    {id:4,img_src:"images/Image-4.png"},
    {id:5,img_src:"images/Image-5.png"},
    {id:6,img_src:"images/Image-6.png"},
    {id:7,img_src:"images/Image-7.png"},
    {id:8,img_src:"images/Image-8.png"},
    {id:9,img_src:"images/Image-9.png"},
    {id:10,img_src:"images/Image-10.png"}
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);


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