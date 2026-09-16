import React, { useContext } from 'react';
import useGSAPReveal from '../hooks/useGSAPReveal';
import { SiteSettingsContext } from '../context/SiteSettingsContext';
import './AboutStats.css';

/**
 * AboutStats — About + Stats merged into one compact editorial section.
 * Photo-left, text-right split.
 *
 * Animations (GSAP ScrollTrigger):
 * - Photo: clip-path wipe from bottom
 * - Stats: each number counts up from 0
 * - Text column: staggered reveal (eyebrow → title → body → stats → CTA)
 */
const STATS = [
  { value: 4,     suffix: '+', label: 'Years'    },
  { value: 500,   suffix: '+', label: 'Members'  },
  { value: 10,    suffix: '+', label: 'Programs' },
];

const AboutStats = () => {
  const ref = useGSAPReveal();
  const settings = useContext(SiteSettingsContext);

  return (
    <section id="about" className="about-stats" ref={ref}>
      <div className="about-stats__split">

        {/* Photo — left, full-bleed, clip-path reveal */}
        <div className="about-stats__photo-col" data-reveal-clip>
          <img
            src="/images/gym1.png"
            alt="TTZ Fitness training floor"
            className="about-stats__photo"
            loading="lazy"
            decoding="async"
          />
          <div className="about-stats__photo-badge">
            <span className="about-stats__badge-year">2020</span>
            <span className="about-stats__badge-label">Est.</span>
          </div>
        </div>

        {/* Text — right, staggered reveal */}
        <div className="about-stats__text-col" data-stagger-parent>

          <span className="section-eyebrow" data-stagger-child>About TTZ</span>

          <h2 className="about-stats__title" data-stagger-child>
            Chhatrapati Sambhajinagar's<br />
            <span className="about-stats__accent">Premier Fitness Studio.</span>
          </h2>

          <p className="about-stats__body" data-stagger-child>
            Founded by certified coaches and district-level athletes, TTZ FITNESS
            blends expert training, nutrition coaching, and a genuine community
            to help every member reach their full potential.
          </p>

          {/* Inline stats strip — each value uses data-counter */}
          <div className="about-stats__stats" data-stagger-child>
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="about-stats__stat">
                  <span
                    className="about-stats__stat-value"
                    data-counter={s.value}
                    data-counter-suffix={s.suffix}
                  >
                    0{s.suffix}
                  </span>
                  <span className="about-stats__stat-label">{s.label}</span>
                </div>
                {i < STATS.length - 1 && <div className="about-stats__stat-sep" />}
              </React.Fragment>
            ))}
          </div>

          <a
            href={`https://wa.me/${settings?.whatsappNumber}?text=Hi TTZ Fitness! I'm interested in starting my fitness journey with you.`}
            target="_blank"
            rel="noopener noreferrer"
            className="about-stats__cta"
            data-stagger-child
          >
            Start Your Journey
          </a>

        </div>
      </div>
    </section>
  );
};

export default AboutStats;
