import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./image-view.css";

export function ImageView() {
  const { id } = useParams();  
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get("images.json") // Ensure the correct path
      .then(response => {
        const selectedImage = response.data.find(img => img.id === parseInt(id, 10)); // Convert id to number
        if (selectedImage) {
          setImage(selectedImage);
        } else {
          console.error("Image not found for id:", id);
        }
      })
      .catch(error => console.error("Error fetching image details:", error));
  }, [id]);

  if (!image) {
    return <div>Loading image...</div>;
  }

  return (
    <div className="image-view-container">

      <div className="photos-grid">
        {image.photos && image.photos.length > 0 ? (
          image.photos.map(photo => (
            <div key={photo.id} className="photo-card">
              <img src={photo.img_src} alt={`Photo ${photo.id}`} className="photo-image" />
            </div>
          ))
        ) : (
          <p>No additional photos available.</p>
        )}
      </div>

      <div className="back-link">
        <Link to="/home" className="back-to-home-btn">Back to Home</Link>
      </div>
    </div>
  );
}
