import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './gallery.css';

export function Gallery() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("images.json")
      .then(response => {
        setAlbums(response.data.albums);
      })
      .catch(error => console.error("Error fetching albums:", error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/gallery/${id}`);
  };

  return (
    <div className="image-gallery-container">
      {albums.map(album => (
        <div key={album.id} className="card" onClick={() => handleCardClick(album.id)}>
          <div className="card-body">
            <img src={album.img_src} alt={album.title} className="album-image" />
            <h3 className="album-title">{album.title || "Untitled Album"}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
