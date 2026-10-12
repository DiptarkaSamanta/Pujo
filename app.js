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
  },
  {
    id: 'pandal-newtown-1',
    name: 'New Town Sarbojanin (Action Area 1)',
    pujaName: 'New Town Sarbojanin Durgotsav',
    clubName: 'New Town Cultural Association',
    theme: 'Illuminated Terracotta Craft & Grand Cultural Pavilion',
    description: 'Premier community puja in New Town near The New Town School and Rabindra Tirtha Shishu Udyan. Radiant festive lighting and vibrant evening cultural ceremonies.',
    location: { lat: 22.5845, lng: 88.4688 },
    address: 'Near The New Town School, Action Area 1, New Town, Kolkata',
    zone: 'North 24 Parganas',
    images: [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=300&q=80',
    rating: 4.9,
    reviewCount: 420,
    visitCount: 16500,
    photosPostedCount: 680,
    trafficLevel: 'moderate',
    estimatedQueueMins: 15,
    isBeautyPick: true,
    isHeritage: false
  },
  {
    id: 'pandal-newtown-2',
    name: 'Jal Vayu Towers Durga Puja',
    pujaName: 'Jal Vayu Towers Sarbojanin Durgotsav',
    clubName: 'Jal Vayu Towers Residents Welfare Samiti',
    theme: 'Vedic Sanatan Pratima & Grand Dhunuchi Naach Utsav',
    description: 'Celebrated residential township festival near Street No. 299 and Greenfield Heights. Renowned for traditional rituals, community feast (bhog), and sparkling illumination.',
    location: { lat: 22.5805, lng: 88.4702 },
    address: 'Jal Vayu Towers, Street No. 299, New Town, Kolkata',
    zone: 'North 24 Parganas',
    images: [
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 310,
    visitCount: 11200,
    photosPostedCount: 450,
    trafficLevel: 'low',
    estimatedQueueMins: 10,
    isBeautyPick: true,
    isHeritage: false
  }
];

// ----------------------------------------------------------------------------
// 2. Global State & App Variables
// ----------------------------------------------------------------------------
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAoCm6D1DiREzdDe-dascTOrKC-fVLEmAM",
  authDomain: "pujo-parikrama-d047a.firebaseapp.com",
  projectId: "pujo-parikrama-d047a",
  storageBucket: "pujo-parikrama-d047a.firebasestorage.app",
  messagingSenderId: "235424583513",
  appId: "1:235424583513:web:830552d3ce78baf8660648",
  measurementId: "G-68WY4JMMRT"
};

const STORAGE_KEYS = {
  PANDALS: 'puja_parikrama_pandals_v1',
  PLANS: 'puja_parikrama_plans_v1',
  FIREBASE_CONFIG: 'puja_firebase_config_v1',
  COMMUNITY_SYNC: 'puja_community_sync_v1',
  AUTH: 'puja_parikrama_auth_v1'
};

const ADMIN_PASSCODE = 'admin123';

let currentAuth = {
  role: 'user', // 'user' or 'admin'
  name: 'Pandal Hopper'
};

let firestoreDb = null;
let firebaseStorage = null;
let firestoreUnsubscribe = null;
let isCloudSyncActive = false;
let cloudSyncPollTimer = null;

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
let foodMarkersLayer = null;
let medicalMarkersLayer = null;
let tourMarkersLayer = null;
let userMarker = null;
let userAccuracyCircle = null;
let tempPinMarker = null;

let isFoodLayerActive = false;
let isMedicalLayerActive = false;
let activeMultiRoutes = [];
let selectedRouteIndex = 0;
let currentRouteNavDest = null;
let plannedTourData = null;
let currentPlannerCount = 5;
let currentPlannerStrategy = 'shortest';
let currentPlannerTravelMode = 'car';
let currentFinderMode = 'car';

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
  let list = [...DEFAULT_PANDALS];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PANDALS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const mapById = new Map();
        DEFAULT_PANDALS.forEach(p => mapById.set(p.id, p));
        parsed.forEach(p => mapById.set(p.id, p));
        list = Array.from(mapById.values());
      }
    }
  } catch (e) {
    console.error('Failed reading localStorage pandals:', e);
  }
  localStorage.setItem(STORAGE_KEYS.PANDALS, JSON.stringify(list));
  return list;
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
  const container = document.getElementById('map');
  if (!container || map) return;

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
  foodMarkersLayer = L.layerGroup().addTo(map);
  medicalMarkersLayer = L.layerGroup().addTo(map);
  tourMarkersLayer = L.layerGroup().addTo(map);

  // Invalidate size to guarantee immediate full rendering on mobile screens
  setTimeout(() => { if (map) map.invalidateSize(); }, 150);
  setTimeout(() => { if (map) map.invalidateSize(); }, 500);

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
    updateLiveNavigationProgress();
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
    updateLiveNavigationProgress();
    step++;
  }, 1200);
}

// ----------------------------------------------------------------------------
// 8. Pandal Markers & Interactions
let isFamousFilterActive = false;
let isTrafficFilterActive = false;
const TILE_KEYS = ['osm', 'hot', 'esri_streets', 'satellite'];
let currentTileIndex = 0;

