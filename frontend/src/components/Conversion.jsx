import React, { useEffect, useRef, useContext } from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useGSAPReveal from '../hooks/useGSAPReveal';
import { SiteSettingsContext } from '../context/SiteSettingsContext';
import './Conversion.css';

gsap.registerPlugin(ScrollTrigger);

/**
 * Conversion — Editorial testimonials + cinematic CTA.
 *
 * Animations (GSAP ScrollTrigger):
 * - Testimonials: stagger in from x + opacity
 * - CTA bg image: subtle vertical parallax
 * - CTA heading: word-by-word reveal (split by spaces, stagger)
 * - CTA sub + buttons: fade in after heading
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
  const ref = useGSAPReveal();
  const settings = useContext(SiteSettingsContext);
  const ctaBgRef  = useRef(null);
  const ctaCtxRef = useRef(null);

  // CTA background parallax
  useEffect(() => {
    if (!ctaBgRef.current) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    ctaCtxRef.current = gsap.context(() => {
      gsap.to(ctaBgRef.current, {
        y: '-8%',
        ease: 'none',
        scrollTrigger: {
          trigger: ctaBgRef.current.closest('.conv__cta-section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    return () => {
      if (ctaCtxRef.current) ctaCtxRef.current.revert();
    };
  }, []);

  return (
    <section id="testimonials" className="conversion" ref={ref}>

      {/* ── Top: editorial testimonials ── */}
      <div className="conv__testimonials">
        <div className="section-container">
          <div className="conv__header" data-reveal>
            <div>
              <span className="section-eyebrow">Real Results</span>
              <h2 className="conv__title">What Our<br />Members Say</h2>
            </div>
            <span className="conv__header-right">500+ members · 4+ years</span>
          </div>

          <div className="conv__quotes" data-stagger-parent>
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="conv__quote"
                data-stagger-child
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

      {/* ── Bottom: Cinematic CTA with parallax bg ── */}
      <div className="conv__cta-section">
        <div className="conv__cta-bg" aria-hidden="true" ref={ctaBgRef}>
          <img
            src="/images/gym5.webp"
            alt=""
            className="conv__cta-img"
            loading="lazy"
            decoding="async"
          />
          <div className="conv__cta-overlay" />
        </div>

        <div className="conv__cta-content" data-stagger-parent>
          <h2 className="conv__cta-heading">
            <span data-stagger-child>Your Stronger Self</span>
            <span className="conv__cta-accent" data-stagger-child>Starts Here.</span>
          </h2>
          <p className="conv__cta-sub" data-stagger-child>
            Stop waiting. Start transforming.
          </p>
          <div className="conv__cta-actions" data-stagger-child>
            <a
              href={`https://wa.me/${settings?.whatsappNumber}?text=Hi TTZ Fitness! I'd like to book a free trial and start transforming.`}
              target="_blank"
              rel="noopener noreferrer"
              className="conv__btn-primary"
              id="conv-cta-book-btn"
            >
              <MessageCircle size={16} />
              Book a Free Trial
            </a>
            <a
              href={`https://wa.me/${settings?.whatsappNumber}?text=Hi TTZ Fitness! I saw your website and would like to connect.`}
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
