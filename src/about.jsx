import React from 'react';
import './about.css';

export function About() {
  return (
    <div className="about-container" >
      <h1 className="text-center mb-5 title">About RS Photography</h1>
      
      <p className="lead description">
        At Rashmi Studio's, we believe that every moment holds a story, a memory waiting to be captured. We don’t just take photographs; we create timeless works of art that speak louder than words. Whether it's a joyful wedding, a stunning portrait, or an unforgettable event, we pour our heart and soul into every shot.
      </p>
      
      <p className="philosophy">
        With a keen eye for detail and a passion for creativity, we transform fleeting moments into cherished memories. Our philosophy is simple: <strong>photography is not just about capturing an image, but about preserving an emotion.</strong> From the first click to the final edit, our aim is to craft images that not only reflect the beauty around us but also evoke the feelings and essence of the moment.
      </p>

      <div className="services-section mt-5">
        <h3 className="text-center service-title">Our Services</h3>
        <div className="services-list">
          <div className="service-item">
            <h5 className="service-heading">Wedding Photography</h5>
            <p>Let us capture the magic of your special day, from the tender moments of the ceremony to the joyful celebrations that follow.</p>
          </div>
          <div className="service-item">
            <h5 className="service-heading">Event Photography</h5>
            <p>From corporate events to intimate gatherings, we ensure that every detail is captured with precision and creativity.</p>
          </div>
          <div className="service-item">
            <h5 className="service-heading">Portrait Photography</h5>
            <p>Whether it's for a professional headshot, family portraits, or personal milestones, we bring out your best side.</p>
          </div>
          <div className="service-item">
            <h5 className="service-heading">Product Photography</h5>
            <p>We know how to make your products shine, showcasing them with the perfect blend of lighting, composition, and detail.</p>
          </div>
        </div>
      </div>

      <div className="mt-5 conclusion">
        <p>
          We understand that every story is different, and that's why we work closely with our clients to tailor each session to their vision. Our photography style is a fusion of artistic elegance and modern techniques, designed to bring your vision to life in the most breathtaking way.
        </p>
        <p>
          Join us on a journey through the lens. Let us help you relive the most beautiful moments of your life, one photograph at a time. Because at Rashmi Studio's, <strong>every picture tells a story – your story.</strong>
        </p>
      </div>
    </div>
  );
}