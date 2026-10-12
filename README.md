# 🪔 Durga Puja Parikrama Bengal — Live GPS Pandal Hopper

An interactive, mobile-first web application for exploring Durga Puja pandals across West Bengal. Features real-time GPS tracking with radar beacons, shortest road routing, queue wait times, community photo uploads (Google Maps style) powered by **Firebase Cloud Storage (Approach B)**, live **Firestore** sync, and dual **User & Admin Panels** with pandal deletion privileges.

**Zero Node.js Build Step Required:** Built as a pure, high-performance static web application (`HTML5` + `CSS3` + `Vanilla JavaScript`). Runs directly in any web browser, on mobile devices, or hosted for free on **GitHub Pages** & **Render**.

---

## ✨ Features & Architecture

### 1. 📸 Community Photos & Approach B Cloud Architecture
- **Google Maps-Style Photo Gallery:** Visitors can capture live moments from pandals with their camera or upload from their device gallery with custom captions and hopper handles.
- **Approach B Architecture (Firebase Cloud Storage + Firestore):**
  - **The Problem Solved:** Firestore documents have a strict 1 MB limit. Saving photos as Base64 strings directly in Firestore causes documents to hit the ceiling after just a few uploads.
  - **The Solution:** Photos are uploaded directly to **Firebase Cloud Storage** (`pandal_photos/`), and only the short public download URL string (~80 bytes) is stored in the Firestore document.
  - **Massive Scalability:** A single pandal can store thousands of community pictures while the Firestore document stays under ~50 KB. Utilizes Firebase's **5 GB free Cloud Storage tier**.
- **Client-Side Compression:** Images are compressed and resized via HTML5 Canvas (900px wide, ~80–120 KB JPEG) prior to upload, ensuring rapid uploads even on congested mobile cellular networks.
- **Fullscreen Lightbox:** Tap any photo to open a dark-mode fullscreen viewer with photo title, author credit, date, and pandal info.
- **Graceful Fallback:** Seamlessly operates offline or with local backups if cloud storage rules are restricted.

### 2. ✏️ Live Pandal Details Editor
- Update crowd density in real time (**Smooth 🟢**, **Moderate 🟡**, **Heavy 🔴**, **Super Jam 🔥**).
- Modify queue wait times (minutes), themes, official club titles, addresses, and descriptions.
- Change pandal cover photos by uploading from device or providing image links.
- All modifications sync immediately to other users via Firebase Firestore.

### 3. 🛡️ User Panel vs. Admin Panel System
- **Role-Based Startup Authentication:** Prompts on startup to choose **User Panel** or **Admin Panel**.
- **User Panel Access:** Live GPS tracking, road routes, nearest pandal finder, itinerary planning, photo uploads, and community pandal submissions.
- **Admin Panel Access (Passcode: `admin123`):**
  - Exclusive access to **Delete Unnecessary Pandals** (removes test, duplicate, or expired pandals).
  - Deletions propagate in real-time across Bengal via Firestore, removing the marker from all connected users' screens instantly.
  - Dedicated **Admin Pandal Manager** modal with instant search and quick-delete controls.

### 4. 🧭 Ultra-Visible Live GPS Radar Beacon & Navigation
- **Radar Pulse Wave:** Multi-tier animated radar pulse around the hopper marker.
- **Directional Heading Cone:** Turns dynamically in the direction the user is walking or driving.
- **Satellite Accuracy Ring:** Displays real GPS satellite accuracy radius (`pos.coords.accuracy`).
- **Follow Me Mode:** Locks the map camera to automatically follow user movement.
- **Simulated Walking Mode (🚶):** Click the walk button to test movement along Kolkata roads without leaving your desk.
- **Shortest Route Finder & Real Road Directions:** Real-time distance calculation to all pandals with street-following turn-by-turn road routes via OSRM.

### 5. 🧰 Compact Sliding Toolbox Drawer & UI Polish
- **Sliding Drawer:** Single button at top-right (`>`) opens a floating panel containing quick tools:
  - 📍 **Pin New Pandal** (tap anywhere on map to add custom pujas)
  - 🏆 **Leaderboard** (top-rated & most visited pujas)
  - 👑 **Top Contributors** (active hoppers pinning pandals)
  - 🥁 **Puja Panjika & Dhak Beats** (Sharadotsav 2026 Tithi calendar + traditional audio player)
  - ☁️ **Cloud Sync Status** (WebSocket connectivity status indicator)
  - 🛡️ **Admin Manager** (quick pandal deletion panel)
- **Map-Only Floating Controls:** Recenter, Radar, Route, Layers, Zoom, and Quick Filter buttons automatically hide when browsing Explore, Finder, or Itinerary tabs.

