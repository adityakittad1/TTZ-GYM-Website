import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, Instagram } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Contact.css';

/**
 * Contact — Clean form + prominent action links.
 * All original integrations preserved exactly:
 * - Form → opens WhatsApp (wa.link/z36oiv)
 * - Phone: 9028468563, 8668891406
 * - WhatsApp: wa.me/919028468563
 * - Google Maps link
 * - Instagram: ttz_fitness_24
 * - Timings: 5–10 AM / 5–10 PM
 */
const Contact = () => {
  const ref = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open('https://wa.link/z36oiv', '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const INFO = [
    {
      icon: <Phone size={18} />,
      title: 'Call Us',
      content: (
        <>
          <a href="tel:9028468563" className="contact__info-link">9028468563</a>
          <a href="tel:8668891406" className="contact__info-link">8668891406</a>
        </>
      ),
    },
    {
      icon: <MessageCircle size={18} />,
      title: 'WhatsApp',
      content: (
        <a href="https://wa.me/919028468563" target="_blank" rel="noopener noreferrer" className="contact__info-link">
          Chat with us on WhatsApp
        </a>
      ),
    },
    {
      icon: <Clock size={18} />,
      title: 'Timings',
      content: (
        <>
          <span className="contact__info-text">Morning: 5:00 AM – 10:00 AM</span>
          <span className="contact__info-text">Evening: 5:00 PM – 10:00 PM</span>
        </>
      ),
    },
    {
      icon: <Instagram size={18} />,
      title: 'Instagram',
      content: (
        <a href="https://www.instagram.com/ttz_fitness_24/" target="_blank" rel="noopener noreferrer" className="contact__info-link">
          @ttz_fitness_24
        </a>
      ),
    },
    {
      icon: <MapPin size={18} />,
      title: 'Location',
      content: (
        <a
          href="https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyCggAEEUYFhgeGDkyCAgBEAAYFhgeMg0IAhAAGIYDGIAEGIoFMg0IAxAAGIYDGIAEGIoFMgoIBBAAGIAEGKIEMgoIBRAAGIAEGKIEMgcIBhAAGO8FMgoIBxAAGIAEGKIE0gEIMzc4OGowajSoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KfUHz6KEmds7MZui6ltRJ_1G&daddr=11,+Gut+No.+142,+Plot+no-+77,+18,+near+Ayyappa+Swami+Temple,+Satara+Parisar,+Chhatrapati+Sambhajinagar,+Maharashtra+431010"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__info-link"
        >
          Satara Parisar, Chhatrapati Sambhajinagar
        </a>
      ),
    },
  ];

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="section-container">

        {/* Header */}
        <div className="section-header contact__header reveal">
          <span className="section-eyebrow">Get In Touch</span>
          <h2 className="section-title">Start Your Journey</h2>
          <p className="section-subtitle">
            Questions? We'd love to hear from you. Send a message and we'll respond via WhatsApp.
          </p>
          <div className="gold-divider" />
        </div>

        {/* 2-col layout */}
        <div className="contact__layout">

          {/* Form */}
          <div className="contact__form-wrap reveal-left">
            <h3 className="contact__form-heading">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="contact__form" id="contact-form">
              <div className="contact__field">
                <label htmlFor="name" className="contact__label">Full Name *</label>
                <input
                  type="text" id="name" name="name"
                  className="contact__input" placeholder="Your name"
                  value={formData.name} onChange={handleChange}
                  required autoComplete="name"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="phone" className="contact__label">Phone Number *</label>
                <input
                  type="tel" id="phone" name="phone"
                  className="contact__input" placeholder="Your phone number"
                  value={formData.phone} onChange={handleChange}
                  required autoComplete="tel"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email" className="contact__label">Email (optional)</label>
                <input
                  type="email" id="email" name="email"
                  className="contact__input" placeholder="your@email.com"
                  value={formData.email} onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              <div className="contact__field">
                <label htmlFor="message" className="contact__label">Message</label>
                <textarea
                  id="message" name="message"
                  className="contact__textarea"
                  placeholder="Tell us about your fitness goals..."
                  rows="4"
                  value={formData.message} onChange={handleChange}
                />
              </div>
              <button type="submit" className="contact__submit" id="contact-submit-btn">
                <MessageCircle size={16} />
                Send via WhatsApp
              </button>
            </form>
          </div>

          {/* Info + actions */}
          <div className="contact__info reveal-right">

            {INFO.map((item) => (
              <div key={item.title} className="contact__info-item">
                <div className="contact__info-icon-wrap">{item.icon}</div>
                <div className="contact__info-body">
                  <h4 className="contact__info-title">{item.title}</h4>
                  <div>{item.content}</div>
                </div>
              </div>
            ))}

            {/* Prominent action links */}
            <div className="contact__actions">
              <a
                href="https://maps.app.goo.gl/DY5aPzJaSD6x7QKH9"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__action-link"
                id="contact-directions-btn"
              >
                <MapPin size={16} /> Get Directions →
              </a>
              <a
                href="tel:9028468563"
                className="contact__action-link"
                id="contact-call-btn"
              >
                <Phone size={16} /> Call Now →
              </a>
              <a
                href="https://wa.me/919028468563"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__action-link"
                id="contact-wa-btn"
              >
                <MessageCircle size={16} /> WhatsApp TTZ →
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;