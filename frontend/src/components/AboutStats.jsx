import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './AboutStats.css';

/**
 * AboutStats — About + Stats merged into one compact editorial section.
 * Photo-left, text-right split. Stats inline with text column.
 * All original content preserved, section height dramatically reduced
 * by removing the standalone Stats strip and separate About section.
 */
const STATS = [
  { value: '4+',   label: 'Years' },
  { value: '500+', label: 'Members' },
  { value: '10+',  label: 'Programs' },
];

const AboutStats = () => {
  const ref = useScrollReveal();
  return (
    <section id="about" className="about-stats" ref={ref}>
      <div className="about-stats__split">

        {/* Photo — left, full-bleed */}
        <div className="about-stats__photo-col reveal-left">
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

        {/* Text — right */}
        <div className="about-stats__text-col reveal-right">

          <span className="section-eyebrow">About TTZ</span>

          <h2 className="about-stats__title">
            Chhatrapati Sambhajinagar's<br />
            <span className="about-stats__accent">Premier Fitness Studio.</span>
          </h2>

          <p className="about-stats__body">
            Founded by certified coaches and district-level athletes, TTZ FITNESS
            blends expert training, nutrition coaching, and a genuine community
            to help every member reach their full potential.
          </p>

          {/* Inline stats strip */}
          <div className="about-stats__stats">
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="about-stats__stat">
                  <span className="about-stats__stat-value">{s.value}</span>
                  <span className="about-stats__stat-label">{s.label}</span>
                </div>
                {i < STATS.length - 1 && <div className="about-stats__stat-sep" />}
              </React.Fragment>
            ))}
          </div>

          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="about-stats__cta"
          >
            Start Your Journey
          </a>

        </div>
      </div>
    </section>
  );
};

export default AboutStats;
