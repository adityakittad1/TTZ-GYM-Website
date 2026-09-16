import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import './App.css';

// Navigation
import Header from './components/Header';

// Hero
import Hero from './components/Hero';

// 8-section structure (down from 12+)
import AboutStats    from './components/AboutStats';      // About + Stats merged
import Services      from './components/Services';        // Editorial numbered list
import LadiesOnly    from './components/LadiesOnly';      // Dedicated ladies section
import TeamSection   from './components/TeamSection';     // WhyTTZ + Trainers merged
import Membership    from './components/Membership';      // Pricing (compact)
import Gallery       from './components/Gallery';         // Editorial mosaic
import Conversion    from './components/Conversion';      // Testimonials + FinalCTA merged
import ContactFooter from './components/ContactFooter';   // Contact + Footer merged

// Floating action
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Brand entrance — shown once per page load on the main site
import Preloader from './components/Preloader';

// Admin panel (unchanged)
import Admin from './components/Admin';

/**
 * TTZ FITNESS — 8-section structure
 * Hero → AboutStats → Services → TeamSection
 * → Membership → Gallery → Conversion → ContactFooter
 */
const MainSite = () => (
  <div className="App">
    <Header />
    <main>
      <Hero />
      <AboutStats />
      <Services />
      <LadiesOnly />
      <TeamSection />
      <Membership />
      <Gallery />
      <Conversion />
    </main>
    <ContactFooter />
    <FloatingWhatsApp />
  </div>
);

/**
 * Whether to show the brand entrance on this load.
 * - Skip on /admin (no preloader in the admin panel)
 */
function shouldShowPreloader() {
  const isAdmin = window.location.pathname.startsWith('/admin');
  if (isAdmin) return false;
  return true;
}

function App() {
  const [preloaderDone, setPreloaderDone] = useState(!shouldShowPreloader());

  const handlePreloaderComplete = () => {
    setPreloaderDone(true);
    // Initialize Lenis smooth scroll + wire GSAP ScrollTrigger
    // Deferred so React has rendered the full DOM first
    setTimeout(() => {
      import('./lib/scrollInit').then(({ initLenis }) => {
        initLenis();
        // Refresh all ScrollTrigger positions after Lenis init
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      });
    }, 100);
  };

  // On admin route, init Lenis immediately (no preloader)
  useEffect(() => {
    const isAdmin = window.location.pathname.startsWith('/admin');
    if (isAdmin) {
      import('./lib/scrollInit').then(({ initLenis }) => initLenis());
    }
    return () => {
      import('./lib/scrollInit').then(({ destroyLenis }) => destroyLenis());
    };
  }, []);

  return (
    <SiteSettingsProvider>
      <Router>
        {/*
          The Preloader is a fixed overlay (z-index: 9999).
          The main site renders underneath immediately so that:
            1. API calls (hero settings, hero images) start right away
            2. The hero image begins loading in the background
            3. When the curtain lifts the hero is already fully rendered
        */}
        {!preloaderDone && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}

        <Routes>
          <Route path="/"      element={<MainSite />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </SiteSettingsProvider>
  );
}

export default App;
