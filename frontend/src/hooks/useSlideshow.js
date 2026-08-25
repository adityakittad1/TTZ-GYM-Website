import { useState, useEffect, useCallback } from 'react';

/**
 * useSlideshow — manages hero background image slideshow
 * @param {string[]} images - array of image paths/URLs
 * @param {number} interval - ms between slides (default 6000)
 * @returns {{ currentIndex, nextIndex, isTransitioning, goTo, goNext, goPrev, pause, resume }}
 */
const useSlideshow = (images = [], interval = 6000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1 % Math.max(images.length, 1));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const advance = useCallback(() => {
    if (images.length <= 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % images.length;
        setNextIndex((next + 1) % images.length);
        return next;
      });
      setIsTransitioning(false);
    }, 1200); // crossfade duration
  }, [images.length]);

  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(advance, interval);
    return () => clearInterval(timer);
  }, [advance, interval, isPaused, images.length]);

  const goTo = useCallback((index) => {
    if (index === currentIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setNextIndex((index + 1) % images.length);
      setIsTransitioning(false);
    }, 1200);
  }, [currentIndex, images.length]);

  const goNext = useCallback(() => {
    goTo((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goTo]);

  return {
    currentIndex,
    nextIndex,
    isTransitioning,
    goTo,
    goNext,
    goPrev,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
  };
};

export default useSlideshow;
