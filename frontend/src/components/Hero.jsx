import React, { useState, useEffect, useContext } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import axios from 'axios';
import useSlideshow from '../hooks/useSlideshow';
import { SiteSettingsContext } from '../context/SiteSettingsContext';
import './Hero.css';

/**
 * Hero Section — Cinematic left-aligned layout
 * - Full-viewport crossfade slideshow (5 real gym photos)
 * - Left-anchored content with directional dark gradient
 * - Right-side vertical stat strip (500+ Members, 4+ Years, 10+ Programs)
 * - WhatsApp CTA + secondary CTA preserved exactly
 */

const DEFAULT_HERO_IMAGES = [
  '/images/gym2.png',
  '/images/gym1.png',
  '/images/gym3.png',
  '/images/gym4.png',
  '/images/gym5.png',
];
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `http://${window.location.hostname}:8001`;

const STATS = [
  { value: '500+', label: 'Members' },
  { value: '4+',   label: 'Years' },
  { value: '10+',  label: 'Programs' },
];

const Hero = () => {
  const siteSettings = useContext(SiteSettingsContext);
  const [slideDuration, setSlideDuration] = useState(8000);
  const [heroImages, setHeroImages] = useState(DEFAULT_HERO_IMAGES);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/settings/hero`)
      .then((res) => {
        if (res.data && res.data.slideDuration) {
          setSlideDuration(res.data.slideDuration * 1000);
        }
      })
      .catch((err) => {
        console.error('Failed to fetch hero settings:', err);
      });

    axios.get(`${BACKEND_URL}/api/hero-images`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setHeroImages(res.data.map(img => img.url));
        }
      })
      .catch((err) => {
        console.error('Failed to fetch hero images:', err);
      });
  }, []);

  const { currentIndex, isTransitioning, goTo, pause, resume } = useSlideshow(heroImages, slideDuration);

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
        {heroImages.map((src, i) => (
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
        {/* Cinematic directional overlays */}
        <div className="hero__overlay" />
        <div className="hero__overlay-bottom" />
        <div className="hero__overlay-top" />
      </div>

      {/* ── Left-aligned content ── */}
      <div className="hero__content">

        {/* Eyebrow label */}
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-line" aria-hidden="true" />
          <span className="hero__eyebrow-text">Chhatrapati Sambhajinagar · Est. 2020</span>
        </div>

        {/* Main heading */}
        <h1 className="hero__title">
          THE
          <span className="hero__title-accent">TRANSFORMATION</span>
          ZONE
        </h1>

        {/* Tagline */}
        <p className="hero__tagline">
          Expert coaching, premium equipment, and a community that pushes you further — every single day.
        </p>

        {/* CTA buttons */}
        <div className="hero__actions">
          <a
            href={`https://wa.me/${siteSettings?.whatsappNumber}?text=Hi TTZ Fitness, I would like to book a free trial!`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            id="hero-join-now-btn"
          >
            <MessageCircle size={16} />
            Book a Free Trial
          </a>
          <a
            href={`https://wa.me/${siteSettings?.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            id="hero-whatsapp-btn"
          >
            WhatsApp Us
          </a>
        </div>
      </div>

      {/* ── Right: vertical stat strip ── */}
      <div className="hero__stat-strip" aria-label="Key statistics">
        {STATS.map((s) => (
          <div key={s.label} className="hero__stat">
            <span className="hero__stat-value">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Slide counter (bottom-left) ── */}
      <div className="hero__counter" aria-live="polite" aria-label={`Slide ${currentIndex + 1} of ${heroImages.length}`}>
        <span className="hero__counter-current">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="hero__counter-sep" aria-hidden="true">/</span>
        <span className="hero__counter-total">
          {String(heroImages.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Slideshow dots (bottom-center) ── */}
      <div className="hero__dots" aria-label="Slideshow navigation">
        {heroImages.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === currentIndex ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* ── Scroll indicator (bottom-right) ── */}
      <button className="hero__scroll-indicator" onClick={scrollDown} aria-label="Scroll down">
        <ChevronDown size={18} />
      </button>
    </section>
  );
};

export default Hero;