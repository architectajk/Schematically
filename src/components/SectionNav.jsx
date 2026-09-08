import React, { useEffect, useRef, useState } from 'react';
import '../assets/CSS/SectionNav.css';

// Scrollspy nav for the product detail pages under
// pages/Assets/Building Products/.
//
// Deliberately NOT Bootstrap's Scrollspy. Bootstrap tracks the active item by
// writing `active` classes straight onto the DOM nodes, and React overwrites
// className on its next render - the same collision that made the catalog
// filter dropdown stick. Owning the active state in React avoids the fight
// entirely, and IntersectionObserver is cheaper than Bootstrap's scroll
// handler anyway because the browser does the work off the main thread.
//
// The nav builds itself from the headings already on the page rather than
// from a hand-maintained list, so it cannot drift out of sync when a page's
// sections are edited. Headings get an id assigned on mount if they don't
// have one, which is what the anchor links point at.
const slugify = (s) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function SectionNav({
  // h2 is the page's opening section, h4 marks the major sections. h5 is used
  // for sub-headings inside a section (individual offices, product groups),
  // so it is deliberately excluded - including it would bury the real
  // structure under a long flat list.
  headingSelector = 'h2, h4',
  label = 'ON THIS PAGE',
}) {
  const navRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    // Prefer an explicit marker if a page provides one; otherwise find the
    // content column as the sibling of this nav's own column. Every product
    // page uses the same two-column row, so this works without per-page
    // wiring - but the attribute is there as an escape hatch if a page
    // ever needs a different layout.
    //
    // NOTE: this depends on navRef being attached, which is why the <nav>
    // below renders unconditionally rather than being skipped while
    // `sections` is still empty. An earlier version returned null before the
    // first render, so the ref was never set, the container was never found,
    // and the nav could never populate - it just silently never appeared.
    const container =
      document.querySelector('[data-product-content]') ||
      navRef.current?.closest('.row')?.querySelector('.col-lg-8') ||
      document.querySelector('.col-lg-8');
    if (!container) return undefined;

    const nodes = Array.from(container.querySelectorAll(headingSelector));
    const found = nodes
      .map((el) => {
        const text = (el.textContent || '').trim();
        if (text && !el.id) el.id = `section-${slugify(text)}`;
        return { id: el.id, text };
      })
      .filter((s) => s.text && s.id);

    setSections(found);
    if (found.length) setActiveId(found[0].id);

    // The rootMargin creates a band near the top of the viewport: a heading
    // becomes "current" once it reaches roughly the upper third and stays
    // current until the next one arrives. Without the negative bottom margin
    // every heading below the fold would count as visible at once.
    const observer = new IntersectionObserver(
      (entries) => {
        const onscreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (onscreen.length) setActiveId(onscreen[0].target.id);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [headingSelector]);

  const jumpTo = (event, id) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    setActiveId(id);
  };

  // The <nav> element itself always renders so navRef is populated on the
  // first commit and the effect above has something to anchor its DOM lookup
  // to. Only the contents are conditional: a single-entry nav is just noise,
  // so below two sections this stays an empty, invisible wrapper.
  return (
    <nav className="asset-section-nav" aria-label="Sections on this page" ref={navRef}>
      {sections.length >= 2 && (
        <>
          <div className="asset-section-nav-label">{label}</div>
          <ul className="list-unstyled mb-0">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`asset-section-link${activeId === s.id ? ' active' : ''}`}
                  aria-current={activeId === s.id ? 'true' : undefined}
                  onClick={(e) => jumpTo(e, s.id)}
                >
                  {s.text}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}
