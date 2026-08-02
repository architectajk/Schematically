import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';
import '../assets/CSS/DotsBackground.css';

// Design reference: 42 columns across 1280px → ~30px between dots.
const DOT_SPACING = 30;
// Ceiling on rendered dots so very large viewports stay cheap to animate.
const MAX_DOTS = 1400;

// Deterministic per-index pseudo-random so resizing the window re-lays the grid
// out without reshuffling every dot's timing.
function seededRandom(index, salt) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

/**
 * Animated twinkling dot grid, sized to fill its positioned parent.
 *
 * @param {boolean} masked   Fade the grid out towards the edges (hero backdrop).
 * @param {number}  spacing  Pixels between dots.
 * @param {string}  mode     'dark' | 'light'; defaults to the app-wide mode.
 */
export default function DotsBackground({ masked = false, spacing = DOT_SPACING, mode }) {
  const { mode: contextMode } = useContext(SchematicContext);
  const resolvedMode = mode || contextMode;

  const containerRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const measure = () => {
      setSize({ width: node.clientWidth, height: node.clientHeight });
    };
    measure();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure);
      return () => window.removeEventListener('resize', measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const dots = useMemo(() => {
    if (!size.width || !size.height) return [];

    let cols = Math.max(1, Math.round(size.width / spacing));
    let rows = Math.max(1, Math.round(size.height / spacing));

    // Thin the grid uniformly rather than clipping it, so coverage stays even.
    while (cols * rows > MAX_DOTS) {
      cols = Math.max(1, Math.round(cols * 0.9));
      rows = Math.max(1, Math.round(rows * 0.9));
    }

    const generated = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        generated.push({
          id: index,
          x: ((c + 0.5) / cols) * 100,
          y: ((r + 0.5) / rows) * 100,
          delay: seededRandom(index, 1) * 6,
          duration: 4 + seededRandom(index, 2) * 5,
        });
      }
    }
    return generated;
  }, [size.width, size.height, spacing]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`dots-bg dots-bg--${resolvedMode === 'light' ? 'light' : 'dark'}${
        masked ? ' dots-bg--masked' : ''
      }`}
    >
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="dots-bg__dot"
          style={{
            left: `${dot.x.toFixed(3)}%`,
            top: `${dot.y.toFixed(3)}%`,
            animationDuration: `${dot.duration.toFixed(2)}s`,
            animationDelay: `${dot.delay.toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}
