import React from 'react';
import GlassCard from './GlassCard';
import './Trainers.css';

/**
 * Trainers Section Component
 * Displays gym founders/trainers
 */
const Trainers = () => {
  const trainers = [
    {
      name: 'Mrs. Archana Birajdar',
      role: 'Founder & Wellness Coach',
      specialty: 'Certified Nutrition Coach',
      image: 'https://customer-assets.emergentagent.com/job_elite-gym-2/artifacts/l69db2k6_T1.jpg',
      description:
        'Accomplished district-level athlete with extensive experience running a successful nutrition club. A trusted leader in health and wellness.'
    },
    {
      name: 'Mr. Vilas Birajdar',
      role: 'Founder & Wellness Coach',
      specialty: 'Certified Nutrition Coach',
      image: 'https://customer-assets.emergentagent.com/job_elite-gym-2/artifacts/d8ixnhd1_T2.jpg',
      description:
        'District-level athlete with over four years of experience. Brings unparalleled expertise in fitness and nutrition to our community.'
    }
  ];

  return (
    <section id="trainers" className="trainers-section">
      <div className="trainers-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Meet Our Founders</h2>
          <p className="section-subtitle">
            Expert Guidance From Certified Professionals
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="trainers-grid">
          {trainers.map((trainer, index) => (
            <GlassCard key={index} hover className="trainer-card">
              
              {/* SQUARE IMAGE WRAPPER */}
              <div className="trainer-image-container">
                <div className="trainer-image-inner">
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className="trainer-image"
                  />
                  <div className="trainer-badge">{trainer.specialty}</div>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="trainer-content">
                <h3 className="trainer-name">{trainer.name}</h3>
                <p className="trainer-role">{trainer.role}</p>
                <p className="trainer-description">{trainer.description}</p>
              </div>

            </GlassCard>
          ))}
        </div>

        {/* Founder Message */}
        <GlassCard className="founder-message-card">
          <h3 className="founder-message-heading">Our Promise to You</h3>
          <p className="founder-message-text">
            Join the TTZ FITNESS 24 family today and take the first step toward
            transforming your body and mind. Let us support you on your fitness
            journey with personalized care and a vibrant community that
            encourages growth.
          </p>
          <p className="founder-message-signature">
            - The TTZ Fitness Team
          </p>
        </GlassCard>
      </div>
    </section>
  );
};

export default Trainers;
