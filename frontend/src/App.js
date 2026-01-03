import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Trainers from './components/Trainers';
import Membership from './components/Membership';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

/**
 * TTZ FITNESS Website
 * Main Application Component
 * 
 * Structure:
 * - Header: Navigation bar with logo and menu
 * - Hero: Landing section with gym intro
 * - About: Gym story and mission
 * - Services: All programs and classes
 * - Trainers: Founder profiles
 * - Membership: Plans, pricing, and timings
 * - Testimonials: Member success stories
 * - Contact: Contact form, map, and info
 * - Footer: Site footer with links
 */
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Trainers />
        <Membership />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
