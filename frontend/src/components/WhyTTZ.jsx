import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './WhyTTZ.css';

/**
 * Why TTZ — Editorial reasons section
 * Uses gym3.png as full-bleed background with dark panel overlay.
 * Two columns of reasons — no icon cards, gold left-border list style.
 */
const REASONS = [
  {
    heading: 'Professional Environment',
    body: 'Modern equipment, well-maintained facilities, and an atmosphere built for serious training.',
  },
  {
    heading: 'Expert Guidance',
    body: 'District-level athletes and certified coaches who understand performance at a deep level.',
  },
  {
    heading: 'Personalised Attention',
    body: 'Programs built around your specific goals — not a one-size-fits-all template.',
  },
  {
    heading: 'Full-Spectrum Training',
    body: 'Strength, cardio, yoga, nutrition, and more — every dimension of fitness under one roof.',
  },
  {
    heading: 'Community That Pushes You',
    body: 'A driven, welcoming community that holds you accountable and celebrates your progress.',
  },
  {
    heading: 'Consistent Results',
    body: 'Four years of member transformations. The results speak for themselves.',
  },
];

const WhyTTZ = () => {
  const ref = useScrollReveal();
  const col1 = REASONS.slice(0, 3);
  const col2 = REASONS.slice(3);

  return (
    <section id="why-ttz" className="why-ttz" ref={ref}>
      {/* Background photo with overlay */}
      <div className="why-ttz__bg" aria-hidden="true">
        <img
          src="/images/gym3.png"
          alt=""
          className="why-ttz__bg-img"
          loading="lazy"
          decoding="async"
        />
        <div className="why-ttz__bg-overlay" />
      </div>

      <div className="why-ttz__content">
        {/* Heading column */}
        <div className="why-ttz__heading-col reveal-left">
          <span className="section-eyebrow">Why TTZ</span>
          <h2 className="why-ttz__title">
            More Than<br />
            <span className="why-ttz__title-accent">A Gym.</span>
          </h2>
          <p className="why-ttz__lead">
            TTZ FITNESS is built on discipline, expertise, and a genuine commitment
            to helping you reach your full potential — every single day.
          </p>
          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="why-ttz__cta"
          >
            Book a Free Trial
          </a>
        </div>

        {/* Reasons grid */}
        <div className="why-ttz__reasons">
          <div className="why-ttz__col">
            {col1.map((r, i) => (
              <div
                key={r.heading}
                className="why-ttz__reason reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <h3 className="why-ttz__reason-heading">{r.heading}</h3>
                <p className="why-ttz__reason-body">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="why-ttz__col">
            {col2.map((r, i) => (
              <div
                key={r.heading}
                className="why-ttz__reason reveal"
                style={{ transitionDelay: `${(i + 3) * 100}ms` }}
              >
                <h3 className="why-ttz__reason-heading">{r.heading}</h3>
                <p className="why-ttz__reason-body">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyTTZ;
