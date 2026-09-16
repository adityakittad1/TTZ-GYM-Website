import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGSAPReveal from '../hooks/useGSAPReveal';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Gallery — Full-width editorial mosaic.
 * Lightbox with keyboard navigation.
 *
 * Animations:
 * - Header: fades in
 * - Each mosaic cell: directional clip-path wipe (unique per cell)
 */
const IMAGES = [
  { src: '/images/gym2.webp', alt: 'TTZ Fitness — Main training floor with premium equipment' },
  { src: '/images/gym1.webp', alt: 'TTZ Fitness — Weight room' },
  { src: '/images/gym3.webp', alt: 'TTZ Fitness — Cable machines and functional training area' },
  { src: '/images/gym4.webp', alt: 'TTZ Fitness — Cardio and strength equipment' },
  { src: '/images/gym5.webp', alt: 'TTZ Fitness — Full facility overview' },
];

// Clip-path reveal directions per cell
const CELL_CLIPS = [
  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },   // cell 0: bottom wipe
  { from: 'inset(0 0 0 100%)', to: 'inset(0 0 0 0%)' },   // cell 1: right wipe
  { from: 'inset(0 100% 0 0)', to: 'inset(0 0% 0 0)' },   // cell 2: left wipe
  { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },   // cell 3: top wipe
  { from: 'inset(0 0 100% 0)', to: 'inset(0 0 0% 0)' },   // cell 4: bottom wipe
];

const Gallery = () => {
  const ref = useGSAPReveal();
  const mosaicRef = useRef(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // ── Per-cell directional clip-path reveals ──
  useEffect(() => {
    if (!mosaicRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const cells = mosaicRef.current.querySelectorAll('.gallery__cell');
      cells.forEach((cell, i) => {
        const clip = CELL_CLIPS[i];
        if (prefersReduced) {
          gsap.set(cell, { clipPath: clip.to });
          return;
        }
        gsap.fromTo(
          cell,
          { clipPath: clip.from },
          {
            clipPath: clip.to,
            duration: 1.0,
            ease: 'power4.out',
            delay: i * 0.08,
            scrollTrigger: {
              trigger: cell,
              start: 'top 92%',
              once: true,
            },
          }
        );
      });
    }, mosaicRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setLightboxIdx((i) => (i + 1) % IMAGES.length);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape')       closeLightbox();
    else if (e.key === 'ArrowLeft')  prev();
    else if (e.key === 'ArrowRight') next();
  };

  return (
    <section id="gallery" className="gallery" ref={ref}>

      {/* Asymmetric header — inside container */}
      <div className="gallery__header section-container" data-reveal>
        <div>
          <span className="section-eyebrow">The Space</span>
          <h2 className="gallery__title">Our<br />Facility</h2>
        </div>
        <p className="gallery__subtitle">
          State-of-the-art equipment in a professional, premium environment
          built for serious training.
        </p>
      </div>

      {/* Full-width mosaic grid — each cell has its own clip-path */}
      <div className="gallery__mosaic" ref={mosaicRef}>
        {IMAGES.map((img, i) => (
          <button
            key={i}
            className={`gallery__cell gallery__cell--${i}`}
            onClick={() => openLightbox(i)}
            aria-label={`View: ${img.alt}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              className="gallery__img"
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
            <div className="gallery__cell-overlay">
              <span className="gallery__cell-icon" aria-hidden="true">+</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          {/* Close */}
          <button
            className="gallery__lb-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>

          {/* Prev */}
          <button
            className="gallery__lb-nav gallery__lb-nav--prev"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* Image */}
          <div className="gallery__lb-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={IMAGES[lightboxIdx].src}
              alt={IMAGES[lightboxIdx].alt}
              className="gallery__lb-img"
            />
            <p className="gallery__lb-caption">{IMAGES[lightboxIdx].alt}</p>
          </div>

          {/* Next */}
          <button
            className="gallery__lb-nav gallery__lb-nav--next"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
          >
            ›
          </button>

          {/* Counter */}
          <div className="gallery__lb-counter">
            {lightboxIdx + 1} / {IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
