# 🪔 Durga Puja Parikrama Bengal — Live GPS Pandal Hopper

A mobile-first web app to track live GPS movements, discover top Durga Puja pandals across West Bengal, find the shortest road routes, check queue wait times, and plan your festive itinerary.

**Zero Node.js Required:** Built as a pure, clean static web application (`HTML5` + `CSS3` + `Vanilla JavaScript`). Runs directly in any web browser, on mobile phones, or hosted on **GitHub Pages** & **Render** for free.

---

## 🚀 Key Features

1. **Ultra-Visible Live GPS Radar Beacon:**
   - Multi-tier animated radar pulse waves.
   - Dynamic directional heading cone (`user-marker-heading`) that turns in the direction you are walking or driving.
   - Live hardware accuracy ring matching real GPS satellites (`pos.coords.accuracy`).
   - Live speed & accuracy status badge (`YOU • Live GPS • ±6m`).

2. **Auto-Follow ("Follow Me") Mode:**
   - Automatically keeps your marker centered as you travel along roads in real life.
   - Toggle button on the map to switch between locking camera or freely exploring.

3. **Simulated Travel Mode (Play/Stop Button):**
   - Click the **🚶** button on the map to simulate live walking through Kolkata streets and watch your marker move dynamically without walking outside.

4. **Shortest Distance Calculator & Real Road Navigation:**
   - Computes distance to all 16 major pandals in real-time as your GPS coordinates update.
   - Fetches actual street-following road routes using OSRM with driving time estimates.

5. **16 Authentic Bengal Pujas Preloaded:**
   - Sreebhumi, Kalyani ITI More, Belur Math, Chandannagar, Ekdalia Evergreen, Santosh Mitra Square, Bagbazar, Siliguri, Suruchi Sangha, College Square, Maddox Square, Naktala, Durgapur, Midnapore, Sovabazar Rajbari, and Bally.
   - Add/pin your own custom pandals with photos and descriptions!

---

## 💻 How to Run Locally (Without Node.js)

### Method 1: Just Open in Any Browser (Zero Commands)
- Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox!

### Method 2: Python Local Server (Recommended for GPS testing)
Open PowerShell or Terminal in this folder and run:
```bash
python -m http.server 3000
```
Then open `http://localhost:3000/` in your browser.

---

## 🌐 How to Host Online for Free (For Everyone to Use on Phones)

### Option A: GitHub Pages (100% Free, 1-Click Setup)
1. Push this folder to a GitHub repository (e.g. `github.com/your-username/durga-puja`).
2. Go to your repository on GitHub.
3. Click **Settings** ⚙️ ➔ **Pages** (in the left sidebar).
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main** (or `master`), Folder: **/ (root)**
5. Click **Save**!
6. In ~1 minute, your app will be live at:
   `https://your-username.github.io/durga-puja/`
   *(GitHub Pages provides free HTTPS, which is required by Android & iOS for live GPS tracking!)*

---

### Option B: Render.com (100% Free Static Site)
1. Push this folder to GitHub.
2. Sign in to [render.com](https://render.com).
3. Click **New +** ➔ **Static Site**.
4. Connect your GitHub repository.
5. Set:
   - **Build Command**: *(leave empty)*
   - **Publish Directory**: `./`
6. Click **Create Static Site** — your public link is generated automatically!

---

## 📁 File Structure
- `index.html`: Main static web page.
- `styles.css`: Complete festive styling & radar beacon animations.
- `app.js`: Pure Vanilla JavaScript logic (GPS watcher, Leaflet map, distance sorting, routing).
- `render.yaml`: Render blueprint for instant 1-click deployment.
- `index-react.html`: Original React version entrypoint backup.
