import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../assets/CSS/ModelGallery.css';

// Grid of 3D model previews; clicking one opens it large in a modal with full
// orbit controls.
//
// Two deliberate choices:
//
// 1. The modal is React state plus Bootstrap's CSS classes, NOT Bootstrap's
//    modal JS. Bootstrap drives modals by adding classes to the DOM and to
//    <body>, which React overwrites on its next render - the same collision
//    that made the catalog filter dropdown stick.
//
// 2. It renders through a portal into <body>. The product sidebar is
//    position:sticky, which creates a stacking context; a modal rendered in
//    place inside the page would be trapped underneath it no matter what
//    z-index it carried. Portalling sidesteps stacking entirely.
//
// The preview tiles are live <model-viewer> elements rather than static
// images, because no poster images exist for these models. Each one costs a
// WebGL context, so `loading="lazy"` keeps the offscreen ones from
// initialising. If the grid ever grows much beyond a handful, generating
// poster PNGs and using plain <img> for the grid would be the next step.
export default function ModelGallery({ models = [], basePath = '' }) {
  const [active, setActive] = useState(null);
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return undefined;
    lastFocused.current = document.activeElement;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    // Stop the page behind the dialog scrolling while it is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      // Send focus back where it came from, so keyboard users are not
      // dumped at the top of the document.
      lastFocused.current?.focus?.();
    };
  }, [active, close]);

  if (!models.length) return null;

  return (
    <>
      <div className="row g-3 mb-4">
        {models.map((model) => (
          <div className="col-sm-6 col-xl-4" key={model.file}>
            <button
              type="button"
              className="model-tile"
              onClick={() => setActive(model)}
              aria-label={`Open ${model.name} in 3D`}
            >
              {/* No camera-controls here: the preview should not swallow the
                  click. CSS also sets pointer-events:none on it so every
                  press lands on this button. */}
              <model-viewer
                className="model-tile-viewer"
                src={`${basePath}${model.file}`}
                alt={`${model.name} preview`}
                camera-orbit="45deg 55deg 4m"
                interaction-prompt="none"
                loading="lazy"
                tone-mapping="neutral"
                shadow-intensity="1"
              />
              <span className="model-tile-caption">
                {model.name}
                <span className="model-tile-hint">View 3D</span>
              </span>
            </button>
          </div>
        ))}
      </div>

      {active && createPortal(
        <>
          <div className="modal-backdrop show" onClick={close} />
          <div
            className="modal d-block"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.name}, 3D model`}
            onMouseDown={(e) => {
              // Only close on a press that starts on the backdrop itself,
              // so dragging the model and releasing outside doesn't dismiss.
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content model-modal-content" ref={dialogRef} tabIndex={-1}>
                <div className="modal-header">
                  <h5 className="modal-title">{active.name}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={close} />
                </div>
                <div className="modal-body p-0">
                  <model-viewer
                    slot="canvas" style={{ width: 'auto', height: '500px',background: '#eeeeee'}}
                    className="model-tile-viewer model-modal-viewer"
                    src={`${basePath}${active.file}`}
                    alt={`${active.name}, interactive 3D model`}
                    camera-orbit="45deg 55deg 4m"
                    camera-controls
                    touch-action="pan-y"
                    auto-rotate
                    tone-mapping="neutral"
                    shadow-intensity="1"
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                  />
                </div>
                <div className="modal-footer py-2">
                  <small className="text-body-secondary me-auto">
                    Drag to rotate, scroll to zoom
                  </small>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
