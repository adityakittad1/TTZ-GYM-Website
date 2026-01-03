import React from 'react';
import GlassCard from './GlassCard';
import { Check, Clock, Phone } from 'lucide-react';
import './Membership.css';

/**
 * Membership Section Component
 * Features:
 * - Membership plans with pricing
 * - Gym timings
 * - Call to action for joining
 */
const Membership = () => {
  const membershipPlans = [
    {
      duration: '1 Month',
      price: '₹999',
      bonus: null,
      popular: false
    },
    {
      duration: '3 Months',
      price: '₹2499',
      bonus: '1 Month Free',
      popular: false
    },
    {
      duration: '6 Months',
      price: '₹4499',
      bonus: '2 Months Free',
      popular: true
    },
    {
      duration: '12 Months',
      price: '₹7999',
      bonus: '3 Months Free',
      popular: false
    }
  ];

  return (
    <section id="membership" className="membership-section">
      <div className="membership-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Membership Plans</h2>
          <p className="section-subtitle">
            Choose the Perfect Plan For Your Fitness Journey
          </p>
        </div>

        {/* Membership Plans Grid */}
        <div className="plans-grid">
          {membershipPlans.map((plan, index) => (
            <GlassCard 
              key={index} 
              hover 
              className={`plan-card ${plan.popular ? 'plan-popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">BEST VALUE</div>}
              
              <div className="plan-header">
                <h3 className="plan-duration">{plan.duration}</h3>
                <div className="plan-price">{plan.price}</div>
                {plan.bonus && <div className="plan-bonus">{plan.bonus}</div>}
              </div>

              <div className="plan-features">
                <div className="plan-feature">
                  <Check size={20} className="feature-check" />
                  <span>All Equipment Access</span>
                </div>
                <div className="plan-feature">
                  <Check size={20} className="feature-check" />
                  <span>Group Classes</span>
                </div>
                <div className="plan-feature">
                  <Check size={20} className="feature-check" />
                  <span>Nutrition Guidance</span>
                </div>
                <div className="plan-feature">
                  <Check size={20} className="feature-check" />
                  <span>Locker Facility</span>
                </div>
              </div>

              <a href="tel:9028468563" className="btn-primary plan-btn">
                Book Now
              </a>
            </GlassCard>
          ))}
        </div>

        {/* Timings Section */}
        <GlassCard className="timings-card">
          <div className="timings-header">
            <Clock size={40} className="timings-icon" />
            <h3 className="timings-heading">Gym Timings</h3>
          </div>
          
          <div className="timings-content">
            <div className="timing-slot">
              <div className="timing-label">Morning Batch</div>
              <div className="timing-value">5:00 AM - 10:00 AM</div>
            </div>
            <div className="timing-divider"></div>
            <div className="timing-slot">
              <div className="timing-label">Evening Batch</div>
              <div className="timing-value">5:00 PM - 10:00 PM</div>
            </div>
          </div>
        </GlassCard>

        {/* Contact CTA */}
        <div className="membership-cta">
          <h3 className="cta-heading">Crush Your 2026 Goals With TTZ Fitness!</h3>
          <p className="cta-text">We have the perfect plan for you. Call us today!</p>
          <div className="cta-buttons">
            <a href="tel:9028468563" className="btn-primary cta-btn">
              <Phone size={20} />
              9028468563
            </a>
            <a href="tel:8668891406" className="btn-primary cta-btn">
              <Phone size={20} />
              8668891406
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Membership;