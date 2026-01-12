import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./Contact.css";
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function Contact() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;
      try {
        const response = await api.get("/user");
        if (response.data) {
          setIsLoggedIn(true);
          setFormData({
            name: `${response.data.first_name} ${response.data.last_name}`,
            email: response.data.email,
            message: "",
          });
        }
      } catch (err) {
        console.error("Failed fetching user data", err);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/contact", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Failed to send message", err);
      alert("Failed to send message. Please try again later.");
    }
  };
  return (
    <div className="contact">
      <Navbar />
      <div className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-welcome">
          <p>
            Welcome to WatchLuxe, your premier destination for luxury watches.
            We're here to assist you with any inquiries, orders, or feedback.
            Whether you're looking for product recommendations or need help with
            an existing order, our team is ready to help.
          </p>
        </div>
        <div className="contact-details">
          <h2>Our Contact Details</h2>
          <div className="contact-group">
            <h4>Email:</h4>
            <p>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@watchluxe.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                support@watchluxe.com
              </a>
            </p>
          </div>

          <div className="contact-group">
            <h4>Phone:</h4>
            <p>+63 1234 567 890 (Available Monday to Friday, 9AM - 5PM)</p>
          </div>
          <div className="contact-group">
            <h4>Address:</h4>
            <p>123 Street, Example</p>
          </div>
          <div className="contact-group">
            <h4>Social Media:</h4>
            <p>
              Follow us on{" "}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              ,{" "}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              , or{" "}
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>{" "}
              for the latest updates.
            </p>
          </div>
        </div>
        <div className="send-message">
          <h2>Send Us a Message</h2>
          <div className="message-group">
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={isLoggedIn}
              required={!isLoggedIn}
            />
          </div>
          <div className="message-group">
            <label htmlFor="emal">Your Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={isLoggedIn}
              required={!isLoggedIn}
            />
          </div>
          <div className="message-group">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button className="submit-msg" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
