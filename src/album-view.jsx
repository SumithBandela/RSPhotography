import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import './album-view.css';
import { ReactCards } from "./react-cards";
export function AlbumView() {
  const { title } = useParams();  
  const[album,setAlbum] = useState([]); 
  const [images, setImages] = useState([]);
 

  useEffect(() => {
    // Fetch all albums and filter by the provided 'id'
    axios.get("images.json")  // Assuming 'collections.json' has all albums
      .then(response => {
        // Find the album by matching the 'id'
        const selectedAlbum = response.data.albums.find(a => a.title.toString() === title);
        
        if (selectedAlbum) {
          setAlbum(selectedAlbum);
          setImages(selectedAlbum.photos)  // Set the album data if found
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

        <ReactCards images={images}/>

      <div className="back-link">
        <Link to="/gallery" className="back-to-gallery-btn">Back to Gallery</Link>
      </div>
    </div>
  );
}
