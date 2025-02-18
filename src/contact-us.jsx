import React from "react";
import "./contact-us.css";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";

export function Contact() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    onSubmit: async (formData) => {
      try {
        await axios.post(`http://127.0.0.1:7070/contact`, formData);
        alert("Thank you for reaching out! We'll get back to you shortly.");
        navigate("/home");
      } catch (error) {
        console.error("Error submitting contact form:", error);
        alert("Something went wrong. Please try again.");
      }
    },
  });

  return (
    <div className="contact-container">
      <div className="contact-card ">
        <h3 className="contact-title text-primary" >Contact Us</h3>

        {/* Contact Form */}
        <form onSubmit={formik.handleSubmit} className="contact-form">
          <TextField
            label="Full Name"
            variant="outlined"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email Address"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Your Message"
            variant="outlined"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <div>
          <Button type="submit" variant="contained" className="submit-btn p-2 rounded rounded-5 mt-3">
            Submit
          </Button>
          </div>
          
    
         
        </form>

        {/* Contact Information */}
        <div className="contact-info">
          <h4>Our Location</h4>
          <p>15-92/A BDL Colony, Phase 2, Sai Nagar Colony, Badangpet, Hyderabad, Telangana 500005</p>

          <h4>Working Hours</h4>
          <p>Monday to Sunday: 09:00 AM - 07:00 PM</p>
          <h4>Contact Number</h4>
          <p>+91 970 599 7571</p>

          <h4>Email</h4>
          <p>contactrsphoto@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
