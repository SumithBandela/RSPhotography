import "./contact-us.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import {db,collection,addDoc} from './firebase';
import * as yup from "yup";
export function Contact() {
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      date: dateFunction()
    },
    onSubmit: async (formData,{setTouched}) => {
      setTouched({
        name: true,
        email: true,
        phone: true,
        message: true,
      });
  
      if (!formik.isValid) {
        return; // Stop form submission if validation fails
      }   
      try {
          await addDoc(collection(db,"ClientDetails"),formData);
         alert("Thank you for reaching out! We'll get back to you shortly.");
        navigate("/home");
         }catch(error){
           console.log("Error submitting contact form:", error);
            alert("Something went wrong. Please try again.");
         }
    },
    validationSchema:yup.object({name:yup.string().required('Name required'),email:yup.string().required('Email required').email(),phone:yup.string().required('Mobile required').matches(/^\d{10}$/,'Invalid mobile'),message:yup.string().required('Message required')})
  });

 function dateFunction()
  {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0'); // Get day and pad with 0 if needed
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
  }
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h3 className="contact-title text-primary">Contact Us</h3>
          {formik.values.date}
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
           {formik.touched.name && formik.errors.name && (
                  <span style={{ color: "red" ,textAlign:'left'}}>{formik.errors.name}</span>
                )}   
          <TextField
          type='text'
            label="Email Address"
            variant="outlined"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
          />
            {formik.touched.email && formik.errors.email && (
                  <span style={{ color: "red",textAlign:'left' }}>{formik.errors.email}</span>
                )}         
           <TextField
            label="Phone Number"
            variant="outlined"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            fullWidth
            margin="normal"
          />
 {formik.touched.phone && formik.errors.phone && (
                  <span style={{ color: "red",textAlign:'left'}}>{formik.errors.phone}</span>
                )}             <TextField
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
 {formik.touched.message && formik.errors.message && (
                  <span style={{ color: "red" ,textAlign:'left'}}>{formik.errors.message}</span>
                )}            
            <div>
            <Button type="submit" variant="contained" className="submit-btn mt-2">
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