### 6. 📱 Minimalist 5-Item Bottom Navigation & Consolidated "Next Visit" Hub
The UI provides a clean, clutter-free mobile layout strictly adhering to the 5 bottom navigation items:
1. **🗺️ Live Map (`Live Map`):** Interactive Leaflet canvas with real-time GPS tracking, directional cone, live crowd density badges, and custom festive pins.
2. **☰ Explore (`Explore`):** Highlights 4 top feature cards (Pandal Hopping, Pet Pujo, Medical Emergency, Path Finder) leading directly into specialized tools, alongside the full 18+ Bengal Pandals directory with search and filters.
3. **⊕ Pin the Pandal (`Pin the Pandal`):** Center raised circular button (FAB) allowing any hopper to drop pins and add new community pujas.
4. **🧭 Shortest Path (`Shortest Path`):** A ➔ B Multi-Route Navigator with low-traffic alternative paths, intermediate transit stopages, live location updates, and the Nearest Pandals Matrix.
5. **📅 Next Visit (`Next Visit`):** Consolidated festive expedition hub with 4 sub-sections:
   - **🪔 Pandal Hopper Tour Planner:** Choose zone/district, festive date (Maha Sasthi through Bijoya Dashami), start and end times, pandal count presets (3, 5, 8, 10 or custom), route strategy (**⚡ Shortest Road Route** via TSP optimization vs. **🎲 Surprise Me / Random**), refreshment breaks (**🍛 Food Break (Pet Pujo)** & **☕ Chai Break**), and travel traffic speed (Walk, Car, Bus). Renders chronological timetables, plots numbered stops on the Live Map, and saves to checklist.
   - **🍛 Pet Pujo (Food, Sweets & 24x7 Groceries):** 21+ legendary eateries (Arsalan, Shiraz, Royal India, Aminia, Oudh 1590, Kusum Rolls, Nizam's, Balaram Mullick, K.C. Das, etc.) sorted by nearest distance to your GPS, with food pins toggleable on the live map and direct route guidance.
   - **🏥 Important Medical & Emergency Services:** 17+ facilities (SSKM Trauma Center, Calcutta Medical College, R.G. Kar, Apollo, 24x7 Frank Ross, Dhanwantary, Central Blood Bank) and instant 1-tap SOS call buttons (Ambulance 108/102, Police 100/112, Lalbazar 033-2214-3230, Women Safety 1090) with direct ambulance routes.
   - **📋 My Saved Checklist:** Interactive list of scheduled pandal visits with checkmark completion and live counter badge.

### 7. 🪔 16 Preloaded Heritage Bengal Pujas
Pre-configured with coordinates, authentic themes, and verified landmarks:
- Sreebhumi Sporting Club
- Kalyani ITI More
- Belur Math
- Chandannagar Central
- Ekdalia Evergreen
- Santosh Mitra Square
- Bagbazar Sarbojanin
- Siliguri Central
- Suruchi Sangha
- College Square
- Maddox Square
- Naktala Udayan Sangha
- Durgapur City Center
- Midnapore Town Club
- Sovabazar Rajbari
- Bally Sporting

---

## 💻 How to Run Locally

### Method 1: Double-click `run.bat` (1-Click Instant Preview)
- Double-click **`run.bat`** in the repository root.
- Starts a local server at `http://localhost:3000/` and launches your default browser automatically.

### Method 2: Open Directly (Zero Commands)
- Simply double-click `index.html` to open in Chrome, Edge, Safari, or Firefox.

### Method 3: Python HTTP Server
```bash
python -m http.server 3000
```
Then navigate to `http://localhost:3000/`.

---

## ☁️ Firebase Cloud Configuration

The application works out of the box with built-in community sync. To connect your own Firebase project with Firestore and Cloud Storage:

### 1. Enable Firestore & Storage in Firebase Console
1. Go to [Firebase Console](https://console.firebase.google.com/) and create or select your project.
2. Under **Build** ➔ **Firestore Database**, create a database in test mode.
3. Under **Build** ➔ **Storage**, enable Cloud Storage.

### 2. Configure Firebase Storage Rules (Approach B)
Under **Storage** ➔ **Rules**, set:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```
Click **Publish**.

### 3. Connect to the App
Open the app, open the **Toolbox** ➔ **Cloud Sync Status**, and paste your Firebase configuration JSON.

---

## 🌐 Free Online Hosting

### Option A: GitHub Pages (100% Free)
1. Push this repository to GitHub.
2. In your repository, go to **Settings** ⚙️ ➔ **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**, Folder: **/ (root)**
4. Click **Save**.
5. Your app is live with HTTPS (required for mobile GPS tracking) at:
   `https://<username>.github.io/<repo-name>/`

### Option B: Render.com
1. Connect your repository to [render.com](https://render.com).
2. Create a new **Static Site**.
3. Set **Publish Directory** to `./` and deploy.

---

## 📁 Repository Structure

```text
├── index.html           # Main HTML5 application shell and modals
├── styles.css           # Glassmorphism design, festive styling, animations
├── app.js               # Core logic: GPS, Leaflet map, Firebase Firestore & Storage (Approach B)
├── run.bat              # Windows 1-click preview server launcher
├── .nojekyll            # Prevents Jekyll processing on GitHub Pages
├── render.yaml          # Render.com static deployment configuration
└── README.md            # Comprehensive project documentation
```

---

## 📜 License
Open source and built for the festive spirit of Durga Puja. Free to use, fork, and enhance! 🪔✨
