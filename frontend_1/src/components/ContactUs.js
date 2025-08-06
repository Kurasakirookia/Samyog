import React, { useState } from 'react';
import axios from 'axios';
import "../css/ContactUs.css";
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  


    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to submit the form.");
      return;
    }

    try {
      const authHeader = () => {
        const token = localStorage.getItem("token");
        return { Authorization: `Bearer ${token}` };
      };

      // Get current user info to verify authentication and get user details
      const res = await axios.get("http://localhost:5001/api/auth/current", {
        headers: authHeader(),
        withCredentials: false,
      });

      const currentUser = res.data;

      // Prevent admins from sending messages
      if (currentUser.role === 'admin') {
        toast.error("Admins can't send a message.");
        return;
      }

      // 2. Send message to backend to mail
      await axios.post("http://localhost:5001/api/contact/send", {
        name: currentUser.name,
        email: currentUser.email,
        description: formData.message,
      }, {
        headers: authHeader(),
        withCredentials: false,
      });

      alert("Message sent successfully!");
      setFormData({ name: '', phone: '', email: '', message: '' });

    } catch (err) {
      console.error("Error response:", err?.response?.data);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div id='contact_us_container'>
      <div className="contact_info">
        <div className="info contact">
          <h1 className='texth'>Contact</h1>
          <p className='texts'>Feel free to drop us a message using the form below.</p>
        </div>
        <div className="info email">
          <h1 className='textm'>e-mail</h1>
          <p id='email'>admin@example.com</p>
        </div>
      </div>

      <div className="contact_us_form">
        <div className='rounded_container'>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h1 className='texth'>CONTACT FORM</h1>
            <input
              className='texts'
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              placeholder="Message"
              name="message"
              rows="8"
              id='form_msg'
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
