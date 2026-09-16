import React, { useState, useEffect, useContext, useRef } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useSlideshow from '../hooks/useSlideshow';
import { SiteSettingsContext } from '../context/SiteSettingsContext';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section — Cinematic full-viewport experience
 *
 * GSAP staged entrance timeline (fires once, after preloader exits):
 *   t=0.0  Eyebrow     — clip-path wipe left→right
 *   t=0.2  "THE"       — translateY + opacity (expo out)
 *   t=0.4  "TRANSFORMATION" — staggered after
 *   t=0.55 "ZONE"      — staggered after
 *   t=0.7  Tagline     — fade + slide
 *   t=0.85 CTA buttons — stagger
 *   t=1.0  Stat strip  — stagger from right
 *   t=1.1  Counter, dots, scroll-indicator — fade
 *
 * ScrollTrigger parallax: background scrolls at 0.35x, content fades out.
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

  const heroRef          = useRef(null);
  const slideshowRef     = useRef(null);
  const eyebrowRef       = useRef(null);
  const announcementRef  = useRef(null);
  const titleLine1Ref    = useRef(null);
  const titleLine2Ref    = useRef(null);
  const titleLine3Ref    = useRef(null);
  const taglineRef       = useRef(null);
  const actionsRef       = useRef(null);
  const statStripRef     = useRef(null);
  const counterRef       = useRef(null);
  const dotsRef          = useRef(null);
  const scrollIndRef     = useRef(null);
  const gsapCtx          = useRef(null);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/settings/hero`)
      .then((res) => {
        if (res.data?.slideDuration) setSlideDuration(res.data.slideDuration * 1000);
      })
      .catch((err) => console.error('Failed to fetch hero settings:', err));

    axios.get(`${BACKEND_URL}/api/hero-images`)
      .then((res) => {
        if (res.data?.length > 0) setHeroImages(res.data.map(img => img.url));
      })
      .catch((err) => console.error('Failed to fetch hero images:', err));
  }, []);

  // ── GSAP Entrance Timeline ──
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const els = [
      eyebrowRef.current,
      titleLine1Ref.current,
      titleLine2Ref.current,
      titleLine3Ref.current,
      taglineRef.current,
      actionsRef.current,
      statStripRef.current,
      counterRef.current,
      dotsRef.current,
      scrollIndRef.current,
    ].filter(Boolean);

    if (prefersReducedMotion) {
      els.forEach(el => {
        gsap.set(el, { opacity: 1, clearProps: 'all' });
      });
      return;
    }

    // Set initial states (Eyebrow & Announcement render instantly)
    gsap.set(
      [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
      { y: 50, opacity: 0 }
    );
    gsap.set(taglineRef.current, { y: 20, opacity: 0 });
    gsap.set(actionsRef.current, { y: 16, opacity: 0 });
    gsap.set(statStripRef.current, { x: 20, opacity: 0 });
    gsap.set(
      [counterRef.current, dotsRef.current, scrollIndRef.current],
      { opacity: 0 }
    );

    // Set initial states
    gsap.set(eyebrowRef.current, { opacity: 0, y: 10 });
    gsap.set(announcementRef.current, { opacity: 0, y: 10 });
    gsap.set(
      [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
      { y: 50, opacity: 0 }
    );
    gsap.set(taglineRef.current, { y: 20, opacity: 0 });
    gsap.set(actionsRef.current, { y: 16, opacity: 0 });
    gsap.set(statStripRef.current, { x: 20, opacity: 0 });
    gsap.set(
      [counterRef.current, dotsRef.current, scrollIndRef.current],
      { opacity: 0 }
    );

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(eyebrowRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    })
    .to(announcementRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.35')

    tl.to(titleLine1Ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'expo.out',
    }, '-=0.2')
    .to(titleLine2Ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'expo.out',
    }, '-=0.5')
    .to(titleLine3Ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'expo.out',
    }, '-=0.5')
    .to(taglineRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.3')
    .to(actionsRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: 'power3.out',
    }, '-=0.3')
    .to(statStripRef.current, {
      x: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power3.out',
    }, '-=0.4')
    .to(
      [counterRef.current, dotsRef.current, scrollIndRef.current],
      {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
        stagger: 0.1,
      },
      '-=0.2'
    );

    // ── ScrollTrigger: parallax background + content fade out ──
    gsapCtx.current = gsap.context(() => {
      // Slideshow parallax — scroll at 35% speed
      if (slideshowRef.current) {
        gsap.to(slideshowRef.current, {
          y: '35%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    });

    return () => {
      tl.kill();
      if (gsapCtx.current) gsapCtx.current.revert();
    };
  }, []);

  const { currentIndex, isTransitioning, goTo, pause, resume } = useSlideshow(heroImages, slideDuration);

  const scrollDown = () => {
    const about = document.getElementById('about');
    if (about) {
      // Use Lenis if available, else fallback
      import('../lib/scrollInit').then(({ getLenis }) => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(about);
        else about.scrollIntoView({ behavior: 'smooth' });
      }).catch(() => about.scrollIntoView({ behavior: 'smooth' }));
    }
  };

  return (
    <section
      id="home"
      className="hero"
      ref={heroRef}
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* ── Background Slideshow ── */}
      <div className="hero__slideshow" aria-hidden="true" ref={slideshowRef}>
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
        <div className="hero__eyebrow" ref={eyebrowRef}>
          <span className="hero__eyebrow-line" aria-hidden="true" />
          <span className="hero__eyebrow-text">Chhatrapati Sambhajinagar · Est. 2020</span>
        </div>

        {/* Premium Launch Announcement */}
        <div className="hero__announcement" ref={announcementRef}>
          NEW — DEDICATED LADIES-ONLY FLOOR
        </div>

        {/* Main heading — split across refs for per-line animation */}
        <h1 className="hero__title">
          <span className="hero__title-line" ref={titleLine1Ref}>THE</span>
          <span className="hero__title-accent hero__title-line" ref={titleLine2Ref}>TRANSFORMATION</span>
          <span className="hero__title-line" ref={titleLine3Ref}>ZONE</span>
        </h1>

        {/* Tagline */}
        <p className="hero__tagline" ref={taglineRef}>
          Expert coaching, premium equipment, and a community that pushes you further — every single day.
        </p>

        {/* CTA buttons */}
        <div className="hero__actions" ref={actionsRef}>
          <a
            href={`https://wa.me/${siteSettings?.whatsappNumber}?text=Hi TTZ Fitness! I'd like to book a free trial session.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            id="hero-join-now-btn"
          >
            <MessageCircle size={16} />
            Book a Free Trial
          </a>
          <a
            href={`https://wa.me/${siteSettings?.whatsappNumber}?text=Hi TTZ Fitness! I have a question about your gym.`}
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
      <div className="hero__stat-strip" aria-label="Key statistics" ref={statStripRef}>
        {STATS.map((s) => (
          <div key={s.label} className="hero__stat">
            <span className="hero__stat-value">{s.value}</span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Slide counter (bottom-left) ── */}
      <div
        className="hero__counter"
        aria-live="polite"
        aria-label={`Slide ${currentIndex + 1} of ${heroImages.length}`}
        ref={counterRef}
      >
        <span className="hero__counter-current">
          {String(currentIndex + 1).padStart(2, '0')}
        </span>
        <span className="hero__counter-sep" aria-hidden="true">/</span>
        <span className="hero__counter-total">
          {String(heroImages.length).padStart(2, '0')}
        </span>
      </div>

      {/* ── Slideshow dots (bottom-center) ── */}
      <div className="hero__dots" aria-label="Slideshow navigation" ref={dotsRef}>
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
      <button
        className="hero__scroll-indicator"
        onClick={scrollDown}
        aria-label="Scroll down"
        ref={scrollIndRef}
      >
        <ChevronDown size={18} />
      </button>
    </section>
  );
};

export default Hero;