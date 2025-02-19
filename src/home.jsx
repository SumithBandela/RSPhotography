import './home.css';
import { ReactCarousel } from "./react-carousel";
import { ReactCards } from "./react-cards";

export function Home() {

  return (
    <div className=" home-container">
      <div className="container-fluid p-4">
        {/* Hero Section */}
        <div className="hero-section row align-items-center mb-5">
          <div className="col-md-6 col-sm-12">
            <h1>Rashmi Studio's</h1>
            <span className="bi bi-geo-alt text-danger fs-5 me-1"></span>
            <a className="text-black fs-5 text-decoration-none" href="https://maps.app.goo.gl/thrukEr9zSRujThHA" target="_blank" rel="noopener noreferrer">Hyderabad</a>
            <p className="text-muted fs-5 mt-4 font-arial">Where Moments Become Memories</p>
            <p className="lead">Capturing life’s most precious moments with passion and creativity. Whether it's a wedding, a portrait, or an event, every click tells a unique story.</p>
          </div>
        </div>

        <div>
          <ReactCarousel />
        </div>
        <div className="mt-5">
          <ReactCards/>
        </div>

        {/* About Section */}
        <div className="about-section mt-5">
          <div className="card p-4 shadow-sm rounded">
            <h3 className="text-center mb-4">About Us</h3>
            <p className="lead text-muted">
              At Rashmi Studio's, we believe that every moment holds a story, a memory waiting to be captured. We don’t just take photographs; we create timeless works of art that speak louder than words.
            </p>
            <p className="text-muted">
              Whether it's a joyful wedding, a stunning portrait, or an unforgettable event, we pour our heart and soul into every shot.
            </p>

            {/* Our Services Section */}
            <div className="mt-4">
              <h4 className="mb-3">Our Services</h4>
              <ul className=" text">
                <li>Wedding Photography - Capturing the magic of your special day.</li>
                <li>Event Photography - Corporate events to intimate gatherings, we capture it all.</li>
                <li>Portrait Photography - Perfect headshots, family portraits, or milestones.</li>
                <li>Product Photography - Showcase your products with perfect lighting and angles.</li>
              </ul>
            </div>

            {/* Why Choose Us Section */}
            <div className="mt-4">
              <h4 className="mb-3">Why Choose Us?</h4>
              <p>
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
