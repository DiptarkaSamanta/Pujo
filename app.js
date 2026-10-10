/**
 * ============================================================================
 * Durga Puja Parikrama Bengal — Complete Pure JavaScript Application
 * Zero Node.js Required • Vanilla JS • Leaflet • Free GitHub Pages & Render
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. Initial Master Dataset: 16 Authentic Pandals across West Bengal
// ----------------------------------------------------------------------------
const DEFAULT_PANDALS = [
  {
    id: 'pandal-1',
    name: 'Sreebhumi Sporting Club',
    pujaName: 'Sreebhumi Sarbojanin Durgotsav',
    clubName: 'Sreebhumi Sporting Club',
    theme: 'Grand Vatican Basilica & Royal Gold Ornaments',
    description: 'Famed throughout India for monumental palace-replica architecture, dazzling gold and diamond jewellery ornaments adorning Goddess Durga, and spellbinding laser light installations along VIP Road.',
    location: { lat: 22.5976, lng: 88.4034 },
    address: 'Lake Town, VIP Road, North 24 Parganas / Kolkata',
    zone: 'North 24 Parganas',
    images: [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 1420,
    visitCount: 48500,
    photosPostedCount: 3120,
    trafficLevel: 'heavy',
    estimatedQueueMins: 45,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-2',
    name: 'Ekdalia Evergreen Club',
    pujaName: 'Ekdalia Evergreen Durga Puja',
    clubName: 'Ekdalia Evergreen Club',
    theme: 'Authentic Traditional Mandir Craft & German Chandelier',
    description: 'One of South Kolkata’s oldest and most prestigious heritage pujas. Famous for its authentic idol crafted in eternal Sanatan tradition, monumental brass chandeliers, and radiant floral canopies.',
    location: { lat: 22.5186, lng: 88.3664 },
    address: 'Gariahat, Ballygunge, Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 980,
    visitCount: 39200,
    photosPostedCount: 2200,
    trafficLevel: 'heavy',
    estimatedQueueMins: 35,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-3',
    name: 'Kalyani ITI More (Luminous Club)',
    pujaName: 'Kalyani ITI More Sarbojanin Durgotsav',
    clubName: 'Luminous Club / ITI More Committee',
    theme: 'Sky-high 150ft Petronas Towers & Sacred Celestial Palace',
    description: 'Renowned across entire West Bengal for awe-inspiring mammoth replicas rising over 150 feet high. Attracts millions of visitors traveling by special local trains and highway buses.',
    location: { lat: 22.9751, lng: 88.4344 },
    address: 'ITI More, Kalyani Expressway, Nadia District',
    zone: 'Nadia',
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 2150,
    visitCount: 62000,
    photosPostedCount: 4800,
    trafficLevel: 'jam',
    estimatedQueueMins: 60,
    isBeautyPick: true,
    isHeritage: false
  },
  {
    id: 'pandal-4',
    name: 'Belur Math Durga Puja',
    pujaName: 'Ramakrishna Math Belur Durgotsav',
    clubName: 'Ramakrishna Math & Mission',
    theme: 'Sacred Vedic Kumari Puja & Spiritual Serenity on the Ganga',
    description: 'Started by Swami Vivekananda in 1901. World-famous for the Kumari Puja on Maha Ashtami. Set on the tranquil banks of the Hooghly River, it represents the spiritual zenith of Bengal’s festival.',
    location: { lat: 22.6322, lng: 88.3558 },
    address: 'Belur, Howrah District (Ganga Riverfront)',
    zone: 'Howrah',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    reviewCount: 3100,
    visitCount: 75000,
    photosPostedCount: 5400,
    trafficLevel: 'heavy',
    estimatedQueueMins: 40,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-5',
    name: 'Chandannagar Fatokgora & Strand Durgotsav',
    pujaName: 'Fatokgora Sarbojanin Durgotsav',
    clubName: 'Fatokgora Club / Strand Samiti',
    theme: 'French Colony Illumination & Moving Lightcraft',
    description: 'Chandannagar is globally celebrated for its indigenous electrical lighting wizards. Pandal features kinetic illuminated mythological stories along the grand French colonial river promenade.',
    location: { lat: 22.8671, lng: 88.3686 },
    address: 'Strand Road, Chandannagar, Hooghly District',
    zone: 'Hooghly',
    images: [
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 1680,
    visitCount: 42000,
    photosPostedCount: 2900,
    trafficLevel: 'moderate',
    estimatedQueueMins: 25,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-6',
    name: 'Santosh Mitra Square',
    pujaName: 'Santosh Mitra Square Sarbojanin',
    clubName: 'Santosh Mitra Square Club',
    theme: 'Hyper-Realistic 3D Architectural Marvel & Laser Spectacle',
    description: 'Central Kolkata’s crowd magnet. Known for spectacular architectural marvels with high-intensity 3D laser projection mapping.',
    location: { lat: 22.5691, lng: 88.3688 },
    address: 'Lebutala, Bowbazar, Central Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 1890,
    visitCount: 51200,
    photosPostedCount: 3600,
    trafficLevel: 'heavy',
    estimatedQueueMins: 45,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-7',
    name: 'Bagbazar Sarbojanin Durgotsav',
    pujaName: 'Bagbazar Sarbojanin Durgotsav',
    clubName: 'Bagbazar Sarbojanin Samiti',
    theme: 'Eternal Sabeki Daaker Saaj & Century-Old Carnival',
    description: 'Celebrating over 105 years as Kolkata’s first public community puja. Renowned for its radiant traditional Daaker Saaj white filigree idol, historic carnival rides, and rich cultural heritage.',
    location: { lat: 22.6026, lng: 88.3695 },
    address: 'Bagbazar Ghat Road, North Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 1530,
    visitCount: 46000,
    photosPostedCount: 2800,
    trafficLevel: 'moderate',
    estimatedQueueMins: 20,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-8',
    name: 'College Square Sarbojanin',
    pujaName: 'College Square Sarbojanin Durgotsav',
    clubName: 'College Square Club',
    theme: 'Aquatic Mirror Reflection & Thousand Lamp Illumination',
    description: 'Iconic puja located in the heart of Kolkata’s academic district. Famous for its majestic glowing temple floating on the water tank, reflecting thousands of golden bulbs into the serene lake.',
    location: { lat: 22.5739, lng: 88.3639 },
    address: 'College Street, Boi Para, Central Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 1610,
    visitCount: 47000,
    photosPostedCount: 3300,
    trafficLevel: 'heavy',
    estimatedQueueMins: 30,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-9',
    name: 'Suruchi Sangha',
    pujaName: 'Suruchi Sangha Sharadotsav',
    clubName: 'Suruchi Sangha Club',
    theme: 'Soul of India — Handloom Craft & Environmental Harmony',
    description: 'Renowned for representing cultural heritages of different Indian states every year, featuring handcrafted textile installations and theme songs composed by Bengal luminaries.',
    location: { lat: 22.5089, lng: 88.3308 },
    address: 'New Alipore, Block M, South Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 1350,
    visitCount: 41000,
    photosPostedCount: 2950,
    trafficLevel: 'heavy',
    estimatedQueueMins: 35,
    isBeautyPick: true,
    isHeritage: true
  },
  {
    id: 'pandal-10',
    name: 'Maddox Square Club',
    pujaName: 'Maddox Square Sarbojanin Durgotsav',
    clubName: 'Maddox Square Club',
    theme: 'Eternal Traditional Chandi Mandap & Bengal’s Biggest Adda',
    description: 'The social heartbeat of Bengal’s youth. Famous for its quintessential park gathering, warm lighting, open-lawn sitting, traditional Daaker Saaj idol, and unmatched festive camaraderie.',
    location: { lat: 22.5284, lng: 88.3562 },
    address: 'Maddox Square Park, Lansdowne, South Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 1980,
    visitCount: 52000,
    photosPostedCount: 3800,
    trafficLevel: 'heavy',
    estimatedQueueMins: 15,
    isBeautyPick: false,
    isHeritage: true
  },
  {
    id: 'pandal-11',
    name: 'Swastika Yubak Sangha (Siliguri)',
    pujaName: 'Siliguri Swastika Yubak Sangha Durgotsav',
    clubName: 'Swastika Yubak Sangha',
    theme: 'Himalayan Eco-Heritage & Living Bamboo Artistry',
    description: 'North Bengal’s crown jewel pandal. Showcases breathtaking eco-artisan craftsmanship using natural forest timber, tea-leaf fibres, and handcrafted Himalayan terracotta figurines.',
    location: { lat: 26.7271, lng: 88.4354 },
    address: 'Hakimpara, Siliguri, Darjeeling District',
    zone: 'Siliguri',
    images: [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 920,
    visitCount: 34000,
    photosPostedCount: 2100,
    trafficLevel: 'moderate',
    estimatedQueueMins: 20,
    isBeautyPick: true,
    isHeritage: false
  },
  {
    id: 'pandal-12',
    name: 'Bally Sadharon Durgotsav',
    pujaName: 'Bally Sadharon Baroari Durgotsav',
    clubName: 'Bally Sadharon Samiti',
    theme: 'Heritage Terracotta Temples of Bishnupur',
    description: 'One of the most revered historic baroari pujas in Howrah district. Crafted with clay baked bricks, Bishnupuri motifs, and bell-metal ornaments depicting ancient folklore.',
    location: { lat: 22.6511, lng: 88.3444 },
    address: 'Bally Bazar, GT Road, Howrah District',
    zone: 'Howrah',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80',
    rating: 4.7,
    reviewCount: 650,
    visitCount: 27000,
    photosPostedCount: 1600,
    trafficLevel: 'moderate',
    estimatedQueueMins: 15,
    isBeautyPick: false,
    isHeritage: true
  },
  {
    id: 'pandal-13',
    name: 'Naktala Udayan Sangha',
    pujaName: 'Naktala Udayan Sangha Sarbojanin',
    clubName: 'Naktala Udayan Sangha',
    theme: 'Avant-Garde Kinetic Installation & Mother Earth Awakening',
    description: 'Famous for pioneering hyper-modern avant-garde concept art. Features mechanical kinetic sculptures, dramatic chiaroscuro lighting, and thought-provoking philosophical themes.',
    location: { lat: 22.4744, lng: 88.3667 },
    address: 'Naktala, NSC Bose Road, South 24 Parganas / Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 1220,
    visitCount: 38000,
    photosPostedCount: 2600,
    trafficLevel: 'moderate',
    estimatedQueueMins: 25,
    isBeautyPick: true,
    isHeritage: false
  },
  {
    id: 'pandal-14',
    name: 'Durgapur Steel Township Durgotsav',
    pujaName: 'A-Zone Steel Township Durgotsav',
    clubName: 'Steel Township Club',
    theme: 'Chola Dynasty Golden Chariot & Bronze Sculptures',
    description: 'Premier mega-pandal of the industrial heartland of Bengal. Features a towering 80-foot chariot structure adorned with intricate south Indian temple carvings.',
    location: { lat: 23.5358, lng: 87.3119 },
    address: 'A-Zone, City Centre, Durgapur, Paschim Bardhaman',
    zone: 'Burdwan',
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 840,
    visitCount: 31000,
    photosPostedCount: 1850,
    trafficLevel: 'low',
    estimatedQueueMins: 15,
    isBeautyPick: true,
    isHeritage: false
  },
  {
    id: 'pandal-15',
    name: 'Midnapore Rangamati Yubak Brinda',
    pujaName: 'Rangamati Sarbojanin Durgotsav',
    clubName: 'Rangamati Yubak Brinda',
    theme: 'Red Soil Culture & Traditional Patachitra Folk Art',
    description: 'Celebrates the soul of Jangalmahal and Rarh Bengal. Crafted using red laterite clay, natural plant dyes, and giant narrative Patachitra scrolls.',
    location: { lat: 22.4257, lng: 87.3204 },
    address: 'Rangamati, Midnapore Town, Paschim Medinipur',
    zone: 'Midnapore',
    images: [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=300&q=80',
    rating: 4.7,
    reviewCount: 510,
    visitCount: 22000,
    photosPostedCount: 1400,
    trafficLevel: 'low',
    estimatedQueueMins: 10,
    isBeautyPick: true,
    isHeritage: false
  },
  {
    id: 'pandal-16',
    name: 'Sovabazar Rajbari Durgotsav',
    pujaName: 'Sovabazar Rajbari Durga Puja',
    clubName: 'Sovabazar Royal Heritage Trust',
    theme: 'Aristocratic 1757 Royal Natmandir & Ekchala Ek-Daak Pratima',
    description: 'Started in 1757 by Raja Nabakrishna Deb. The quintessential heritage royal puja of Bengal held inside the grand Natmandir courtyard with majestic Romanesque arches and sacred pigeons.',
    location: { lat: 22.5971, lng: 88.3653 },
    address: 'Sovabazar, BK Paul Avenue, North Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 2100,
    visitCount: 44000,
    photosPostedCount: 3100,
    trafficLevel: 'moderate',
    estimatedQueueMins: 20,
    isBeautyPick: true,
    isHeritage: true
  }
];

// ----------------------------------------------------------------------------
// 2. Global State & App Variables
// ----------------------------------------------------------------------------
const STORAGE_KEYS = {
  PANDALS: 'puja_parikrama_pandals_v1',
  PLANS: 'puja_parikrama_plans_v1'
};

const TILE_CONFIGS = {
  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: 'abc',
    attribution: '&copy; OpenStreetMap'
  },
  hot: {
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    subdomains: 'abc',
    attribution: '&copy; Humanitarian OSM'
  },
  esri_streets: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    subdomains: '',
    attribution: 'Tiles &copy; Esri'
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    subdomains: '',
    attribution: '&copy; Esri &copy; OSM'
  }
};

let map = null;
let tileLayer = null;
let pandalMarkersLayer = null;
let navRouteLayer = null;
let userMarker = null;
let userAccuracyCircle = null;
let tempPinMarker = null;

// User Location & Tracking State
let userLocation = { lat: 22.5726, lng: 88.3639 }; // Defaults to Central Kolkata
let hasRealGps = false;
let userAccuracy = 30;
let userHeading = null;
let userSpeed = null;
let isFollowUserMode = true;
let isSimulating = false;
let simInterval = null;
let isPinningMode = false;
let manualPinLocation = null;

// Pandal & Plan Storage
let pandals = [];
let visitPlans = [];
let currentFilter = 'all';
let currentZone = 'all';
let searchQuery = '';
let selectedPandal = null;

// ----------------------------------------------------------------------------
// 3. Storage Utilities
// ----------------------------------------------------------------------------
function loadStoredPandals() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PANDALS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed reading localStorage pandals:', e);
  }
  localStorage.setItem(STORAGE_KEYS.PANDALS, JSON.stringify(DEFAULT_PANDALS));
  return [...DEFAULT_PANDALS];
}

function savePandals(updatedList) {
  pandals = updatedList;
  localStorage.setItem(STORAGE_KEYS.PANDALS, JSON.stringify(updatedList));
}

function loadStoredPlans() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLANS);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return [];
}

function savePlans(updatedPlans) {
  visitPlans = updatedPlans;
  localStorage.setItem(STORAGE_KEYS.PLANS, JSON.stringify(updatedPlans));
  updatePlanCounter();
}

// ----------------------------------------------------------------------------
// 4. Geodesic & Routing Math (Haversine & OSRM Road API)
// ----------------------------------------------------------------------------
function calculateDistanceKm(c1, c2) {
  const R = 6371; // Earth radius km
  const dLat = (c2.lat - c1.lat) * Math.PI / 180;
  const dLng = (c2.lng - c1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(c1.lat * Math.PI / 180) * Math.cos(c2.lat * Math.PI / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(2);
}

async function fetchRealRoadRoute(start, end) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson&steps=true`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.routes && data.routes.length > 0) {
      const r = data.routes[0];
      return {
        distanceKm: +(r.distance / 1000).toFixed(1),
        durationMins: Math.round(r.duration / 60),
        coordinates: r.geometry.coordinates.map(coord => [coord[1], coord[0]])
      };
    }
  } catch (err) {
    console.warn('OSRM network unavailable, falling back to direct trajectory:', err);
  }
  // Fallback trajectory
  const dist = calculateDistanceKm(start, end);
  return {
    distanceKm: dist,
    durationMins: Math.round(dist * 3.5),
    coordinates: [[start.lat, start.lng], [end.lat, end.lng]]
  };
}

// ----------------------------------------------------------------------------
// 5. Leaflet Map Initialization & Controls
// ----------------------------------------------------------------------------
function initMap() {
  map = L.map('map', {
    center: [userLocation.lat, userLocation.lng],
    zoom: 13,
    zoomControl: false,
    attributionControl: false
  });

  tileLayer = L.tileLayer(TILE_CONFIGS.osm.url, {
    maxZoom: 19,
    subdomains: TILE_CONFIGS.osm.subdomains,
    attribution: TILE_CONFIGS.osm.attribution
  }).addTo(map);

  pandalMarkersLayer = L.layerGroup().addTo(map);
  navRouteLayer = L.layerGroup().addTo(map);

  // Map click handler (Drops manual pin)
  map.on('click', (e) => {
    if (isPinningMode) {
      setManualPin(e.latlng);
    }
  });

  // When user drags map manually, temporarily pause auto-follow
  map.on('dragstart', () => {
    if (isFollowUserMode) {
      isFollowUserMode = false;
      updateFollowButtonState();
      showToast('Map unlocked • Click Follow Me to re-lock');
    }
  });

  renderUserMarker();
  renderPandalMarkers();
}

function setTileStyle(styleKey) {
  const cfg = TILE_CONFIGS[styleKey];
  if (!cfg || !map) return;
  if (tileLayer) map.removeLayer(tileLayer);
  tileLayer = L.tileLayer(cfg.url, {
    maxZoom: 19,
    subdomains: cfg.subdomains,
    attribution: cfg.attribution
  }).addTo(map);
  document.querySelectorAll('.tile-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.style === styleKey);
  });
  document.getElementById('tile-dropdown').style.display = 'none';
}

// ----------------------------------------------------------------------------
// 6. Dynamic Live Location Tracking & Pulsating Marker
// ----------------------------------------------------------------------------
function renderUserMarker() {
  if (!map) return;

  const headingHtml = userHeading !== null
    ? `<div class="user-marker-heading" style="transform: translateX(-50%) rotate(${Math.round(userHeading)}deg);"></div>`
    : '';

  const badgeText = hasRealGps
    ? `YOU (Live GPS • ±${Math.round(userAccuracy)}m)`
    : `YOU (Est. Location)`;

  const icon = L.divIcon({
    className: 'user-marker-wrapper',
    html: `
      <div class="user-marker-container">
        ${headingHtml}
        <div class="user-marker-pulse-1"></div>
        <div class="user-marker-pulse-2"></div>
        <div class="user-marker-dot">
          <div class="user-marker-center"></div>
        </div>
        <div class="user-marker-badge">
          <span class="user-marker-badge-pulse"></span>
          <span>${badgeText}</span>
        </div>
      </div>
    `,
    iconSize: [52, 52],
    iconAnchor: [26, 26]
  });

  if (userMarker) {
    userMarker.setIcon(icon);
    userMarker.setLatLng([userLocation.lat, userLocation.lng]);
  } else {
    userMarker = L.marker([userLocation.lat, userLocation.lng], {
      icon: icon,
      zIndexOffset: 10000
    }).addTo(map);

    userMarker.bindPopup(`
      <div style="font-family: 'Outfit', sans-serif; padding: 4px; min-width: 170px;">
        <h4 style="font-weight: 800; color: #0284c7; margin: 0 0 6px 0; font-size: 13px;">📍 Live Hopper Position</h4>
        <p style="margin: 3px 0; font-size: 11px; color: #334155;"><b>Latitude:</b> ${userLocation.lat.toFixed(6)}</p>
        <p style="margin: 3px 0; font-size: 11px; color: #334155;"><b>Longitude:</b> ${userLocation.lng.toFixed(6)}</p>
        <p style="margin: 3px 0; font-size: 11px; color: #334155;"><b>Accuracy:</b> ±${Math.round(userAccuracy)}m</p>
        <p style="margin: 6px 0 0 0; font-size: 10px; color: #16a34a; font-weight: 700;">● Dynamically tracking movement in real-time</p>
      </div>
    `);
  }

  const radius = Math.max(userAccuracy, 20);
  if (userAccuracyCircle) {
    userAccuracyCircle.setLatLng([userLocation.lat, userLocation.lng]);
    userAccuracyCircle.setRadius(radius);
  } else {
    userAccuracyCircle = L.circle([userLocation.lat, userLocation.lng], {
      radius: radius,
      color: '#0284c7',
      weight: 1.5,
      opacity: 0.7,
      fillColor: '#38bdf8',
      fillOpacity: 0.15
    }).addTo(map);
  }

  // Update navbar location badge
  const locBadge = document.getElementById('navbar-location-badge');
  if (locBadge) {
    locBadge.textContent = hasRealGps 
      ? `Live GPS (${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)})` 
      : 'Location: Kolkata 📍';
  }
}

function startGeolocationTracking() {
  if (!navigator.geolocation) {
    showGpsAlert('Geolocation is not supported by this browser.');
    return;
  }

  const success = (pos) => {
    if (isSimulating) return;
    const { latitude, longitude, accuracy, heading, speed } = pos.coords;
    userLocation = { lat: latitude, lng: longitude };
    userAccuracy = accuracy || 25;
    userHeading = heading ?? null;
    userSpeed = speed ?? null;
    hasRealGps = true;

    hideGpsAlert();
    renderUserMarker();

    // Auto follow camera if mode active
    if (isFollowUserMode && map) {
      map.panTo([userLocation.lat, userLocation.lng], { animate: true, duration: 0.7 });
    }

    // Refresh distance badges
    refreshDistanceBadges();
  };

  const error = (err) => {
    if (isSimulating) return;
    if (err.code === 1) {
      showGpsAlert('Location permission was denied. Tap browser address bar 🔒 to enable live GPS.');
    } else {
      showGpsAlert('Acquiring GPS signal...');
    }
  };

  // Immediate location fetch
  navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 0 // CRITICAL: Always read live GPS hardware
  });

  // Continuous real-time movement watcher
  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 0
  });
}

function recenterMap() {
  isFollowUserMode = true;
  updateFollowButtonState();
  if (map) {
    map.flyTo([userLocation.lat, userLocation.lng], 16, { duration: 1 });
  }
  showToast(`Centered at (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`);
}

function toggleFollowUser() {
  isFollowUserMode = !isFollowUserMode;
  updateFollowButtonState();
  if (isFollowUserMode) {
    recenterMap();
  } else {
    showToast('Auto-Follow: OFF (Explore map freely)');
  }
}

function updateFollowButtonState() {
  const btn = document.getElementById('btn-toggle-follow');
  if (btn) {
    btn.classList.toggle('active-tracking', isFollowUserMode);
    btn.title = isFollowUserMode ? 'Auto-Follow: ON (Map pans as you move)' : 'Auto-Follow: OFF (Click to lock map)';
  }
}

// ----------------------------------------------------------------------------
// 7. Interactive Travel Simulation Mode (For PC & Testing)
// ----------------------------------------------------------------------------
function toggleSimulation() {
  isSimulating = !isSimulating;
  const btn = document.getElementById('btn-simulate-move');
  if (btn) btn.classList.toggle('active-sim', isSimulating);

  if (!isSimulating) {
    if (simInterval) clearInterval(simInterval);
    simInterval = null;
    showToast('Simulated travel stopped');
    return;
  }

  isFollowUserMode = true;
  updateFollowButtonState();
  showToast('Simulating live movement along streets 🚗');

  const startLat = userLocation.lat;
  const startLng = userLocation.lng;
  let step = 0;
  const totalSteps = 60;

  // Generate simulated route coordinates
  const steps = [];
  for (let i = 0; i < totalSteps; i++) {
    const dLat = (i * 0.00032) + (Math.sin(i / 3) * 0.00015);
    const dLng = (i * 0.00025) + (Math.cos(i / 3) * 0.00012);
    const h = (50 + Math.sin(i / 2) * 25 + 360) % 360;
    steps.push({ lat: startLat + dLat, lng: startLng + dLng, heading: h });
  }

  simInterval = setInterval(() => {
    if (step >= steps.length) step = 0;
    const pt = steps[step];
    userLocation = { lat: pt.lat, lng: pt.lng };
    userHeading = pt.heading;
    userAccuracy = 8;
    userSpeed = 1.6; // ~5.7 km/h walking speed
    hasRealGps = true;

    renderUserMarker();

    if (isFollowUserMode && map) {
      map.panTo([userLocation.lat, userLocation.lng], { animate: true, duration: 0.8 });
    }

    refreshDistanceBadges();
    step++;
  }, 1200);
}

// ----------------------------------------------------------------------------
// 8. Pandal Markers & Interactions
// ----------------------------------------------------------------------------
function renderPandalMarkers() {
  if (!pandalMarkersLayer) return;
  pandalMarkersLayer.clearLayers();

  pandals.forEach(p => {
    const trafficColor = 
      p.trafficLevel === 'low' ? '#10b981' :
      p.trafficLevel === 'moderate' ? '#f59e0b' :
      '#ef4444';

    const customIcon = L.divIcon({
      className: 'pandal-custom-marker',
      html: `
        <div class="pandal-pin-container">
          <div class="pandal-pin-inner">
            <span>🪔</span>
            ${p.isBeautyPick ? '<span class="pandal-star-badge">★</span>' : ''}
            <span class="traffic-dot" style="background-color: ${trafficColor};"></span>
          </div>
          <div class="pandal-pin-point"></div>
        </div>
      `,
      iconSize: [38, 48],
      iconAnchor: [19, 46]
    });

    const marker = L.marker([p.location.lat, p.location.lng], {
      icon: customIcon,
      zIndexOffset: 500
    });

    marker.on('click', () => {
      openPandalDetail(p);
    });

    marker.addTo(pandalMarkersLayer);
  });
}

function openPandalDetail(pandal) {
  selectedPandal = pandal;
  const dist = calculateDistanceKm(userLocation, pandal.location);

  document.getElementById('modal-detail-title').textContent = pandal.name;
  document.getElementById('modal-detail-puja').textContent = pandal.pujaName;
  document.getElementById('modal-detail-theme').textContent = pandal.theme;
  document.getElementById('modal-detail-desc').textContent = pandal.description;
  document.getElementById('modal-detail-address').textContent = pandal.address;
  document.getElementById('modal-detail-distance').textContent = `${dist} km away`;
  document.getElementById('modal-detail-wait').textContent = `~${pandal.estimatedQueueMins}m queue`;
  document.getElementById('modal-detail-rating').textContent = `★ ${pandal.rating} (${pandal.reviewCount || 100}+ reviews)`;
  
  const imgEl = document.getElementById('modal-detail-img');
  imgEl.src = pandal.thumbnail || pandal.images[0];

  document.getElementById('modal-pandal-detail').classList.add('active');
}

function closePandalDetail() {
  document.getElementById('modal-pandal-detail').classList.remove('active');
}

// ----------------------------------------------------------------------------
// 9. Real Road Route Navigation
// ----------------------------------------------------------------------------
async function startNavigationTo(pandal) {
  closePandalDetail();
  switchTab('map');
  showToast(`Calculating road route to ${pandal.name}...`);

  const routeData = await fetchRealRoadRoute(userLocation, pandal.location);

  if (navRouteLayer) {
    navRouteLayer.clearLayers();

    // Route casing
    L.polyline(routeData.coordinates, {
      color: '#7f1d1d',
      weight: 8,
      opacity: 0.5,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(navRouteLayer);

    // Main road line
    const poly = L.polyline(routeData.coordinates, {
      color: '#dc2626',
      weight: 5,
      opacity: 0.95,
      lineCap: 'round',
      lineJoin: 'round'
    }).addTo(navRouteLayer);

    map.fitBounds(poly.getBounds(), { padding: [60, 60], maxZoom: 16 });
  }

  // Show banner
  const banner = document.getElementById('active-route-banner');
  document.getElementById('route-banner-info').textContent = 
    `Road Route: ${routeData.distanceKm} km (~${routeData.durationMins} mins) to ${pandal.name}`;
  banner.style.display = 'flex';
}

function clearActiveRoute() {
  if (navRouteLayer) navRouteLayer.clearLayers();
  document.getElementById('active-route-banner').style.display = 'none';
  showToast('Navigation closed');
}

// ----------------------------------------------------------------------------
// 10. Manual Pinning & Adding Custom Pandals
// ----------------------------------------------------------------------------
function startPinningMode() {
  isPinningMode = true;
  document.body.classList.add('pinning-mode');
  switchTab('map');
  showToast('📍 Tap anywhere on the map to pin a new pandal spot');
}

function setManualPin(latlng) {
  manualPinLocation = { lat: latlng.lat, lng: latlng.lng };

  if (tempPinMarker) map.removeLayer(tempPinMarker);

  const pinIcon = L.divIcon({
    className: 'custom-temp-pin',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <div style="width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, #b91c1c, #d97706); border: 2px solid #fff; display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); animation: bounce 1s infinite;">🪔</div>
        <div style="background: rgba(0,0,0,0.85); color: #fff; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 999px; margin-top: 4px; white-space: nowrap;">Pinned Spot</div>
      </div>
    `,
    iconSize: [44, 60],
    iconAnchor: [22, 55]
  });

  tempPinMarker = L.marker([latlng.lat, latlng.lng], { icon: pinIcon }).addTo(map);

  // Open add modal with coordinates
  document.getElementById('add-coord-display').textContent = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
  document.getElementById('modal-add-pandal').classList.add('active');
  cancelPinningMode();
}

function cancelPinningMode() {
  isPinningMode = false;
  document.body.classList.remove('pinning-mode');
}

function closeAddModal() {
  document.getElementById('modal-add-pandal').classList.remove('active');
  if (tempPinMarker && map) {
    map.removeLayer(tempPinMarker);
    tempPinMarker = null;
  }
}

function submitNewPandal(e) {
  e.preventDefault();
  const name = document.getElementById('add-name').value.trim();
  const club = document.getElementById('add-club').value.trim();
  const zone = document.getElementById('add-zone').value;
  const theme = document.getElementById('add-theme').value.trim() || 'Festive Pratima & Illumination';
  const desc = document.getElementById('add-desc').value.trim() || 'Community contributed pandal.';
  const imgUrl = document.getElementById('add-img').value.trim() || 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80';

  if (!name) return alert('Please enter a pandal name');

  const loc = manualPinLocation || userLocation;

  const newPandal = {
    id: 'pandal-custom-' + Date.now(),
    name: name,
    pujaName: `${name} Sarbojanin Durgotsav`,
    clubName: club || name,
    theme: theme,
    description: desc,
    location: loc,
    address: `${zone}, West Bengal`,
    zone: zone,
    images: [imgUrl],
    thumbnail: imgUrl,
    rating: 5.0,
    reviewCount: 1,
    visitCount: 1,
    photosPostedCount: 1,
    trafficLevel: 'moderate',
    estimatedQueueMins: 15,
    isBeautyPick: true,
    isHeritage: false
  };

  pandals.unshift(newPandal);
  savePandals(pandals);
  renderPandalMarkers();
  renderPandalList();
  renderShortestFinder();

  closeAddModal();
  showToast(`🎉 "${name}" added to Bengal Map!`);
  openPandalDetail(newPandal);
}

// ----------------------------------------------------------------------------
// 11. Tab Switching & Views (Explore, Finder, Itinerary)
// ----------------------------------------------------------------------------
function switchTab(tabId) {
  document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));

  if (tabId !== 'map') {
    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) targetView.classList.add('active');
  }

  if (tabId === 'explore') renderPandalList();
  if (tabId === 'finder') renderShortestFinder();
  if (tabId === 'itinerary') renderItineraryList();
}

function renderPandalList() {
  const container = document.getElementById('pandal-cards-container');
  if (!container) return;

  let list = pandals.map(p => ({
    ...p,
    distanceKm: calculateDistanceKm(userLocation, p.location)
  }));

  // Filter zone
  if (currentZone !== 'all') {
    list = list.filter(p => p.zone.toLowerCase().includes(currentZone.toLowerCase()));
  }

  // Filter search
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.theme.toLowerCase().includes(q) ||
      p.zone.toLowerCase().includes(q)
    );
  }

  // Sort priority
  if (currentFilter === 'nearest') list.sort((a, b) => a.distanceKm - b.distanceKm);
  else if (currentFilter === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (currentFilter === 'visits') list.sort((a, b) => b.visitCount - a.visitCount);

  container.innerHTML = list.map(p => `
    <div class="pandal-card" onclick="openPandalDetailById('${p.id}')">
      <div class="card-image-wrap">
        <img src="${p.thumbnail || p.images[0]}" alt="${p.name}" loading="lazy">
        <span class="card-distance-badge">📍 ${p.distanceKm} km</span>
        <span class="card-traffic-badge" style="background: ${p.trafficLevel === 'low' ? '#10b981' : p.trafficLevel === 'moderate' ? '#f59e0b' : '#ef4444'}">
          ${p.trafficLevel.toUpperCase()}
        </span>
      </div>
      <div class="card-body">
        <h4 class="card-title">${p.name}</h4>
        <p class="card-theme">🎨 ${p.theme}</p>
        <p class="card-address">🚩 ${p.address}</p>
        <div class="card-footer">
          <span class="card-rating">★ ${p.rating} (${p.reviewCount || 100})</span>
          <span style="font-size: 11px; font-weight: 700; color: #b91c1c;">View Details →</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderShortestFinder() {
  const container = document.getElementById('finder-results-container');
  if (!container) return;

  const sorted = pandals.map(p => ({
    ...p,
    distanceKm: calculateDistanceKm(userLocation, p.location)
  })).sort((a, b) => a.distanceKm - b.distanceKm);

  container.innerHTML = sorted.map((p, idx) => `
    <div style="background: #fff; border-radius: 16px; border: 1.5px solid var(--border-light); padding: 12px 16px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.03);">
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="width: 32px; height: 32px; border-radius: 10px; background: ${idx < 3 ? '#b91c1c' : '#f1f5f9'}; color: ${idx < 3 ? '#fff' : '#64748b'}; font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center;">
          ${idx + 1}
        </div>
        <div>
          <h4 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 2px;">${p.name}</h4>
          <p style="font-size: 11px; color: #64748b;">${p.zone} • ~${Math.round(p.distanceKm * 3.5)} mins drive</p>
        </div>
      </div>
      <div style="text-align: right; display: flex; align-items: center; gap: 10px;">
        <div>
          <span style="font-size: 14px; font-weight: 900; color: #0284c7; display: block;">${p.distanceKm} km</span>
          <span style="font-size: 10px; color: #64748b; font-weight: 600;">Shortest Path</span>
        </div>
        <button onclick="startNavigationToById('${p.id}')" style="background: linear-gradient(135deg, #b91c1c, #d97706); color: #fff; border: none; border-radius: 10px; padding: 6px 12px; font-size: 11px; font-weight: 800; cursor: pointer;">
          Go 🚗
        </button>
      </div>
    </div>
  `).join('');
}

function renderItineraryList() {
  const container = document.getElementById('itinerary-container');
  if (!container) return;

  if (visitPlans.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: #64748b;">
        <span style="font-size: 40px; display: block; margin-bottom: 12px;">📅</span>
        <h3 style="font-size: 16px; font-weight: 800; color: #0f172a;">No scheduled pandals yet</h3>
        <p style="font-size: 12px; margin-top: 4px;">Open any pandal and tap "Schedule Visit" to organize your hopper day!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = visitPlans.map(plan => {
    const p = pandals.find(x => x.id === plan.pandalId) || { name: 'Pandal', address: '' };
    return `
      <div style="background: #fff; border-radius: 16px; border: 1.5px solid var(--border-light); padding: 14px 16px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <input type="checkbox" ${plan.completed ? 'checked' : ''} onchange="togglePlanComplete('${plan.id}')" style="width: 18px; height: 18px; cursor: pointer;">
          <div>
            <h4 style="font-size: 14px; font-weight: 800; text-decoration: ${plan.completed ? 'line-through' : 'none'}; color: ${plan.completed ? '#94a3b8' : '#0f172a'};">${p.name}</h4>
            <p style="font-size: 11px; color: #d97706; font-weight: 600;">⏰ ${plan.time || 'Festival Evening'}</p>
          </div>
        </div>
        <button onclick="deletePlan('${plan.id}')" style="background: none; border: none; color: #ef4444; font-size: 14px; cursor: pointer;">🗑️</button>
      </div>
    `;
  }).join('');
}

function addToItinerary() {
  if (!selectedPandal) return;
  const plan = {
    id: 'plan-' + Date.now(),
    pandalId: selectedPandal.id,
    time: '8:00 PM (Saptami / Ashtami)',
    completed: false
  };
  visitPlans.push(plan);
  savePlans(visitPlans);
  closePandalDetail();
  showToast(`📅 "${selectedPandal.name}" added to Itinerary!`);
}

function togglePlanComplete(id) {
  visitPlans = visitPlans.map(p => p.id === id ? { ...p, completed: !p.completed } : p);
  savePlans(visitPlans);
  renderItineraryList();
}

function deletePlan(id) {
  visitPlans = visitPlans.filter(p => p.id !== id);
  savePlans(visitPlans);
  renderItineraryList();
}

function updatePlanCounter() {
  const badge = document.getElementById('itinerary-badge');
  if (badge) {
    const pending = visitPlans.filter(p => !p.completed).length;
    badge.textContent = pending > 0 ? pending : '';
    badge.style.display = pending > 0 ? 'inline-block' : 'none';
  }
}

// ----------------------------------------------------------------------------
// 12. Helper Dispatchers & Share Dialog
// ----------------------------------------------------------------------------
function openPandalDetailById(id) {
  const p = pandals.find(x => x.id === id);
  if (p) openPandalDetail(p);
}

function startNavigationToById(id) {
  const p = pandals.find(x => x.id === id);
  if (p) startNavigationTo(p);
}

function refreshDistanceBadges() {
  // Re-render finder if currently active
  const finderTab = document.getElementById('view-finder');
  if (finderTab && finderTab.classList.contains('active')) {
    renderShortestFinder();
  }
}

function shareCurrentPandal() {
  if (!selectedPandal) return;
  const shareText = `Check out ${selectedPandal.name} (${selectedPandal.theme}) on Durga Puja Parikrama Bengal Map!`;
  if (navigator.share) {
    navigator.share({
      title: selectedPandal.name,
      text: shareText,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
    showToast('Link copied to clipboard! Share on WhatsApp 📲');
  }
}

function showToast(msg) {
  const t = document.getElementById('gps-toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'flex';
  clearTimeout(t._timer);
  t._timer = setTimeout(() => { t.style.display = 'none'; }, 3200);
}

function showGpsAlert(msg) {
  const a = document.getElementById('gps-alert-banner');
  if (!a) return;
  document.getElementById('gps-alert-text').textContent = msg;
  a.style.display = 'flex';
}

function hideGpsAlert() {
  const a = document.getElementById('gps-alert-banner');
  if (a) a.style.display = 'none';
}

// ----------------------------------------------------------------------------
// 13. Initialization on DOM Loaded
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  pandals = loadStoredPandals();
  visitPlans = loadStoredPlans();

  initMap();
  startGeolocationTracking();
  updatePlanCounter();

  // Search input listener
  const searchEl = document.getElementById('search-input');
  if (searchEl) {
    searchEl.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderPandalList();
    });
  }

  // Filter chips listeners
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.filter;
      renderPandalList();
    });
  });

  // Layer menu toggle
  const layerBtn = document.getElementById('btn-map-layers');
  const dropdown = document.getElementById('tile-dropdown');
  if (layerBtn && dropdown) {
    layerBtn.addEventListener('click', () => {
      dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });
  }
});
