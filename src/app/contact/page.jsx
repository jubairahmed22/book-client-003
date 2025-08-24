"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import logo from '../../assets/book_forest.png';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaPhoneAlt, FaClock, FaMapMarkerAlt, FaEnvelope, FaTiktok } from 'react-icons/fa';
import {  FaXTwitter } from 'react-icons/fa6';

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const socialLinks = [
    { icon: <FaFacebook size={24} />, url: "https://www.facebook.com/profile.php?id=61571047718168&rdid=bn7i0Ydnh3ytv117&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CNTmoEddS%2F#" },
    { icon: <FaInstagram size={24} />, url: "https://www.instagram.com/bookforest2025?utm_source=qr&igsh=MWh2cTUydmFvd2IwaQ%3D%3D" },
    { icon: <FaLinkedin size={24} />, url: "https://www.linkedin.com/in/book-forest-27502b379/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
    { icon: <FaXTwitter size={24} />, url: "https://x.com/BookForest2025?t=6H2hD3PaUSou4-kFFN_X9g&s=09" },
    { icon: <FaTiktok size={24} />, url: "https://www.tiktok.com/@book.forest2?_t=ZS-8yeKXSCgzGE&_r=1", name: "TikTok" },

  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "mukulbabu.ru@gmail.com",
    subject: "",
    message: "",
    formEmail: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    // Basic validation
    if (!formData.email || !formData.subject) {
      setStatus({ type: "error", message: "Email and subject are required." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/sent-customer-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        setFormData({
          name: "",
          email: "mukulbabu.ru@gmail.com",
          subject: "",
          message: "",
          formEmail: "",
          phone: "",
          address: "",
        });
      } else {
        setStatus({ type: "error", message: data.message || "Something went wrong." });
      }
    } catch (error) {
      setStatus({ type: "error", message: "Failed to send message." });
    }

    setLoading(false);
  };

  return (
    <div className='min-h-screen bg-white max-w-[1400px] mx-auto py-10 px-4'>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-12"
      >
        <Image 
          src={logo} 
          alt="Book Forest Logo" 
          width={180} 
          height={180}
          className="object-contain"
        />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-4xl font-bold text-center mb-16 text-gray-800"
      >
        Contact <span className="text-[#50C878]">Book Forest</span>
      </motion.h1>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid  md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
      >
        {/* Address Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#50C878]"
        >
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-[#50C878]/10 mr-4">
              <FaMapMarkerAlt className="text-[#50C878]" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Our Location</h3>
          </div>
          <p className="text-gray-600 pl-14">Octroy Mor, Kazla, Rajshahi-6204<br />(Beside University of Rajshahi)</p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#50C878]"
        >
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-[#50C878]/10 mr-4">
              <FaPhoneAlt className="text-[#50C878]" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Contact Us</h3>
          </div>
          <p className="text-gray-600 pl-14">
            <a href="tel:01734346050" className="hover:text-[#50C878] transition">01734346050</a><br />
            <a href="mailto:info@bookforest.com" className="hover:text-[#50C878] transition">info@bookforest.com</a>
          </p>
        </motion.div>

        {/* Hours Card */}
        {/* <motion.div
          variants={itemVariants}
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-[#50C878]"
        >
          <div className="flex items-center mb-4">
            <div className="p-3 rounded-full bg-[#50C878]/10 mr-4">
              <FaClock className="text-[#50C878]" size={20} />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">Opening Hours</h3>
          </div>
          <p className="text-gray-600 pl-14">
            Sunday - Friday: 9:00 - 20:00<br />
            Saturday: 11:00 - 15:00
          </p>
        </motion.div> */}
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Connect With Us</h3>
        <div className="flex justify-center space-x-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, color: "#50C878" }}
              className="text-gray-600 hover:text-[#50C878] transition-colors duration-300"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Contact Form */}
       <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="max-w-3xl mx-auto mt-20 bg-white "
    >
      <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Send Us a Message</h3>

      {status.message && (
        <div
          className={`mb-4 p-3 rounded text-center ${
            status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878] focus:border-transparent"
              placeholder="Your name"
            />
          </div>

        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878] focus:border-transparent"
            placeholder="Subject"
          />
        </div>
                {/* Optional extra fields */}
        <div className='grid grid-cols-2 gap-5'>
            <div>
          <label htmlFor="formEmail" className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            id="formEmail"
            value={formData.formEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878] focus:border-transparent"
            placeholder="Your contact email"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
          <input
            type="text"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878] focus:border-transparent"
            placeholder="Your phone number"
          />
        </div>
        </div>
        <div>
          <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878] focus:border-transparent"
            placeholder="Your address"
          />
        </div>


        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
          <textarea
            id="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#50C878] focus:border-transparent"
            placeholder="Your message"
          ></textarea>
        </div>


        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "#3BAF6A" }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full bg-[#50C878] text-white py-3 px-6 rounded-md font-medium transition-colors duration-300"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </form>
    </motion.div>
    </div>
  );
};

export default ContactPage;