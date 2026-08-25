import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Trainers.css';

/**
 * Trainers — Premium portrait-focused layout.
 * Two founders side-by-side, image-dominant cards.
 * All original trainer data preserved exactly.
 */
const TRAINERS = [
  {
    name: 'Mrs. Archana Birajdar',
    role: 'Founder & Wellness Coach',
    specialty: 'Certified Nutrition Coach',
    image: 'https://customer-assets.emergentagent.com/job_elite-gym-2/artifacts/l69db2k6_T1.jpg',
    description:
      'Accomplished district-level athlete with extensive experience running a successful nutrition club. A trusted leader in health and wellness.',
    quote: 'Every transformation starts with a single committed decision.',
  },
  {
    name: 'Mr. Vilas Birajdar',
    role: 'Founder & Wellness Coach',
    specialty: 'Certified Nutrition Coach',
    image: 'https://customer-assets.emergentagent.com/job_elite-gym-2/artifacts/d8ixnhd1_T2.jpg',
    description:
      'District-level athlete with over four years of experience. Brings unparalleled expertise in fitness and nutrition to our community.',
    quote: 'Consistency and discipline are the foundation of every result.',
  },
];

const Trainers = () => {
  const ref = useScrollReveal();

  return (
    <section id="trainers" className="trainers" ref={ref}>
      <div className="trainers__container">

        {/* Header */}
        <div className="trainers__header reveal">
          <span className="section-eyebrow">Meet the Founders</span>
          <h2 className="trainers__title">The Experts Behind TTZ</h2>
          <p className="trainers__subtitle">
            Certified coaches and accomplished athletes — their expertise is
            built on years of real competitive and coaching experience.
          </p>
        </div>

        {/* Cards */}
        <div className="trainers__grid">
          {TRAINERS.map((t, i) => (
            <div
              key={t.name}
              className={`trainers__card ${i === 0 ? 'reveal-left' : 'reveal-right'}`}
            >
              {/* Portrait image */}
              <div className="trainers__img-wrap">
                <img
                  src={t.image}
                  alt={t.name}
                  className="trainers__img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="trainers__img-overlay" />
                <div className="trainers__specialty-tag">{t.specialty}</div>
              </div>

              {/* Info */}
              <div className="trainers__info">
                <h3 className="trainers__name">{t.name}</h3>
                <p className="trainers__role">{t.role}</p>
                <p className="trainers__desc">{t.description}</p>
                <blockquote className="trainers__quote">
                  "{t.quote}"
                </blockquote>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="trainers__cta reveal">
          <p className="trainers__cta-text">
            Ready to train with the best in Chhatrapati Sambhajinagar?
          </p>
          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="trainers__cta-btn"
          >
            Join the TTZ Family
          </a>
        </div>

      </div>
    </section>
  );
};

export default Trainers;
