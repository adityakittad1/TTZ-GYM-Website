/**
 * TTZ FITNESS — useGSAPReveal
 *
 * GSAP ScrollTrigger-powered reveal hook. Replaces/augments
 * the CSS IntersectionObserver approach with precise, weighted
 * scroll choreography.
 *
 * Respects prefers-reduced-motion — falls back to instant reveal.
 *
 * Usage:
 *   const containerRef = useGSAPReveal();
 *   <section ref={containerRef}>
 *     <div data-reveal>Fades + slides up</div>
 *     <div data-reveal-left>Slides from left</div>
 *     <div data-reveal-right>Slides from right</div>
 *     <div data-reveal-clip>Clip-path wipe</div>
 *     <div data-stagger-parent>
 *       <div data-stagger-child>Item 1</div>
 *       <div data-stagger-child>Item 2</div>
 *     </div>
 *   </section>
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const DEFAULTS = {
  y: 40,
  x: 40,
  duration: 0.85,
  ease: 'power3.out',
  stagger: 0.08,
  start: 'top 88%',
};

const useGSAPReveal = (options = {}) => {
  const ref = useRef(null);
  const ctx = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Reduced motion: just make everything visible immediately
    if (prefersReducedMotion()) {
      container.querySelectorAll(
        '[data-reveal],[data-reveal-left],[data-reveal-right],[data-reveal-clip],[data-stagger-child],[data-counter]'
      ).forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.clipPath = 'none';
      });
      return;
    }

    const opts = { ...DEFAULTS, ...options };

    ctx.current = gsap.context(() => {
      // ── Standard reveal: translateY + opacity ──
      container.querySelectorAll('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: opts.y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: opts.duration,
            ease: opts.ease,
            scrollTrigger: {
              trigger: el,
              start: opts.start,
              once: true,
            },
            delay: parseFloat(el.dataset.delay || 0),
          }
        );
      });

      // ── Reveal from left ──
      container.querySelectorAll('[data-reveal-left]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: -opts.x, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: opts.duration,
            ease: opts.ease,
            scrollTrigger: {
              trigger: el,
              start: opts.start,
              once: true,
            },
            delay: parseFloat(el.dataset.delay || 0),
          }
        );
      });

      // ── Reveal from right ──
      container.querySelectorAll('[data-reveal-right]').forEach((el) => {
        gsap.fromTo(
          el,
          { x: opts.x, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: opts.duration,
            ease: opts.ease,
            scrollTrigger: {
              trigger: el,
              start: opts.start,
              once: true,
            },
            delay: parseFloat(el.dataset.delay || 0),
          }
        );
      });

      // ── Clip-path reveal (wipe from bottom) ──
      container.querySelectorAll('[data-reveal-clip]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
          {
            clipPath: 'inset(0 0 0% 0)',
            duration: opts.duration * 1.1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: el,
              start: opts.start,
              once: true,
            },
            delay: parseFloat(el.dataset.delay || 0),
          }
        );
      });

      // ── Stagger children ──
      container.querySelectorAll('[data-stagger-parent]').forEach((parent) => {
        const children = parent.querySelectorAll('[data-stagger-child]');
        if (!children.length) return;
        gsap.fromTo(
          children,
          { y: opts.y, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: opts.duration,
            ease: opts.ease,
            stagger: opts.stagger,
            scrollTrigger: {
              trigger: parent,
              start: opts.start,
              once: true,
            },
          }
        );
      });

      // ── Counter animation ──
      container.querySelectorAll('[data-counter]').forEach((el) => {
        const target = parseFloat(el.dataset.counter);
        const suffix = el.dataset.counterSuffix || '';
        const prefix = el.dataset.counterPrefix || '';
        const decimals = el.dataset.counterDecimals || 0;
        const obj = { val: 0 };

        ScrollTrigger.create({
          trigger: el,
          start: opts.start,
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate() {
                el.textContent =
                  prefix +
                  parseFloat(obj.val.toFixed(decimals)).toLocaleString() +
                  suffix;
              },
            });
          },
        });
      });
    }, container);

    return () => {
      if (ctx.current) ctx.current.revert();
    };
  }, []);

  return ref;
};

export default useGSAPReveal;
