import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './FinalCTA.css';

/**
 * FinalCTA — Cinematic closing section before Contact.
 * Full-bleed gym5.png background, dark cinematic overlay.
 * Large editorial heading + two CTAs.
 * All links preserved exactly.
 */
const FinalCTA = () => {
  const ref = useScrollReveal();
  return (
    <section className="final-cta" ref={ref}>
      {/* Background */}
      <div className="final-cta__bg" aria-hidden="true">
        <img
          src="/images/gym5.png"
          alt=""
          className="final-cta__bg-img"
          loading="lazy"
          decoding="async"
        />
        <div className="final-cta__overlay" />
        <div className="final-cta__overlay-top" />
      </div>

      {/* Content */}
      <div className="final-cta__content reveal">
        <span className="section-eyebrow final-cta__eyebrow">
          The Time Is Now
        </span>

        <h2 className="final-cta__title">
          Your Stronger<br />
          <span className="final-cta__title-accent">Self Starts Here.</span>
        </h2>

        <p className="final-cta__body">
          Stop waiting for the perfect time. Start training with purpose.
        </p>

        <div className="final-cta__actions">
          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="final-cta__btn-primary"
            id="final-cta-book-btn"
          >
            <MessageCircle size={18} />
            Book a Free Trial
          </a>
          <a
            href="https://wa.me/919028468563"
            target="_blank"
            rel="noopener noreferrer"
            className="final-cta__btn-ghost"
            id="final-cta-wa-btn"
          >
            Talk to TTZ
          </a>
        </div>

        <div className="final-cta__phones">
          <a href="tel:9028468563" className="final-cta__phone">9028468563</a>
          <span aria-hidden="true">·</span>
          <a href="tel:8668891406" className="final-cta__phone">8668891406</a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
