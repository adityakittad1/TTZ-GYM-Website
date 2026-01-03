import React from 'react';
import GlassCard from './GlassCard';
import { Target, Heart, TrendingUp, Users } from 'lucide-react';
import './About.css';

/**
 * About Section Component
 * Features:
 * - Gym story and mission
 * - Why choose TTZ Fitness
 * - Key differentiators
 * - Founder information
 */
const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">
            Transforming Lives Since 2020
          </p>
        </div>

        {/* Main About Content */}
        <GlassCard className="about-main-card">
          <h3 className="about-heading">Welcome to TTZ FITNESS 24</h3>
          <p className="about-text">
            Chhatrapati Sambhajinagar's premier fitness destination since 2020. At TTZ FITNESS 24, 
            we are committed to helping you achieve total wellness by combining expert fitness coaching 
            and nutrition guidance.
          </p>
          <p className="about-text">
            Led by our certified nutrition coaches and accomplished district-level athletes, 
            we design customized programs that align with your individual fitness goals with 
            state-of-the-art equipment and a wide variety of fitness classes for every level.
          </p>
        </GlassCard>

        {/* Why Choose Us - Feature Cards */}
        <div className="features-grid">
          <GlassCard hover className="feature-card">
            <div className="feature-icon">
              <Target size={32} />
            </div>
            <h4 className="feature-title">Personalized Plans</h4>
            <p className="feature-description">
              Customized fitness and nutrition programs tailored to your unique goals and lifestyle
            </p>
          </GlassCard>

          <GlassCard hover className="feature-card">
            <div className="feature-icon">
              <Heart size={32} />
            </div>
            <h4 className="feature-title">Expert Guidance</h4>
            <p className="feature-description">
              Certified nutrition coaches and experienced trainers committed to your success
            </p>
          </GlassCard>

          <GlassCard hover className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={32} />
            </div>
            <h4 className="feature-title">Proven Results</h4>
            <p className="feature-description">
              Over 4 years of transforming lives with measurable fitness achievements
            </p>
          </GlassCard>

          <GlassCard hover className="feature-card">
            <div className="feature-icon">
              <Users size={32} />
            </div>
            <h4 className="feature-title">Community Support</h4>
            <p className="feature-description">
              Join a vibrant community that motivates and encourages your growth
            </p>
          </GlassCard>
        </div>

        {/* Mission Statement */}
        <GlassCard className="mission-card">
          <h3 className="mission-heading">Our Mission</h3>
          <p className="mission-text">
            To transform your body and mind through a comprehensive approach to health and wellness. 
            Our state-of-the-art facilities and diverse range of classes cater to all fitness levels, 
            ensuring everyone can find their path to a healthier lifestyle.
          </p>
        </GlassCard>
      </div>
    </section>
  );
};

export default About;