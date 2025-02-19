import axios from "axios";
import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./react-carousel.css";

export function ReactCarousel() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("images.json")
      .then((response) => {
        if (response.data && response.data.slides) {
          setImages(response.data.slides);
        } else {
          console.error("Invalid image data format");
        }
      })
      .catch((error) => console.error("Error loading images:", error));
  }, []);

  return (
    <div className="carousel-container">
      <Carousel>
        {images.length > 0 ? (
          images.map((image, index) => (
            <Carousel.Item key={index} interval={image.interval || 2000}>
              <img
                className="carousel-image"
                src={image.img_src}
                alt={image.alt || `Slide ${index + 1}`}
              />
            </Carousel.Item>
          ))
        ) : (
          <p>Loading images...</p>
        )}
      </Carousel>
    </div>
  );
}
