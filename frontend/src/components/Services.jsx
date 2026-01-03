import React from 'react';
import GlassCard from './GlassCard';
import { Dumbbell, Heart, Apple, Zap, ClipboardList, Brain } from 'lucide-react';
import './Services.css';

/**
 * Services Section Component
 * Displays all gym services/programs:
 * - Weight Training, Cardio, Personal Training, Fat Loss/Muscle Gain
 * - Yoga, Nutrition, Zumba, Aerobics, Plans, Meditation
 */
const Services = () => {
  const services = [
    {
      icon: <Dumbbell size={40} />,
      title: 'Weight Training',
      description: 'Build strength and muscle with our state-of-the-art equipment and expert guidance'
    },
    {
      icon: <Heart size={40} />,
      title: 'Cardio',
      description: 'Improve cardiovascular health with varied cardio equipment and high-intensity workouts'
    },
    {
      icon: <Zap size={40} />,
      title: 'Personal Training',
      description: 'One-on-one customized training sessions designed for your specific fitness goals'
    },
    {
      icon: <Apple size={40} />,
      title: 'Nutrition Plans',
      description: 'Certified nutrition coaching to complement your fitness journey with healthy eating'
    },
    {
      icon: <Brain size={40} />,
      title: 'Yoga',
      description: 'Enhance flexibility, balance, and mental clarity through guided yoga sessions'
    },
    {
      icon: <Heart size={40} />,
      title: 'Zumba',
      description: 'Fun, energetic dance fitness classes that burn calories while having a great time'
    },
    {
      icon: <Zap size={40} />,
      title: 'Aerobics',
      description: 'Dynamic group fitness classes to improve endurance and overall fitness levels'
    },
    {
      icon: <Brain size={40} />,
      title: 'Meditation',
      description: 'Mental wellness and stress relief through guided meditation and mindfulness practices'
    },
    {
      icon: <ClipboardList size={40} />,
      title: 'Fat Loss Programs',
      description: 'Comprehensive fat loss programs combining exercise, nutrition, and lifestyle coaching'
    },
    {
      icon: <Dumbbell size={40} />,
      title: 'Muscle Gain Programs',
      description: 'Specialized training and nutrition plans to help you build lean muscle mass effectively'
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="services-container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive Programs For Every Fitness Goal
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service, index) => (
            <GlassCard key={index} hover className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </GlassCard>
          ))}
        </div>

        {/* Call to Action */}
        <div className="services-cta">
          <GlassCard className="cta-card">
            <h3 className="cta-heading">Ready to Start Your Transformation?</h3>
            <p className="cta-text">
              We have the perfect plan for you! Contact us today to learn more about our programs.
            </p>
            <div className="cta-buttons">
              <a href="https://wa.link/z36oiv" target="_blank" rel="noopener noreferrer" className="btn-primary">
                Book Now
              </a>
              <a href="https://wa.me/919028468563" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Us
              </a>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

export default Services;