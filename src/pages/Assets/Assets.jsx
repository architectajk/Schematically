import React, { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom';
import { BsGrid3X3GapFill, BsListUl, BsBoxSeam, BsChevronDown, BsCollection, BsArrowRight } from 'react-icons/bs';
import { SchematicContext } from '../../context/Schematic/SchematicContextProvider';
import productData from './Building Products/buildingProductFilter.json';
import './Assets.css'

// Only manufacturers with an actual detail page get a working link on their
// card. Jaquar, VOX India, RAK Ceramics and TOSTEM India don't have a detail
// page built yet (the folders exist but are empty) - linking to them would
// be a dead link, so their cards render as plain, non-clickable info until
// a real page exists. Add an entry here once a manufacturer gets one.
const DETAIL_ROUTES = {
  Nuvocotto: '/assets/Nuvocotto',
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

// The filter chips are built from the real product records below, not from
// the aspirational category/material list in buildingProductFilter.json's
// "filters" block - those names (e.g. "Furniture & Seating") don't match any
// actual product yet, so a dropdown built from them would always show zero
// results. Once more products are added with matching taxonomy tags, this
// can switch back to productData.filters.
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

function FilterChip({ label, options, value, onChange }) {
  return (
    <div className="dropdown asset-filter-chip">
      <button
        className={`btn btn-sm asset-chip-btn ${value ? 'active' : ''}`}
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {value || label} <BsChevronDown className="ms-1 asset-chip-caret" />
      </button>
      <ul className="dropdown-menu asset-chip-menu">
        <li>
          <button className={`dropdown-item ${!value ? 'active' : ''}`} type="button" onClick={() => onChange('')}>
            All {label}
          </button>
        </li>
        {options.map((opt) => (
          <li key={opt}>
            <button
              className={`dropdown-item ${value === opt ? 'active' : ''}`}
              type="button"
              onClick={() => onChange(opt)}
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

  const categories = useMemo(() => uniqueValues(allProducts, 'category'), [allProducts]);
  const manufacturers = useMemo(() => uniqueValues(allProducts, 'CompanyName'), [allProducts]);
  const materials = useMemo(() => uniqueValues(allProducts, 'material', { split: true }), [allProducts]);
  const uses = useMemo(() => uniqueValues(allProducts, 'use'), [allProducts]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesCategory = !category || p.category === category;
      const matchesManufacturer = !manufacturer || p.CompanyName === manufacturer;
      const matchesMaterial = !material || (p.material || '').toLowerCase().includes(material.toLowerCase());
      const matchesUse = !use || p.use === use;
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
        <img src={product.image} alt={product.CompanyName} />
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
              <div className={`asset-bento-item asset-bento-item--${size}`} key={index}>
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
              key={index}
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
