import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./image-view.css";

export function ImageView() {
  const { id } = useParams();  
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get("images.json") // Ensure this is the correct path
      .then(response => {
        const imagesArray = response.data.images; // Extract "images" array from JSON
        const selectedImage = imagesArray.find(img => img.id.toString() === id); // Ensure ID match
        
        if (selectedImage) {
          setImage(selectedImage);
        } else {
          console.error("Image not found for id:", id);
        }
      })
      .catch(error => console.error("Error fetching image details:", error));
  }, [id]);

  if (!image) {
    return <div className="loading-message">Loading image...</div>;
  }

  return (
    <div className="image-view-container">
      <div className="photos-grid">
        {image.photos && image.photos.length > 0 ? (
          image.photos.map((photo, index) => (
            <div key={index} className="photo-card">
              <img src={photo.img_src} alt={`Photo ${index+1}`} className="photo-image img-thumbnail" />
            </div>
          ))
        ) : (
          <p className="text-center">No additional photos available.</p>
        )}
      </div>

      {/* Back Button */}
      <div className="text-center mt-4">
        <Link to="/home" className="back-to-home-btn" >Back to Home</Link>
      </div>
    </div>
  );
}
