import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

/**
 * About — Editorial split layout.
 * Left: full-bleed gym photo (gym1.png).
 * Right: editorial text with numbered list instead of icon cards.
 * Mission quote in Cormorant Garamond serif.
 * All original content preserved.
 */
const PILLARS = [
  {
    num: '01',
    heading: 'Personalised Programs',
    body: 'Training and nutrition plans built around your specific goals, not generic templates.',
  },
  {
    num: '02',
    heading: 'Expert Coaching',
    body: 'Certified coaches and district-level athletes who understand what results actually look like.',
  },
  {
    num: '03',
    heading: 'Proven Track Record',
    body: 'Four years of consistent member transformations — our results speak louder than claims.',
  },
  {
    num: '04',
    heading: 'Real Community',
    body: 'A motivated, supportive environment where everyone is committed to growth.',
  },
];

const About = () => {
  const ref = useScrollReveal();

  return (
    <section id="about" className="about" ref={ref}>
      {/* ── Split layout ── */}
      <div className="about__split">

        {/* Left — Full-bleed photograph */}
        <div className="about__photo-col reveal-left">
          <div className="about__photo-wrap">
            <img
              src="/images/gym1.png"
              alt="TTZ Fitness training floor"
              className="about__photo"
              loading="lazy"
              decoding="async"
            />
            <div className="about__photo-badge">
              <span className="about__photo-badge-year">2020</span>
              <span className="about__photo-badge-label">Est.</span>
            </div>
          </div>
        </div>

        {/* Right — Editorial text */}
        <div className="about__text-col reveal-right">
          <span className="section-eyebrow">Our Story</span>

          <h2 className="about__title">
            Chhatrapati Sambhajinagar's<br />
            <span className="about__title-accent">Premier Fitness Destination.</span>
          </h2>

          <p className="about__intro">
            At TTZ FITNESS 24, we combine expert coaching, certified nutrition guidance,
            and state-of-the-art facilities to help every member reach their true potential.
            Built in 2020. Refined every year since.
          </p>

          {/* Stats inline */}
          <div className="about__stats">
            <div className="about__stat">
              <span className="about__stat-value">4+</span>
              <span className="about__stat-label">Years</span>
            </div>
            <div className="about__stat-divider" />
            <div className="about__stat">
              <span className="about__stat-value">500+</span>
              <span className="about__stat-label">Members</span>
            </div>
            <div className="about__stat-divider" />
            <div className="about__stat">
              <span className="about__stat-value">10+</span>
              <span className="about__stat-label">Programs</span>
            </div>
          </div>

          {/* Numbered pillars */}
          <div className="about__pillars">
            {PILLARS.map((p, i) => (
              <div
                key={p.num}
                className="about__pillar reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="about__pillar-num">{p.num}</span>
                <div>
                  <h3 className="about__pillar-heading">{p.heading}</h3>
                  <p className="about__pillar-body">{p.body}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="about__cta"
          >
            Start Your Journey
          </a>
        </div>
      </div>

      {/* ── Mission quote ── */}
      <div className="about__mission reveal">
        <blockquote className="about__mission-quote">
          "To transform your body and mind through a comprehensive approach to health
          and wellness — where everyone finds their path to a stronger, healthier life."
        </blockquote>
        <cite className="about__mission-cite">— The TTZ Fitness Team</cite>
      </div>
    </section>
  );
};

export default About;