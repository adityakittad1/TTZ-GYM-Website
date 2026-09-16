import React from 'react';
import { MessageCircle, Check } from 'lucide-react';
import useGSAPReveal from '../hooks/useGSAPReveal';
import './LadiesOnly.css';

/**
 * LadiesOnly — Important Business Feature Section
 * Dedicated ladies fitness offering.
 */
const LadiesOnly = () => {
  const ref = useGSAPReveal();
  const whatsappUrl = `https://wa.me/919028468563?text=${encodeURIComponent(
    "Hi TTZ Gym, I'm interested in the Ladies-Only Fitness batches and would like to know more about the dedicated ladies section and available timings."
  )}`;

  const features = [
    'Dedicated ladies batches',
    'Separate ladies floor',
    'Professional fitness guidance',
    'Dedicated training experience',
  ];

  return (
    <section id="ladies-only" className="ladies-only" ref={ref}>
      <div className="ladies-only__inner">
        <div className="ladies-only__content" data-stagger-parent>
          <div className="ladies-only__eyebrow" data-stagger-child>
            <span className="ladies-only__eyebrow-line"></span>
            Exclusive Offering
          </div>
          
          <h2 className="ladies-only__title" data-stagger-child>
            LADIES-ONLY <span className="ladies-only__accent">FITNESS</span>
          </h2>
          
          <p className="ladies-only__desc" data-stagger-child>
            A comfortable and focused fitness environment designed exclusively for women. Train with confidence, privacy, and expert support.
          </p>

          <ul className="ladies-only__features" data-stagger-child>
            {features.map((feature, idx) => (
              <li key={idx} className="ladies-only__feature">
                <div className="ladies-only__check">
                  <Check size={14} />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="ladies-only__actions" data-stagger-child>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary ladies-only__btn"
            >
              <MessageCircle size={16} />
              ENQUIRE ON WHATSAPP
            </a>
          </div>
        </div>
        
        <div className="ladies-only__image-wrap" data-reveal-clip="right">
          <img 
            src="/images/gym2.png" 
            alt="Ladies Only Fitness" 
            className="ladies-only__image" 
          />
          <div className="ladies-only__image-overlay"></div>
        </div>
      </div>
    </section>
  );
};

export default LadiesOnly;
