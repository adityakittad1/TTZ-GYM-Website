import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Conversion.css';

/**
 * Conversion — Editorial testimonials + cinematic CTA.
 * Testimonials: horizontal quote layout (not 3 identical cards).
 * CTA: left-aligned, full-bleed background image.
 * All original content and links preserved exactly.
 */
const TESTIMONIALS = [
  {
    name: 'Rajesh Patil',
    text: 'TTZ Fitness completely transformed my life. Lost 15kg in 6 months with expert guidance from the coaches.',
    result: 'Fat Loss: 15 kg',
  },
  {
    name: 'Priya Sharma',
    text: 'Best gym in Chhatrapati Sambhajinagar. The nutrition coaching from Mrs. Birajdar is genuinely invaluable.',
    result: '8 Month Journey',
  },
  {
    name: 'Amit Deshmukh',
    text: 'The personal training sessions helped me hit my muscle gain goals faster than I thought possible.',
    result: 'Muscle Gain: 8 kg',
  },
];

const Stars = () => (
  <div className="conv__stars" aria-label="5 out of 5 stars">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={11} fill="#C9A84C" color="#C9A84C" />
    ))}
  </div>
);

const Conversion = () => {
  const ref = useScrollReveal();

  return (
    <section id="testimonials" className="conversion" ref={ref}>

      {/* ── Top: editorial testimonials ── */}
      <div className="conv__testimonials">
        <div className="section-container">
          <div className="conv__header reveal">
            <div>
              <span className="section-eyebrow">Real Results</span>
              <h2 className="conv__title">What Our<br />Members Say</h2>
            </div>
            <span className="conv__header-right">500+ members · 4+ years</span>
          </div>

          <div className="conv__quotes">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="conv__quote reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div>
                  <span className="conv__quote-mark" aria-hidden="true">"</span>
                  <Stars />
                  <p className="conv__quote-text">{t.text}</p>
                </div>
                <div className="conv__quote-footer">
                  <div className="conv__avatar" aria-hidden="true">{t.name.charAt(0)}</div>
                  <div>
                    <div className="conv__quote-name">{t.name}</div>
                    <div className="conv__quote-result">{t.result}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom: Cinematic CTA ── */}
      <div className="conv__cta-section">
        <div className="conv__cta-bg" aria-hidden="true">
          <img
            src="/images/gym5.png"
            alt=""
            className="conv__cta-img"
            loading="lazy"
            decoding="async"
          />
          <div className="conv__cta-overlay" />
        </div>

        <div className="conv__cta-content reveal">
          <h2 className="conv__cta-heading">
            Your Stronger Self
            <span className="conv__cta-accent">Starts Here.</span>
          </h2>
          <p className="conv__cta-sub">
            Stop waiting. Start transforming.
          </p>
          <div className="conv__cta-actions">
            <a
              href="https://wa.link/z36oiv"
              target="_blank"
              rel="noopener noreferrer"
              className="conv__btn-primary"
              id="conv-cta-book-btn"
            >
              <MessageCircle size={16} />
              Book a Free Trial
            </a>
            <a
              href="https://wa.me/919028468563"
              target="_blank"
              rel="noopener noreferrer"
              className="conv__btn-ghost"
              id="conv-cta-wa-btn"
            >
              WhatsApp TTZ
            </a>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Conversion;
