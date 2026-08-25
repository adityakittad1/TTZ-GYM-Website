import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import './Admin.css';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || `http://${window.location.hostname}:8001`;

/**
 * Admin Panel — Manage hero slideshow images
 * - JWT login (POST /api/admin/login)
 * - View, upload, delete, reorder hero images
 */
const Admin = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem('ttz_admin_token') || '');
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef(null);

  const [settings, setSettings] = useState({ slideDuration: 8 });
  const [settingsSaving, setSettingsSaving] = useState(false);

  // ── Auth ──
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      // OAuth2PasswordRequestForm expects application/x-www-form-urlencoded
      const formBody = new URLSearchParams();
      formBody.append('username', loginData.username);
      formBody.append('password', loginData.password);
      const resp = await axios.post(`${BACKEND_URL}/api/admin/login`, formBody, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const tok = resp.data.access_token;
      setToken(tok);
      sessionStorage.setItem('ttz_admin_token', tok);
    } catch (err) {
      if (err.response) {
        setLoginError(err.response?.data?.detail || 'Invalid credentials');
      } else {
        setLoginError('Network error: Cannot reach the backend. Check if the server is running on ' + BACKEND_URL);
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('ttz_admin_token');
    setImages([]);
  };

  const authHeaders = { Authorization: `Bearer ${token}` };

  // ── Load images ──
  const loadImages = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const resp = await axios.get(`${BACKEND_URL}/api/hero-images`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(resp.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setToken('');
        sessionStorage.removeItem('ttz_admin_token');
        setImages([]);
      } else {
        setError('Failed to load images');
      }
    } finally {
      setLoading(false);
    }
  }, [token]); // token is the only real dependency

  const loadSettings = useCallback(async () => {
    try {
      const resp = await axios.get(`${BACKEND_URL}/api/settings/hero`);
      if (resp.data) {
        setSettings({ slideDuration: resp.data.slideDuration || 8 });
      }
    } catch (err) {
      console.error('Failed to load settings', err);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadImages();
      loadSettings();
    }
  }, [token, loadImages, loadSettings]);

  // ── Upload ──
  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const fd = new FormData();
    fd.append('file', file);
    try {
      await axios.post(`${BACKEND_URL}/api/hero-images`, fd, {
        headers: { ...authHeaders, 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMsg('Image uploaded successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadImages();
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // ── Delete ──
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await axios.delete(`${BACKEND_URL}/api/hero-images/${id}`, { headers: authHeaders });
      setSuccessMsg('Image deleted.');
      setTimeout(() => setSuccessMsg(''), 3000);
      loadImages();
    } catch (err) {
      setError('Delete failed');
    }
  };

  // ── Reorder ──
  const handleMove = async (index, direction) => {
    const newImages = [...images];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newImages.length) return;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setImages(newImages);
    try {
      const order = newImages.map((img) => img.id);
      await axios.put(`${BACKEND_URL}/api/hero-images/reorder`, { order }, { headers: authHeaders });
    } catch {
      setError('Reorder failed');
      loadImages();
    }
  };

  // ── Settings ──
  const handleSaveSettings = async () => {
    setSettingsSaving(true);
    setError('');
    try {
      await axios.put(`${BACKEND_URL}/api/settings/hero`, {
        slideDuration: settings.slideDuration
      }, { headers: authHeaders });
      setSuccessMsg('Settings saved successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to save settings');
    } finally {
      setSettingsSaving(false);
    }
  };

  // ── Login screen ──
  if (!token) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <div className="admin-login__logo">
            <img
              src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg"
              alt="TTZ Fitness"
            />
          </div>
          <h1 className="admin-login__title">TTZ Fitness Admin</h1>
          <p className="admin-login__sub">Sign in to manage the hero slideshow</p>

          {loginError && <div className="admin-alert admin-alert--error">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-login__form">
            <div className="admin-field">
              <label className="admin-label">Username</label>
              <input
                type="text"
                className="admin-input"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                required
                autoComplete="username"
              />
            </div>
            <div className="admin-field">
              <label className="admin-label">Password</label>
              <input
                type="password"
                className="admin-input"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={loginLoading}>
              {loginLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="admin">
      {/* Header */}
      <header className="admin__header">
        <div className="admin__header-inner">
          <div className="admin__header-brand">
            <img
              src="https://customer-assets.emergentagent.com/job_8b66225e-2fe5-45f8-8090-ae5dbb7cc6d8/artifacts/g4rje3dy_a3.jpeg"
              alt="TTZ Fitness"
              className="admin__header-logo"
            />
            <span className="admin__header-title">TTZ Admin</span>
          </div>
          <div className="admin__header-actions">
            <a href="/" className="admin-btn admin-btn--ghost">← View Site</a>
            <button onClick={handleLogout} className="admin-btn admin-btn--outline">Sign Out</button>
          </div>
        </div>
      </header>

      <div className="admin__body">
        <div className="admin__page-header">
          <h1 className="admin__page-title">Hero Slideshow</h1>
          <p className="admin__page-sub">Manage the background images displayed in the hero section. Changes reflect live immediately.</p>
        </div>

        {/* Alerts */}
        {error && <div className="admin-alert admin-alert--error">{error} <button onClick={() => setError('')}>✕</button></div>}
        {successMsg && <div className="admin-alert admin-alert--success">{successMsg}</div>}

        {/* Settings */}
        <div className="admin__settings-section" style={{ background: 'var(--bg-surface)', padding: '24px', borderRadius: '4px', marginBottom: '32px', border: '1px solid var(--border-subtle)' }}>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '16px', fontFamily: 'var(--font-display)', letterSpacing: '0.04em' }}>Hero Slideshow Settings</h2>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Slide Duration
            </label>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>How long each hero image remains visible before changing.</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <input
                type="range"
                min="3"
                max="15"
                step="1"
                value={settings.slideDuration}
                onChange={(e) => setSettings({ ...settings, slideDuration: parseInt(e.target.value, 10) })}
                style={{ flex: 1, maxWidth: '300px', accentColor: 'var(--gold)' }}
              />
              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--gold)', minWidth: '80px' }}>
                {settings.slideDuration} seconds
              </span>
            </div>
          </div>
          <button
            onClick={handleSaveSettings}
            className="admin-btn admin-btn--primary"
            disabled={settingsSaving}
          >
            {settingsSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        {/* Upload */}
        <div className="admin__upload-area">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            style={{ display: 'none' }}
            id="admin-file-input"
          />
          <label htmlFor="admin-file-input" className={`admin__upload-btn ${uploading ? 'admin__upload-btn--loading' : ''}`}>
            {uploading ? (
              <>
                <span className="admin__spinner" />
                Uploading…
              </>
            ) : (
              <>
                <span className="admin__upload-icon">↑</span>
                Upload New Image
              </>
            )}
          </label>
          <p className="admin__upload-hint">JPG, PNG, WebP · Max 10MB · Recommended: 1920×1080px</p>
        </div>

        {/* Images list */}
        {loading ? (
          <div className="admin__loading">Loading images…</div>
        ) : images.length === 0 ? (
          <div className="admin__empty">
            <p>No hero images yet. Upload your first image above.</p>
          </div>
        ) : (
          <div className="admin__images">
            {images.map((img, i) => (
              <div key={img.id} className="admin__img-card">
                <div className="admin__img-thumb">
                  <img src={img.url} alt={img.filename || `Image ${i + 1}`} loading="lazy" />
                </div>
                <div className="admin__img-info">
                  <span className="admin__img-name">{img.filename || `Image ${i + 1}`}</span>
                  <span className="admin__img-order">Position {i + 1}</span>
                </div>
                <div className="admin__img-actions">
                  <button
                    className="admin-btn admin-btn--icon"
                    onClick={() => handleMove(i, 'up')}
                    disabled={i === 0}
                    aria-label="Move up"
                    title="Move up"
                  >↑</button>
                  <button
                    className="admin-btn admin-btn--icon"
                    onClick={() => handleMove(i, 'down')}
                    disabled={i === images.length - 1}
                    aria-label="Move down"
                    title="Move down"
                  >↓</button>
                  <button
                    className="admin-btn admin-btn--danger"
                    onClick={() => handleDelete(img.id)}
                    aria-label="Delete image"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
