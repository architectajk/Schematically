import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsGrid3X3GapFill, BsListUl, BsBoxSeam, BsChevronDown, BsCollection, BsArrowRight } from 'react-icons/bs';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import productData from './Building Products/buildingProductFilter.json';
import './Assets.css'

// Only manufacturers with an actual detail page get a working link on their
// card. Every product currently in buildingProductFilter.json has one, so all
// cards link. Any product added without an entry here stays a plain,
// non-clickable card rather than shipping a dead link - so add an entry when
// the page exists, not before. Keys must match the product's CompanyName
// exactly ('TOSTEM India', not 'Tostem').
const DETAIL_ROUTES = {
  Nuvocotto: '/assets/Nuvocotto',
  Jaquar: '/assets/Jaquar',
  'TOSTEM India': '/assets/Tostem',
  'VOX India': '/assets/Vox',
  Danpal: '/assets/Danpal',
  Artize: '/assets/Artize',
  'Carbon Craft Design': '/assets/CarbonCraft',
  'TOTO India': '/assets/Toto',
};

// A few background tints so placeholder tiles (products with no photo yet)
// aren't all identical - picked deterministically from the company name.
const PLACEHOLDER_TINTS = ['#2b3440', '#3a2f2f', '#2f3a2f', '#2f2f3a', '#3a362f', '#33322b'];

// Grid view uses a repeating "bento" pattern (a mix of tall, wide and normal
// tiles) purely for visual variety - it isn't tied to any product data, and
// repeats forever so it still looks intentional once more products are
// added, not just for these first 5.
const BENTO_PATTERN = ['tall', 'normal', 'normal', 'wide', 'normal', 'normal'];

function bentoSizeForIndex(index) {
  return BENTO_PATTERN[index % BENTO_PATTERN.length];
}

function tintForName(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return PLACEHOLDER_TINTS[Math.abs(hash) % PLACEHOLDER_TINTS.length];
}

// Categories and Use are driven by the grouped taxonomy fields
// (categoryGroup / useGroup) rather than the free-text category and use
// fields. Those free-text fields describe each product in its own words, so
// every product had a unique value - which meant every chip option returned
// exactly one result and the filter did nothing. The grouped fields use the
// shared vocabulary from this file's "filters" block, so products actually
// collect under the same option.
//
// Both grouped fields hold a comma-separated list, because a product
// legitimately belongs in several groups at once - terracotta tiles are
// roofing AND walls AND flooring. The descriptive `category` text is still
// what the card displays; only filtering uses the grouped value.
function uniqueValues(products, field, { split } = {}) {
  const values = new Set();
  products.forEach((p) => {
    const raw = p[field];
    if (!raw) return;
    if (split) {
      raw.split(',').forEach((part) => {
        const trimmed = part.trim();
        if (trimmed) values.add(trimmed);
      });
    } else {
      values.add(raw.trim());
    }
  });
  return Array.from(values).sort();
}

