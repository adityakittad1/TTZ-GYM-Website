import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Navigation
import Header from './components/Header';

// Hero
import Hero from './components/Hero';

// 8-section structure (down from 12+)
import AboutStats    from './components/AboutStats';      // About + Stats merged
import Services      from './components/Services';        // Compact 3×2 grid
import TeamSection   from './components/TeamSection';     // WhyTTZ + Trainers merged
import Membership    from './components/Membership';      // Pricing (compact)
import Gallery       from './components/Gallery';         // Editorial mosaic
import Conversion    from './components/Conversion';      // Testimonials + FinalCTA merged
import ContactFooter from './components/ContactFooter';   // Contact + Footer merged

// Floating action
import FloatingWhatsApp from './components/FloatingWhatsApp';

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
      <TeamSection />
      <Membership />
      <Gallery />
      <Conversion />
    </main>
    <ContactFooter />
    <FloatingWhatsApp />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"      element={<MainSite />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
