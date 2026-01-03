import React from 'react';
import { Phone, Mail, MapPin, Instagram, Heart } from 'lucide-react';
import './Footer.css';

/**
 * Footer Component
 * Features:
 * - Gym logo and tagline
 * - Quick links
 * - Contact information
 * - Social media links
 * - Copyright notice
 */
const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Top */}
        <div className="footer-top">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo-container">
              <img 
                src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg" 
                alt="TTZ Fitness Logo" 
                className="footer-logo"
              />
              <span className="footer-brand-name">TTZ FITNESS</span>
            </div>
            <p className="footer-tagline">Fitness | Focus | Future</p>
            <p className="footer-description">
              Chhatrapati Sambhajinagar's premier fitness destination. 
              Transform your body and mind with expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => scrollToSection('home')} className="footer-link">Home</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('about')} className="footer-link">About Us</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('services')} className="footer-link">Services</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('trainers')} className="footer-link">Trainers</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('membership')} className="footer-link">Membership</button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="footer-link">Contact</button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li className="footer-link">Weight Training</li>
              <li className="footer-link">Cardio</li>
              <li className="footer-link">Personal Training</li>
              <li className="footer-link">Nutrition Plans</li>
              <li className="footer-link">Yoga & Meditation</li>
              <li className="footer-link">Zumba & Aerobics</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-contact">
              <li className="footer-contact-item">
                <Phone size={18} />
                <div>
                  <a href="tel:9028468563" className="footer-contact-link">9028468563</a>
                  <a href="tel:8668891406" className="footer-contact-link">8668891406</a>
                </div>
              </li>
              <li className="footer-contact-item">
                <MapPin size={18} />
                <span>Chhatrapati Sambhajinagar, Maharashtra</span>
              </li>
              <li className="footer-contact-item">
                <Instagram size={18} />
                <a 
                  href="https://www.instagram.com/ttz_fitness_24/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-contact-link"
                >
                  @ttz_fitness_24
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            © 2025 TTZ FITNESS. All rights reserved. Made with <Heart size={16} fill="#d9fb06" color="#d9fb06" /> in Chhatrapati Sambhajinagar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;