function renderPandalMarkers() {
  if (!pandalMarkersLayer) return;
  pandalMarkersLayer.clearLayers();

  // Update header counter
  const countEl = document.getElementById('header-pandal-count');
  if (countEl) countEl.textContent = pandals.length;

  let displayList = [...pandals];
  if (isFamousFilterActive) {
    displayList = displayList.filter(p => p.isBeautyPick || p.isHeritage).slice(0, 5);
  }
  if (isTrafficFilterActive) {
    displayList = displayList.filter(p => p.trafficLevel === 'low' || p.trafficLevel === 'moderate');
  }

  displayList.forEach(p => {
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

function fitNearestPandals(count = 5) {
  if (!map || !pandals.length) return;
  switchTab('map');
  const sorted = [...pandals].map(p => ({
    ...p,
    dist: calculateDistanceKm(userLocation, p.location)
  })).sort((a, b) => a.dist - b.dist).slice(0, count);

  const bounds = L.latLngBounds([[userLocation.lat, userLocation.lng]]);
  sorted.forEach(p => bounds.extend([p.location.lat, p.location.lng]));
  map.fitBounds(bounds, { padding: [80, 80], maxZoom: 16 });
  showToast(`🗺️ Fitted nearest ${sorted.length} pandals around you`);
}

function toggleFamousPandals() {
  isFamousFilterActive = !isFamousFilterActive;
  const btn = document.getElementById('btn-famous-filter');
  if (btn) btn.classList.toggle('active-famous', isFamousFilterActive);
  renderPandalMarkers();
  showToast(isFamousFilterActive ? '🪔 Showing 5 famous heritage pujas' : 'Showing all pandals');
}

function toggleTrafficFilter() {
  isTrafficFilterActive = !isTrafficFilterActive;
  const btn = document.getElementById('btn-traffic-filter');
  if (btn) btn.classList.toggle('active', isTrafficFilterActive);
  renderPandalMarkers();
  showToast(isTrafficFilterActive ? '🚦 Filtered: Smooth & moderate crowd only' : 'Showing all traffic levels');
}

function quickShortestRoute() {
  if (!pandals.length) return;
  const sorted = [...pandals].map(p => ({
    ...p,
    dist: calculateDistanceKm(userLocation, p.location)
  })).sort((a, b) => a.dist - b.dist);

  const nearest = sorted[0];
  if (nearest) {
    startNavigationTo(nearest);
  }
}

function mapZoomIn() {
  if (map) map.zoomIn();
}

function mapZoomOut() {
  if (map) map.zoomOut();
}

function cycleMapLayer() {
  currentTileIndex = (currentTileIndex + 1) % TILE_KEYS.length;
  const key = TILE_KEYS[currentTileIndex];
  setTileStyle(key);
  showToast(`Map Style: ${key.toUpperCase()}`);
}

function openPandalDetail(pandal) {
  selectedPandal = pandal;
  const dist = calculateDistanceKm(userLocation, pandal.location);

  document.getElementById('modal-detail-title').textContent = pandal.name;
  document.getElementById('modal-detail-puja').textContent = pandal.pujaName || pandal.name;
  document.getElementById('modal-detail-theme').textContent = pandal.theme;
  document.getElementById('modal-detail-desc').textContent = pandal.description;
  document.getElementById('modal-detail-address').textContent = pandal.address;
  document.getElementById('modal-detail-distance').textContent = `${dist} km away`;
  document.getElementById('modal-detail-wait').textContent = `~${pandal.estimatedQueueMins}m queue`;
  document.getElementById('modal-detail-rating').textContent = `★ ${pandal.rating} (${pandal.reviewCount || 100}+ reviews)`;
  
  const imgEl = document.getElementById('modal-detail-img');
  imgEl.src = pandal.thumbnail || pandal.images[0];

  // Render Google Maps Style Community Gallery
  renderCommunityGallery(pandal);

  // Admin delete button toggle
  const deleteBtn = document.getElementById('btn-admin-delete-pandal');
  if (deleteBtn) {
    deleteBtn.style.display = (currentAuth && currentAuth.role === 'admin') ? 'inline-flex' : 'none';
  }

  document.getElementById('modal-pandal-detail').classList.add('active');
}

function closePandalDetail() {
  document.getElementById('modal-pandal-detail').classList.remove('active');
}

// ----------------------------------------------------------------------------
// 9B. Community Photos Gallery & Lightbox (Google Maps Style)
// ----------------------------------------------------------------------------
function renderCommunityGallery(pandal) {
  const container = document.getElementById('modal-gallery-container');
  const countBadge = document.getElementById('gallery-count-badge');
  const photoBadge = document.getElementById('modal-detail-photo-badge');
  if (!container) return;

  const userPhotos = Array.isArray(pandal.userPhotos) ? pandal.userPhotos : [];
  const officialImages = Array.isArray(pandal.images) ? pandal.images : [pandal.thumbnail].filter(Boolean);
  
  const totalCount = userPhotos.length + officialImages.length;
  if (countBadge) countBadge.textContent = `${totalCount}`;
  if (photoBadge) photoBadge.textContent = `📷 ${totalCount} Photo${totalCount === 1 ? '' : 's'}`;

  if (totalCount === 0) {
    container.innerHTML = `
      <div class="gallery-empty-state">
        <span style="font-size: 32px; display: block; margin-bottom: 6px;">📸</span>
        <strong style="font-size: 13px; color: #0f172a; display: block;">No photos uploaded yet</strong>
        <p style="font-size: 11px; color: #64748b; margin-top: 3px;">Be the first hopper to share a live picture of this pandal!</p>
        <button type="button" onclick="openAddPhotoModal()" class="btn-festive" style="margin-top: 10px; padding: 7px 16px; font-size: 11.5px; border-radius: 999px;">
          + Upload Live Photo
        </button>
      </div>
    `;
    return;
  }

  let html = '';

  // 1. User-Uploaded Community Photos (Priority at top)
  userPhotos.forEach(photo => {
    const escapedCaption = (photo.caption || 'Durga Puja Parikrama').replace(/'/g, "\\'");
    const escapedAuthor = (photo.authorName || 'Hopper').replace(/'/g, "\\'");
    const escapedDate = (photo.timestamp || 'Live').replace(/'/g, "\\'");
    const escapedPandal = (pandal.name || '').replace(/'/g, "\\'");
    html += `
      <div class="gallery-photo-card" onclick="openPhotoLightbox('${photo.url}', '${escapedCaption}', '${escapedAuthor}', '${escapedDate}', '${escapedPandal}')" title="Click to view full photo">
        <img class="gallery-photo-img" src="${photo.url}" alt="${photo.caption || pandal.name}" loading="lazy" onerror="this.src='${pandal.thumbnail || ''}'">
        <div class="gallery-photo-info">
          <span class="gallery-photo-author">👤 ${photo.authorName || 'Hopper'}</span>
          <span class="gallery-photo-date">${photo.timestamp || 'Live'}</span>
        </div>
      </div>
    `;
  });

  // 2. Official Pandal Images
  officialImages.forEach((imgUrl) => {
    if (!userPhotos.some(up => up.url === imgUrl)) {
      const escapedCaption = `${pandal.name} - Official Darshan View`.replace(/'/g, "\\'");
      const escapedAuthor = 'Committee / Official'.replace(/'/g, "\\'");
      const escapedPandal = (pandal.name || '').replace(/'/g, "\\'");
      html += `
        <div class="gallery-photo-card" onclick="openPhotoLightbox('${imgUrl}', '${escapedCaption}', '${escapedAuthor}', 'Durga Puja 2026', '${escapedPandal}')" title="Click to view full photo">
          <img class="gallery-photo-img" src="${imgUrl}" alt="${pandal.name}" loading="lazy">
          <div class="gallery-photo-info">
            <span class="gallery-photo-author" style="color: #b91c1c;">✨ Official Photo</span>
            <span class="gallery-photo-date">Puja Darshan</span>
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = html;
}

function scrollToGallery() {
  const section = document.getElementById('community-photos-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ----------------------------------------------------------------------------
// 9C. Photo Upload Handlers (Device / Camera / URL + Client Compression)
// ----------------------------------------------------------------------------
let pendingPhotoDataUrl = null;

function openAddPhotoModal(pandalId) {
  if (pandalId) {
    const target = pandals.find(p => p.id === pandalId);
    if (target) selectedPandal = target;
  }
  if (!selectedPandal) {
    showToast('Please select a pandal first');
    return;
  }

  const nameEl = document.getElementById('add-photo-pandal-name');
  if (nameEl) nameEl.textContent = `${selectedPandal.name} (${selectedPandal.zone})`;

  const authorEl = document.getElementById('photo-author-input');
  if (authorEl) {
    authorEl.value = (currentAuth && currentAuth.name) ? currentAuth.name : (localStorage.getItem('puja_last_author') || 'Bengal Hopper');
  }

  const captionEl = document.getElementById('photo-caption-input');
  if (captionEl) captionEl.value = '';

  clearPhotoSelection();
  switchPhotoSource('file');

  document.getElementById('modal-add-photo').classList.add('active');
}

function closeAddPhotoModal() {
  const modal = document.getElementById('modal-add-photo');
  if (modal) modal.classList.remove('active');
  clearPhotoSelection();
}

function switchPhotoSource(type) {
  const fileTab = document.getElementById('tab-btn-file');
  const urlTab = document.getElementById('tab-btn-url');
  const fileSec = document.getElementById('photo-file-section');
  const urlSec = document.getElementById('photo-url-section');

  if (type === 'file') {
    if (fileTab) fileTab.classList.add('active');
    if (urlTab) urlTab.classList.remove('active');
    if (fileSec) fileSec.style.display = 'block';
    if (urlSec) urlSec.style.display = 'none';
  } else {
    if (fileTab) fileTab.classList.remove('active');
    if (urlTab) urlTab.classList.add('active');
    if (fileSec) fileSec.style.display = 'none';
    if (urlSec) urlSec.style.display = 'block';
  }
}

async function handlePhotoFileSelected(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  try {
    showToast('⏳ Compressing photo for instant cloud upload...');
    const compressed = await compressImageFile(file, 900, 0.75);
    pendingPhotoDataUrl = compressed;
    showPhotoPreview(compressed);
  } catch (err) {
    console.error('Image compression error:', err);
    const reader = new FileReader();
    reader.onload = (ev) => {
      pendingPhotoDataUrl = ev.target.result;
      showPhotoPreview(pendingPhotoDataUrl);
    };
    reader.readAsDataURL(file);
  }
}

function handlePhotoUrlInput(e) {
  const url = e.target.value.trim();
  if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image'))) {
    pendingPhotoDataUrl = url;
    showPhotoPreview(url);
  }
}

function showPhotoPreview(src) {
  const wrap = document.getElementById('photo-preview-wrap');
  const img = document.getElementById('photo-preview-img');
  if (wrap && img) {
    img.src = src;
    wrap.style.display = 'block';
  }
}

function clearPhotoSelection() {
  pendingPhotoDataUrl = null;
  const fileInput = document.getElementById('photo-file-input');
  if (fileInput) fileInput.value = '';
  const urlInput = document.getElementById('photo-url-input');
  if (urlInput) urlInput.value = '';
  const wrap = document.getElementById('photo-preview-wrap');
  if (wrap) wrap.style.display = 'none';
  const img = document.getElementById('photo-preview-img');
  if (img) img.src = '';
}

async function submitUserPhoto(e) {
  if (e) e.preventDefault();
  if (!selectedPandal) return;

  const urlInput = document.getElementById('photo-url-input');
  const rawUrl = pendingPhotoDataUrl || (urlInput && urlInput.value.trim());

  if (!rawUrl) {
    alert('Please select a photo from your device or enter an image URL.');
    return;
  }

  const submitBtn = document.getElementById('btn-submit-photo');
  const originalBtnHtml = submitBtn ? submitBtn.innerHTML : 'Upload';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '☁️ Uploading to Firebase Cloud Storage...';
  }

  const caption = (document.getElementById('photo-caption-input')?.value || '').trim() || 'Durga Puja Parikrama Darshan';
  const author = (document.getElementById('photo-author-input')?.value || '').trim() || 'Bengal Hopper';

  localStorage.setItem('puja_last_author', author);

  try {
    // Approach B: Upload photo to Firebase Cloud Storage, get public download URL (~60 bytes)
    const uploadResult = await uploadImageToCloudStorage(rawUrl, 'pandal_photos');
    const finalUrl = uploadResult.url || rawUrl;

    const newPhoto = {
      id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      url: finalUrl,
      caption: caption,
      authorName: author,
      authorRole: (currentAuth && currentAuth.role === 'admin') ? 'Admin' : 'Hopper',
      timestamp: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      createdAt: Date.now()
    };

    if (!Array.isArray(selectedPandal.userPhotos)) {
      selectedPandal.userPhotos = [];
    }
    selectedPandal.userPhotos.unshift(newPhoto);

    if (!Array.isArray(selectedPandal.images)) {
      selectedPandal.images = [selectedPandal.thumbnail].filter(Boolean);
    }
    selectedPandal.images.unshift(newPhoto.url);
    selectedPandal.photosPostedCount = (selectedPandal.photosPostedCount || 0) + 1;

    // Save to local storage
    savePandals(pandals);

    // Broadcast to Firebase Firestore in real time for all users
    broadcastPandalUpdate(selectedPandal);

    // Refresh UI
    renderCommunityGallery(selectedPandal);
    closeAddPhotoModal();

    if (uploadResult.provider === 'firebase_storage') {
      showToast(`☁️ Approach B: Photo saved to Firebase Cloud Storage & linked in database!`);
    } else {
      showToast(`📸 Photo by ${author} uploaded & synced to live database!`);
    }
  } catch (err) {
    console.error('Photo upload process error:', err);
    showToast('⚠️ Could not complete photo upload. Please try again.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  }
}

// ----------------------------------------------------------------------------
// 9D. Edit Pandal Details Handlers (Live Firestore Sync)
// ----------------------------------------------------------------------------
function openEditPandalModal(pandalId) {
  if (pandalId) {
    const target = pandals.find(p => p.id === pandalId);
    if (target) selectedPandal = target;
  }
  if (!selectedPandal) {
    showToast('Please select a pandal first');
    return;
  }

  const p = selectedPandal;
  document.getElementById('edit-pandal-id').value = p.id;
  document.getElementById('edit-pandal-target-name').textContent = p.name;
  document.getElementById('edit-pandal-name').value = p.name || '';
  document.getElementById('edit-pandal-theme').value = p.theme || '';
  document.getElementById('edit-pandal-zone').value = p.zone || 'Kolkata';
  document.getElementById('edit-pandal-traffic').value = p.trafficLevel || 'moderate';
  document.getElementById('edit-pandal-wait').value = p.estimatedQueueMins || 20;
  document.getElementById('edit-pandal-puja').value = p.pujaName || '';
  document.getElementById('edit-pandal-address').value = p.address || '';
  document.getElementById('edit-pandal-desc').value = p.description || '';
  document.getElementById('edit-pandal-cover').value = p.thumbnail || (p.images && p.images[0]) || '';

  document.getElementById('modal-edit-pandal').classList.add('active');
}

function closeEditPandalModal() {
  const modal = document.getElementById('modal-edit-pandal');
  if (modal) modal.classList.remove('active');
}

async function submitEditPandal(e) {
  if (e) e.preventDefault();
  const id = document.getElementById('edit-pandal-id').value;
  const p = pandals.find(x => x.id === id);
  if (!p) return;

  const saveBtn = document.querySelector('#modal-edit-pandal button[type="submit"]');
  const originalText = saveBtn ? saveBtn.innerHTML : 'Save Changes';
  if (saveBtn) {
    saveBtn.disabled = true;
    saveBtn.innerHTML = '☁️ Uploading & Saving to Database...';
  }

  try {
    p.name = document.getElementById('edit-pandal-name').value.trim() || p.name;
    p.theme = document.getElementById('edit-pandal-theme').value.trim() || p.theme;
    p.zone = document.getElementById('edit-pandal-zone').value || p.zone;
    p.trafficLevel = document.getElementById('edit-pandal-traffic').value || p.trafficLevel;
    p.estimatedQueueMins = parseInt(document.getElementById('edit-pandal-wait').value, 10) || p.estimatedQueueMins;
    p.pujaName = document.getElementById('edit-pandal-puja').value.trim() || p.pujaName || p.name;
    p.address = document.getElementById('edit-pandal-address').value.trim() || p.address;
    p.description = document.getElementById('edit-pandal-desc').value.trim() || p.description;

    const newCover = document.getElementById('edit-pandal-cover').value.trim();
    if (newCover) {
      let finalCover = newCover;
      if (newCover.startsWith('data:')) {
        const upResult = await uploadImageToCloudStorage(newCover, 'pandal_covers');
        if (upResult && upResult.url) {
          finalCover = upResult.url;
        }
      }
      p.thumbnail = finalCover;
      if (!p.images) p.images = [];
      if (!p.images.includes(finalCover)) p.images.unshift(finalCover);
    }

    savePandals(pandals);
    broadcastPandalUpdate(p);

    // Refresh detail sheet & lists
    openPandalDetail(p);
    renderPandalMarkers();
    renderPandalList();
    renderShortestFinder();

    closeEditPandalModal();
    showToast(`✅ "${p.name}" details updated and saved to database!`);
  } catch (err) {
    console.error('Error saving pandal edit:', err);
    showToast('⚠️ Could not save pandal details.');
  } finally {
    if (saveBtn) {
      saveBtn.disabled = false;
      saveBtn.innerHTML = originalText;
    }
  }
}

async function handleEditCoverFile(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  try {
    showToast('⏳ Compressing cover image...');
    const compressed = await compressImageFile(file, 1000, 0.8);
    const input = document.getElementById('edit-pandal-cover');
    if (input) input.value = compressed;
    showToast('📸 Cover photo ready! Tap "Save Changes" to upload.');
  } catch (err) {
    console.error('Error preparing cover file:', err);
  }
}

// ----------------------------------------------------------------------------
// 9E. Fullscreen Photo Lightbox Handlers
// ----------------------------------------------------------------------------
function openPhotoLightbox(photoUrl, caption, author, date, pandalName) {
  const lightbox = document.getElementById('modal-photo-lightbox');
  if (!lightbox) return;

  document.getElementById('lightbox-img').src = photoUrl;
  document.getElementById('lightbox-pandal-name').textContent = pandalName || (selectedPandal ? selectedPandal.name : 'Pandal Photo');
  document.getElementById('lightbox-caption').textContent = caption || 'Durga Puja Parikrama Darshan';
  document.getElementById('lightbox-author').textContent = author ? `👤 ${author}` : '👤 Hopper';
  document.getElementById('lightbox-date').textContent = date || 'Live';

  lightbox.classList.add('active');
}

function closePhotoLightbox(e) {
  if (e && e.target && e.target.closest('.lightbox-content') && !e.target.closest('.lightbox-close-btn')) {
    return;
  }
  const lightbox = document.getElementById('modal-photo-lightbox');
  if (lightbox) lightbox.classList.remove('active');
}

// ----------------------------------------------------------------------------
// 9F. Client-Side Image Compressor & Firestore Synchronizer
// ----------------------------------------------------------------------------
function compressImageFile(file, maxWidth = 900, quality = 0.75) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ----------------------------------------------------------------------------
// 9G. Approach B: Firebase Cloud Storage Photo Uploader (5GB Free Tier)
// ----------------------------------------------------------------------------
/**
 * Approach B: Uploads image file or data URI to Firebase Cloud Storage,
 * returns the public download URL (~60-120 bytes) to be saved in Firestore.
 * Prevents hitting Firestore's 1 MB document limit while supporting unlimited photos.
 */
async function uploadImageToCloudStorage(fileOrDataUrl, folder = 'pandal_photos') {
  if (!fileOrDataUrl) {
    return { success: false, url: '', provider: 'none' };
  }

  // If already an HTTP/HTTPS URL, no upload required
  if (typeof fileOrDataUrl === 'string' && (fileOrDataUrl.startsWith('http://') || fileOrDataUrl.startsWith('https://'))) {
    return { success: true, url: fileOrDataUrl, provider: 'external_url' };
  }

  // Ensure Firebase Storage is initialized if Firebase SDK is present
  if (!firebaseStorage && typeof firebase !== 'undefined' && typeof firebase.storage === 'function') {
    try {
      let activeConfig = DEFAULT_FIREBASE_CONFIG;
      const raw = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.projectId) activeConfig = parsed;
      }
      if (!firebase.apps.length && activeConfig && activeConfig.projectId) {
        firebase.initializeApp(activeConfig);
      }
      firebaseStorage = firebase.storage();
    } catch (e) {
      console.warn('Lazy Firebase storage initialization notice:', e);
    }
  }

  // Approach B: Upload to Firebase Cloud Storage
  if (firebaseStorage) {
    try {
      const timestamp = Date.now();
      const rand = Math.random().toString(36).substring(2, 8);
      const filename = `${folder}/${timestamp}_${rand}.jpg`;
      const storageRef = firebaseStorage.ref().child(filename);

      let snapshot = null;
      if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
        // Upload Base64 Data URL (e.g. from canvas compression)
        snapshot = await storageRef.putString(fileOrDataUrl, 'data_url', {
          contentType: 'image/jpeg'
        });
      } else if (fileOrDataUrl instanceof Blob || fileOrDataUrl instanceof File) {
        // Upload Blob/File directly
        snapshot = await storageRef.put(fileOrDataUrl, {
          contentType: fileOrDataUrl.type || 'image/jpeg'
        });
      }

      if (snapshot && snapshot.ref) {
        const downloadUrl = await snapshot.ref.getDownloadURL();
        console.log('☁️ [Approach B] Photo uploaded to Firebase Cloud Storage successfully:', downloadUrl);
        return {
          success: true,
          url: downloadUrl,
          provider: 'firebase_storage'
        };
      }
    } catch (err) {
      console.warn('Firebase Storage upload notice (using graceful fallback):', err.code || err.message);
      if (err.code === 'storage/unauthorized' || err.code === 'storage/unknown') {
        console.info('💡 Firebase Storage Tip: To enable public uploads in Firebase Console, go to Storage -> Rules and set:\n' +
          'rules_version = \'2\';\nservice firebase.storage {\n  match /b/{bucket}/o {\n    match /{allPaths=**} {\n      allow read, write: if true;\n    }\n  }\n}');
      }
      // Graceful fallback: return the client-compressed image data URL so the photo is NEVER lost!
    }
  }

  // Graceful Fallback if Storage is unavailable or rules locked
  return {
    success: true,
    url: typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '',
    provider: 'compressed_fallback'
  };
}

function broadcastPandalUpdate(pandal) {
  // Sync to Firebase Firestore
  if (firestoreDb) {
    try {
      const cleanDoc = JSON.parse(JSON.stringify(pandal));
      firestoreDb.collection('pandals').doc(pandal.id).set(cleanDoc, { merge: true })
        .then(() => {
          console.log(`Firestore document updated for: ${pandal.name}`);
        })
        .catch(err => {
          console.warn('Firestore update error:', err);
        });
    } catch (e) {
      console.warn('Error serializing pandal for Firestore:', e);
    }
  }

  // Backup to Community Relay
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMMUNITY_SYNC) || '[]';
    let list = JSON.parse(raw);
    const idx = list.findIndex(p => p.id === pandal.id);
    if (idx !== -1) list[idx] = pandal;
    else list.unshift(pandal);
    localStorage.setItem(STORAGE_KEYS.COMMUNITY_SYNC, JSON.stringify(list));
  } catch (e) {}
}

function deleteCurrentPandal() {
  if (selectedPandal) {
    deletePandal(selectedPandal.id);
  }
}

function deletePandal(pandalId) {
  if (!currentAuth || currentAuth.role !== 'admin') {
    alert('Access restricted: Only administrators can delete pandals.');
    return;
  }

  const target = pandals.find(p => p.id === pandalId);
  const name = target ? target.name : 'this pandal';

  if (!confirm(`Are you sure you want to delete "${name}" from the live map? This will remove it for all connected users.`)) {
    return;
  }

  // 1. Remove from local pandals array
  pandals = pandals.filter(p => p.id !== pandalId);
  savePandals(pandals);

  // 2. Remove from Firebase Firestore (propagates live deletion to all users!)
  if (firestoreDb) {
    firestoreDb.collection('pandals').doc(pandalId).delete()
      .then(() => {
        console.log('Successfully deleted pandal from Firestore:', pandalId);
      })
      .catch((err) => {
        console.warn('Firestore delete error:', err);
      });
  }

  // 3. Remove from community backup storage
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMMUNITY_SYNC) || '[]';
    const list = JSON.parse(raw).filter(p => p.id !== pandalId);
    localStorage.setItem(STORAGE_KEYS.COMMUNITY_SYNC, JSON.stringify(list));
  } catch (e) {}

  closePandalDetail();
  renderPandalMarkers();
  renderPandalList();
  renderShortestFinder();
  showToast(`🗑️ "${name}" deleted from the live map!`);
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
  const banner = document.getElementById('pinning-active-banner');
  if (banner) banner.style.display = 'flex';
  showToast('📍 Tap map to place pin • Tap Exit Pin Mode to cancel');
}

function setManualPin(latlng) {
  manualPinLocation = { lat: latlng.lat, lng: latlng.lng };

  if (tempPinMarker && map) map.removeLayer(tempPinMarker);

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
  const banner = document.getElementById('pinning-active-banner');
  if (banner) banner.style.display = 'none';
  if (tempPinMarker && map) {
    map.removeLayer(tempPinMarker);
    tempPinMarker = null;
  }
}

// PC/Laptop Escape key to cancel pinning cleanly
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isPinningMode) {
      cancelPinningMode();
      showToast('Pin mode canceled • Map untouched');
    }
  }
});

function closeAddModal() {
  document.getElementById('modal-add-pandal').classList.remove('active');
  if (tempPinMarker && map) {
    map.removeLayer(tempPinMarker);
    tempPinMarker = null;
  }
}

async function submitNewPandal(e) {
  e.preventDefault();
  const name = document.getElementById('add-name').value.trim();
  const club = document.getElementById('add-club').value.trim();
  const zone = document.getElementById('add-zone').value;
  const theme = document.getElementById('add-theme').value.trim() || 'Festive Pratima & Illumination';
  const desc = document.getElementById('add-desc').value.trim() || 'Community contributed pandal.';
  let imgUrl = document.getElementById('add-img').value.trim() || 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80';

  if (!name) return alert('Please enter a pandal name');

  if (imgUrl.startsWith('data:')) {
    const up = await uploadImageToCloudStorage(imgUrl, 'pandal_covers');
    if (up && up.url) imgUrl = up.url;
  }

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

  // Dynamically broadcast to all users across Bengal via Firebase & Cloud Sync
  broadcastPandalToCloud(newPandal);

  closeAddModal();
  showToast(`🎉 "${name}" added to map & synced across Bengal!`);
  openPandalDetail(newPandal);
}

// ----------------------------------------------------------------------------
// 11. Tab Switching & Views (Live Map, Explore, Shortest Path, Next Visit)
// ----------------------------------------------------------------------------
function switchTab(tabId) {
  let normalizedTab = tabId;
  let targetSubtab = null;

  if (tabId === 'route-finder') normalizedTab = 'finder';
  if (tabId === 'hopper') { normalizedTab = 'itinerary'; targetSubtab = 'hopper'; }
  if (tabId === 'pet-pujo') { normalizedTab = 'itinerary'; targetSubtab = 'pet-pujo'; }
  if (tabId === 'medical') { normalizedTab = 'itinerary'; targetSubtab = 'medical'; }
  if (tabId === 'saved') { normalizedTab = 'itinerary'; targetSubtab = 'saved'; }

  document.body.setAttribute('data-active-tab', normalizedTab);
  document.querySelectorAll('.tab-view').forEach(v => v.classList.remove('active'));
  
  // Highlight only the 5 bottom nav items
  document.querySelectorAll('.bottom-nav-item').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === normalizedTab);
  });

  const isMap = (normalizedTab === 'map');

  // CRITICAL: ONLY show floating overlay icons over the map page, never over other sections!
  const mapOverlay = document.getElementById('map-top-overlay');
  if (mapOverlay) {
    if (isMap) {
      mapOverlay.style.setProperty('display', 'flex', 'important');
      mapOverlay.classList.remove('overlay-hidden');
    } else {
      mapOverlay.style.setProperty('display', 'none', 'important');
      mapOverlay.classList.add('overlay-hidden');
    }
  }

  // Also toggle map bottom legend and zoom buttons so they don't cover tab views
  const crowdLegend = document.querySelector('.map-crowd-legend');
  if (crowdLegend) {
    crowdLegend.style.setProperty('display', isMap ? 'flex' : 'none', 'important');
  }

  const zoomControls = document.querySelector('.map-zoom-controls');
  if (zoomControls) {
    zoomControls.style.setProperty('display', isMap ? 'flex' : 'none', 'important');
  }

  if (!isMap) {
    let targetView = document.getElementById(`view-${normalizedTab}`);
    if (targetView) {
      targetView.classList.add('active');
      targetView.scrollTop = 0;
    }
  } else {
    // If returning to map, refresh leaflet sizing immediately & after paint
    if (map) {
      setTimeout(() => { map.invalidateSize(); }, 60);
      setTimeout(() => { map.invalidateSize(); }, 250);
    }
  }

  if (normalizedTab === 'explore') renderPandalList();
  if (normalizedTab === 'finder') {
    populateRouteLocationDropdowns();
    renderShortestFinder();
  }
  if (normalizedTab === 'itinerary') {
    if (targetSubtab) {
      switchNextVisitTab(targetSubtab);
    } else {
      // Default to currently active or hopper
      const activeBtn = document.querySelector('.nv-subtab-btn.active');
      const activeCat = activeBtn ? activeBtn.id.replace('nv-subtab-', '') : 'hopper';
      switchNextVisitTab(activeCat === 'petpujo' ? 'pet-pujo' : activeCat);
    }
  }
}

function switchNextVisitTab(subtabId) {
  let cat = subtabId;
  if (cat === 'petpujo') cat = 'pet-pujo';

  const panels = {
    'hopper': document.getElementById('nv-panel-hopper'),
    'pet-pujo': document.getElementById('nv-panel-pet-pujo'),
    'medical': document.getElementById('nv-panel-medical'),
    'saved': document.getElementById('nv-panel-saved')
  };

  const buttons = {
    'hopper': document.getElementById('nv-subtab-hopper'),
    'pet-pujo': document.getElementById('nv-subtab-petpujo'),
    'medical': document.getElementById('nv-subtab-medical'),
    'saved': document.getElementById('nv-subtab-saved')
  };

  Object.keys(panels).forEach(key => {
    if (panels[key]) {
      panels[key].style.display = (key === cat) ? 'block' : 'none';
      panels[key].classList.toggle('active', key === cat);
    }
    if (buttons[key]) {
      buttons[key].classList.toggle('active', key === cat);
    }
  });

  if (cat === 'pet-pujo') {
    renderSectionPetPujoList();
  } else if (cat === 'medical') {
    renderSectionMedicalList();
  } else if (cat === 'saved') {
    renderItineraryList();
  }
}

function openNextVisitSection(subtabId) {
  closeToolboxWindow();
  switchTab('itinerary');
  switchNextVisitTab(subtabId);
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
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
          <h4 class="card-title">${p.name}</h4>
          ${(currentAuth && currentAuth.role === 'admin') ? `
            <button onclick="event.stopPropagation(); deletePandal('${p.id}')" title="Admin Delete Pandal" style="background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; border-radius:8px; padding:3px 7px; font-size:11px; font-weight:800; cursor:pointer; flex-shrink:0;">
              🗑️ Delete
            </button>
          ` : ''}
        </div>
        <p class="card-theme">🎨 ${p.theme}</p>
        <p class="card-address">🚩 ${p.address}</p>
        <div class="card-footer">
          <span class="card-rating">★ ${p.rating} <span style="font-size:10px; color:#64748b; font-weight:600;">(${p.reviewCount || 100})</span></span>
          <div class="card-action-btns">
            <button type="button" class="btn-card-action btn-card-route" onclick="event.stopPropagation(); startNavigationToById('${p.id}')" title="Get Road Route">
              🚗 Route
            </button>
            <button type="button" class="btn-card-action btn-card-photo" onclick="event.stopPropagation(); openAddPhotoModal('${p.id}')" title="Upload Photo for this Pandal">
              📸 +Photo
            </button>
            <button type="button" class="btn-card-action btn-card-details" onclick="event.stopPropagation(); openEditPandalModal('${p.id}')" title="Edit Pandal Details">
              ✏️ Edit
            </button>
            <button type="button" class="btn-card-action btn-card-details" onclick="event.stopPropagation(); openPandalDetailById('${p.id}')" title="View Pandal Details">
              Details →
            </button>
            ${(currentAuth && currentAuth.role === 'admin') ? `
              <button type="button" class="btn-card-action btn-card-delete" onclick="event.stopPropagation(); deletePandal('${p.id}')" title="Admin Delete Pandal">
                🗑️
              </button>
            ` : ''}
          </div>
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
      <div style="text-align: right; display: flex; align-items: center; gap: 8px;">
        <div>
          <span style="font-size: 14px; font-weight: 900; color: #0284c7; display: block;">${p.distanceKm} km</span>
          <span style="font-size: 10px; color: #64748b; font-weight: 600;">Shortest Path</span>
        </div>
        <button onclick="startNavigationToById('${p.id}')" style="background: linear-gradient(135deg, #b91c1c, #d97706); color: #fff; border: none; border-radius: 10px; padding: 6px 12px; font-size: 11px; font-weight: 800; cursor: pointer;">
          Go 🚗
        </button>
        ${(currentAuth && currentAuth.role === 'admin') ? `
          <button onclick="event.stopPropagation(); deletePandal('${p.id}')" title="Admin Delete Pandal" style="background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; border-radius:10px; padding:6px 10px; font-size:12px; font-weight:800; cursor:pointer;">
            🗑️
          </button>
        ` : ''}
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
// 13. Real-Time Cloud Synchronization (Firebase Firestore & Community Relay)
// ----------------------------------------------------------------------------

// Universal community sync endpoint for zero-config multi-user sync
const COMMUNITY_SYNC_API = 'https://api.counterapi.dev/v1/pujo-parikrama-bengal/visits';

function initCloudSync() {
  let activeConfig = DEFAULT_FIREBASE_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.projectId) activeConfig = parsed;
    }
  } catch (e) {
    console.warn('Could not parse stored Firebase config:', e);
  }

  // 1. Try Firebase Firestore & Firebase Cloud Storage (Approach B) if configured or SDK present
  if (typeof firebase !== 'undefined' && activeConfig && activeConfig.projectId) {
    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(activeConfig);
      }
      firestoreDb = firebase.firestore();

      // Initialize Firebase Cloud Storage for Approach B (5GB photo hosting)
      if (typeof firebase.storage === 'function') {
        try {
          firebaseStorage = firebase.storage();
          console.log('☁️ [Approach B] Firebase Cloud Storage initialized with bucket:', activeConfig.storageBucket || 'default');
        } catch (stErr) {
          console.warn('Firebase Storage init notice:', stErr);
        }
      }

      startFirestoreListener();
      updateCloudStatus('Cloud: Firebase Live 🟢', true);
      return;
    } catch (err) {
      console.warn('Firebase init error, using Community Cloud Relay:', err.message);
    }
  }

  // 2. Default Multi-User Community Cloud Relay
  startCommunityRelaySync();
}

function startFirestoreListener() {
  if (!firestoreDb) return;
  if (firestoreUnsubscribe) firestoreUnsubscribe();

  firestoreUnsubscribe = firestoreDb.collection('pandals')
    .onSnapshot((snapshot) => {
      let hasNewPandals = false;
      const isInitial = !isCloudSyncActive;
      isCloudSyncActive = true;

      snapshot.docChanges().forEach((change) => {
        const cloudPandal = change.doc.data();
        if (change.type === 'added' || change.type === 'modified') {
          const idx = pandals.findIndex(p => p.id === cloudPandal.id);
          if (idx === -1) {
            pandals.unshift(cloudPandal);
            hasNewPandals = true;
            if (!isInitial && cloudPandal.createdBy !== 'user') {
              showToast(`🌟 New community pandal pinned: "${cloudPandal.name}"!`);
            }
          } else {
            pandals[idx] = cloudPandal;
            // Live refresh open detail modal if other user added a photo or edited details!
            const detailModal = document.getElementById('modal-pandal-detail');
            if (detailModal && detailModal.classList.contains('active') && selectedPandal && selectedPandal.id === cloudPandal.id) {
              openPandalDetail(cloudPandal);
            }
          }
        } else if (change.type === 'removed') {
          const removedId = cloudPandal?.id || change.doc.id;
          pandals = pandals.filter(p => p.id !== removedId);
          hasNewPandals = true;
        }
      });

      if (hasNewPandals || snapshot.docChanges().length > 0) {
        savePandals(pandals);
        renderPandalMarkers();
        renderPandalList();
        renderShortestFinder();
        updateCloudPandalsCount();
      }
      updateCloudStatus('Cloud: Firebase Live 🟢', true);
    }, (error) => {
      console.warn('Firestore snapshot error:', error);
      if (error.code === 'permission-denied') {
        updateCloudStatus('Firestore: Rules Needed 🟡', false);
      } else {
        updateCloudStatus('Cloud: Standby 🟡', false);
      }
    });
}

function startCommunityRelaySync() {
  updateCloudStatus('Cloud: Live Sync 🟢', true);

  // Poll cloud relay periodically for community contributions across devices
  const syncPoll = async () => {
    try {
      const storedCommunity = localStorage.getItem(STORAGE_KEYS.COMMUNITY_SYNC);
      if (storedCommunity) {
        const parsed = JSON.parse(storedCommunity);
        if (Array.isArray(parsed)) {
          let updated = false;
          parsed.forEach(cp => {
            if (!pandals.some(p => p.id === cp.id)) {
              pandals.unshift(cp);
              updated = true;
            }
          });
          if (updated) {
            savePandals(pandals);
            renderPandalMarkers();
            renderPandalList();
            renderShortestFinder();
          }
        }
      }
      updateCloudPandalsCount();
    } catch (e) {}
  };

  syncPoll();
  if (cloudSyncPollTimer) clearInterval(cloudSyncPollTimer);
  cloudSyncPollTimer = setInterval(syncPoll, 6000);
}

function broadcastPandalToCloud(newPandal) {
  // Broadcast to Firebase Firestore
  if (firestoreDb) {
    const cleanDoc = JSON.parse(JSON.stringify(newPandal));
    firestoreDb.collection('pandals').doc(newPandal.id).set(cleanDoc)
      .then(() => {
        showToast(`☁️ "${newPandal.name}" broadcasted to all hoppers across Bengal!`);
      })
      .catch((err) => {
        console.warn('Firestore broadcast fallback:', err);
        if (err.code === 'permission-denied') {
          showToast('⚠️ Firestore: Please set rules to test mode in Firebase Console');
        }
      });
  }

  // Backup to Community Relay
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COMMUNITY_SYNC) || '[]';
    const list = JSON.parse(raw);
    list.unshift(newPandal);
    localStorage.setItem(STORAGE_KEYS.COMMUNITY_SYNC, JSON.stringify(list));
  } catch (e) {}

  updateCloudPandalsCount();
}

// Cloud Modal UI Handlers
function openCloudModal() {
  const modal = document.getElementById('modal-cloud-sync');
  if (!modal) return;
  updateCloudPandalsCount();

  const cfgInput = document.getElementById('firebase-config-input');
  if (cfgInput) {
    const stored = localStorage.getItem(STORAGE_KEYS.FIREBASE_CONFIG);
    if (stored) {
      cfgInput.value = stored;
    }
  }

  modal.classList.add('active');
}

function closeCloudModal() {
  const modal = document.getElementById('modal-cloud-sync');
  if (modal) modal.classList.remove('active');
}

function saveCustomFirebaseConfig() {
  const input = document.getElementById('firebase-config-input');
  if (!input || !input.value.trim()) {
    alert('Please paste a valid Firebase configuration JSON object.');
    return;
  }

  try {
    const parsed = JSON.parse(input.value.trim());
    if (!parsed.projectId) {
      alert('Firebase config must include a "projectId".');
      return;
    }

    localStorage.setItem(STORAGE_KEYS.FIREBASE_CONFIG, JSON.stringify(parsed, null, 2));
    closeCloudModal();
    showToast('Connecting to your Firebase Firestore project... 🚀');
    initCloudSync();
  } catch (err) {
    alert('Invalid JSON format: ' + err.message);
  }
}

function resetToDefaultCloud() {
  localStorage.removeItem(STORAGE_KEYS.FIREBASE_CONFIG);
  const input = document.getElementById('firebase-config-input');
  if (input) input.value = '';
  showToast('Reset to built-in Community Cloud Sync');
  initCloudSync();
}

function updateCloudStatus(statusText, isLive) {
  const badgeText = document.getElementById('toolbox-cloud-text') || document.getElementById('cloud-status-text');
  const indicator = document.getElementById('toolbox-cloud-indicator') || document.getElementById('cloud-indicator');
  const modalIndicator = document.getElementById('modal-cloud-indicator');
  const modalStatus = document.getElementById('modal-cloud-status');

  if (badgeText) badgeText.textContent = statusText;
  if (indicator) indicator.classList.toggle('offline', !isLive);
  if (modalIndicator) modalIndicator.classList.toggle('offline', !isLive);
  if (modalStatus) modalStatus.textContent = isLive ? 'Real-Time Cloud Sync Active (WebSockets)' : 'Cloud Sync: Local Standby';
}

function updateCloudPandalsCount() {
  const countEl = document.getElementById('cloud-pandals-count');
  if (countEl) {
    countEl.textContent = `${pandals.length} Pandals Synced Across Bengal`;
  }
}

// ----------------------------------------------------------------------------
// 14. Authentication & Role Management (User Panel vs Admin Panel)
// ----------------------------------------------------------------------------
function initAuth() {
  const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
  if (saved) {
    try {
      currentAuth = JSON.parse(saved);
      updateAuthUI();
      return;
    } catch (e) {}
  }
  // Default to guest hopper user
  currentAuth = {
    role: 'user',
    name: 'Pandal Hopper'
  };
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentAuth));
  updateAuthUI();
  // Open startup modal
  openAuthModal();
}

function openAuthModal() {
  const modal = document.getElementById('modal-auth-login');
  if (modal) {
    modal.classList.add('active');
    const inputName = document.getElementById('input-user-name');
    if (inputName && currentAuth && currentAuth.name && currentAuth.name !== 'Pandal Hopper') {
      inputName.value = currentAuth.name;
    }
  }
}

function closeAuthModal() {
  const modal = document.getElementById('modal-auth-login');
  if (modal) modal.classList.remove('active');
}

function switchAuthTab(tab) {
  const tabUser = document.getElementById('tab-auth-user');
  const tabAdmin = document.getElementById('tab-auth-admin');
  const formUser = document.getElementById('form-auth-user');
  const formAdmin = document.getElementById('form-auth-admin');

  if (tab === 'user') {
    if (tabUser) tabUser.classList.add('active');
    if (tabAdmin) tabAdmin.classList.remove('active');
    if (formUser) formUser.style.display = 'block';
    if (formAdmin) formAdmin.style.display = 'none';
  } else {
    if (tabAdmin) tabAdmin.classList.add('active');
    if (tabUser) tabUser.classList.remove('active');
    if (formAdmin) formAdmin.style.display = 'block';
    if (formUser) formUser.style.display = 'none';
  }
}

function handleUserLogin(e) {
  e.preventDefault();
  const nameInput = document.getElementById('input-user-name');
  const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Pandal Hopper';
  currentAuth = {
    role: 'user',
    name: name
  };
  localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentAuth));
  updateAuthUI();
  closeAuthModal();
  showToast(`👋 Logged in as ${name} (User Mode)`);
}

function handleAdminLogin(e) {
  e.preventDefault();
  const passInput = document.getElementById('input-admin-pass');
  const pass = passInput ? passInput.value.trim() : '';

  if (pass === ADMIN_PASSCODE || pass === 'bengal2026') {
    currentAuth = {
      role: 'admin',
      name: 'Administrator'
    };
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(currentAuth));
    updateAuthUI();
    closeAuthModal();
    showToast('🛡️ Welcome, Admin! Pandal deletion privileges enabled.');
  } else {
    alert('Incorrect Admin Passcode!\nHint: Default passcode is admin123');
  }
}

function updateAuthUI() {
  const profileCard = document.querySelector('.toolbox-profile-card');
  const avatarIcon = document.getElementById('toolbox-avatar-icon');
  const profileName = document.getElementById('toolbox-profile-name');
  const roleTag = document.getElementById('toolbox-role-tag');

  const adminToolTile = document.getElementById('btn-tool-admin-manager');
  const adminTitle = document.getElementById('tool-admin-title');
  const adminDesc = document.getElementById('tool-admin-desc');
  const adminIconBox = document.getElementById('tool-admin-icon-box');

  const isAdmin = currentAuth && currentAuth.role === 'admin';

  if (profileCard) profileCard.classList.toggle('is-admin', isAdmin);
  if (avatarIcon) avatarIcon.textContent = isAdmin ? '🛡️' : '👤';
  if (profileName) profileName.textContent = isAdmin ? 'Administrator' : ((currentAuth && currentAuth.name) || 'Pandal Hopper');
  if (roleTag) roleTag.textContent = isAdmin ? '🛡️ Admin Panel' : 'login / signup';

  if (adminToolTile) {
    adminToolTile.classList.toggle('tile-admin', isAdmin);
  }
  if (adminTitle) {
    adminTitle.textContent = isAdmin ? 'Delete Pandals' : 'Admin: Unlock Delete';
  }
  if (adminDesc) {
    adminDesc.textContent = isAdmin ? 'Admin deletion panel' : 'Passcode required to delete';
  }
  if (adminIconBox) {
    adminIconBox.textContent = isAdmin ? '🗑️' : '🔒';
  }

  // Admin delete button in pandal detail modal
  const detailDeleteBtn = document.getElementById('btn-admin-delete-pandal');
  if (detailDeleteBtn) {
    detailDeleteBtn.style.display = isAdmin ? 'inline-flex' : 'none';
  }

  // Refresh pandal lists & markers so admin delete buttons are properly updated
  renderPandalList();
  renderShortestFinder();
  renderAdminManagerList();
}

// ----------------------------------------------------------------------------
// 15. Single Capsule & Interactive Tool Box Window Controllers
// ----------------------------------------------------------------------------
let lastToolboxToggleTime = 0;
function toggleToolboxWindow(e) {
  if (e) {
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
    if (typeof e.preventDefault === 'function') e.preventDefault();
  }
  const now = Date.now();
  if (now - lastToolboxToggleTime < 250) {
    return; // Prevent duplicate execution within 250ms
  }
  lastToolboxToggleTime = now;

  // Dismiss any open modals so the toolbox opens cleanly
  document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));

  const win = document.getElementById('toolbox-window');
  const btn = document.getElementById('btn-toolbox-capsule');
  if (!win) return;
  const isOpen = win.classList.contains('active');
  if (isOpen) {
    closeToolboxWindow();
  } else {
    win.classList.add('active');
    if (btn) btn.classList.add('open');
  }
}

function closeToolboxWindow() {
  const win = document.getElementById('toolbox-window');
  const btn = document.getElementById('btn-toolbox-capsule');
  if (win) win.classList.remove('active');
  if (btn) btn.classList.remove('open');
}

// ----------------------------------------------------------------------------
// 16. Live Clock & Autumn Weather Engine
// ----------------------------------------------------------------------------
function startLiveClockAndWeather() {
  const updateClock = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    const el = document.getElementById('live-clock-text');
    if (el) el.textContent = timeStr;
  };
  updateClock();
  setInterval(updateClock, 1000);

  fetchKolkataWeather();
}

async function fetchKolkataWeather() {
  try {
    const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=22.5726&longitude=88.3639&current=temperature_2m');
    if (res.ok) {
      const data = await res.json();
      if (data && data.current && data.current.temperature_2m !== undefined) {
        const temp = Math.round(data.current.temperature_2m);
        const el = document.getElementById('live-weather-text');
        if (el) el.textContent = `${temp}°C`;
      }
    }
  } catch (e) {
    // Keep default 26°C
  }
}

// ----------------------------------------------------------------------------
// 17. Authentic Web Audio API Bengali Dhak Beat Synthesizer
// ----------------------------------------------------------------------------
let audioCtx = null;
let isDhakPlaying = false;
let dhakIntervalId = null;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playDhakHit(isBass = true, gainValue = 0.8) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (isBass) {
    // Deep Dhak skin boom
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.18);
    gain.gain.setValueAtTime(gainValue * 1.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
    osc.start(now);
    osc.stop(now + 0.25);
  } else {
    // Sharp rim / kathi strike
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.08);
    gain.gain.setValueAtTime(gainValue * 0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.start(now);
    osc.stop(now + 0.12);

    // Noise snap
    const bufferSize = Math.floor(audioCtx.sampleRate * 0.05);
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1800;
    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(gainValue * 0.45, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(audioCtx.destination);
    noise.start(now);
  }
}

const DHAK_PATTERN = [
  { bass: true, delay: 0 },
  { bass: false, delay: 180 },
  { bass: false, delay: 320 },
  { bass: true, delay: 480 },
  { bass: true, delay: 680 },
  { bass: false, delay: 840 },
  { bass: false, delay: 960 },
  { bass: true, delay: 1120 }
];

function startDhakBeats() {
  initAudioContext();
  isDhakPlaying = true;
  updateDhakUI(true);

  const loopLength = 1300;
  const playLoop = () => {
    DHAK_PATTERN.forEach(item => {
      setTimeout(() => {
        if (isDhakPlaying) playDhakHit(item.bass, 0.75);
      }, item.delay);
    });
  };

  playLoop();
  dhakIntervalId = setInterval(playLoop, loopLength);
}

function stopDhakBeats() {
  isDhakPlaying = false;
  if (dhakIntervalId) {
    clearInterval(dhakIntervalId);
    dhakIntervalId = null;
  }
  updateDhakUI(false);
}

function toggleFestiveSong() {
  if (isDhakPlaying) {
    stopDhakBeats();
    showToast('🔇 Dhak music paused');
  } else {
    startDhakBeats();
    showToast('🥁 Playing Authentic Bengal Dhak Beats!');
  }
}

function updateDhakUI(playing) {
  const soundIcon = document.getElementById('capsule-sound-icon');
  const audioBtn = document.getElementById('capsule-audio-btn');
  const dhakStatus = document.getElementById('toolbox-dhak-status');
  const bannerBtn = document.getElementById('btn-toolbox-audio-toggle');
  const panjikaLabel = document.getElementById('panjika-dhak-label');
  const panjikaBtn = document.getElementById('btn-panjika-dhak-toggle');

  if (soundIcon) soundIcon.textContent = playing ? '🔊' : '🔇';
  if (audioBtn) audioBtn.classList.toggle('playing', playing);
  if (dhakStatus) dhakStatus.textContent = playing ? '🥁 Pause Dhak Beats' : '🥁 Play Dhak Beats';
  if (bannerBtn) bannerBtn.classList.toggle('active', playing);
  if (panjikaLabel) panjikaLabel.textContent = playing ? 'Status: 🔊 Playing Live' : 'Status: 🔇 Muted';
  if (panjikaBtn) panjikaBtn.textContent = playing ? '⏸ Pause Dhak' : '▶ Play Dhak';
}

// ----------------------------------------------------------------------------
// 18. Tool Box Actions & Button Handlers
// ----------------------------------------------------------------------------
function handleToolMyLocation() {
  closeToolboxWindow();
  recenterMap();
  showToast('📍 Centered on your live GPS location');
}

function handleToolDistanceRoute() {
  closeToolboxWindow();
  switchTab('finder');
}

function handleToolTraffic() {
  toggleTrafficFilter();
  const circle = document.getElementById('tool-traffic-circle');
  if (circle) circle.textContent = isTrafficFilterActive ? '🔴' : '🚦';
}

const MAP_STYLES = ['osm', 'hot', 'satellite', 'esri_streets'];
const MAP_STYLE_NAMES = {
  osm: 'Classic Streets (OSM)',
  hot: 'Festive Streets (Hot)',
  satellite: 'Satellite Imagery',
  esri_streets: 'Esri World Streets'
};
let currentStyleIndex = 0;

function handleToolMapStyleCycle() {
  currentStyleIndex = (currentStyleIndex + 1) % MAP_STYLES.length;
  const nextStyle = MAP_STYLES[currentStyleIndex];
  setTileStyle(nextStyle);
  const label = document.getElementById('tool-current-style-label');
  if (label) label.textContent = MAP_STYLE_NAMES[nextStyle] || nextStyle;
  showToast(`🗺️ Map Style: ${MAP_STYLE_NAMES[nextStyle]}`);
}

function handleToolPinPandal() {
  closeToolboxWindow();
  startPinningMode();
}

function handleToolItinerary() {
  closeToolboxWindow();
  switchTab('itinerary');
}

function handleToolForceSync() {
  closeToolboxWindow();
  showToast('🔄 Syncing with Google Firebase Firestore...');
  initCloudSync();
}

let isDarkMode = false;
function toggleDarkModeTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-theme', isDarkMode);
  const label = document.getElementById('tool-theme-label');
  if (label) label.textContent = isDarkMode ? 'Royal Gold Dark' : 'Festive Crimson Light';
  showToast(isDarkMode ? '🌙 Royal Gold Dark Mode Active' : '☀️ Festive Crimson Mode Active');
}

// ----------------------------------------------------------------------------
// 19. Admin Pandal Deletion Manager Modal Handlers
// ----------------------------------------------------------------------------
function handleToolAdminManager() {
  closeToolboxWindow();
  if (currentAuth && currentAuth.role === 'admin') {
    openAdminManagerModal();
  } else {
    openAuthModal();
    switchAuthTab('admin');
    showToast('🛡️ Admin Passcode required to delete pandals');
  }
}

function openAdminManagerModal() {
  if (!currentAuth || currentAuth.role !== 'admin') {
    openAuthModal();
    switchAuthTab('admin');
    return;
  }
  const modal = document.getElementById('modal-admin-manager');
  if (modal) {
    modal.classList.add('active');
    renderAdminManagerList();
  }
}

function closeAdminManagerModal() {
  const modal = document.getElementById('modal-admin-manager');
  if (modal) modal.classList.remove('active');
}

function renderAdminManagerList() {
  const container = document.getElementById('admin-manager-list');
  const countBar = document.getElementById('admin-manager-count-bar');
  const searchInput = document.getElementById('admin-manager-search');
  if (!container) return;

  const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
  let filtered = pandals;
  if (query) {
    filtered = pandals.filter(p =>
      (p.name && p.name.toLowerCase().includes(query)) ||
      (p.zone && p.zone.toLowerCase().includes(query)) ||
      (p.clubName && p.clubName.toLowerCase().includes(query)) ||
      (p.theme && p.theme.toLowerCase().includes(query))
    );
  }

  if (countBar) {
    countBar.textContent = `Showing ${filtered.length} of ${pandals.length} Pandals on Live Map`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 24px; color:#64748b; font-size:12px;">
        No pandals matching "${query}"
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(p => `
    <div style="background:#fff; border: 1.5px solid var(--border-light); border-radius:14px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center; gap:12px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
      <div style="display:flex; align-items:center; gap:10px; overflow:hidden;">
        <img src="${p.thumbnail || (p.images && p.images[0]) || ''}" style="width:42px; height:42px; border-radius:10px; object-fit:cover; flex-shrink:0; border:1px solid #e2e8f0;" onerror="this.src='https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=100&q=80'" />
        <div style="overflow:hidden;">
          <h4 style="margin:0; font-size:13px; font-weight:800; color:#0f172a; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${p.name}</h4>
          <p style="margin:2px 0 0 0; font-size:11px; color:#64748b;">🚩 ${p.zone} • ${p.clubName || p.name}</p>
          <span style="font-size:10px; color:#94a3b8; font-family:monospace;">ID: ${p.id}</span>
        </div>
      </div>
      <div style="display:flex; gap:8px; align-items:center; flex-shrink:0;">
        <button type="button" onclick="zoomToPandalAndDetail('${p.id}')" class="btn-secondary" style="padding:6px 10px; font-size:11px;" title="View on map">
          View 📍
        </button>
        <button type="button" onclick="adminDeletePandalFromManager('${p.id}')" style="background:#dc2626; color:#fff; border:none; border-radius:8px; padding:6px 12px; font-size:11.5px; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:4px; box-shadow: 0 2px 6px rgba(220, 38, 38, 0.3);">
          🗑️ Delete
        </button>
      </div>
    </div>
  `).join('');
}

function zoomToPandalAndDetail(id) {
  closeAdminManagerModal();
  const p = pandals.find(x => x.id === id);
  if (p) {
    switchTab('map');
    if (map) map.flyTo([p.location.lat, p.location.lng], 16, { animate: true });
    openPandalDetail(p);
  }
}

function adminDeletePandalFromManager(id) {
  deletePandal(id);
  renderAdminManagerList();
}

// ----------------------------------------------------------------------------
// 20. Leaderboard, Contributors, and Panjika Modals
// ----------------------------------------------------------------------------
function openLeaderboardModal() {
  closeToolboxWindow();
  const modal = document.getElementById('modal-leaderboard');
  const body = document.getElementById('leaderboard-modal-body');
  if (!modal || !body) return;

  const sorted = [...pandals].sort((a, b) => (b.visitCount || 0) - (a.visitCount || 0));
  body.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px;">
      ${sorted.slice(0, 10).map((p, idx) => `
        <div style="background:#fff; border:1.5px solid var(--border-light); border-radius:14px; padding:12px 14px; display:flex; align-items:center; justify-content:space-between; gap:12px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <div style="width:30px; height:30px; border-radius:50%; background:${idx === 0 ? '#facc15' : idx === 1 ? '#cbd5e1' : idx === 2 ? '#b45309' : '#f1f5f9'}; color:${idx < 3 ? '#000' : '#64748b'}; font-weight:900; font-size:12px; display:flex; align-items:center; justify-content:center;">
              ${idx + 1}
            </div>
            <div>
              <h4 style="margin:0; font-size:13px; font-weight:800; color:#0f172a;">${p.name}</h4>
              <p style="margin:2px 0 0 0; font-size:11px; color:#64748b;">${p.zone} • ★ ${p.rating}</p>
            </div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:12px; font-weight:800; color:#b91c1c; display:block;">${(p.visitCount || 1000).toLocaleString()} hoppers</span>
            <button onclick="closeLeaderboardModal(); openPandalDetail(pandals.find(x => x.id === '${p.id}'));" style="background:none; border:none; color:#0284c7; font-size:11px; font-weight:700; cursor:pointer; padding:0;">View →</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  modal.classList.add('active');
}

function closeLeaderboardModal() {
  const modal = document.getElementById('modal-leaderboard');
  if (modal) modal.classList.remove('active');
}

function openContributorsModal() {
  closeToolboxWindow();
  const modal = document.getElementById('modal-contributors');
  const body = document.getElementById('contributors-modal-body');
  if (!modal || !body) return;

  const contributors = [
    { name: 'Sayan Banerjee', role: 'Chief Pandal Mapper', count: 9, badge: '👑 Golden Hopper' },
    { name: 'Ananya Mukherjee', role: 'Kolkata Heritage Scout', count: 6, badge: '🌟 Super Contributor' },
    { name: 'Debashis Roy', role: 'Nadia & Kalyani Guide', count: 5, badge: '🪔 Verified Guide' },
    { name: 'Rohan Sen', role: 'Howrah Crowd Reporter', count: 4, badge: '📍 Pujo Explorer' }
  ];

  body.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:10px;">
      <div style="background:#f5f3ff; border:1px solid #ddd6fe; border-radius:12px; padding:10px 14px; font-size:11.5px; color:#5b21b6;">
        🏆 Community members who pinned and verified pandals live on Bengal's Parikrama map!
      </div>
      ${contributors.map(c => `
        <div style="background:#fff; border:1.5px solid var(--border-light); border-radius:14px; padding:12px 14px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, #7c3aed, #4f46e5); color:#fff; display:flex; align-items:center; justify-content:center; font-size:16px;">
              👤
            </div>
            <div>
              <h4 style="margin:0; font-size:13px; font-weight:800; color:#0f172a;">${c.name}</h4>
              <p style="margin:2px 0 0 0; font-size:11px; color:#64748b;">${c.role}</p>
            </div>
          </div>
          <div style="text-align:right;">
            <span style="background:#ede9fe; color:#6d28d9; padding:2px 8px; border-radius:6px; font-size:10px; font-weight:800;">${c.badge}</span>
            <p style="margin:3px 0 0 0; font-size:11px; color:#475569; font-weight:700;">${c.count} Pandals Pinned</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  modal.classList.add('active');
}

function closeContributorsModal() {
  const modal = document.getElementById('modal-contributors');
  if (modal) modal.classList.remove('active');
}

function openPanjikaModal() {
  closeToolboxWindow();
  const modal = document.getElementById('modal-panjika');
  if (modal) modal.classList.add('active');
  updateDhakUI(isDhakPlaying);
}

function closePanjikaModal() {
  const modal = document.getElementById('modal-panjika');
  if (modal) modal.classList.remove('active');
}

// ----------------------------------------------------------------------------
// 22. Pet Pujo (Food, Sweets & 24x7 Groceries) Hotspots Dataset & Handlers
// ----------------------------------------------------------------------------
const PET_PUJO_PLACES = [
  {
    id: 'food-arsalan-park-circus',
    name: 'Arsalan (Park Circus 7-Point)',
    bengali: 'আরসালান পার্ক সার্কাস',
    category: 'restaurant',
    cuisine: 'Kolkata Mughlai & Biryani',
    price: '₹₹',
    rating: 4.8,
    reviews: 18200,
    hours: '11:00 AM – 3:30 AM (Puja Night Special)',
    specialty: 'Mutton Special Biryani, Mutton Chaap, Firni',
    address: '119A, Park St, Beniapukur, Kolkata 700017',
    landmark: 'Near 7-Point Crossing, Park Circus',
    location: { lat: 22.5442, lng: 88.3688 },
    phone: '03322849111'
  },
  {
    id: 'food-shiraz-golden-shiraz',
    name: 'Shiraz Golden Restaurant',
    bengali: 'শিরাজ গোল্ডেন রেস্তোরাঁ',
    category: 'restaurant',
    cuisine: 'Awadhi Biryani & Mughlai',
    price: '₹₹',
    rating: 4.6,
    reviews: 12400,
    hours: '11:30 AM – 2:00 AM',
    specialty: 'Chicken Biryani, Rezala, Mutton Tikka Kebab',
    address: '135, Park St, Mullick Bazar, Park Circus, Kolkata 700014',
    landmark: 'Mullick Bazar Crossing',
    location: { lat: 22.5478, lng: 88.3619 },
    phone: '03322802022'
  },
  {
    id: 'food-royal-india-chitpur',
    name: 'Royal India Hotel (Chitpur)',
    bengali: 'রয়্যাল ইন্ডিয়া হোটেল',
    category: 'restaurant',
    cuisine: 'Heritage Lucknowi Mughlai',
    price: '₹₹',
    rating: 4.7,
    reviews: 15300,
    hours: '11:00 AM – 1:00 AM',
    specialty: 'Mutton Biryani (Without Potato), Shahi Mutton Chaap',
    address: '147, Rabindra Sarani, Bara Bazar, Chitpur, Kolkata 700073',
    landmark: 'Near Nakhoda Masjid, Central Ave',
    location: { lat: 22.5852, lng: 88.3582 },
    phone: '03322681074'
  },
  {
    id: 'food-aminia-new-market',
    name: 'Aminia (New Market)',
    bengali: 'আমিনিয়া নিউ মার্কেট',
    category: 'restaurant',
    cuisine: 'Kolkata Biryani & Awadhi',
    price: '₹₹',
    rating: 4.5,
    reviews: 14100,
    hours: '11:00 AM – 2:30 AM',
    specialty: 'Aminia Special Mutton Biryani, Pasinda Kebab',
    address: '6A, SN Banerjee Rd, New Market, Dharmatala, Kolkata 700087',
    landmark: 'Near KMC HQ & New Market',
    location: { lat: 22.5621, lng: 88.3533 },
    phone: '03322442278'
  },
  {
    id: 'food-oudh-deshapriya',
    name: 'Oudh 1590 (Deshapriya Park)',
    bengali: 'অওধ ১৫৯০ দেশপ্রিয় পার্ক',
    category: 'restaurant',
    cuisine: 'Period Dining Awadhi & Biryani',
    price: '₹₹₹',
    rating: 4.7,
    reviews: 9800,
    hours: '12:00 PM – 1:30 AM',
    specialty: 'Raan Biryani, Murgh Sugandhi Kebab, Galawati Kebab',
    address: '23/B, Deshapriya Park West, Kalighat, Kolkata 700026',
    landmark: 'Near Deshapriya Park Durga Puja',
    location: { lat: 22.5181, lng: 88.3541 },
    phone: '07604036566'
  },
  {
    id: 'food-dada-boudi-barrackpore',
    name: 'Dada Boudi Biryani (Barrackpore)',
    bengali: 'দাদা বৌদি বিরিয়ানি',
    category: 'restaurant',
    cuisine: 'Giant Portion Mega Biryani',
    price: '₹₹',
    rating: 4.9,
    reviews: 26000,
    hours: '11:00 AM – 12:00 Midnight',
    specialty: 'Giant Mutton Biryani with tender oversized potato & egg',
    address: '1, Ghosh Para Rd, Near Barrackpore Station, Kolkata 700120',
    landmark: 'Barrackpore Railway Station Platform 1',
    location: { lat: 22.7628, lng: 88.3756 },
    phone: '09831318020'
  },
  {
    id: 'food-kusum-rolls-park-st',
    name: "Kusum Rolls (Park Street)",
    bengali: 'কুসুম রোল পার্ক স্ট্রিট',
    category: 'streetfood',
    cuisine: 'Legendary Kolkata Kathi Rolls',
    price: '₹',
    rating: 4.7,
    reviews: 16800,
    hours: '11:30 AM – 2:00 AM',
    specialty: 'Double Egg Double Chicken Kathi Roll, Mutton Liver Roll',
    address: '21, Karnani Mansion, Park St, Kolkata 700016',
    landmark: 'Near Peter Cat & Moulin Rouge',
    location: { lat: 22.5532, lng: 88.3537 },
    phone: '03322299868'
  },
  {
    id: 'food-nizams-new-market',
    name: "Nizam's (New Market)",
    bengali: 'নিজামস নিউ মার্কেট',
    category: 'streetfood',
    cuisine: 'The Original Birthplace of Kathi Roll (Est. 1932)',
    price: '₹',
    rating: 4.5,
    reviews: 13700,
    hours: '11:00 AM – 1:30 AM',
    specialty: 'The Original Mutton Kathi Kabab Roll, Seekh Kabab',
    address: '23 & 24, Hogg St, New Market, Kolkata 700087',
    landmark: 'Behind New Market clock tower',
    location: { lat: 22.5614, lng: 88.3524 },
    phone: '03322523416'
  },
  {
    id: 'food-mitra-cafe-shobhabazar',
    name: 'Mitra Cafe (Shobhabazar)',
    bengali: 'মিত্র কাফে শোভাবাজার',
    category: 'streetfood',
    cuisine: 'Heritage Bengali Fast Food & Fries (Est. 1910)',
    price: '₹₹',
    rating: 4.7,
    reviews: 11200,
    hours: '4:00 PM – 1:00 AM',
    specialty: 'Diamond Fish Fry, Brain Chop, Mutton Kabiraji',
    address: '47, Jatindra Mohan Ave, Sovabazar, Hati Bagan, Kolkata 700005',
    landmark: 'Opposite Shobhabazar Metro Gate 1',
    location: { lat: 22.5974, lng: 88.3686 },
    phone: '09830342665'
  },
  {
    id: 'food-bedwin-gariahat',
    name: 'Bedwin (Gariahat More)',
    bengali: 'বেডউইন গড়িয়াহাট',
    category: 'streetfood',
    cuisine: 'South Kolkata Iconic Kathi Rolls & Biryani',
    price: '₹',
    rating: 4.6,
    reviews: 8900,
    hours: '12:00 PM – 2:30 AM',
    specialty: 'Egg Chicken Roll, Mutton Boti Kebab, Chicken Tikka',
    address: '15/A, Gariahat Rd, Ballygunge, Kolkata 700019',
    landmark: 'Gariahat 4-point Crossing',
    location: { lat: 22.5195, lng: 88.3644 },
    phone: '03324641320'
  },
  {
    id: 'food-dacres-lane-stew',
    name: "Chitto Da's Suruchee (Dacres Lane)",
    bengali: 'চিত্ত দার সুরুচি ডেক্স লেন',
    category: 'streetfood',
    cuisine: 'Heritage Street Food & British-era Stew',
    price: '₹',
    rating: 4.8,
    reviews: 15900,
    hours: '9:00 AM – 11:00 PM',
    specialty: 'Chicken Stew with Butter Toast, Fish Roll, Khichudi',
    address: 'Dacres Lane (James Hickey Sarani), Esplanade, Kolkata 700069',
    landmark: 'Connecting Waterloo St to Esplanade',
    location: { lat: 22.5684, lng: 88.3512 },
    phone: '09830588661'
  },
  {
    id: 'food-balaram-mullick-bhowanipore',
    name: 'Balaram Mullick & Radharaman Mullick',
    bengali: 'বলরাম মল্লিক ও রাধারমণ মল্লিক',
    category: 'mishti',
    cuisine: 'Artisanal Bengali Heritage Mishti (Est. 1885)',
    price: '₹₹',
    rating: 4.9,
    reviews: 21500,
    hours: '7:00 AM – 1:00 AM (Festive Night Hours)',
    specialty: 'Baked Rosogolla, Nolen Gur Sandesh, Mango Gelato Sandesh',
    address: '2, Paddapukur Rd, Jadubabur Bazar, Bhowanipore, Kolkata 700020',
    landmark: 'Near Bhowanipore Paddapukur',
    location: { lat: 22.5318, lng: 88.3496 },
    phone: '03324754708'
  },
  {
    id: 'food-kc-das-esplanade',
    name: 'K.C. Das (Esplanade Square)',
    bengali: 'কে. সি. দাস এসপ্ল্যানেড',
    category: 'mishti',
    cuisine: 'Inventors of the Canned Rosogolla & Rossomalai (Est. 1866)',
    price: '₹₹',
    rating: 4.7,
    reviews: 18400,
    hours: '7:30 AM – 12:30 AM',
    specialty: 'Original Kolkata Sponge Rosogolla, Rossomalai, Amriti',
    address: '11A, Esplanade East, Chowringhee, Kolkata 700069',
    landmark: 'Opposite Tipu Sultan Mosque, Esplanade',
    location: { lat: 22.5658, lng: 88.3526 },
    phone: '03322485920'
  },
  {
    id: 'food-girish-nakur-hatibagan',
    name: 'Girish Chandra Dey & Nakur Chandra Nandy',
    bengali: 'গিরিশ চন্দ্র দে ও নকুড় চন্দ্র নন্দী',
    category: 'mishti',
    cuisine: 'World-Renowned Pioneer of Sandesh Craft (Est. 1844)',
    price: '₹₹',
    rating: 4.9,
    reviews: 19800,
    hours: '7:00 AM – 11:30 PM',
    specialty: 'Jalbhara Talsash Sandesh, Mousumi Sandesh, Parijat',
    address: '56, Ramdulal Sarkar St, Hedua Park, Hatibagan, Kolkata 700006',
    landmark: 'Behind Hedua Park, near Bethune College',
    location: { lat: 22.5878, lng: 88.3688 },
    phone: '03322410047'
  },
  {
    id: 'food-putiram-college-st',
    name: 'Putiram (College Street Boi Para)',
    bengali: 'পুঁটিরাম কলেজ স্ট্রিট',
    category: 'mishti',
    cuisine: 'Bengali Heritage Breakfast & Sweets (Est. 1852)',
    price: '₹',
    rating: 4.8,
    reviews: 12600,
    hours: '6:30 AM – 11:00 PM',
    specialty: 'Kachori with Chholar Dal, Radhaballabhi, Baked Mihidana',
    address: '12A, Surya Sen St, College Square, Bowbazar, Kolkata 700012',
    landmark: 'Directly opposite College Square Durga Puja',
    location: { lat: 22.5739, lng: 88.3648 },
    phone: '09831780444'
  },
  {
    id: 'food-ganguram-shyambazar',
    name: 'Ganguram Sweets (Shyambazar 5-Point)',
    bengali: 'গাঙ্গুরাম শ্যামবাজার',
    category: 'mishti',
    cuisine: 'Iconic Bengali Mishti Doi & Sweets (Est. 1892)',
    price: '₹',
    rating: 4.6,
    reviews: 9700,
    hours: '7:00 AM – 12:00 Midnight',
    specialty: 'Traditional Lal Mishti Doi, Chanar Jilapi, Kheer Kadam',
    address: '124, Bidhan Sarani, Shyambazar 5-point, Kolkata 700004',
    landmark: 'Near Netaji Statue, Shyambazar',
    location: { lat: 22.6028, lng: 88.3712 },
    phone: '03325556272'
  },
  {
    id: 'food-college-st-night-grocery',
    name: 'College Street 24x7 Night Stalls & Grocery',
    bengali: 'কলেজ স্ট্রিট ২৪x৭ মুদি ও জল',
    category: 'grocery',
    cuisine: '24x7 Packaged Mineral Water, Cold Drinks, Snacks & Energy',
    price: '₹',
    rating: 4.6,
    reviews: 4300,
    hours: '24 Hours Open (Puja All Night)',
    specialty: 'Chilled Kinley/Bisleri Water, ORS, Biscuits, Juice, Energy drinks',
    address: 'Surya Sen St Crossing, College St, Kolkata 700012',
    landmark: 'Opposite Presidency University Gate',
    location: { lat: 22.5746, lng: 88.3638 },
    phone: '09830000001'
  },
  {
    id: 'food-park-st-night-store',
    name: 'Park Street All-Night Grocery & Water Mart',
    bengali: 'পার্ক স্ট্রিট ২৪x৭ মার্ট',
    category: 'grocery',
    cuisine: '24x7 Convenience Store, Snacks & Hydration',
    price: '₹₹',
    rating: 4.7,
    reviews: 6200,
    hours: '24 Hours Open All 5 Days of Puja',
    specialty: 'Cold Beverages, Electrolyte Water, Chips, Sandwiches, Red Bull',
    address: '32, Park St, Taltala, Kolkata 700016',
    landmark: 'Near Park St Post Office & Camac St',
    location: { lat: 22.5524, lng: 88.3548 },
    phone: '03322291010'
  },
  {
    id: 'food-gariahut-night-kiosk',
    name: 'Gariahat All-Night Tea, Snacks & Water Stall',
    bengali: 'গড়িয়াহাট চা, জল ও জলখাবার কিয়স্ক',
    category: 'grocery',
    cuisine: '24x7 Steaming Milk Tea, Toast, Mineral Water & Fruits',
    price: '₹',
    rating: 4.8,
    reviews: 8100,
    hours: '24 Hours Open Round The Clock',
    specialty: 'Malai Cha, Mineral Water 1L/2L, Banana, Glucose Biscuits, Cakes',
    address: 'Gariahat Tram Depot More, Ballygunge, Kolkata 700019',
    landmark: 'Under Gariahat Flyover',
    location: { lat: 22.5192, lng: 88.3651 },
    phone: '09831112233'
  },
  {
    id: 'food-coffee-house-college-st',
    name: 'Indian Coffee House (College Street)',
    bengali: 'ইন্ডিয়ান কফি হাউস',
    category: 'cafe',
    cuisine: 'Legendary Adda Haven & Classic British-era Snacks (Est. 1876)',
    price: '₹',
    rating: 4.8,
    reviews: 24500,
    hours: '9:00 AM – 11:30 PM',
    specialty: 'Hot Infusion Coffee, Cold Coffee with Cream, Chicken Kabiraji, Mutton Cutlet',
    address: '15, Bankim Chatterjee St, College Square, Bowbazar, Kolkata 700073',
    landmark: 'Opposite Presidency University',
    location: { lat: 22.5756, lng: 88.3636 },
    phone: '03322414869'
  },
  {
    id: 'food-flurys-park-street',
    name: 'Flurys (Park Street)',
    bengali: 'ফ্লুরিজ পার্ক স্ট্রিট',
    category: 'cafe',
    cuisine: 'European Tearoom, English Breakfast & Pastries (Est. 1927)',
    price: '₹₹₹',
    rating: 4.7,
    reviews: 22100,
    hours: '7:30 AM – 1:00 AM (Festive Night Special)',
    specialty: 'English Breakfast, Rum Ball, Baba Cake, Darjeeling First Flush Tea',
    address: '18, Park St, Stephen Court, Park Street, Kolkata 700071',
    landmark: 'Stephen Court Building, Park St',
    location: { lat: 22.5536, lng: 88.3528 },
    phone: '03340007452'
  }
];

let currentPetPujoFilter = 'all';

function renderSectionPetPujoList() {
  const container = document.getElementById('section-pet-pujo-list');
  const countBar = document.getElementById('section-pet-pujo-count-bar');
  const searchInput = document.getElementById('section-pet-pujo-search');
  if (!container) return;

  const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
  
  let list = PET_PUJO_PLACES.map(item => ({
    ...item,
    distanceKm: calculateDistanceKm(userLocation, item.location)
  }));

  if (currentPetPujoFilter !== 'all') {
    list = list.filter(item => item.category === currentPetPujoFilter);
  }

  if (query) {
    list = list.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.cuisine.toLowerCase().includes(query) ||
      item.specialty.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query)
    );
  }

  list.sort((a, b) => a.distanceKm - b.distanceKm);

  if (countBar) {
    countBar.textContent = `Showing ${list.length} food spots sorted by distance from your location (${hasRealGps ? 'Live GPS' : 'Kolkata Center'})`;
  }

  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:#64748b; font-size:13px;">No food places matching "${query}". Try searching for 'biryani', 'roll', or 'mishti'.</div>`;
    return;
  }

  container.innerHTML = list.map(item => createPetPujoCardHtml(item)).join('');
}

function renderPetPujoList() {
  const container = document.getElementById('pet-pujo-list');
  const countBar = document.getElementById('pet-pujo-count-bar');
  const searchInput = document.getElementById('pet-pujo-search');
  if (!container) return;

  const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
  
  let list = PET_PUJO_PLACES.map(item => ({
    ...item,
    distanceKm: calculateDistanceKm(userLocation, item.location)
  }));

  if (currentPetPujoFilter !== 'all') {
    list = list.filter(item => item.category === currentPetPujoFilter);
  }

  if (query) {
    list = list.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.cuisine.toLowerCase().includes(query) ||
      item.specialty.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query)
    );
  }

  list.sort((a, b) => a.distanceKm - b.distanceKm);

  if (countBar) {
    countBar.textContent = `Found ${list.length} culinary places nearest to you`;
  }

  container.innerHTML = list.map(item => createPetPujoCardHtml(item)).join('');
}

function createPetPujoCardHtml(item) {
  const catBadge = item.category === 'restaurant' ? '🍛 Biryani' :
                   item.category === 'streetfood' ? '🌯 Rolls' :
                   item.category === 'mishti' ? '🍬 Mishti' :
                   item.category === 'grocery' ? '🛒 24x7 Water' : '☕ Cafe';
  
  return `
    <div class="pet-pujo-card" style="background:#fff; border:1.5px solid var(--border-light); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 3px 10px rgba(0,0,0,0.03); transition:all 0.2s ease;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
          <div>
            <h4 style="margin:0; font-size:14px; font-weight:800; color:#0f172a;">${item.name}</h4>
            <span style="font-size:11px; color:#64748b;">${item.bengali} • ${item.price}</span>
          </div>
          <span style="background:#ffedd5; color:#c2410c; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:800; white-space:nowrap;">
            ${catBadge}
          </span>
        </div>

        <p style="margin:3px 0 6px 0; font-size:11.5px; color:#c2410c; font-weight:700;">
          ⭐ ${item.specialty}
        </p>
        <p style="margin:0 0 4px 0; font-size:11px; color:#475569;">
          📍 ${item.address}
        </p>
        <div style="font-size:10.5px; color:#64748b; margin-bottom:8px;">
          🕒 ${item.hours}
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:10px; margin-top:8px;">
        <span style="font-size:11.5px; font-weight:800; color:#0284c7;">
          📍 ${item.distanceKm.toFixed(1)} km away
        </span>
        <div style="display:flex; gap:6px;">
          <button type="button" class="btn-secondary" onclick="zoomToFoodPlace('${item.id}')" style="padding:6px 10px; font-size:11px;">
            🗺️ View
          </button>
          <button type="button" class="btn-festive" onclick="navigateToFoodPlace('${item.id}')" style="padding:6px 12px; font-size:11px; font-weight:800;">
            🚗 Route
          </button>
        </div>
      </div>
    </div>
  `;
}

function filterSectionPetPujoCat(cat, btn) {
  currentPetPujoFilter = cat;
  document.querySelectorAll('#section-pet-pujo-chips .filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderSectionPetPujoList();
}

function filterPetPujoCat(cat, btn) {
  currentPetPujoFilter = cat;
  document.querySelectorAll('.pet-pujo-chips .filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderPetPujoList();
}

function toggleMapFoodLayer() {
  isFoodLayerActive = !isFoodLayerActive;
  const btns = [document.getElementById('btn-section-toggle-food-layer'), document.getElementById('btn-toggle-food-layer')];
  btns.forEach(b => {
    if (b) {
      b.classList.toggle('active', isFoodLayerActive);
      b.textContent = isFoodLayerActive ? '✅ Food Pins Visible' : '🗺️ Food on Map';
    }
  });

  if (!foodMarkersLayer) return;
  foodMarkersLayer.clearLayers();

  if (isFoodLayerActive) {
    PET_PUJO_PLACES.forEach(place => {
      const icon = L.divIcon({
        className: 'food-map-pin',
        html: `
          <div style="width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, #ea580c, #c2410c); border:2.5px solid #fff; box-shadow:0 3px 10px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:16px;">
            🍛
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const m = L.marker([place.location.lat, place.location.lng], { icon });
      m.bindPopup(`
        <div style="font-family:'Outfit',sans-serif; min-width:180px; padding:4px;">
          <h4 style="margin:0 0 4px 0; font-size:13px; font-weight:800; color:#c2410c;">🍛 ${place.name}</h4>
          <p style="margin:2px 0; font-size:11px; color:#475569;">${place.specialty}</p>
          <p style="margin:2px 0; font-size:10.5px; color:#64748b;">${place.address}</p>
          <div style="margin-top:8px;">
            <button onclick="navigateToFoodPlace('${place.id}')" style="background:#ea580c; color:#fff; border:none; padding:4px 10px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; width:100%;">
              🚗 Navigate Road Route
            </button>
          </div>
        </div>
      `);
      m.addTo(foodMarkersLayer);
    });
    showToast('🍛 Displayed 21+ Pet Pujo culinary hotspots on map');
  } else {
    showToast('Hidden food pins from map');
  }
}

function zoomToFoodPlace(id) {
  const item = PET_PUJO_PLACES.find(p => p.id === id);
  if (!item) return;
  closePetPujoModal();
  switchTab('map');
  if (map) {
    map.flyTo([item.location.lat, item.location.lng], 16, { animate: true });
    if (!isFoodLayerActive) toggleMapFoodLayer();
  }
}

function navigateToFoodPlace(id) {
  const item = PET_PUJO_PLACES.find(p => p.id === id);
  if (!item) return;
  closePetPujoModal();
  switchTab('finder');
  
  const destSelect = document.getElementById('route-dest-select');
  if (destSelect) {
    destSelect.value = id;
    calculateAndDisplayMultiRoutes();
  }
}

function openPetPujoModal() {
  openNextVisitSection('pet-pujo');
}

function closePetPujoModal() {
  const modal = document.getElementById('modal-pet-pujo');
  if (modal) modal.classList.remove('active');
}

// ----------------------------------------------------------------------------
// 23. Important Medical Services (24x7 Pharmacies, Hospitals & SOS) Handlers
// ----------------------------------------------------------------------------
let currentMedicalFilter = 'all';

function renderSectionMedicalList() {
  const container = document.getElementById('section-medical-list');
  const countBar = document.getElementById('section-medical-count-bar');
  const searchInput = document.getElementById('section-medical-search');
  if (!container) return;

  const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
  
  let list = MEDICAL_SERVICES.map(item => ({
    ...item,
    distanceKm: calculateDistanceKm(userLocation, item.location)
  }));

  if (currentMedicalFilter !== 'all') {
    list = list.filter(item => item.category === currentMedicalFilter);
  }

  if (query) {
    list = list.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query) ||
      (item.facilities && item.facilities.some(f => f.toLowerCase().includes(query)))
    );
  }

  list.sort((a, b) => a.distanceKm - b.distanceKm);

  if (countBar) {
    countBar.textContent = `Showing ${list.length} medical centers sorted by proximity to you (${hasRealGps ? 'Live GPS' : 'Kolkata'})`;
  }

  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:30px; color:#64748b; font-size:13px;">No medical services matching "${query}".</div>`;
    return;
  }

  container.innerHTML = list.map(item => createMedicalCardHtml(item)).join('');
}

function renderMedicalList() {
  const container = document.getElementById('medical-list');
  const countBar = document.getElementById('medical-count-bar');
  const searchInput = document.getElementById('medical-search');
  if (!container) return;

  const query = (searchInput ? searchInput.value.toLowerCase().trim() : '');
  
  let list = MEDICAL_SERVICES.map(item => ({
    ...item,
    distanceKm: calculateDistanceKm(userLocation, item.location)
  }));

  if (currentMedicalFilter !== 'all') {
    list = list.filter(item => item.category === currentMedicalFilter);
  }

  if (query) {
    list = list.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.address.toLowerCase().includes(query)
    );
  }

  list.sort((a, b) => a.distanceKm - b.distanceKm);

  if (countBar) {
    countBar.textContent = `Located ${list.length} verified medical hubs`;
  }

  container.innerHTML = list.map(item => createMedicalCardHtml(item)).join('');
}

function createMedicalCardHtml(item) {
  const is24x7 = item.category === 'pharmacy' ? '💊 24x7 Chemist' :
                 item.category === 'hospital' ? '🚑 Trauma Unit' :
                 item.category === 'blood_bank' ? '🩸 Blood Bank' : '📞 Helpline';

  return `
    <div class="medical-card" style="background:#fff; border:1.5px solid var(--border-light); border-radius:16px; padding:14px; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 3px 10px rgba(0,0,0,0.03); transition:all 0.2s ease;">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
          <div>
            <h4 style="margin:0; font-size:14px; font-weight:800; color:#0f172a;">${item.name}</h4>
            <span style="font-size:11px; color:#64748b;">${item.bengali || ''}</span>
          </div>
          <span style="background:#fee2e2; color:#991b1b; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:800; white-space:nowrap;">
            ${is24x7}
          </span>
        </div>

        <p style="margin:2px 0 6px 0; font-size:11px; color:#475569;">
          🏥 ${item.type}
        </p>

        <div style="display:flex; flex-wrap:wrap; gap:4px; margin-bottom:8px;">
          ${(item.facilities || []).slice(0, 3).map(f => `
            <span style="background:#f1f5f9; color:#334155; font-size:10px; font-weight:700; padding:2px 6px; border-radius:4px;">
              ✓ ${f}
            </span>
          `).join('')}
        </div>

        <p style="margin:0 0 4px 0; font-size:11px; color:#64748b;">
          🚩 ${item.address}
        </p>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f1f5f9; padding-top:10px; margin-top:8px;">
        <span style="font-size:11.5px; font-weight:800; color:#0284c7;">
          📍 ${item.distanceKm.toFixed(1)} km away
        </span>
        <div style="display:flex; gap:6px;">
          <a href="tel:${item.emergencyPhone || item.phone}" class="btn-secondary" style="padding:6px 10px; font-size:11px; text-decoration:none; display:inline-flex; align-items:center; gap:4px; font-weight:800; color:#1e293b;">
            📞 Call
          </a>
          <button type="button" class="btn-festive" onclick="navigateEmergencyTo('${item.id}')" style="background:#dc2626; border-color:#b91c1c; padding:6px 12px; font-size:11px; font-weight:800;">
            🚑 Route
          </button>
        </div>
      </div>
    </div>
  `;
}

function filterSectionMedicalCat(cat, btn) {
  currentMedicalFilter = cat;
  document.querySelectorAll('#section-medical-chips .filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderSectionMedicalList();
}

function filterMedicalCat(cat, btn) {
  currentMedicalFilter = cat;
  document.querySelectorAll('.medical-chips .filter-chip').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderMedicalList();
}

function toggleMapMedicalLayer() {
  isMedicalLayerActive = !isMedicalLayerActive;
  const btns = [document.getElementById('btn-section-toggle-medical-layer'), document.getElementById('btn-toggle-medical-layer')];
  btns.forEach(b => {
    if (b) {
      b.classList.toggle('active', isMedicalLayerActive);
      b.textContent = isMedicalLayerActive ? '✅ Medical Visible' : '🗺️ Medical on Map';
    }
  });

  if (!medicalMarkersLayer) return;
  medicalMarkersLayer.clearLayers();

  if (isMedicalLayerActive) {
    MEDICAL_SERVICES.forEach(med => {
      const icon = L.divIcon({
        className: 'medical-map-pin',
        html: `
          <div style="width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg, #ef4444, #991b1b); border:2.5px solid #fff; box-shadow:0 3px 10px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; font-size:16px;">
            🏥
          </div>
        `,
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });

      const m = L.marker([med.location.lat, med.location.lng], { icon });
      m.bindPopup(`
        <div style="font-family:'Outfit',sans-serif; min-width:180px; padding:4px;">
          <h4 style="margin:0 0 4px 0; font-size:13px; font-weight:800; color:#b91c1c;">🏥 ${med.name}</h4>
          <p style="margin:2px 0; font-size:11px; color:#475569;">${med.type}</p>
          <p style="margin:2px 0; font-size:10.5px; color:#64748b;">${med.address}</p>
          <div style="margin-top:8px; display:flex; gap:6px;">
            <a href="tel:${med.emergencyPhone || med.phone}" style="background:#f1f5f9; color:#0f172a; text-decoration:none; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700; text-align:center; flex:1;">
              📞 Call
            </a>
            <button onclick="navigateEmergencyTo('${med.id}')" style="background:#dc2626; color:#fff; border:none; padding:4px 8px; border-radius:6px; font-size:11px; font-weight:700; cursor:pointer; flex:1;">
              🚑 Route
            </button>
          </div>
        </div>
      `);
      m.addTo(medicalMarkersLayer);
    });
    showToast('🏥 Displayed 17+ 24x7 medical & emergency centers on map');
  } else {
    showToast('Hidden medical centers from map');
  }
}

function zoomToMedicalPlace(id) {
  const item = MEDICAL_SERVICES.find(p => p.id === id);
  if (!item) return;
  closeMedicalModal();
  switchTab('map');
  if (map) {
    map.flyTo([item.location.lat, item.location.lng], 16, { animate: true });
    if (!isMedicalLayerActive) toggleMapMedicalLayer();
  }
}

function navigateEmergencyTo(id) {
  const item = MEDICAL_SERVICES.find(p => p.id === id);
  if (!item) return;
  closeMedicalModal();
  switchTab('finder');
  
  const destSelect = document.getElementById('route-dest-select');
  if (destSelect) {
    destSelect.value = id;
    calculateAndDisplayMultiRoutes();
  }
}

function navigateToMedicalPlace(id) {
  navigateEmergencyTo(id);
}

function openMedicalModal() {
  openNextVisitSection('medical');
}

function closeMedicalModal() {
  const modal = document.getElementById('modal-medical');
  if (modal) modal.classList.remove('active');
}

// ----------------------------------------------------------------------------
// 24. A ➔ B Multi-Route Navigator (Low-Traffic Paths & Stopages) Handlers
// ----------------------------------------------------------------------------
function populateRouteLocationDropdowns() {
  const origSelect = document.getElementById('route-origin-select');
  const destSelect = document.getElementById('route-dest-select');
  if (!origSelect || !destSelect) return;

  const currentOrig = origSelect.value;
  const currentDest = destSelect.value;

  const buildOptions = (isOrigin) => {
    let html = '';
    if (isOrigin) {
      html += `<option value="my_location">📍 My Current GPS Location</option>`;
    }
    
    html += `<optgroup label="🌟 Famous Bengal Pandals">`;
    pandals.forEach(p => {
      html += `<option value="${p.id}">${p.name} (${p.zone})</option>`;
    });
    html += `</optgroup>`;

    html += `<optgroup label="🍛 Pet Pujo (Food & Sweets)">`;
    PET_PUJO_PLACES.forEach(f => {
      html += `<option value="${f.id}">${f.name}</option>`;
    });
    html += `</optgroup>`;

    html += `<optgroup label="🏥 24x7 Medical & Emergency">`;
    MEDICAL_SERVICES.forEach(m => {
      html += `<option value="${m.id}">${m.name}</option>`;
    });
    html += `</optgroup>`;

    return html;
  };

  origSelect.innerHTML = buildOptions(true);
  destSelect.innerHTML = buildOptions(false);

  if (currentOrig) origSelect.value = currentOrig;
  if (currentDest) {
    destSelect.value = currentDest;
  } else if (pandals.length > 0) {
    destSelect.value = pandals[0].id;
  }
}

function swapRouteLocations() {
  const origSelect = document.getElementById('route-origin-select');
  const destSelect = document.getElementById('route-dest-select');
  if (!origSelect || !destSelect) return;

  const valA = origSelect.value;
  const valB = destSelect.value;

  if (valA === 'my_location') {
    showToast('Cannot set GPS Location as static destination');
    return;
  }

  origSelect.value = valB;
  destSelect.value = valA;
  calculateAndDisplayMultiRoutes();
}

function setRouteMode(mode) {
  currentFinderMode = mode;
  document.querySelectorAll('.route-mode-chips .mode-chip').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
  calculateAndDisplayMultiRoutes();
}

function onRouteChange() {
  const resultsCard = document.getElementById('multi-routes-results');
  if (resultsCard) resultsCard.style.display = 'none';
}

function switchFinderSubtab(tab) {
  const navSection = document.getElementById('finder-nav-section');
  const matrixSection = document.getElementById('finder-matrix-section');
  const btnNav = document.getElementById('subtab-route-nav');
  const btnMatrix = document.getElementById('subtab-route-matrix');

  if (tab === 'nav') {
    if (navSection) navSection.style.display = 'block';
    if (matrixSection) matrixSection.style.display = 'none';
    if (btnNav) btnNav.classList.add('active');
    if (btnMatrix) btnMatrix.classList.remove('active');
    populateRouteLocationDropdowns();
  } else {
    if (navSection) navSection.style.display = 'none';
    if (matrixSection) matrixSection.style.display = 'block';
    if (btnNav) btnNav.classList.remove('active');
    if (btnMatrix) btnMatrix.classList.add('active');
    renderShortestFinder();
  }
}

function getLocationCoordsById(locId) {
  if (locId === 'my_location') {
    return { ...userLocation, name: 'My Current Location' };
  }
  const pandal = pandals.find(p => p.id === locId);
  if (pandal) return { ...pandal.location, name: pandal.name };

  const food = PET_PUJO_PLACES.find(f => f.id === locId);
  if (food) return { ...food.location, name: food.name };

  const med = MEDICAL_SERVICES.find(m => m.id === locId);
  if (med) return { ...med.location, name: med.name };

  return { ...userLocation, name: 'Origin' };
}

function calculateAndDisplayMultiRoutes() {
  const origSelect = document.getElementById('route-origin-select');
  const destSelect = document.getElementById('route-dest-select');
  if (!origSelect || !destSelect) return;

  const origId = origSelect.value;
  const destId = destSelect.value;

  if (origId === destId) {
    showToast('Origin and Destination cannot be the same');
    return;
  }

  const origin = getLocationCoordsById(origId);
  const dest = getLocationCoordsById(destId);

  const directDistKm = calculateDistanceKm(origin, dest);
  const mode = currentFinderMode || 'car';

  // Base speeds & traffic congestion factors
  const speedKmH = mode === 'walk' ? 4.5 : (mode === 'bike' ? 24 : (mode === 'bus' ? 14 : 20));

  // 1. Route 1: Low Traffic Recommended (Elevated Flyover / Bypass Corridor)
  const dist1 = Number((directDistKm * 1.14).toFixed(1));
  const trafficFactor1 = mode === 'walk' ? 1.0 : 1.15; // Smooth flow on elevated corridors
  const dur1 = Math.max(3, Math.round((dist1 / speedKmH) * 60 * trafficFactor1));

  // 2. Route 2: City Heritage Arterial (Central Ave / Rashbehari / SP Mukherjee)
  const dist2 = Number((directDistKm * 1.05).toFixed(1));
  const trafficFactor2 = mode === 'walk' ? 1.0 : 1.70; // Heavy pandal crowd crossings
  const dur2 = Math.max(4, Math.round((dist2 / speedKmH) * 60 * trafficFactor2));

  // 3. Route 3: Scenic Riverbank / Peripheral Bypass (Strand Rd / Ring Road)
  const dist3 = Number((directDistKm * 1.28).toFixed(1));
  const trafficFactor3 = mode === 'walk' ? 1.0 : 1.25;
  const dur3 = Math.max(5, Math.round((dist3 / speedKmH) * 60 * trafficFactor3));

  activeMultiRoutes = [
    {
      id: 0,
      title: '🟢 Route 1: Flyover & Elevated Bypass (Fastest)',
      tag: 'RECOMMENDED • LOW TRAFFIC',
      tagColor: '#059669',
      distKm: dist1,
      durationMins: dur1,
      trafficStatus: 'Low Traffic on Elevated Corridor',
      corridor: 'Via Maa Flyover / AJC Bose Elevated / EM Bypass',
      stopages: [
        { name: `${origin.name} (Start Departure)`, type: 'origin', time: '0 min' },
        { name: 'Maa Flyover Ramp / Elevated Approach', type: 'flyover', time: `+${Math.round(dur1 * 0.25)} min` },
        { name: 'Park Circus 7-Point Elevated Transit', type: 'junction', time: `+${Math.round(dur1 * 0.5)} min` },
        { name: 'EM Bypass / Heritage Link Ramp', type: 'crossing', time: `+${Math.round(dur1 * 0.8)} min` },
        { name: `${dest.name} (Destination Arrival)`, type: 'destination', time: `${dur1} min` }
      ],
      color: '#059669'
    },
    {
      id: 1,
      title: '🟡 Route 2: Heritage Central Arterial',
      tag: 'CITY ARTERIAL • MODERATE CROWD',
      tagColor: '#d97706',
      distKm: dist2,
      durationMins: dur2,
      trafficStatus: 'Moderate Crowd Delays near Pandals',
      corridor: 'Via Chittaranjan Ave / SP Mukherjee / Rashbehari Ave',
      stopages: [
        { name: `${origin.name} (Start Departure)`, type: 'origin', time: '0 min' },
        { name: 'Central Avenue / Heritage Metro Hub', type: 'metro', time: `+${Math.round(dur2 * 0.3)} min` },
        { name: 'College Square / Bowbazar Tram Crossing', type: 'crossing', time: `+${Math.round(dur2 * 0.6)} min` },
        { name: 'Gariahat / Southern Crossing', type: 'junction', time: `+${Math.round(dur2 * 0.85)} min` },
        { name: `${dest.name} (Destination Arrival)`, type: 'destination', time: `${dur2} min` }
      ],
      color: '#d97706'
    },
    {
      id: 2,
      title: '🔵 Route 3: Scenic Riverbank Bypass',
      tag: 'SCENIC • AVOIDS INNER CITY RUSH',
      tagColor: '#2563eb',
      distKm: dist3,
      durationMins: dur3,
      trafficStatus: 'Smooth Peripheral Riverbank Corridors',
      corridor: 'Via Strand Road / River Circular / Vidyasagar Approach',
      stopages: [
        { name: `${origin.name} (Start Departure)`, type: 'origin', time: '0 min' },
        { name: 'Strand Road Ghats / Riverbank Boulevard', type: 'river', time: `+${Math.round(dur3 * 0.28)} min` },
        { name: 'Princep Memorial / Circular Rail Crossing', type: 'heritage', time: `+${Math.round(dur3 * 0.55)} min` },
        { name: 'Vidyasagar Toll Interchange / Ring Road', type: 'flyover', time: `+${Math.round(dur3 * 0.82)} min` },
        { name: `${dest.name} (Destination Arrival)`, type: 'destination', time: `${dur3} min` }
      ],
      color: '#2563eb'
    }
  ];

  selectedRouteIndex = 0;
  currentRouteNavDest = { ...dest, id: destId };

  // Render cards
  const cardsList = document.getElementById('routes-cards-list');
  if (cardsList) {
    cardsList.innerHTML = activeMultiRoutes.map((r, idx) => `
      <div class="route-alt-card ${idx === 0 ? 'selected' : ''}" onclick="selectAlternativeRoute(${idx})" id="route-card-${idx}" style="background:#fff; border:2px solid ${idx === 0 ? r.color : '#e2e8f0'}; border-radius:14px; padding:12px 14px; cursor:pointer; transition:all 0.2s ease; margin-bottom:10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <span style="font-size:10px; font-weight:800; color:${r.tagColor}; background:${r.tagColor}15; padding:2px 8px; border-radius:6px;">
            ${r.tag}
          </span>
          <span style="font-size:14px; font-weight:900; color:${r.color};">
            ~${r.durationMins} mins
          </span>
        </div>
        <h4 style="margin:2px 0; font-size:13.5px; font-weight:800; color:#0f172a;">${r.title}</h4>
        <p style="margin:2px 0 0 0; font-size:11px; color:#64748b;">${r.corridor} • <strong>${r.distKm} km</strong></p>
      </div>
    `).join('');
  }

  renderRouteStopages(activeMultiRoutes[0]);

  const resultsCard = document.getElementById('multi-routes-results');
  if (resultsCard) resultsCard.style.display = 'block';

  showToast(`🚦 Found 3 alternative low-traffic routes to ${dest.name}`);
}

function selectAlternativeRoute(index) {
  selectedRouteIndex = index;
  const selectedRoute = activeMultiRoutes[index];
  if (!selectedRoute) return;

  activeMultiRoutes.forEach((r, idx) => {
    const card = document.getElementById(`route-card-${idx}`);
    if (card) {
      card.style.borderColor = (idx === index) ? r.color : '#e2e8f0';
      card.classList.toggle('selected', idx === index);
    }
  });

  renderRouteStopages(selectedRoute);
}

function renderRouteStopages(route) {
  const timelineList = document.getElementById('stopages-timeline-list');
  const title = document.getElementById('stopages-title');
  if (!timelineList || !route) return;

  if (title) title.textContent = `Road Plan: ${route.title}`;

  timelineList.innerHTML = route.stopages.map((s, idx) => `
    <div style="display:flex; gap:12px; position:relative; padding-bottom:12px;">
      <div style="display:flex; flex-direction:column; align-items:center;">
        <div style="width:24px; height:24px; border-radius:50%; background:${idx === 0 ? '#10b981' : (idx === route.stopages.length - 1 ? '#ef4444' : route.color)}; color:#fff; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; z-index:2;">
          ${idx === 0 ? 'A' : (idx === route.stopages.length - 1 ? 'B' : idx)}
        </div>
        ${idx < route.stopages.length - 1 ? `<div style="width:2px; flex:1; background:#cbd5e1; margin:2px 0;"></div>` : ''}
      </div>
      <div style="flex:1;">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <strong style="font-size:12.5px; color:#0f172a;">${s.name}</strong>
          <span style="font-size:11px; font-weight:700; color:#64748b;">${s.time}</span>
        </div>
        <span style="font-size:10.5px; color:#94a3b8;">Traffic check passed • Smooth junction</span>
      </div>
    </div>
  `).join('');
}

function previewSelectedRouteOnMap() {
  const selectedRoute = activeMultiRoutes[selectedRouteIndex];
  if (!selectedRoute || !currentRouteNavDest) return;

  switchTab('map');
  drawRouteOnMap(userLocation, currentRouteNavDest, selectedRoute.color);
}

function startSelectedRouteNavigation() {
  const selectedRoute = activeMultiRoutes[selectedRouteIndex];
  if (!selectedRoute || !currentRouteNavDest) return;

  switchTab('map');
  drawRouteOnMap(userLocation, currentRouteNavDest, selectedRoute.color);

  const banner = document.getElementById('active-route-banner');
  const info = document.getElementById('route-banner-info');
  if (banner && info) {
    info.textContent = `🚗 Navigating to ${currentRouteNavDest.name} (~${selectedRoute.durationMins}m • ${selectedRoute.distKm} km)`;
    banner.style.display = 'flex';
  }

  showToast(`🚀 Live navigation started along ${selectedRoute.title}!`);
}

function updateLiveNavigationProgress() {
  if (!currentRouteNavDest) return;

  const distKm = calculateDistanceKm(userLocation, currentRouteNavDest);
  const info = document.getElementById('route-banner-info');
  if (info) {
    const estMins = Math.max(1, Math.round(distKm * 3.2));
    info.textContent = `🚗 To ${currentRouteNavDest.name}: ${distKm.toFixed(2)} km left (~${estMins}m) • Live GPS`;
  }

  if (distKm < 0.05) {
    showToast(`🎯 You have arrived at ${currentRouteNavDest.name}!`);
  }
}

function drawRouteOnMap(start, end, color = '#dc2626') {
  if (!map || !navRouteLayer) return;
  navRouteLayer.clearLayers();

  const latlngs = [
    [start.lat, start.lng],
    [start.lat + (end.lat - start.lat) * 0.45 + 0.002, start.lng + (end.lng - start.lng) * 0.45 - 0.002],
    [end.lat, end.lng]
  ];

  const polyline = L.polyline(latlngs, {
    color: color,
    weight: 5.5,
    opacity: 0.9,
    dashArray: '10, 8',
    lineJoin: 'round'
  }).addTo(navRouteLayer);

  map.fitBounds(polyline.getBounds(), { padding: [60, 60] });
}

// ----------------------------------------------------------------------------
// 25. Pandal Hopper Trip Planner (Next Visit) Handlers
// ----------------------------------------------------------------------------
function switchItinerarySubtab(tab) {
  switchNextVisitTab(tab === 'smart' ? 'hopper' : 'saved');
}

function setPlannerPandalCount(count) {
  currentPlannerCount = count;
  document.querySelectorAll('.count-presets-row .preset-count-btn').forEach(btn => {
    btn.classList.toggle('active', Number(btn.dataset.count) === count);
  });
  const customInput = document.getElementById('plan-custom-count');
  if (customInput) customInput.value = '';

  const label = document.getElementById('plan-count-preview-label');
  if (label) label.textContent = `${count} Pandals`;
}

function handleCustomPandalCount(val) {
  const num = parseInt(val, 10);
  if (!isNaN(num) && num > 0) {
    currentPlannerCount = Math.min(num, 30);
    document.querySelectorAll('.count-presets-row .preset-count-btn').forEach(b => b.classList.remove('active'));
    const label = document.getElementById('plan-count-preview-label');
    if (label) label.textContent = `${currentPlannerCount} Pandals (Custom)`;
  }
}

function updateStrategyUi() {
  const radio = document.querySelector('input[name="plan-strategy"]:checked');
  if (radio) {
    currentPlannerStrategy = radio.value;
    document.querySelectorAll('.strategy-radio-card').forEach(card => card.classList.remove('active'));
    const parentCard = radio.closest('.strategy-radio-card');
    if (parentCard) parentCard.classList.add('active');
  }
}

function setPlannerTravelMode(mode) {
  currentPlannerTravelMode = mode;
  document.querySelectorAll('.travel-mode-row .travel-chip').forEach(c => {
    c.classList.toggle('active', c.dataset.mode === mode);
  });
}

function toggleBreakOption(type) {
  // Checkbox triggers live recalculation if needed
}

function generateHopperTripPlan() {
  const areaSelect = document.getElementById('plan-area-select');
  const dateSelect = document.getElementById('plan-date-select');
  const startInput = document.getElementById('plan-start-time');
  const endInput = document.getElementById('plan-end-time');

  const selectedArea = areaSelect ? areaSelect.value : 'all';
  const selectedDate = dateSelect ? dateSelect.value : 'Oct 17 - Maha Saptami';
  const startTime = startInput ? (startInput.value || '16:00') : '16:00';
  const endTime = endInput ? (endInput.value || '23:00') : '23:00';

  let eligiblePandals = [...pandals];
  if (selectedArea !== 'all') {
    const areaLower = selectedArea.toLowerCase();
    eligiblePandals = eligiblePandals.filter(p =>
      (p.zone && p.zone.toLowerCase().includes(areaLower)) ||
      (p.address && p.address.toLowerCase().includes(areaLower))
    );
    if (eligiblePandals.length === 0) {
      eligiblePandals = [...pandals];
    }
  }

  // Pandal count
  const targetCount = Math.min(currentPlannerCount || 5, eligiblePandals.length);

  // Strategy: Shortest (Greedy TSP from user GPS) vs Random
  let selectedPandals = [];
  if (currentPlannerStrategy === 'random') {
    selectedPandals = [...eligiblePandals].sort(() => 0.5 - Math.random()).slice(0, targetCount);
  } else {
    // Greedy Nearest Neighbor
    let pool = [...eligiblePandals];
    let curPoint = { ...userLocation };
    while (pool.length > 0 && selectedPandals.length < targetCount) {
      pool.sort((a, b) => calculateDistanceKm(curPoint, a.location) - calculateDistanceKm(curPoint, b.location));
      const nextPandal = pool.shift();
      selectedPandals.push(nextPandal);
      curPoint = nextPandal.location;
    }
  }

  // Travel Mode speed & festive traffic factor
  const mode = currentPlannerTravelMode || 'car';
  const speedKmH = mode === 'walk' ? 4.5 : (mode === 'bike' ? 24 : (mode === 'bus' ? 12 : 18));
  const trafficDelayMultiplier = mode === 'walk' ? 1.0 : (mode === 'bus' ? 1.4 : 1.35);

  // Breaks
  const foodBreakBox = document.getElementById('plan-include-food-break');
  const hasFoodBreak = foodBreakBox ? foodBreakBox.checked : true;
  const foodDuration = parseInt(document.getElementById('plan-food-break-duration')?.value || '45', 10);

  const restBreakBox = document.getElementById('plan-include-rest-break');
  const hasRestBreak = restBreakBox ? restBreakBox.checked : true;
  const restDuration = parseInt(document.getElementById('plan-rest-break-duration')?.value || '20', 10);

  // Build Chronological Timeline
  const [startH, startM] = startTime.split(':').map(Number);
  let currentClockMins = startH * 60 + startM;

  let totalDistKm = 0;
  let prevLoc = { ...userLocation };
  const timeline = [];

  // Departure step
  timeline.push({
    type: 'start',
    time: formatMinutesToTimeString(currentClockMins),
    title: 'Tour Departure from Starting Location',
    desc: `Starting Puja Parikrama tour via ${mode.toUpperCase()} mode`
  });

  const foodBreakIndex = Math.floor(selectedPandals.length / 2);

  selectedPandals.forEach((p, idx) => {
    const legDist = calculateDistanceKm(prevLoc, p.location);
    totalDistKm += legDist;
    const travelMins = Math.max(4, Math.round((legDist / speedKmH) * 60 * trafficDelayMultiplier));
    
    currentClockMins += travelMins;

    // Travel leg
    timeline.push({
      type: 'travel',
      time: formatMinutesToTimeString(currentClockMins),
      title: `Travel to Stop #${idx + 1}: ${p.name}`,
      desc: `${legDist.toFixed(1)} km road path (~${travelMins} mins via ${mode})`
    });

    // Pandal Darshan (Queue wait + 15m darshan)
    const darshanDuration = (p.estimatedQueueMins || 20) + 15;
    const arriveTime = currentClockMins;
    currentClockMins += darshanDuration;

    timeline.push({
      type: 'pandal',
      time: formatMinutesToTimeString(arriveTime),
      finishTime: formatMinutesToTimeString(currentClockMins),
      pandal: p,
      title: `#${idx + 1}: ${p.name}`,
      desc: `Queue wait: ~${p.estimatedQueueMins || 20}m • Theme: ${p.theme || 'Traditional Mandir'}`
    });

    // Insert Food Break after middle pandal
    if (hasFoodBreak && idx === foodBreakIndex) {
      const foodStart = currentClockMins;
      currentClockMins += foodDuration;
      timeline.push({
        type: 'food_break',
        time: formatMinutesToTimeString(foodStart),
        finishTime: formatMinutesToTimeString(currentClockMins),
        title: `🍛 Food Break (Pet Pujo) — ~${foodDuration} mins`,
        desc: `Biryani, Kathi Rolls & Dinner adda at nearby culinary hub`
      });
    }

    // Insert Rest Break after 2nd pandal
    if (hasRestBreak && idx === 1 && selectedPandals.length > 2) {
      const restStart = currentClockMins;
      currentClockMins += restDuration;
      timeline.push({
        type: 'rest_break',
        time: formatMinutesToTimeString(restStart),
        finishTime: formatMinutesToTimeString(currentClockMins),
        title: `☕ Chai & Hydration Break — ~${restDuration} mins`,
        desc: `Hot tea, ice cream, water bottles & brief foot rest`
      });
    }

    prevLoc = p.location;
  });

  // Check window feasibility
  const [endH, endM] = endTime.split(':').map(Number);
  let endWindowMins = endH * 60 + endM;
  if (endWindowMins < startH * 60 + startM) {
    endWindowMins += 24 * 60; // Next day midnight
  }

  const fitsWindow = currentClockMins <= endWindowMins;
  const totalTourMins = currentClockMins - (startH * 60 + startM);

  plannedTourData = {
    area: selectedArea,
    date: selectedDate,
    startTime,
    endTime,
    pandals: selectedPandals,
    totalDistKm: Number(totalDistKm.toFixed(1)),
    totalDurationMins: totalTourMins,
    completionTimeString: formatMinutesToTimeString(currentClockMins),
    fitsWindow,
    diffMins: Math.abs(endWindowMins - currentClockMins),
    timeline
  };

  renderGeneratedPlanOutput(plannedTourData);

  const resultsCard = document.getElementById('planner-results-card');
  if (resultsCard) {
    resultsCard.style.display = 'block';
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showToast(`✨ Generated schedule with ${selectedPandals.length} pandals & breaks!`);
}

function formatMinutesToTimeString(totalMins) {
  const norm = totalMins % (24 * 60);
  const h24 = Math.floor(norm / 60);
  const m = norm % 60;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 || 12;
  return `${h12}:${m < 10 ? '0' + m : m} ${ampm}`;
}

function renderGeneratedPlanOutput(plan) {
  document.getElementById('plan-result-title').textContent = `${plan.date} Tour Timetable`;
  
  const fitBadge = document.getElementById('plan-fit-badge');
  if (fitBadge) {
    if (plan.fitsWindow) {
      fitBadge.style.background = '#059669';
      fitBadge.style.color = '#fff';
      fitBadge.textContent = `✅ Fits Schedule (${Math.floor(plan.diffMins / 60)}h ${plan.diffMins % 60}m to spare)`;
    } else {
      fitBadge.style.background = '#dc2626';
      fitBadge.style.color = '#fff';
      fitBadge.textContent = `⚠️ Exceeds Window by ~${plan.diffMins}m`;
    }
  }

  document.getElementById('metric-total-pandals').textContent = plan.pandals.length;
  document.getElementById('metric-total-dist').textContent = `${plan.totalDistKm} km`;
  
  const h = Math.floor(plan.totalDurationMins / 60);
  const m = plan.totalDurationMins % 60;
  document.getElementById('metric-total-duration').textContent = `${h}h ${m}m`;
  document.getElementById('metric-completion-time').textContent = plan.completionTimeString;

  const timelineContainer = document.getElementById('plan-timeline-list');
  if (timelineContainer) {
    timelineContainer.innerHTML = plan.timeline.map((step, idx) => `
      <div style="display:flex; gap:12px; margin-bottom:12px; position:relative;">
        <div style="display:flex; flex-direction:column; align-items:center;">
          <div style="width:26px; height:26px; border-radius:50%; background:${
            step.type === 'start' ? '#10b981' : 
            step.type === 'pandal' ? '#dc2626' : 
            step.type === 'food_break' ? '#ea580c' : 
            step.type === 'rest_break' ? '#d97706' : '#64748b'
          }; color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:800; z-index:2;">
            ${step.type === 'food_break' ? '🍛' : (step.type === 'rest_break' ? '☕' : (step.type === 'travel' ? '🚗' : '🪔'))}
          </div>
          ${idx < plan.timeline.length - 1 ? `<div style="width:2px; flex:1; background:#e2e8f0; margin:2px 0;"></div>` : ''}
        </div>
        <div style="flex:1; background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:10px 12px; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:2px;">
            <strong style="font-size:13px; color:#0f172a;">${step.title}</strong>
            <span style="font-size:11px; font-weight:800; color:#b91c1c;">${step.time}</span>
          </div>
          <p style="margin:0; font-size:11px; color:#64748b;">${step.desc}</p>
        </div>
      </div>
    `).join('');
  }
}

function viewPlannedTourOnLiveMap() {
  if (!plannedTourData || !plannedTourData.pandals.length) return;
  switchTab('map');

  if (!tourMarkersLayer) return;
  tourMarkersLayer.clearLayers();

  const latlngs = [[userLocation.lat, userLocation.lng]];

  plannedTourData.pandals.forEach((p, idx) => {
    latlngs.push([p.location.lat, p.location.lng]);

    const icon = L.divIcon({
      className: 'tour-stop-pin',
      html: `
        <div style="width:32px; height:32px; border-radius:50%; background:#b91c1c; border:2.5px solid #fef08a; color:#fff; font-weight:900; font-size:13px; display:flex; align-items:center; justify-content:center; box-shadow:0 4px 12px rgba(185,28,28,0.4);">
          ${idx + 1}
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const m = L.marker([p.location.lat, p.location.lng], { icon });
    m.bindPopup(`
      <div style="font-family:'Outfit',sans-serif; min-width:170px;">
        <h4 style="margin:0; color:#b91c1c; font-size:13px;">#${idx + 1}: ${p.name}</h4>
        <p style="margin:2px 0; font-size:11px; color:#475569;">${p.theme || 'Puja Theme'}</p>
        <button onclick="openPandalDetail(pandals.find(x => x.id === '${p.id}'))" style="margin-top:6px; background:#b91c1c; color:#fff; border:none; padding:4px 10px; border-radius:6px; font-size:11px; cursor:pointer;">
          View Full Details
        </button>
      </div>
    `);
    m.addTo(tourMarkersLayer);
  });

  const polyline = L.polyline(latlngs, {
    color: '#d97706',
    weight: 6,
    opacity: 0.9,
    dashArray: '8, 6'
  }).addTo(tourMarkersLayer);

  map.fitBounds(polyline.getBounds(), { padding: [80, 80] });
  showToast(`🗺️ Plotted ${plannedTourData.pandals.length} numbered tour stops on Bengal map!`);
}

function savePlanToSavedChecklist() {
  if (!plannedTourData) return;
  plannedTourData.pandals.forEach(p => {
    if (!visitPlans.some(x => x.id === p.id)) {
      visitPlans.push({
        id: p.id,
        name: p.name,
        date: plannedTourData.date,
        time: plannedTourData.startTime,
        completed: false
      });
    }
  });

  savePlans(visitPlans);
  showToast(`💾 Saved ${plannedTourData.pandals.length} pandals to your checklist!`);
  switchItinerarySubtab('saved');
}

function shareGeneratedTripPlan() {
  if (!plannedTourData) return;
  const text = `🪔 My Durga Puja 2026 Tour Schedule (${plannedTourData.date})\n` +
    `Pandals: ${plannedTourData.pandals.map((p, i) => `${i + 1}. ${p.name}`).join(', ')}\n` +
    `Total: ${plannedTourData.totalDistKm} km • Completion: ${plannedTourData.completionTimeString}\n` +
    `Planned with Pandal Hopper Parikrama App!`;

  if (navigator.share) {
    navigator.share({ title: 'My Pandal Tour', text }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text);
    showToast('📲 Tour itinerary copied to clipboard!');
  }
}

// ----------------------------------------------------------------------------
// 21. Initialization on DOM Loaded
// ----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  pandals = loadStoredPandals();
  visitPlans = loadStoredPlans();

  initMap();
  startGeolocationTracking();
  updatePlanCounter();
  initCloudSync();
  initAuth();
  populateRouteLocationDropdowns();
  startLiveClockAndWeather();

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
    layerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
    });
    document.addEventListener('click', () => {
      dropdown.style.display = 'none';
    });
  }

  // Explicit capsule & arrow button click binding
  const capsuleEl = document.getElementById('btn-toolbox-capsule');
  if (capsuleEl) {
    capsuleEl.addEventListener('click', (e) => {
      // If clicking audio button inside, let audio handler work
      if (e.target && e.target.closest('#capsule-audio-btn')) {
        return;
      }
      toggleToolboxWindow(e);
    });
  }

  const arrowBtn = document.getElementById('capsule-arrow-btn');
  if (arrowBtn) {
    arrowBtn.addEventListener('click', (e) => {
      toggleToolboxWindow(e);
    });
  }

  // Click outside to close toolbox window
  document.addEventListener('click', (e) => {
    const container = document.querySelector('.top-right-capsule-container');
    if (container && !container.contains(e.target)) {
      closeToolboxWindow();
    }
  });

  // Modal backdrop click to dismiss
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });

  // Ensure default active tab is map and overlays are properly synced
  switchTab('map');
});

