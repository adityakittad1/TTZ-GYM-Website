/**
 * TTZ FITNESS — Lenis + GSAP ScrollTrigger Integration
 *
 * Creates a single Lenis smooth scroll instance and wires it
 * to GSAP's ScrollTrigger so all scroll-based animations
 * respond to Lenis's smoothed scroll position (not raw scroll).
 *
 * Usage:
 *   import { initLenis, destroyLenis } from './lib/scrollInit';
 *   initLenis();   // call once after preloader exits
 *   destroyLenis(); // call on unmount / route change
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let rafId = null;

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  // Wire Lenis scroll events to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Run Lenis on every GSAP tick
  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  // Prevent GSAP from adding its own requestAnimationFrame on top
  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function destroyLenis() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function getLenis() {
  return lenisInstance;
}
