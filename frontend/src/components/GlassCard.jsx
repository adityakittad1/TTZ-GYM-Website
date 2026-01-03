import React from 'react';
import './GlassCard.css';

/**
 * Reusable Glass Card Component
 * Creates the Apple-style glassmorphism effect
 * 
 * Props:
 * - children: Content to display inside the card
 * - className: Additional CSS classes
 * - hover: Enable hover effect (default: false)
 */
const GlassCard = ({ children, className = '', hover = false }) => {
  return (
    <div className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;