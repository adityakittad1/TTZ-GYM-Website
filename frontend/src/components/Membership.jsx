import React from 'react';
import { Check, Clock, Phone } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Membership.css';

/**
 * Membership — Sharp-edged pricing cards.
 * All pricing data and phone/WhatsApp links preserved exactly.
 */
const PLANS = [
  { duration: '1 Month',   price: '₹999',   bonus: null,            popular: false },
  { duration: '3 Months',  price: '₹2,499', bonus: '1 Month Free',  popular: false },
  { duration: '6 Months',  price: '₹4,499', bonus: '2 Months Free', popular: true  },
  { duration: '12 Months', price: '₹7,999', bonus: '3 Months Free', popular: false },
];

const FEATURES = [
  'All Equipment Access',
  'Group Classes',
  'Nutrition Guidance',
  'Locker Facility',
];

const Membership = () => {
  const ref = useScrollReveal();

  return (
    <section id="membership" className="membership" ref={ref}>
      <div className="membership__container">

        {/* Editorial header */}
        <div className="membership__header">
          <div className="membership__header-left reveal-left">
            <span className="section-eyebrow">Invest in Yourself</span>
            <h2 className="membership__title">Membership</h2>
          </div>
          <div className="membership__header-right reveal-right">
            <p className="membership__lead">
              Choose the plan that fits your journey. Every membership includes
              full access to all facilities, group classes, and nutrition guidance.
            </p>
            {/* Timings inline with header */}
            <div className="membership__timings">
              <Clock size={16} className="membership__clock-icon" />
              <span>Morning 5:00 – 10:00 AM</span>
              <span className="membership__timing-sep">·</span>
              <span>Evening 5:00 – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Plans grid */}
        <div className="membership__grid">
          {PLANS.map((plan, i) => (
            <div
              key={plan.duration}
              className={`membership__card reveal${plan.popular ? ' membership__card--popular' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {plan.popular && (
                <div className="membership__badge">Best Value</div>
              )}

              <div className="membership__card-top">
                <div className="membership__duration">{plan.duration}</div>
                <div className="membership__price">{plan.price}</div>
                {plan.bonus && (
                  <div className="membership__bonus">+ {plan.bonus}</div>
                )}
              </div>

              <ul className="membership__features">
                {FEATURES.map((f) => (
                  <li key={f} className="membership__feature">
                    <Check size={14} className="membership__check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.link/z36oiv"
                target="_blank"
                rel="noopener noreferrer"
                className={`membership__btn${plan.popular ? ' membership__btn--primary' : ''}`}
              >
                Book Now
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="membership__cta reveal">
          <h3 className="membership__cta-heading">
            Crush Your 2026 Goals With TTZ Fitness
          </h3>
          <p className="membership__cta-sub">
            Call us today and we'll find the perfect plan for you.
          </p>
          <div className="membership__cta-phones">
            <a href="tel:9028468563" className="membership__phone-link">
              <Phone size={16} />
              9028468563
            </a>
            <a href="tel:8668891406" className="membership__phone-link">
              <Phone size={16} />
              8668891406
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Membership;