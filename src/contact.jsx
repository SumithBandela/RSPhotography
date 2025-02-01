import React from "react";
import './contact.css';
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Contact() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      message:''
    },
    onSubmit:(formData)=>{
      axios.post(`http://127.0.0.1:7070/contact`,formData);
      alert("Thank you for reaching out! We'll get back to you shortly.");
      navigate('/home');
    }
  })
  return (
    <div className="container " >
      <div className="card p-5 shadow-lg">
        <h3 className="text-center mb-4 text-primary">Contact Us</h3>
        
        {/* Contact Form */}
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="form-label text-dark">Full Name</label>
            <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" onChange={formik.handleChange} required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="form-label text-dark">Email Address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={formik.handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="form-label text-dark">Phone Number</label>
            <input type="tel" className="form-control" id="phone" name="phone" placeholder="Enter your phone number" onChange={formik.handleChange} />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="form-label text-dark">Your Message</label>
            <textarea className="form-control" id="message"  name="message" rows="4" placeholder="Write your message here" onChange={formik.handleChange}></textarea>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-lg">Submit</button>
          </div>
        </form>

        {/* Contact Information */}
        <div className="mt-5">
          <h4 className="text-dark mb-3">Our Location</h4>
          <p className="text-muted">15-92/A BDL Colony, Phase 2, Sai Nagar Colony, Badangpet, Hyderabad, Telangana 500005</p>
          
          <h4 className="text-dark mb-3">Working Hours</h4>
          <p className="text-muted">Monday to Saturday: 09:00 AM - 18:00 PM</p>
          <p className="text-muted">Sunday: Closed</p>

          <h4 className="text-dark mb-3">Contact Number</h4>
          <p className="text-muted">+91 970 599 7571</p>

          <h4 className="text-dark mb-3">Email</h4>
          <p className="text-muted">contactrsphoto@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
