import React, { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Gallery.css';

/**
 * Gallery — Full-width editorial mosaic.
 * No section-container wrapper — bleeds to edges.
 * Lightbox with keyboard navigation (Escape, arrow keys).
 */
const IMAGES = [
  { src: '/images/gym2.png', alt: 'TTZ Fitness — Main training floor with premium equipment' },
  { src: '/images/gym1.png', alt: 'TTZ Fitness — Weight room' },
  { src: '/images/gym3.png', alt: 'TTZ Fitness — Cable machines and functional training area' },
  { src: '/images/gym4.png', alt: 'TTZ Fitness — Cardio and strength equipment' },
  { src: '/images/gym5.png', alt: 'TTZ Fitness — Full facility overview' },
];

const Gallery = () => {
  const ref = useScrollReveal();
  const [lightboxIdx, setLightboxIdx] = useState(null);

  const openLightbox = (idx) => setLightboxIdx(idx);
  const closeLightbox = () => setLightboxIdx(null);
  const prev = () => setLightboxIdx((i) => (i - 1 + IMAGES.length) % IMAGES.length);
  const next = () => setLightboxIdx((i) => (i + 1) % IMAGES.length);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape')      closeLightbox();
    else if (e.key === 'ArrowLeft')  prev();
    else if (e.key === 'ArrowRight') next();
  };

  return (
    <section id="gallery" className="gallery" ref={ref}>

      {/* Header — inside a container */}
      <div className="gallery__header section-container reveal">
        <span className="section-eyebrow">The Space</span>
        <h2 className="gallery__title">Our Facility</h2>
        <p className="gallery__subtitle">
          State-of-the-art equipment in a professional, premium environment built for serious training.
        </p>
      </div>

      {/* Full-width mosaic grid */}
      <div className="gallery__mosaic">
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
