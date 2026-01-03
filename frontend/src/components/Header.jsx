import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

/**
 * Navigation Header Component
 * Features:
 * - Sticky navigation with glassmorphism effect
 * - Mobile hamburger menu
 * - Smooth scroll to sections
 * - Logo display
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Detect scroll for header background change
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img 
            src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg" 
            alt="TTZ Fitness Logo" 
            className="logo-image"
          />
          <span className="logo-text">TTZ FITNESS</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
          <button onClick={() => scrollToSection('about')} className="nav-link">About</button>
          <button onClick={() => scrollToSection('services')} className="nav-link">Services</button>
          <button onClick={() => scrollToSection('trainers')} className="nav-link">Trainers</button>
          <button onClick={() => scrollToSection('membership')} className="nav-link">Membership</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </nav>

        {/* Call to Action Button */}
        <a href="tel:9028468563" className="btn-primary header-cta">
          Join Now
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <button onClick={() => scrollToSection('home')} className="mobile-nav-link">Home</button>
          <button onClick={() => scrollToSection('about')} className="mobile-nav-link">About</button>
          <button onClick={() => scrollToSection('services')} className="mobile-nav-link">Services</button>
          <button onClick={() => scrollToSection('trainers')} className="mobile-nav-link">Trainers</button>
          <button onClick={() => scrollToSection('membership')} className="mobile-nav-link">Membership</button>
          <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact</button>
          <a href="tel:9028468563" className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
            Join Now
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;