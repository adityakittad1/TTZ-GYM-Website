import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, ChevronDown } from 'lucide-react';
import axios from 'axios';
import useSlideshow from '../hooks/useSlideshow';
import './Hero.css';

/**
 * Hero Section — Full-viewport crossfade slideshow
 * - 5 real gym photos auto-advance every 6s
 * - Dark gradient overlay for readability
 * - Bebas Neue display heading
 * - WhatsApp CTA + phone links preserved exactly
 */

const HERO_IMAGES = [
  '/images/gym2.png',
  '/images/gym1.png',
  '/images/gym3.png',
  '/images/gym4.png',
  '/images/gym5.png',
];
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `http://${window.location.hostname}:8001`;

const Hero = () => {
  const [slideDuration, setSlideDuration] = useState(8000);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/settings/hero`)
      .then((res) => {
        if (res.data && res.data.slideDuration) {
          // Admin saves in seconds, we need milliseconds
          setSlideDuration(res.data.slideDuration * 1000);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch hero settings:', err);
      });
  }, []);

  const { currentIndex, isTransitioning, goTo, pause, resume } = useSlideshow(HERO_IMAGES, slideDuration);

  const scrollDown = () => {
    const about = document.getElementById('about');
    if (about) about.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="hero"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* ── Background Slideshow ── */}
      <div className="hero__slideshow" aria-hidden="true">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`hero__slide ${i === currentIndex ? 'hero__slide--active' : ''} ${
              i === currentIndex && isTransitioning ? 'hero__slide--transitioning' : ''
            }`}
          >
            <img
              src={src}
              alt={`TTZ Fitness gym ${i + 1}`}
              className="hero__slide-img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </div>
        ))}
        {/* Multi-layer dark gradient overlay */}
        <div className="hero__overlay" />
        <div className="hero__overlay-bottom" />
      </div>

      {/* ── Content ── */}
      <div className="hero__content">

        {/* Main heading */}
        <h1 className="hero__title">
          THE
          <br />
          <span className="hero__title-accent">TRANSFORMATION</span>
          <br />
          ZONE
        </h1>

        {/* Tagline */}
        <p className="hero__tagline">Fitness  ·  Focus  ·  Future</p>

        {/* CTA buttons */}
        <div className="hero__actions">
          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hero__btn-primary"
            id="hero-join-now-btn"
          >
            <MessageCircle size={18} />
            Book a Free Trial
          </a>
          <a
            href="https://wa.me/919028468563"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hero__btn-secondary"
            id="hero-whatsapp-btn"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── Slide counter ── */}
      <div className="hero__counter" aria-live="polite" aria-label={`Slide ${currentIndex + 1} of ${HERO_IMAGES.length}`}>
        <span className="hero__counter-current">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="hero__counter-sep" aria-hidden="true">/</span>
        <span className="hero__counter-total">
          {String(HERO_IMAGES.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Slideshow Dots ── */}
      <div className="hero__dots" aria-label="Slideshow navigation">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === currentIndex ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <button className="hero__scroll-indicator" onClick={scrollDown} aria-label="Scroll down">
        <ChevronDown size={20} />
      </button>
    </section>
  );
};

export default Hero;