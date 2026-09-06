import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Services.css';

/**
 * Services — Editorial numbered list.
 * Replaces the generic 3×2 card grid with an animated row list
 * that reveals a thumbnail image on hover.
 * All 10 original services preserved.
 */
const PRIMARY = [
  { title: 'Weight Training',    img: '/images/gym2.png', desc: 'Build strength with premium equipment and expert programming.' },
  { title: 'Personal Training',  img: '/images/gym4.png', desc: 'One-on-one coaching tailored precisely to your goals.' },
  { title: 'Nutrition Plans',    img: '/images/gym3.png', desc: 'Certified nutrition coaching that drives real results.' },
  { title: 'Cardio',             img: '/images/gym5.png', desc: 'High-intensity cardio for peak endurance and fat loss.' },
  { title: 'Fat Loss Programs',  img: '/images/gym1.png', desc: 'Targeted programs combining smart training and diet.' },
  { title: 'Muscle Building',    img: '/images/gym2.png', desc: 'Structured hypertrophy protocols for lean muscle gain.' },
];

const ALSO = ['Yoga', 'Zumba', 'Aerobics', 'Meditation'];

const Services = () => {
  const ref = useScrollReveal();

  return (
    <section id="services" className="services" ref={ref}>
      <div className="section-container">

        {/* Asymmetric editorial header */}
        <div className="services__header reveal">
          <div className="services__header-left">
            <span className="section-eyebrow">What We Offer</span>
            <h2 className="services__title">Training<br />Programs</h2>
          </div>
          <p className="services__lead">
            Expert coaching across every discipline — strength, conditioning,
            nutrition, and wellness. All under one roof.
          </p>
        </div>

        {/* Editorial numbered list */}
        <div className="services__list">
          {PRIMARY.map((s, i) => (
            <div
              key={s.title}
              className="services__item reveal"
              style={{ transitionDelay: `${i * 55}ms` }}
            >
              <span className="services__item-num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="services__item-text">
                <span className="services__item-name">{s.title}</span>
                <span className="services__item-desc">{s.desc}</span>
              </div>
              <div className="services__item-img-wrap" aria-hidden="true">
                <img
                  src={s.img}
                  alt=""
                  className="services__item-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Also available row */}
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