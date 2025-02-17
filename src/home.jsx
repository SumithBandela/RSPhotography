import axios from "axios";
import { useEffect, useState } from "react";
import './home.css';
import { Carousel } from "./carousel";
import { useNavigate } from "react-router-dom";

export function Home() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("images.json")
      .then(response => {
        setImages(response.data.images);
        console.log(response.data.images)
      })
      .catch(error => {
        console.error("Error fetching images:", error);
      });
  }, []);

  const handleImageClick = (id) => {
    navigate(`/home/${id}`);
  };

  return (
    <div>
      <div className="container-fluid p-4">
        {/* Hero Section */}
        <div className="hero-section row align-items-center mb-5">
          <div className="col-md-6 col-sm-12">
            <h1 className="font-arial">Rashmi Studio's</h1>
            <span className="bi bi-geo-alt text-danger fs-5 me-1"></span>
            <a className="text-black fs-5 text-decoration-none font-arial" href="https://maps.app.goo.gl/thrukEr9zSRujThHA" target="_blank" rel="noopener noreferrer">Hyderabad</a>
            <p className="text-muted fs-5 mt-4 font-arial">Where Moments Become Memories</p>
            <p className="lead font-arial">Capturing life’s most precious moments with passion and creativity. Whether it's a wedding, a portrait, or an event, every click tells a unique story.</p>
          </div>
          <div className="col-md-6 col-sm-12 text-center">
            <img src="images/Logo.jpeg" alt="Studio" className="img-fluid rounded hero-image" />
          </div>
        </div>

        <div>
          <Carousel />
        </div>

        {/* Image Collection */}
        <div className="image-collection p-3">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 mt-2">
            {images.map((image) => (
              <div key={image.img_src} className="col">
                <img
                  src={image.img_src}
                  className="creative-img img-thumbnail"
                  alt="studio"
                  onClick={() => handleImageClick(image.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Contact and Google Map Section */}
        <div className="row mt-5 justify-content-center">
          <div className="col-md-6">
            <div className="card m-2 p-4 shadow-lg">
              <div className="card-img-top">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3809.152160083092!2d78.51406897493283!3d17.30820608356551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba340e911bbb1%3A0x48d09e53ee22ad93!2sRS%20Photography!5e0!3m2!1sen!2sin!4v1738002340750!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Address">
                </iframe>
              </div>
              <div className="card-body">
                <p className="fw-bold font-arial">15-92/A BDL Colony, Phase 2, Sai Nagar Colony, Badangpet, Hyderabad, Telangana 500005</p>
                <p className="font-arial">Mon-Sun: 09:00 AM - 07:00 PM</p>
                <p className="font-arial">Phone: +91 970 599 7571</p>
                <p className="font-arial">Email: contactrsphoto@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="about-section mt-5">
          <div className="card p-4 shadow-sm rounded">
            <h3 className="text-center mb-4 font-arial">About Us</h3>
            <p className="lead text-muted font-arial">
              At Rashmi Studio's, we believe that every moment holds a story, a memory waiting to be captured. We don’t just take photographs; we create timeless works of art that speak louder than words.
            </p>
            <p className="text-muted font-arial">
              Whether it's a joyful wedding, a stunning portrait, or an unforgettable event, we pour our heart and soul into every shot.
            </p>

            {/* Our Services Section */}
            <div className="mt-4">
              <h4 className="mb-3 font-arial">Our Services</h4>
              <ul className="font-arial">
                <li>Wedding Photography - Capturing the magic of your special day.</li>
                <li>Event Photography - Corporate events to intimate gatherings, we capture it all.</li>
                <li>Portrait Photography - Perfect headshots, family portraits, or milestones.</li>
                <li>Product Photography - Showcase your products with perfect lighting and angles.</li>
              </ul>
            </div>

            {/* Why Choose Us Section */}
            <div className="mt-4">
              <h4 className="mb-3 font-arial">Why Choose Us?</h4>
              <p className="font-arial">
                We blend creativity, technical expertise, and a personalized approach to deliver extraordinary results. Trust us to create beautiful memories that will last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="text-center py-3 mt-5 bg-dark text-white font-arial">
        <p>&copy; 2025 Rashmi Studio's | All Rights Reserved</p>
        <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 fs-3 text-primary">
        <i className="bi bi-facebook"></i>
        </a>
        <a href="https://www.instagram.com/rs_officialphotography" target="_blank" rel="noopener noreferrer" className="mx-2 fs-3 text-white">
        <i className="bi bi-instagram"></i>
        </a>
        <a href="https://youtube.com/@rsphotographyyy" target="_blank" rel="noopener noreferrer" className="mx-2 fs-3 text-danger">
        <i className="bi bi-youtube"></i>
        </a>
        </div>
        <p>Email: contactrsphoto@gmail.com | Phone: +91 970 599 7571</p>
      </footer>
    </div>
  );
}
