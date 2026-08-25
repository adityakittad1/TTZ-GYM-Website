import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Services.css';

/**
 * Services — Compact 3×2 grid.
 * 6 primary services with compact photo cards.
 * Remaining 4 shown as a tag row below.
 * All 10 original services preserved.
 */
const PRIMARY = [
  { title: 'Weight Training',    img: '/images/gym2.png', desc: 'Build strength with premium equipment.' },
  { title: 'Personal Training',  img: '/images/gym4.png', desc: 'One-on-one coaching tailored to you.' },
  { title: 'Nutrition Plans',    img: '/images/gym3.png', desc: 'Certified nutrition coaching for results.' },
  { title: 'Cardio',             img: '/images/gym5.png', desc: 'High-intensity cardio for peak endurance.' },
  { title: 'Fat Loss Programs',  img: '/images/gym1.png', desc: 'Targeted programs combining training + diet.' },
  { title: 'Muscle Building',    img: '/images/gym2.png', desc: 'Structured hypertrophy for lean muscle gain.' },
];

const ALSO = ['Yoga', 'Zumba', 'Aerobics', 'Meditation'];

const Services = () => {
  const ref = useScrollReveal();

  return (
    <section id="services" className="services" ref={ref}>
      <div className="section-container">

        {/* Compact editorial header */}
        <div className="services__header reveal">
          <div className="services__header-left">
            <span className="section-eyebrow">What We Offer</span>
            <h2 className="services__title">Training Programs</h2>
          </div>
          <p className="services__lead">
            Expert coaching across every discipline — strength, conditioning,
            nutrition, and wellness under one roof.
          </p>
        </div>

        {/* 3×2 compact grid */}
        <div className="services__grid">
          {PRIMARY.map((s, i) => (
            <div
              key={s.title}
              className="services__card reveal"
              style={{ transitionDelay: `${(i % 3) * 70}ms` }}
            >
              <div className="services__card-img-wrap">
                <img
                  src={s.img}
                  alt={`TTZ Fitness — ${s.title}`}
                  className="services__card-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="services__card-overlay" />
              </div>
              <div className="services__card-body">
                <h3 className="services__card-title">{s.title}</h3>
                <p className="services__card-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Also available — single tag row */}
        <div className="services__also reveal">
          <span className="services__also-label">Also:</span>
          {ALSO.map((s) => (
            <span key={s} className="services__also-tag">{s}</span>
          ))}
          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="services__enquire"
          >
            Enquire →
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;