import React from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Stats.css';

/**
 * Stats — Trust strip immediately after the hero.
 * Four verified metrics from existing site content.
 * Minimal horizontal layout — no cards, no icons, just numbers.
 */
const STATS = [
  { value: '4+',   label: 'Years of Excellence',    sub: 'Est. 2020' },
  { value: '500+', label: 'Members Transformed',    sub: 'And growing' },
  { value: '10+',  label: 'Training Programs',      sub: 'For every goal' },
  { value: '6',    label: 'Days a Week',             sub: 'Morning & evening' },
];

const Stats = () => {
  const ref = useScrollReveal();
  return (
    <section className="stats" aria-label="TTZ Fitness at a glance" ref={ref}>
      <div className="stats__inner">
        {STATS.map((s, i) => (
          <React.Fragment key={s.label}>
            <div className="stats__item reveal" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="stats__value">{s.value}</div>
              <div className="stats__label">{s.label}</div>
              <div className="stats__sub">{s.sub}</div>
            </div>
            {i < STATS.length - 1 && (
              <div className="stats__sep" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Stats;
