import React, { useState } from 'react';
import { Phone, MapPin, Instagram, MessageCircle, Clock, Heart } from 'lucide-react';
import './ContactFooter.css';

/**
 * ContactFooter — Contact form + Footer merged into one dark section.
 * Replaces separate Contact section + separate Footer.
 * All original links and form functionality preserved exactly.
 */
const ContactFooter = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open('https://wa.link/z36oiv', '_blank');
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const NAV_LINKS = ['about', 'services', 'trainers', 'membership', 'gallery', 'testimonials'];

  return (
    <footer id="contact" className="contact-footer">

      {/* ── Upper: Contact ── */}
      <div className="cf__contact">
        <div className="cf__contact-inner">

          {/* Form */}
          <div className="cf__form-col">
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="cf__contact-title">Start Your Journey</h2>
            <form
              onSubmit={handleSubmit}
              className="cf__form"
              id="contact-form"
            >
              <div className="cf__row">
                <div className="cf__field">
                  <label htmlFor="cf-name" className="cf__label">Full Name *</label>
                  <input
                    type="text" id="cf-name" name="name"
                    className="cf__input" placeholder="Your name"
                    value={form.name} onChange={onChange} required autoComplete="name"
                  />
                </div>
                <div className="cf__field">
                  <label htmlFor="cf-phone" className="cf__label">Phone *</label>
                  <input
                    type="tel" id="cf-phone" name="phone"
                    className="cf__input" placeholder="Your number"
                    value={form.phone} onChange={onChange} required autoComplete="tel"
                  />
                </div>
              </div>
              <div className="cf__field">
                <label htmlFor="cf-message" className="cf__label">Message (optional)</label>
                <textarea
                  id="cf-message" name="message"
                  className="cf__textarea" rows="3"
                  placeholder="Your fitness goals..."
                  value={form.message} onChange={onChange}
                />
              </div>
              <button type="submit" className="cf__submit" id="contact-submit-btn">
                <MessageCircle size={16} />
                Send via WhatsApp
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="cf__info-col">

            <div className="cf__info-item">
              <Phone size={16} className="cf__info-icon" />
              <div>
                <div className="cf__info-label">Call Us</div>
                <a href="tel:9028468563" className="cf__info-link">9028468563</a>
                <a href="tel:8668891406" className="cf__info-link">8668891406</a>
              </div>
            </div>

            <div className="cf__info-item">
              <MessageCircle size={16} className="cf__info-icon" />
              <div>
                <div className="cf__info-label">WhatsApp</div>
                <a
                  href="https://wa.me/919028468563"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cf__info-link"
                >
                  Chat with us
                </a>
              </div>
            </div>

            <div className="cf__info-item">
              <Clock size={16} className="cf__info-icon" />
              <div>
                <div className="cf__info-label">Timings</div>
                <span className="cf__info-text">Morning: 5:00 – 10:00 AM</span>
                <span className="cf__info-text">Evening: 5:00 – 10:00 PM</span>
              </div>
            </div>

            <div className="cf__info-item">
              <MapPin size={16} className="cf__info-icon" />
              <div>
                <div className="cf__info-label">Location</div>
                <a
                  href="https://maps.app.goo.gl/DY5aPzJaSD6x7QKH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cf__info-link"
                >
                  Satara Parisar, Chhatrapati Sambhajinagar
                </a>
              </div>
            </div>

            <div className="cf__info-item">
              <Instagram size={16} className="cf__info-icon" />
              <div>
                <div className="cf__info-label">Instagram</div>
                <a
                  href="https://www.instagram.com/ttz_fitness_24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cf__info-link"
                >
                  @ttz_fitness_24
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── Lower: Footer bar ── */}
      <div className="cf__footer">
        <div className="cf__footer-inner">

          {/* Brand */}
          <div className="cf__brand">
            <img
              src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg"
              alt="TTZ Fitness"
              className="cf__brand-logo"
            />
            <div>
              <div className="cf__brand-name">TTZ FITNESS</div>
              <div className="cf__brand-tag">Fitness · Focus · Future</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="cf__nav" aria-label="Footer navigation">
            {NAV_LINKS.map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="cf__nav-link">
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </button>
            ))}
          </nav>

          {/* Social + copyright */}
          <div className="cf__right">
            <div className="cf__socials">
              <a href="https://www.instagram.com/ttz_fitness_24/" target="_blank" rel="noopener noreferrer" className="cf__social" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://wa.me/919028468563" target="_blank" rel="noopener noreferrer" className="cf__social" aria-label="WhatsApp">
                <MessageCircle size={16} />
              </a>
              <a href="tel:9028468563" className="cf__social" aria-label="Phone">
                <Phone size={16} />
              </a>
            </div>
            <p className="cf__copy">
              © 2026 TTZ FITNESS · Made with <Heart size={12} fill="#C9A84C" color="#C9A84C" /> by{' '}
              <a href="https://www.linkedin.com/in/aditya-kittad-bbb9532ba/" target="_blank" rel="noopener noreferrer" className="cf__credit">
                Aditya Kittad
              </a>
            </p>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default ContactFooter;
