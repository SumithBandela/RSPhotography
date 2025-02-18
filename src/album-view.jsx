import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './album-view.css';
export function AlbumView() {
  const { title } = useParams();  
  const [album, setAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    // Fetch all albums and filter by the provided 'id'
    axios.get("images.json")  // Assuming 'collections.json' has all albums
      .then(response => {
        // Find the album by matching the 'id'
        const selectedAlbum = response.data.albums.find(a => a.title.toString() === title);
        
        if (selectedAlbum) {
          setAlbum(selectedAlbum);  // Set the album data if found
        } else {
          console.error("Album not found for id:", title);  // Log if album isn't found
        }
      })
      .catch(error => console.error("Error fetching album details:", error));
  }, [title]);

  // Show a loading message if album data hasn't been set yet
  if (!album) {
    return <div>Loading album...</div>;
  }

  return (
    <div className="album-view-container">
      <header className="album-header">
        <h1 className="album-title">{album.title || "Untitled Album"}</h1>
        <p className="album-description">{album.description || "No description available."}</p>
      </header>
 
      {/* Video Section */}
      {album.video_src && (
      <div className="video-container">
            <video className="image-video" controls autoPlay>
              <source src={album.video_src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>{album.video_description || "No description available."}</p>
          </div>
        )}
      <div className="photos-grid">
        {album.photos && album.photos.length > 0 ? (
          album.photos.map((photo, index) => (
            <div key={index} className="photo-card">
              <img src={photo.img_src} alt="img" className="photo-image" onClick={() => setSelectedPhoto(photo.img_src)} />
            </div>
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>
      {/* Modal */}
      {selectedPhoto && (
        <div className="modal-overlay" style={{ zIndex: 1050 }}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setSelectedPhoto(null)}>&times;</span>
            <img src={selectedPhoto} alt="Enlarged" className="modal-image" />
          </div>
        </div>
      )}

      <div className="back-link">
        <Link to="/gallery" className="back-to-gallery-btn">Back to Gallery</Link>
      </div>
    </div>
  );
}
