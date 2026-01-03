import React, { useState } from 'react';
import GlassCard from './GlassCard';
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram } from 'lucide-react';
import './Contact.css';

/**
 * Contact Section Component
 * Features:
 * - Contact form
 * - Phone numbers with click-to-call
 * - WhatsApp button
 * - Google Maps embedded
 * - Address and timings
 * - Social media link
 */
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create WhatsApp message with form data
    const message = `Hi! I'm ${formData.name}. Phone: ${formData.phone}. Email: ${formData.email}. Message: ${formData.message}`;
    const whatsappUrl = `https://wa.me/919028468563?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Start Your Fitness Journey Today
          </p>
        </div>

        <div className="contact-content">
          {/* Contact Form */}
          <GlassCard className="contact-form-card">
            <h3 className="form-heading">Send Us A Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="form-input"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="Enter your email (optional)"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-textarea"
                  placeholder="Tell us about your fitness goals..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary form-submit-btn">
                <MessageCircle size={20} />
                Send via WhatsApp
              </button>
            </form>
          </GlassCard>

          {/* Contact Info & Map */}
          <div className="contact-info-section">
            {/* Contact Info Cards */}
            <GlassCard className="info-card">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div className="info-content">
                <h4 className="info-title">Call Us</h4>
                <a href="tel:9028468563" className="info-link">9028468563</a>
                <a href="tel:8668891406" className="info-link">8668891406</a>
              </div>
            </GlassCard>

            <GlassCard className="info-card">
              <div className="info-icon">
                <MessageCircle size={24} />
              </div>
              <div className="info-content">
                <h4 className="info-title">WhatsApp</h4>
                <a 
                  href="https://wa.me/919028468563" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-link"
                >
                  Chat with us
                </a>
              </div>
            </GlassCard>

            <GlassCard className="info-card">
              <div className="info-icon">
                <Clock size={24} />
              </div>
              <div className="info-content">
                <h4 className="info-title">Timings</h4>
                <p className="info-text">Morning: 5:00 AM - 10:00 AM</p>
                <p className="info-text">Evening: 5:00 PM - 10:00 PM</p>
              </div>
            </GlassCard>

            <GlassCard className="info-card">
              <div className="info-icon">
                <Instagram size={24} />
              </div>
              <div className="info-content">
                <h4 className="info-title">Follow Us</h4>
                <a 
                  href="https://www.instagram.com/ttz_fitness_24/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-link"
                >
                  @ttz_fitness_24
                </a>
              </div>
            </GlassCard>

            {/* Google Maps */}
            <GlassCard className="map-card">
              <div className="map-header">
                <MapPin size={24} className="map-icon" />
                <h4 className="map-title">Visit Us</h4>
              </div>
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.2867834937736!2d75.32881607507799!3d19.890906581590873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb9860ffad066b%3A0x7c4e02db23c7c5e1!2sTTZ%20FITNESS%2024!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TTZ Fitness Location"
                ></iframe>
              </div>
              <p className="map-address">
                Chhatrapati Sambhajinagar, Maharashtra
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;