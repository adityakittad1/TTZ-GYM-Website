import React from 'react';
import { Phone, MapPin, Instagram, Heart, MessageCircle } from 'lucide-react';
import './Footer.css';

/**
 * Footer — Luxury dark footer
 * All links preserved exactly from original
 */
const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      {/* Gold top border */}
      <div className="footer__top-border" />

      <div className="footer__container">
        {/* ── Main grid ── */}
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo-row">
              <img
                src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg"
                alt="TTZ Fitness logo"
                className="footer__logo"
              />
              <div>
                <div className="footer__logo-name">TTZ FITNESS</div>
                <div className="footer__logo-tagline">Fitness · Focus · Future</div>
              </div>
            </div>
            <p className="footer__desc">
              Chhatrapati Sambhajinagar's premier fitness destination.
              Transform your body and mind with expert guidance.
            </p>
            {/* Social */}
            <div className="footer__socials">
              <a
                href="https://www.instagram.com/ttz_fitness_24/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="TTZ Fitness on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/919028468563"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-btn"
                aria-label="WhatsApp TTZ Fitness"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="tel:9028468563"
                className="footer__social-btn"
                aria-label="Call TTZ Fitness"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Quick Links</h4>
            <ul className="footer__links">
              {['home', 'about', 'services', 'trainers', 'membership', 'gallery', 'contact'].map((id) => (
                <li key={id}>
                  <button onClick={() => scrollToSection(id)} className="footer__link">
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Our Services</h4>
            <ul className="footer__links">
              {['Weight Training', 'Cardio', 'Personal Training', 'Nutrition Plans', 'Yoga & Meditation', 'Zumba & Aerobics'].map((s) => (
                <li key={s} className="footer__link footer__link--static">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-heading">Contact Us</h4>
            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <Phone size={16} className="footer__contact-icon" />
                <div>
                  <a href="tel:9028468563" className="footer__link">9028468563</a>
                  <a href="tel:8668891406" className="footer__link">8668891406</a>
                </div>
              </li>
              <li className="footer__contact-item">
                <MapPin size={16} className="footer__contact-icon" />
                <a
                  href="https://maps.app.goo.gl/DY5aPzJaSD6x7QKH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  Chhatrapati Sambhajinagar, Maharashtra
                </a>
              </li>
              <li className="footer__contact-item">
                <Instagram size={16} className="footer__contact-icon" />
                <a
                  href="https://www.instagram.com/ttz_fitness_24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__link"
                >
                  @ttz_fitness_24
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 TTZ FITNESS. All rights reserved. Made with{' '}
            <Heart size={14} fill="#C9A84C" color="#C9A84C" />{' '}by{' '}
            <a
              href="https://www.linkedin.com/in/aditya-kittad-bbb9532ba/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__credit"
            >
              Aditya Kittad
            </a>
          </p>
          <p className="footer__legal">The Transformation Zone · Est. 2020</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;