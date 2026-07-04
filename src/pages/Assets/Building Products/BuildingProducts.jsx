import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import productData from '../Building Products/buildingProductFilter.json'; // adjust path

const BuildingProducts = () => {
  const { mode } = useContext(SchematicContext);
  const filters = productData.filters;
  const allProducts = productData.products;

  const [category, setCategory] = useState('');
  const [material, setMaterial] = useState('');
  const [use, setUse] = useState('');

  const filteredProducts = allProducts.filter(product => {
    return (
      (!category || product.category?.toLowerCase().includes(category.toLowerCase())) &&
      (!material || product.material?.toLowerCase().includes(material.toLowerCase())) &&
      (!use || product.use?.toLowerCase().includes(use.toLowerCase()))
    );
  });

  const renderFilterDropdown = (label, options, value, setValue) => (
    <div className="col-md-4 mb-3">
      <label className={`text-${mode === 'light' ? 'dark' : 'light'} form-label fw-bold`}>{label}</label>
      <select className="form-select" value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">All</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container">
      {/* Filters */}
      <div className="row mt-4 mb-3" data-bs-theme={mode}>
        {renderFilterDropdown("Category", Object.keys(filters.categories), category, setCategory)}
        {renderFilterDropdown("Material", filters.materials, material, setMaterial)}
        {renderFilterDropdown("Use", filters.uses, use, setUse)}
      </div>

      {/* Filtered Product Cards */}
      <div className="row mt-2">
        {filteredProducts.map((product, index) => (
          <div className="col-md-6 col-lg-4 mb-4" key={index}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{product.CompanyName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{product.manufacturerName}</h6>
                <p className="card-text"><strong>Category:</strong> {product.category}</p>
                <p className="card-text"><strong>Material:</strong> {product.material}</p>
                <p className="card-text"><strong>Use:</strong> {product.use}</p>
                <p className="card-text">{product.description}</p>
              </div>
            </div>
          </div>
        ))}
        {filteredProducts.length === 0 && (
          <p className={`text-${mode === 'light' ? 'dark' : 'light'} text-center`}>
            No products match the selected filters.
          </p>
        )}
      </div>
      
      {/* Static Brand Logos */}
      <div className="row g-4 mb-4" data-bs-theme={mode}>
        <div className="col-3 col-md-3">
          <NavLink to="/assets/BuildingProducts/Nuvocotto">
            <img src="/Products/Nuvocotto/NuvocottoImages/nuvocotto-productcatalog-image.png" className="img-fluid" alt="Nuvocotto" />
          </NavLink>
        </div>
        <div className="col-3 col-md-3">
          <NavLink to="/assets/BuildingProducts/Danpal">
            <img src="/Products/Danpal/DanpalImages/Danpal_productcatalogimage.png" className="img-fluid" alt="Danpal" />
          </NavLink>
        </div>
        <div className="col-3 col-md-3">
          <NavLink to="/assets/BuildingProducts/Tostem">
            <img src="/Products/Tostem/TostemImages/Tostem_productcatalogimage.png" className="img-fluid" alt="Tostem" />
          </NavLink>
        </div>
      </div>
      <div className="row g-4 mb-4" data-bs-theme={mode}>
        <div className="col-3">
          <NavLink to="/assets/BuildingProducts/Jaquar">
            <img src="/Products/Jaquar/Jaquar_productcatalogimage.png" className="img-fluid" alt="Jaquar" />
          </NavLink>
        </div>
        <div className="col-3">
          <NavLink to="/assets/BuildingProducts/Artize">
            <img src="/Products/Artize/Artize_productcatalogimage.png" className="img-fluid" alt="Artize" />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default BuildingProducts;

