import React from 'react';
import GlassCard from './GlassCard';
import { Star } from 'lucide-react';
import './Testimonials.css';

/**
 * Testimonials Section Component
 * Displays member reviews and transformations
 * 
 * NOTE: Replace these with real testimonials from your members
 */
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Patil',
      rating: 5,
      text: 'TTZ Fitness has completely transformed my life! The trainers are knowledgeable and supportive. Lost 15kg in 6 months!',
      transformation: 'Fat Loss: 15kg'
    },
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Best gym in Chhatrapati Sambhajinagar! The nutrition guidance from Mrs. Birajdar has been invaluable. Highly recommend!',
      transformation: 'Fitness Journey: 8 months'
    },
    {
      name: 'Amit Deshmukh',
      rating: 5,
      text: 'Amazing trainers and great atmosphere! The personal training sessions helped me achieve my muscle gain goals faster than expected.',
      transformation: 'Muscle Gain: 8kg'
    },
    {
      name: 'Sneha Kulkarni',
      rating: 5,
      text: 'Love the variety of classes! From Zumba to Yoga, there\'s something for everyone. The community here is so motivating!',
      transformation: 'Overall Fitness'
    },
    {
      name: 'Vikram Jadhav',
      rating: 5,
      text: 'The personalized nutrition plans made all the difference. Mr. Birajdar\'s expertise helped me reach my fitness goals efficiently.',
      transformation: 'Body Transformation'
    },
    {
      name: 'Anita Rathod',
      rating: 5,
      text: 'Clean facility, modern equipment, and professional trainers. TTZ Fitness is worth every rupee. My health has improved significantly!',
      transformation: 'Health Improvement'
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">
            Real Transformations From Our Members
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <GlassCard key={index} hover className="testimonial-card">
              {/* Rating Stars */}
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} fill="#d9fb06" color="#d9fb06" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="testimonial-text">"{testimonial.text}"</p>

              {/* Member Info */}
              <div className="testimonial-footer">
                <div className="testimonial-name">{testimonial.name}</div>
                <div className="testimonial-transformation">{testimonial.transformation}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* CTA */}
        <div className="testimonials-cta">
          <p className="cta-text">Ready to write your own success story?</p>
          <a href="tel:9028468563" className="btn-primary">
            Join TTZ Fitness Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;