// This dropdown is controlled by React state rather than Bootstrap's
// data-bs-toggle JS, and that is deliberate - mixing the two makes the menu
// stick.
//
// The failure works like this: Bootstrap opens the menu by adding a `show`
// class directly to the <ul> in the DOM. React has no idea that happened, so
// the next time this component renders - which selecting a filter always
// causes - React writes back the className from the JSX and silently strips
// `show`. The menu vanishes, but Bootstrap's internal state still thinks it
// is open, so the following click asks it to hide an already-hidden menu and
// appears to do nothing. You end up needing two clicks to reopen it. The
// hard-coded aria-expanded got clobbered the same way.
//
// Owning the open/closed state here keeps Bootstrap's CSS (which is all we
// actually wanted) and drops its JS (which fights React over the same DOM).
function FilterChip({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  // Bootstrap normally provides click-outside and Escape handling; since we
  // are not using its JS, do it here. Listeners are only attached while the
  // menu is open so we are not paying for them on every chip all the time.
  useEffect(() => {
    if (!open) return undefined;
    const onDocPointerDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = (next) => {
    onChange(next);
    setOpen(false);
  };

  return (
    <div className="dropdown asset-filter-chip" ref={wrapRef}>
      <button
        className={`btn btn-sm asset-chip-btn ${value ? 'active' : ''}`}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {value || label} <BsChevronDown className="ms-1 asset-chip-caret" />
      </button>
      <ul className={`dropdown-menu asset-chip-menu${open ? ' show' : ''}`}>
        <li>
          <button className={`dropdown-item ${!value ? 'active' : ''}`} type="button" onClick={() => choose('')}>
            All {label}
          </button>
        </li>
        {options.map((opt) => (
          <li key={opt}>
            <button
              className={`dropdown-item ${value === opt ? 'active' : ''}`}
              type="button"
              onClick={() => choose(opt)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Assets() {
  const { mode } = useContext(SchematicContext);
  const textClass = `text-${mode === 'light' ? 'dark' : 'light'}`;
  const allProducts = productData.products;

  const [category, setCategory] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [material, setMaterial] = useState('');
  const [use, setUse] = useState('');
  const [view, setView] = useState('grid');

  const categories = useMemo(() => uniqueValues(allProducts, 'categoryGroup', { split: true }), [allProducts]);
  const manufacturers = useMemo(() => uniqueValues(allProducts, 'CompanyName'), [allProducts]);
  const materials = useMemo(() => uniqueValues(allProducts, 'material', { split: true }), [allProducts]);
  const uses = useMemo(() => uniqueValues(allProducts, 'useGroup', { split: true }), [allProducts]);

  // Grouped fields are matched on whole tokens, not substrings, so selecting
  // "Walls & Cladding" can't accidentally match a longer group that merely
  // contains that text.
  const hasTag = (raw, tag) =>
    (raw || '').split(',').map((t) => t.trim()).includes(tag);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory = !category || hasTag(p.categoryGroup, category);
      const matchesManufacturer = !manufacturer || p.CompanyName === manufacturer;
      const matchesMaterial = !material || (p.material || '').toLowerCase().includes(material.toLowerCase());
      const matchesUse = !use || hasTag(p.useGroup, use);
      return matchesCategory && matchesManufacturer && matchesMaterial && matchesUse;
    });
  }, [allProducts, category, manufacturer, material, use]);

  const activeFilterCount = [category, manufacturer, material, use].filter(Boolean).length;

  const clearAll = () => {
    setCategory('');
    setManufacturer('');
    setMaterial('');
    setUse('');
  };

  const renderThumb = (product) => (
    <div className="asset-product-thumb" style={{ backgroundColor: tintForName(product.CompanyName) }}>
      {product.image ? (
        // These cards are 400-600KB PNGs each. Lazy loading keeps the ones
        // below the fold off the initial render, and async decoding stops a
        // large image blocking the main thread while the grid is reflowing.
        <img src={product.image} alt={product.CompanyName} loading="lazy" decoding="async" />
      ) : (
        <BsBoxSeam className="asset-product-thumb-icon" />
      )}
    </div>
  );

  return (
    <div className="container my-3" data-bs-theme={mode}>
      <div className="asset-catalog-header d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h1 className={`mb-1 ${textClass}`}>Architecture Products</h1>
          <p className={`mb-0 ${textClass} opacity-75`}>
            {filteredProducts.length} of {allProducts.length} result{allProducts.length === 1 ? '' : 's'}
          </p>
        </div>
        <Link to="/assets/Library" className="btn btn-outline-secondary asset-library-link">
          <BsCollection className="me-2" />
          Asset Library
        </Link>
      </div>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-4 asset-filter-bar">
        <div className={`d-flex flex-wrap gap-2 ${textClass}`}>
          <FilterChip label="Categories" options={categories} value={category} onChange={setCategory} />
          <FilterChip label="Manufacturers" options={manufacturers} value={manufacturer} onChange={setManufacturer} />
          <FilterChip label="Materials" options={materials} value={material} onChange={setMaterial} />
          <FilterChip label="Use" options={uses} value={use} onChange={setUse} />
          {activeFilterCount > 0 && (
            <button className="btn btn-sm btn-link asset-clear-all" type="button" onClick={clearAll}>
              Clear filters
            </button>
          )}
        </div>
        <div className="btn-group asset-view-toggle" role="group" aria-label="Toggle layout">
          <button
            type="button"
            className={`btn btn-sm ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <BsListUl />
          </button>
          <button
            type="button"
            className={`btn btn-sm ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
            aria-label="Grid view"
          >
            <BsGrid3X3GapFill />
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <p className={`text-center ${textClass} opacity-75 py-5`}>
          No products match the selected filters.
        </p>
      )}

      <div className={view === 'grid' ? 'asset-bento-grid' : 'd-flex flex-column gap-3'}>
        {filteredProducts.map((product, index) => {
          // Only wraps the card in a real link if that manufacturer has a
          // detail page registered in DETAIL_ROUTES - otherwise it stays a
          // plain, non-clickable card so we never ship a dead link.
          const detailRoute = DETAIL_ROUTES[product.CompanyName];
          const CardTag = detailRoute ? Link : 'div';
          const cardLinkProps = detailRoute ? { to: detailRoute } : {};

          if (view === 'grid') {
            const size = bentoSizeForIndex(index);
            return (
              <div className={`asset-bento-item asset-bento-item--${size}`} key={product.CompanyName}>
                <CardTag
                  {...cardLinkProps}
                  className={`card h-100 asset-product-card${detailRoute ? ' asset-product-card--linked' : ''}`}
                >
                  {renderThumb(product)}
                  <div className="card-body">
                    <div className="asset-product-manufacturer">{product.manufacturerName}</div>
                    <h6 className="asset-product-title">
                      {product.CompanyName}
                      {detailRoute && <BsArrowRight className="asset-product-link-icon" />}
                    </h6>
                    <p className="asset-product-meta">{product.category}</p>
                  </div>
                </CardTag>
              </div>
            );
          }

          return (
            <CardTag
              {...cardLinkProps}
              className={`asset-product-row${detailRoute ? ' asset-product-row--linked' : ''}`}
              key={product.CompanyName}
            >
              <div className="asset-product-row-thumb">{renderThumb(product)}</div>
              <div className="asset-product-row-body">
                <div className="asset-product-manufacturer">{product.manufacturerName}</div>
                <h6 className="asset-product-title">
                  {product.CompanyName}
                  {detailRoute && <BsArrowRight className="asset-product-link-icon" />}
                </h6>
                <p className="asset-product-meta mb-1">{product.category}</p>
                <p className="asset-product-desc mb-0">{product.description}</p>
              </div>
            </CardTag>
          );
        })}
      </div>
    </div>
  )
}
