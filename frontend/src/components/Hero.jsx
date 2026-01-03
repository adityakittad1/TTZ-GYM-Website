import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import './Hero.css';

/**
 * Hero Section Component
 * Main landing section with:
 * - Background image with dark overlay
 * - Gym name and tagline
 * - Call to action buttons (Call, WhatsApp)
 * - Glassmorphism effect
 */
const Hero = () => {
  return (
    <section id="home" className="hero-section">
      {/* Background Image with Overlay */}
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80" 
          alt="TTZ Fitness Gym" 
          className="hero-image"
        />
        <div className="hero-overlay"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="hero-glass-card">
          {/* Gym Logo */}
          <div className="hero-logo-container">
            <img 
              src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg" 
              alt="TTZ Fitness Logo" 
              className="hero-logo"
            />
          </div>

          {/* Main Heading */}
          <h1 className="hero-title">
            THE TRANSFORMATION ZONE
          </h1>

          {/* Tagline */}
          <p className="hero-tagline">
            Fitness | Focus | Future
          </p>

          <p className="hero-subtitle">
            Chhatrapati Sambhajinagar's Premier Fitness Destination Since 2020
          </p>

          {/* Call to Action Buttons */}
          <div className="hero-cta-buttons">
            <a href="tel:9028468563" className="btn-primary hero-btn">
              <Phone size={20} />
              Call Now
            </a>
            <a 
              href="https://wa.me/919028468563" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary hero-btn"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>

          {/* Contact Numbers */}
          <div className="hero-contact-numbers">
            <a href="tel:9028468563" className="contact-number">9028468563</a>
            <span className="contact-divider">|</span>
            <a href="tel:8668891406" className="contact-number">8668891406</a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Hero;