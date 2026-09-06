# TTZ FITNESS — Deployment Guide

> **Stack:** React (CRA) frontend + FastAPI (Python) backend + JSON file database
> **Platforms (free tier):** Vercel (frontend) + Render.com (backend)
> **Future:** Migrate to Hostinger / GoDaddy with custom domain

---

## Pre-Deploy Checklist

Before deploying, confirm the following:

- [ ] Your code is pushed to a **GitHub repository** (private recommended)
- [ ] You have a **Render.com** account (render.com — free, no card required)
- [ ] You have a **Vercel** account (vercel.com — free, no card required)
- [ ] You have your **admin password** ready (you'll hash it below)

---

## Step 1 — Generate Production Secrets

Run these commands on your machine (Python 3 required):

```bash
# 1. Generate a strong JWT secret key
python3 -c "import secrets, base64; print(base64.urlsafe_b64encode(secrets.token_bytes(64)).decode())"

# 2. Generate a bcrypt hash of your admin password
#    Replace YOUR_PASSWORD with your actual password
python3 -c "import bcrypt; print(bcrypt.hashpw(b'YOUR_PASSWORD', bcrypt.gensalt(12)).decode())"
```

> **Save both outputs** — you'll paste them into Render's environment variables dashboard.

---

## Step 2 — Deploy the Backend on Render.com

### Option A: Using render.yaml (Recommended — One Click)

1. Go to **https://dashboard.render.com**
2. Click **New → Blueprint**
3. Connect your GitHub repo
4. Render will auto-detect `render.yaml` and create both services
5. For the three `sync: false` env vars, Render will prompt you to enter them:

| Key | Value |
|-----|-------|
| `ADMIN_USERNAME` | Your chosen admin username |
| `ADMIN_PASSWORD_HASH` | The bcrypt hash from Step 1 |
| `JWT_SECRET_KEY` | The 86-char base64url string from Step 1 |

6. Click **Apply**

### Option B: Manual Setup (Web Service)

1. **New → Web Service** → Connect your GitHub repo
2. **Settings:**
   - Name: `ttz-backend`
   - Region: **Singapore** (closest to India)
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: **Python 3**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
   - Plan: **Free**
3. **Environment Variables** (add all of these):

| Key | Value |
|-----|-------|
| `ADMIN_USERNAME` | Your username |
| `ADMIN_PASSWORD_HASH` | Bcrypt hash from Step 1 |
| `JWT_SECRET_KEY` | Secret from Step 1 |
| `CORS_ORIGINS` | `https://ttz-fitness.vercel.app` *(update after Vercel deploy)* |

4. Click **Create Web Service**
5. Wait ~3 minutes for first deploy
6. **Note your backend URL**: `https://ttz-backend.onrender.com` (or similar)

> ⚠️ **Free tier note:** The backend sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds to wake up. This is fine for a gym site with infrequent admin panel use.

---

## Step 3 — Deploy the Frontend on Vercel

### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI once
npm i -g vercel

# From the frontend directory:
cd frontend

# Deploy (follows vercel.json automatically)
vercel

# Set environment variable (replace URL with your real Render backend URL)
vercel env add REACT_APP_BACKEND_URL production
# When prompted, enter: https://ttz-backend.onrender.com

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard

1. Go to **https://vercel.com/new**
2. Import your GitHub repo
3. **Configure project:**
   - Framework Preset: **Create React App**
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Environment Variables** → Add:

| Key | Value |
|-----|-------|
| `REACT_APP_BACKEND_URL` | `https://ttz-backend.onrender.com` |
| `GENERATE_SOURCEMAP` | `false` |

5. Click **Deploy**
6. **Note your frontend URL**: `https://ttz-fitness.vercel.app` (or similar)

---

## Step 4 — Update CORS After Both Are Deployed

Once you have both URLs:

1. Go to Render dashboard → `ttz-backend` → **Environment**
2. Update `CORS_ORIGINS`:
   ```
   https://YOUR-FRONTEND.vercel.app
   ```
   *(If you have a custom domain too, comma-separate them)*
   ```
   https://YOUR-FRONTEND.vercel.app,https://www.ttzfitness.com
   ```
3. Click **Save Changes** → backend redeploys automatically

---

## Step 5 — Verify the Deployment

Test these in your browser:

| Test | URL | Expected |
|------|-----|----------|
| Site loads | `https://your-frontend.vercel.app` | Full site visible |
| Admin panel | `https://your-frontend.vercel.app/admin` | Login screen |
| Backend health | `https://your-backend.onrender.com/api/` | `{"message":"Hello World"}` |
| WhatsApp CTA | Click "Book a Free Trial" | Opens WhatsApp |
| Gallery | Click any photo | Lightbox opens |

---

## Updating the Site (After Initial Deploy)

Every time you push to `main`:
- **Vercel** rebuilds the frontend automatically ✅
- **Render** redeploys the backend automatically ✅

To update only the backend URL in the frontend:
```bash
cd frontend
vercel env rm REACT_APP_BACKEND_URL production
vercel env add REACT_APP_BACKEND_URL production
vercel --prod
```

---

## Custom Domain Setup (Future — Hostinger / GoDaddy)

### On Vercel (Frontend)
1. Dashboard → Your project → **Settings → Domains**
2. Add `ttzfitness.com` and `www.ttzfitness.com`
3. Vercel gives you nameserver/CNAME records
4. In GoDaddy/Hostinger DNS: add those records
5. Vercel auto-provisions SSL ✅

### On Render (Backend)
1. Dashboard → `ttz-backend` → **Settings → Custom Domain**
2. Add `api.ttzfitness.com`
3. Add the CNAME record in your DNS provider
4. Update `REACT_APP_BACKEND_URL` on Vercel to `https://api.ttzfitness.com`
5. Update `CORS_ORIGINS` on Render to include `https://ttzfitness.com,https://www.ttzfitness.com`

---

## ⚠️ Important: data.json Persistence on Render Free Tier

The backend uses a local `data.json` file as its database. On Render's **free tier**, this file is **lost on every redeploy**.

**What this affects:**
- Hero slideshow images uploaded via the admin panel ← **lost on redeploy**
- Hero slide duration setting ← **lost on redeploy**

**What is NOT affected** (hardcoded in code):
- All website content (About, Services, Team, Membership prices, Gallery, Testimonials)
- Contact form (sends via WhatsApp — no DB needed)
- Site settings (phone, WhatsApp, Instagram) ← also lost on redeploy

**Solutions:**
1. **Short-term:** Only deploy rarely; re-upload hero images after each deploy
2. **Medium-term (recommended):** Migrate to free [MongoDB Atlas](https://cloud.mongodb.com) (512 MB free) — the `pymongo` and `motor` packages are already in `requirements.txt`

---

## Admin Panel Access

- **URL:** `https://your-frontend.vercel.app/admin`
- **Username:** Whatever you set in `ADMIN_USERNAME`
- **Password:** The plaintext password you hashed in Step 1
- **Features:** Upload/reorder/delete hero slideshow images, change slide speed, update contact info

---

## File Summary

| File | Purpose |
|------|---------|
| `render.yaml` | Render.com one-click blueprint |
| `backend/Procfile` | Fallback for Heroku-compatible platforms |
| `frontend/vercel.json` | Vercel SPA routing + security headers |
| `frontend/.env.production` | Frontend production env (gitignored) |
| `backend/.env` | Backend secrets (gitignored) |
| `backend/.env.production.example` | Safe template for backend secrets ✅ committed |
