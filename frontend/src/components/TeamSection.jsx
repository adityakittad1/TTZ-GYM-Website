import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './TeamSection.css';

/**
 * TeamSection — WhyTTZ + Trainers merged.
 * Left: 3 editorial reasons why TTZ.
 * Right: 2 trainer portraits (compact).
 * Replaces two separate full-height sections.
 */
const REASONS = [
  {
    heading: 'Expert Guidance',
    body: 'Certified coaches and district-level athletes who know what real results look like.',
  },
  {
    heading: 'Personalised Approach',
    body: 'Training and nutrition built around your specific goals — not a generic template.',
  },
  {
    heading: 'Real Community',
    body: 'A driven, welcoming environment where members push each other forward every day.',
  },
];

const TRAINERS = [
  {
    name: 'Mrs. Archana Birajdar',
    role: 'Founder · Wellness Coach',
    specialty: 'Nutrition',
    image: 'https://customer-assets.emergentagent.com/job_elite-gym-2/artifacts/l69db2k6_T1.jpg',
  },
  {
    name: 'Mr. Vilas Birajdar',
    role: 'Founder · Wellness Coach',
    specialty: 'Fitness',
    image: 'https://customer-assets.emergentagent.com/job_elite-gym-2/artifacts/d8ixnhd1_T2.jpg',
  },
];

const TeamSection = () => {
  const ref = useScrollReveal();

  return (
    <section id="trainers" className="team-section" ref={ref}>
      <div className="team-section__inner">

        {/* Left — Why TTZ */}
        <div className="team-section__left reveal-left">
          <span className="section-eyebrow">Why TTZ</span>
          <h2 className="team-section__title">
            More Than<br />
            <span className="team-section__accent">A Gym.</span>
          </h2>

          <div className="team-section__reasons">
            {REASONS.map((r, i) => (
              <div key={r.heading} className="team-section__reason">
                <span className="team-section__reason-num">0{i + 1}</span>
                <div>
                  <h3 className="team-section__reason-heading">{r.heading}</h3>
                  <p className="team-section__reason-body">{r.body}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="team-section__cta"
          >
            Join the Family →
          </a>
        </div>

        {/* Right — Trainers */}
        <div className="team-section__right reveal-right">
          <div className="team-section__trainers-header">
            <span className="section-eyebrow">Meet the Founders</span>
          </div>
          <div className="team-section__trainers">
            {TRAINERS.map((t) => (
              <div key={t.name} className="team-section__trainer">
                <div className="team-section__trainer-img-wrap">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="team-section__trainer-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="team-section__trainer-specialty">{t.specialty}</div>
                </div>
                <div className="team-section__trainer-info">
                  <div className="team-section__trainer-name">{t.name}</div>
                  <div className="team-section__trainer-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
