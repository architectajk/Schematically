import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { SchematicContext } from '../context/Schematic/SchematicContextProvider';

// Brand-logo slot for the product detail pages under
// src/pages/Assets/Building Products/. Mirrors the Nuvocotto sidebar logo:
// a mode-aware mark, linked to the manufacturer's site, sitting above the
// Website / social links.
//
// Props:
//   light       - artwork to use in light mode (normally the dark/black mark)
//   dark        - artwork to use in dark mode (normally the white mark)
//   allowInvert - when only one file is supplied, recolour it for the other
//                 mode with a CSS filter. Defaults to true. Set false for
//                 artwork that cannot survive a filter (see Jaquar below).
//

export default function BrandLogo({ href, light, dark, alt = '', height = 48, allowInvert = true }) {
  const { mode } = useContext(SchematicContext);
  const [failedSrc, setFailedSrc] = useState(null);

  const isDark = mode === 'dark';
  const preferred = isDark ? dark : light;
  const substitute = allowInvert ? (isDark ? light : dark) : undefined;
  const src = preferred || substitute;

  // Nothing usable for this mode, or the file 404'd - render nothing at all.
  if (!src || failedSrc === src) return null;

  // Only recolour when falling back to the other mode's artwork.
  const filter = preferred
    ? undefined
    : isDark
      ? 'brightness(0) invert(1)'
      : 'brightness(0)';

  const img = (
    <img
      className="pb-3 img-fluid"
      src={src}
      alt={alt}
      style={{ maxHeight: height, filter }}
      onError={() => setFailedSrc(src)}
    />
  );

  return (
    <div className="d-flex-column m-3 p-1 justify-content-center">
      {href ? (
        <Link to={href} target="_blank" rel="noopener noreferrer">
          {img}
        </Link>
      ) : (
        img
      )}
    </div>
  );
}
