import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './album-view.css';
export function AlbumView() {
  const { id } = useParams();  
  const [album, setAlbum] = useState(null);

  useEffect(() => {
    // Fetch all albums and filter by the provided 'id'
    axios.get("images.json")  // Assuming 'collections.json' has all albums
      .then(response => {
        // Find the album by matching the 'id'
        const selectedAlbum = response.data.albums.find(a => a.id.toString() === id);
        
        if (selectedAlbum) {
          setAlbum(selectedAlbum);  // Set the album data if found
        } else {
          console.error("Album not found for id:", id);  // Log if album isn't found
        }
      })
      .catch(error => console.error("Error fetching album details:", error));
  }, [id]);

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

      <div className="photos-grid">
        {album.photos && album.photos.length > 0 ? (
          album.photos.map((photo, index) => (
            <div key={index} className="photo-card">
              <img src={photo.img_src} alt="img" className="photo-image img-thumbnail" />
            </div>
          ))
        ) : (
          <p>No photos available.</p>
        )}
      </div>
      <div className="back-link">
        <Link to="/gallery" className="back-to-gallery-btn">Back to Gallery</Link>
      </div>
    </div>
  );
}
