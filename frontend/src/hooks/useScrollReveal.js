import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — attaches an IntersectionObserver to a container ref.
 * All child elements with the class `reveal`, `reveal-left`, or `reveal-right`
 * will get the `visible` class added when they enter the viewport.
 *
 * @param {object} options - IntersectionObserver options
 * @returns {React.RefObject} ref to attach to the container element
 */
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const defaults = {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
      ...options,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    }, defaults);

    const elements = container.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
};

export default useScrollReveal;
