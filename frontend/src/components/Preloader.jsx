import React, { useEffect, useState } from 'react';
import './Preloader.css';

/**
 * TTZ FITNESS — Brand Entrance / Preloader
 *
 * Cinematic identity reveal sequence:
 *   0.00s  Dark screen + ambient warm glow materialises
 *   0.35s  "TTZ" reveals via clip-path left→right wipe
 *   0.82s  Gold separator line expands from centre
 *   0.88s  "FITNESS" rises from below
 *   1.10s  Tagline fades in
 *   1.45s  Curtain lifts (translateY −100%) — hero becomes visible beneath
 *   2.10s  Component unmounts
 *
 * Performance notes:
 *   - Only uses GPU-friendly transform/opacity/clip-path
 *   - Main site renders beneath the overlay during the sequence
 *     so API calls and image loading begin immediately
 *   - Body scroll is locked during the entrance, restored on exit
 *   - Skipped entirely on /admin route
 *   - Respects prefers-reduced-motion via CSS
 */

/* Total timing constants (ms) */
const EXIT_DELAY  = 1450;  // when curtain starts lifting
const DONE_DELAY  = 2120;  // when component unmounts

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState('enter'); // 'enter' | 'exit'

  useEffect(() => {
    /* Lock scroll while the entrance is running */
    document.body.style.overflow = 'hidden';

    const exitTimer = setTimeout(() => {
      setPhase('exit');
      /* Restore scroll as curtain begins to lift so the hero
         is already interactive when it comes into view */
      document.body.style.overflow = '';
    }, EXIT_DELAY);

    const doneTimer = setTimeout(() => {
      onComplete();
    }, DONE_DELAY);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <div
      className={`preloader preloader--${phase}`}
      role="presentation"
      aria-hidden="true"
      aria-label="TTZ Fitness — brand entrance"
    >
      <div className="preloader__inner">

        {/* Very subtle warm ambient spotlight behind the wordmark */}
        <div className="preloader__glow" />

        {/* Brand mark */}
        <div className="preloader__brand">

          {/* TTZ — clip-path wipe + shimmer wrapper (shimmer via ::after) */}
          <div className="preloader__ttz-wrap">
            <div className="preloader__ttz" aria-hidden="true">
              TTZ
            </div>
          </div>

          {/* Gold separator line */}
          <div className="preloader__line" aria-hidden="true" />

          {/* FITNESS subtext */}
          <div className="preloader__sub" aria-hidden="true">
            FITNESS
          </div>

          {/* Tagline */}
          <div className="preloader__tagline" aria-hidden="true">
            Fitness · Focus · Future
          </div>

        </div>
      </div>
    </div>
  );
};

export default Preloader;
