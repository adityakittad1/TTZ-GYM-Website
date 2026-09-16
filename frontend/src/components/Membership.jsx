import React, { useContext } from 'react';
import { Check, Clock, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import useGSAPReveal from '../hooks/useGSAPReveal';
import { SiteSettingsContext } from '../context/SiteSettingsContext';
import './Membership.css';

/**
 * Membership — Horizontal table-style pricing.
 * All pricing data and phone/WhatsApp links preserved exactly.
 *
 * Enhancements:
 * - motion: card whileHover spring lift (y: -6px)
 * - motion: button whileTap scale press
 * - GSAP ScrollTrigger: cards stagger in from below
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
  const ref = useGSAPReveal();
  const settings = useContext(SiteSettingsContext);

  return (
    <section id="membership" className="membership" ref={ref}>
      <div className="membership__container">

        {/* Header — large display title + sub-copy */}
        <div className="membership__header">
          <div className="membership__header-left" data-reveal-left>
            <span className="section-eyebrow">Invest in Yourself</span>
            <h2 className="membership__title">Member&shy;ship</h2>
          </div>
          <div className="membership__header-right" data-reveal-right>
            <p className="membership__lead">
              Choose the plan that fits your journey. Every membership includes
              full access to all facilities, group classes, and nutrition guidance.
            </p>
            <div className="membership__timings">
              <Clock size={14} className="membership__clock-icon" />
              <span>Morning 5:00 – 10:00 AM</span>
              <span className="membership__timing-sep">·</span>
              <span>Evening 5:00 – 10:00 PM</span>
            </div>
          </div>
        </div>

        {/* Plans — horizontal table, GSAP stagger + Motion hover */}
        <div className="membership__grid" data-stagger-parent>
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.duration}
              className={`membership__card${plan.popular ? ' membership__card--popular' : ''}`}
              data-stagger-child
              whileHover={{
                y: plan.popular ? -8 : -6,
                transition: { type: 'spring', stiffness: 380, damping: 22 },
              }}
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
                    <Check size={13} className="membership__check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href={`https://wa.me/${settings?.whatsappNumber}?text=Hi TTZ Fitness! I'd like to book the ${plan.duration} membership plan.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`membership__btn${plan.popular ? ' membership__btn--primary' : ''}`}
                whileTap={{ scale: 0.97 }}
              >
                Book Now
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA — inline */}
        <div className="membership__cta" data-reveal>
          <div className="membership__cta-left">
            <h3 className="membership__cta-heading">
              Crush Your 2026 Goals With TTZ Fitness
            </h3>
            <p className="membership__cta-sub">
              Call us today and we'll find the perfect plan for you.
            </p>
          </div>
          <div className="membership__cta-phones">
            <a href="tel:9028468563" className="membership__phone-link">
              <Phone size={15} />
              9028468563
            </a>
            <a href="tel:8668891406" className="membership__phone-link">
              <Phone size={15} />
              8668891406
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Membership;