import React, { useState, useEffect, useContext, useMemo } from 'react';
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import { supabase } from '../../../supabaseClient';
import Spinners from '../../../components/Spinners';
import { BsSearch, BsDownload, BsBoxArrowUpRight } from 'react-icons/bs';
import './AssetLibrary.css';

export default function AssetLibrary() {
  const { mode } = useContext(SchematicContext);

  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [type, setType] = useState('All');

  // Load all assets from the database once, when the page opens.
  useEffect(() => {
    async function fetchAssets() {
      setLoading(true);
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setAssets(data || []);
      }
      setLoading(false);
    }
    fetchAssets();
  }, []);

  // Build the dropdown option lists from whatever categories/types exist.
  const categories = useMemo(() => {
    const set = new Set(assets.map((a) => a.category).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [assets]);

  const types = useMemo(() => {
    const set = new Set(assets.map((a) => a.asset_type).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [assets]);

  // Apply the search box and the two filters.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return assets.filter((a) => {
      const matchesCategory = category === 'All' || a.category === category;
      const matchesType = type === 'All' || a.asset_type === type;
      const haystack = [
        a.title,
        a.description,
        Array.isArray(a.tags) ? a.tags.join(' ') : a.tags,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      const matchesSearch = q === '' || haystack.includes(q);
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [assets, search, category, type]);

  // Turn a file's path inside the 'assets' bucket into a public web link.
  const fileUrl = (path, download = false) => {
    if (!path) return null;
    const { data } = supabase.storage
      .from('assets')
      .getPublicUrl(path, download ? { download: true } : {});
    return data ? data.publicUrl : null;
  };

  return (
    <div className="container my-4 asset-library-page" data-bs-theme={mode}>
      <div className="asset-library-header mb-4">
        <h1 className="mb-1">Asset Library</h1>
        <p className="text-secondary mb-0">
          Search, filter and download drawings, images, 3D models and CAD files.
        </p>
      </div>

      {/* Search + filters */}
      <div className="row g-2 mb-4">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name, description or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All categories' : c}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6 col-md-3">
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t === 'All' ? 'All types' : t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading / error / empty states */}
      {loading && <Spinners />}

      {!loading && error && (
        <div className="alert alert-danger" role="alert">
          Could not load assets: {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center text-secondary py-5">
          <p className="mb-1">No assets found.</p>
          <small>
            {assets.length === 0
              ? 'Your library is empty — add your first asset to see it here.'
              : 'Try clearing the search or filters.'}
          </small>
        </div>
      )}

      {/* Results grid */}
      {!loading && !error && filtered.length > 0 && (
        <div className="row g-4">
          {filtered.map((asset) => {
            const download = fileUrl(asset.file_path, true);
            const open = fileUrl(asset.file_path, false);
            const thumb = asset.thumbnail_path
              ? fileUrl(asset.thumbnail_path, false)
              : null;
            return (
              <div className="col-12 col-sm-6 col-lg-4" key={asset.id}>
                <div className="card asset-card h-100">
                  {thumb && (
                    <img
                      src={thumb}
                      className="card-img-top asset-thumb"
                      alt={asset.title}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      {asset.asset_type && (
                        <span className="badge text-bg-primary me-1">
                          {asset.asset_type}
                        </span>
                      )}
                      {asset.category && (
                        <span className="badge text-bg-secondary">
                          {asset.category}
                        </span>
                      )}
                    </div>
                    <h5 className="card-title">{asset.title}</h5>
                    {asset.description && (
                      <p className="card-text small text-secondary">
                        {asset.description}
                      </p>
                    )}
                    {Array.isArray(asset.tags) && asset.tags.length > 0 && (
                      <div className="asset-tags mb-3">
                        {asset.tags.map((tag) => (
                          <span className="asset-tag" key={tag}>
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto d-flex gap-2 align-items-center">
                      {download && (
                        <a className="btn btn-sm btn-primary" href={download}>
                          <BsDownload className="me-1" />
                          Download
                        </a>
                      )}
                      {open && (
                        <a
                          className="btn btn-sm btn-outline-secondary"
                          href={open}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <BsBoxArrowUpRight className="me-1" />
                          Open
                        </a>
                      )}
                      {asset.file_size_kb ? (
                        <span className="ms-auto small text-secondary">
                          {formatSize(asset.file_size_kb)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Turn a size in kilobytes into a friendly "480 KB" / "2.3 MB" label.
function formatSize(kb) {
  if (!kb) return '';
  if (kb < 1024) return `${kb} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}
