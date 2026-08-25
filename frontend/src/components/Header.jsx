import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Header.css';

/**
 * TTZ FITNESS — Two-tier Navigation Header
 *
 * Tier 1 — Utility bar (top, 40px)
 *   Left:  Location / brand tagline
 *   Right: Phone + Instagram
 *   Behaviour: slides up and fades out after 80px scroll
 *
 * Tier 2 — Main nav (below utility bar)
 *   Left:  Logo (image + wordmark)
 *   Center: Navigation links
 *   Right: JOIN NOW CTA + mobile hamburger
 *   Behaviour: moves to top:0 when utility bar hides; gains dark backdrop
 *
 * All WhatsApp / phone links preserved exactly.
 */
const Header = () => {
  const [isScrolled, setIsScrolled]           = useState(false);
  const [utilityVisible, setUtilityVisible]   = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 80);
      setUtilityVisible(y <= 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: 'About',      id: 'about' },
    { label: 'Services',   id: 'services' },
    { label: 'Trainers',   id: 'trainers' },
    { label: 'Membership', id: 'membership' },
    { label: 'Gallery',    id: 'gallery' },
    { label: 'Contact',    id: 'contact' },
  ];

  return (
    <>
      {/* ════════════════════════════════════════
          TIER 1 — Utility / Location Bar
          ════════════════════════════════════════ */}
      <div
        className={`ttz-utility${!utilityVisible ? ' ttz-utility--hidden' : ''}`}
        aria-hidden={!utilityVisible}
      >
        <div className="ttz-utility__inner">
          <span className="ttz-utility__location">
            Chhatrapati Sambhajinagar&nbsp;&nbsp;·&nbsp;&nbsp;Est. 2020
          </span>
          <div className="ttz-utility__right">
            <a href="tel:9028468563" className="ttz-utility__link">
              9028468563
            </a>
            <span className="ttz-utility__sep" aria-hidden="true">·</span>
            <a
              href="https://www.instagram.com/ttz_fitness_24/"
              target="_blank"
              rel="noopener noreferrer"
              className="ttz-utility__link"
              aria-label="TTZ Fitness on Instagram"
            >
              @ttz_fitness_24
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════
          TIER 2 — Main Navigation
          ════════════════════════════════════════ */}
      <header
        className={[
          'ttz-header',
          isScrolled       ? 'ttz-header--scrolled' : '',
          !utilityVisible  ? 'ttz-header--raised'   : '',
        ].filter(Boolean).join(' ')}
      >
        <div className="ttz-header__inner">

          {/* Logo */}
          <button
            className="ttz-header__logo"
            onClick={() => scrollToSection('home')}
            aria-label="TTZ Fitness — scroll to top"
          >
            <img
              src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg"
              alt="TTZ Fitness logo"
              className="ttz-header__logo-img"
              width="40"
              height="40"
            />
            <div className="ttz-header__logo-text">
              <span className="ttz-header__logo-name">TTZ</span>
              <span className="ttz-header__logo-sub">FITNESS</span>
            </div>
          </button>

          {/* Desktop navigation — centered */}
          <nav className="ttz-header__nav" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="ttz-header__nav-link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://wa.link/z36oiv"
            target="_blank"
            rel="noopener noreferrer"
            className="ttz-header__cta"
            aria-label="Join TTZ Fitness"
          >
            Join Now
          </a>

          {/* Mobile hamburger */}
          <button
            className="ttz-header__hamburger"
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="ttz-mobile-menu"
          >
            <span className={`ttz-hamburger-icon${isMobileMenuOpen ? ' ttz-hamburger-icon--open' : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>

        </div>
      </header>

      {/* ════════════════════════════════════════
          MOBILE MENU PANEL
          ════════════════════════════════════════ */}
      <div
        id="ttz-mobile-menu"
        className={`ttz-mobile-menu${isMobileMenuOpen ? ' ttz-mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        <div className="ttz-mobile-menu__inner">

          <p className="ttz-mobile-menu__location">
            Chhatrapati Sambhajinagar · Est. 2020
          </p>

          <nav className="ttz-mobile-menu__nav" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="ttz-mobile-menu__link"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${80 + i * 55}ms` : '0ms',
                }}
              >
                <span className="ttz-mobile-menu__num" aria-hidden="true">
                  0{i + 1}
                </span>
                {link.label}
              </button>
            ))}
          </nav>

          <div className="ttz-mobile-menu__footer">
            <a
              href="https://wa.link/z36oiv"
              target="_blank"
              rel="noopener noreferrer"
              className="ttz-mobile-menu__cta"
            >
              Join Now — Free Trial
            </a>
            <div className="ttz-mobile-menu__phones">
              <a href="tel:9028468563">9028468563</a>
              <a href="tel:8668891406">8668891406</a>
            </div>
          </div>

        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="ttz-mobile-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Header;