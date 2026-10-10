import { Pandal } from '../types';

export const INITIAL_PANDALS: Pandal[] = [
  // 1. Sreebhumi Sporting Club
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
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewCount: 1420,
    reviews: [
      {
        id: 'r1-1',
        userName: 'Ananya Mukherjee',
        rating: 5,
        comment: 'Absolutely breathtaking idol decoration! The lighting alone is worth the wait in the queue.',
        timestamp: '2 hours ago'
      },
      {
        id: 'r1-2',
        userName: 'Souvik Roy',
        rating: 5,
        comment: 'Best visited late night around 2 AM to avoid massive crowd. The architecture is majestic.',
        timestamp: '5 hours ago'
      }
    ],
    visitCount: 48500,
    photosPostedCount: 3120,
    trafficLevel: 'heavy',
    estimatedQueueMins: 45,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T10:00:00Z',
    crowdDensityPercent: 88,
    bestVisitHours: '1:30 AM - 4:30 AM or 11:00 AM',
    audioAmbiance: 'Dhak beats with classical Shehnai'
  },

  // 2. Ekdalia Evergreen Club
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
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    reviewCount: 980,
    reviews: [
      {
        id: 'r2-1',
        userName: 'Debjit Bose',
        rating: 5,
        comment: 'Classic Kolkata vibe. The huge chandelier from Germany is a treat for the eyes every year.',
        timestamp: '1 hour ago'
      }
    ],
    visitCount: 39200,
    photosPostedCount: 2200,
    trafficLevel: 'heavy',
    estimatedQueueMins: 35,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T11:00:00Z',
    crowdDensityPercent: 82,
    bestVisitHours: '12:00 PM - 3:00 PM',
    audioAmbiance: 'Traditional Chandi Path & Panchavadyam'
  },

  // 3. Kalyani ITI More (Nadia District) - Super viral statewide mega attraction
  {
    id: 'pandal-3',
    name: 'Kalyani ITI More Durga Puja (Luminous Club)',
    pujaName: 'Kalyani ITI More Sarbojanin Durgotsav',
    clubName: 'Luminous Club / ITI More Committee',
    theme: 'Sky-high 150ft Petronas Towers & Sacred Celestial Palace',
    description: 'Renowned across entire West Bengal for awe-inspiring mammoth replicas (Twin Towers, Grand Palace) rising over 150 feet high. Attracts millions of visitors traveling by special local trains and highway buses.',
    location: { lat: 22.9751, lng: 88.4344 },
    address: 'ITI More, Kalyani Expressway, Nadia District',
    zone: 'Nadia',
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewCount: 2150,
    reviews: [
      {
        id: 'r3-1',
        userName: 'Tanmoy Biswas',
        rating: 5,
        comment: 'Unbelievable scale! The replica is so gigantic it can be seen from miles away on the Kalyani Expressway.',
        timestamp: '3 hours ago'
      }
    ],
    visitCount: 62000,
    photosPostedCount: 4800,
    trafficLevel: 'jam',
    estimatedQueueMins: 60,
    isBeautyPick: true,
    isHeritage: false,
    createdBy: 'community',
    createdAt: '2026-09-02T08:00:00Z',
    crowdDensityPercent: 95,
    bestVisitHours: 'Morning 8:00 AM - 11:00 AM',
    audioAmbiance: 'Orchestral devotional symphonies'
  },

  // 4. Belur Math Durga Puja (Howrah District) - Swami Vivekananda Heritage
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
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
    rating: 5.0,
    reviewCount: 3100,
    reviews: [
      {
        id: 'r4-1',
        userName: 'Ruma Ganguly',
        rating: 5,
        comment: 'The Kumari Puja at Belur Math is a life-changing divine experience. Very well organized queue along the river ghats.',
        timestamp: '4 hours ago'
      }
    ],
    visitCount: 75000,
    photosPostedCount: 5400,
    trafficLevel: 'heavy',
    estimatedQueueMins: 40,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T08:00:00Z',
    crowdDensityPercent: 90,
    bestVisitHours: '6:30 AM - 10:00 AM (Ashtami Puja)',
    audioAmbiance: 'Vedic chants and meditative bell rings'
  },

  // 5. Chandannagar Strand & Fatokgora (Hooghly District)
  {
    id: 'pandal-5',
    name: 'Chandannagar Fatokgora & Strand Durgotsav',
    pujaName: 'Fatokgora Sarbojanin Durgotsav',
    clubName: 'Fatokgora Club / Strand Samiti',
    theme: 'World-Renowned French Colony Illumination & Moving Lightcraft',
    description: 'Chandannagar is globally celebrated for its indigenous electrical lighting wizards. Pandal features kinetic illuminated mythological stories along the grand French colonial river promenade.',
    location: { lat: 22.8671, lng: 88.3686 },
    address: 'Strand Road, Chandannagar, Hooghly District',
    zone: 'Hooghly',
    images: [
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewCount: 1680,
    reviews: [
      {
        id: 'r5-1',
        userName: 'Arindam Ghosh',
        rating: 5,
        comment: 'Nowhere in the world can you see light art like Chandannagar. Simply mesmerizing along the Hooghly river!',
        timestamp: '6 hours ago'
      }
    ],
    visitCount: 42000,
    photosPostedCount: 2900,
    trafficLevel: 'moderate',
    estimatedQueueMins: 25,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'community',
    createdAt: '2026-09-02T09:00:00Z',
    crowdDensityPercent: 68,
    bestVisitHours: '7:00 PM - 11:30 PM (Peak lighting)',
    audioAmbiance: 'Bengali folk music & synchronized lights'
  },

  // 6. Santosh Mitra Square (Bowbazar, Kolkata)
  {
    id: 'pandal-6',
    name: 'Santosh Mitra Square',
    pujaName: 'Santosh Mitra Square Sarbojanin',
    clubName: 'Santosh Mitra Square Club',
    theme: 'Hyper-Realistic 3D Architectural Marvel & Laser Spectacle',
    description: 'Central Kolkata’s crowd magnet. Known for spectacular architectural marvels (such as the Las Vegas Sphere and Ayodhya Mandir replicas) with high-intensity 3D laser projection mapping.',
    location: { lat: 22.5691, lng: 88.3688 },
    address: 'Lebutala, Bowbazar, Central Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    reviewCount: 1890,
    reviews: [
      {
        id: 'r6-1',
        userName: 'Pritam Sengupta',
        rating: 5,
        comment: 'The laser projection show is on par with international festivals. Pure sensory delight.',
        timestamp: '3 hours ago'
      }
    ],
    visitCount: 51200,
    photosPostedCount: 3600,
    trafficLevel: 'heavy',
    estimatedQueueMins: 45,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T12:00:00Z',
    crowdDensityPercent: 86,
    bestVisitHours: '2:00 AM - 5:00 AM',
    audioAmbiance: 'High energy cinematic percussion'
  },

  // 7. Bagbazar Sarbojanin (North Kolkata)
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
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewCount: 1530,
    reviews: [
      {
        id: 'r7-1',
        userName: 'Sharmila Sen',
        rating: 5,
        comment: 'No Durga Puja tour of Bengal is complete without bowing down to Bagbazarer Maa. The face of the idol is pure grace.',
        timestamp: '7 hours ago'
      }
    ],
    visitCount: 46000,
    photosPostedCount: 2800,
    trafficLevel: 'moderate',
    estimatedQueueMins: 20,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T09:00:00Z',
    crowdDensityPercent: 70,
    bestVisitHours: '10:00 AM - 1:00 PM',
    audioAmbiance: 'Dhaak rolls with traditional Kasor Ghanta'
  },

  // 8. Swastika Yubak Sangha (Siliguri, North Bengal)
  {
    id: 'pandal-8',
    name: 'Swastika Yubak Sangha (Siliguri)',
    pujaName: 'Siliguri Swastika Yubak Sangha Durgotsav',
    clubName: 'Swastika Yubak Sangha',
    theme: 'Himalayan Eco-Heritage & Living Bamboo Artistry',
    description: 'North Bengal’s crown jewel pandal. Showcases breathtaking eco-artisan craftsmanship using natural forest timber, tea-leaf fibres, and handcrafted Himalayan terracotta figurines.',
    location: { lat: 26.7271, lng: 88.4354 },
    address: 'Hakimpara, Siliguri, Darjeeling District',
    zone: 'Siliguri & North Bengal',
    images: [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    reviewCount: 920,
    reviews: [
      {
        id: 'r8-1',
        userName: 'Prashant Roy',
        rating: 5,
        comment: 'Siliguri’s pride! Every year they create something so organic and deeply rooted in North Bengal culture.',
        timestamp: '5 hours ago'
      }
    ],
    visitCount: 34000,
    photosPostedCount: 2100,
    trafficLevel: 'moderate',
    estimatedQueueMins: 20,
    isBeautyPick: true,
    isHeritage: false,
    createdBy: 'community',
    createdAt: '2026-09-02T10:00:00Z',
    crowdDensityPercent: 65,
    bestVisitHours: '5:00 PM - 8:00 PM',
    audioAmbiance: 'Flute melodies with mountain winds theme'
  },

  // 9. Suruchi Sangha (New Alipore, Kolkata)
  {
    id: 'pandal-9',
    name: 'Suruchi Sangha',
    pujaName: 'Suruchi Sangha Sharadotsav',
    clubName: 'Suruchi Sangha Club',
    theme: 'Soul of India — Handloom Craft & Environmental Harmony',
    description: 'Renowned for representing cultural heritages of different Indian states every year, featuring handcrafted textile installations, artisan live looms, and theme songs composed by Bengal luminaries.',
    location: { lat: 22.5089, lng: 88.3308 },
    address: 'New Alipore, Block M, South Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewCount: 1350,
    reviews: [
      {
        id: 'r9-1',
        userName: 'Kalyan Sen',
        rating: 5,
        comment: 'The theme execution and environmental conscious materials are extraordinary. Top-notch discipline.',
        timestamp: '4 hours ago'
      }
    ],
    visitCount: 41000,
    photosPostedCount: 2950,
    trafficLevel: 'heavy',
    estimatedQueueMins: 35,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T10:30:00Z',
    crowdDensityPercent: 80,
    bestVisitHours: '11:00 AM - 2:00 PM',
    audioAmbiance: 'Acoustic Indian classical theme song'
  },

  // 10. College Square (Central Kolkata)
  {
    id: 'pandal-10',
    name: 'College Square Sarbojanin',
    pujaName: 'College Square Sarbojanin Durgotsav',
    clubName: 'College Square Club',
    theme: 'Aquatic Mirror Reflection & Thousand Lamp Illumination',
    description: 'Iconic puja located in the heart of Kolkata’s academic district. Famous for its majestic glowing temple floating on the water tank, reflecting thousands of golden bulbs into the serene lake.',
    location: { lat: 22.5739, lng: 88.3639 },
    address: 'College Street, Boi Para, Central Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    reviewCount: 1610,
    reviews: [
      {
        id: 'r10-1',
        userName: 'Dipanjan Dutta',
        rating: 5,
        comment: 'The reflection on the water at midnight is magical. Combine it with hot coffee from Coffee House nearby!',
        timestamp: '2 hours ago'
      }
    ],
    visitCount: 47000,
    photosPostedCount: 3300,
    trafficLevel: 'heavy',
    estimatedQueueMins: 30,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T09:30:00Z',
    crowdDensityPercent: 84,
    bestVisitHours: '12:00 AM - 3:30 AM',
    audioAmbiance: 'Water fountain murmurs with classical sitar'
  },

  // 11. Bally Baroari (Howrah District)
  {
    id: 'pandal-11',
    name: 'Bally Sadharon Durgotsav',
    pujaName: 'Bally Sadharon Baroari Durgotsav',
    clubName: 'Bally Sadharon Samiti',
    theme: 'Heritage Terracotta Temples of Bishnupur',
    description: 'One of the most revered historic baroari pujas in Howrah district. Crafted with clay baked bricks, Bishnupuri motifs, and bell-metal ornaments depicting ancient folklore.',
    location: { lat: 22.6511, lng: 88.3444 },
    address: 'Bally Bazar, GT Road, Howrah District',
    zone: 'Howrah',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    reviewCount: 650,
    reviews: [
      {
        id: 'r11-1',
        userName: 'Swagata Roy',
        rating: 5,
        comment: 'Intricate terracotta clay tile work. Howrah’s pride every Durga Puja season.',
        timestamp: '8 hours ago'
      }
    ],
    visitCount: 27000,
    photosPostedCount: 1600,
    trafficLevel: 'moderate',
    estimatedQueueMins: 15,
    isBeautyPick: false,
    isHeritage: true,
    createdBy: 'community',
    createdAt: '2026-09-02T11:00:00Z',
    crowdDensityPercent: 62,
    bestVisitHours: '3:00 PM - 6:00 PM',
    audioAmbiance: 'Traditional Baul songs'
  },

  // 12. Durgapur Steel Township Puja (Paschim Bardhaman)
  {
    id: 'pandal-12',
    name: 'Durgapur Steel Township Durgotsav',
    pujaName: 'A-Zone Steel Township Durgotsav',
    clubName: 'Steel Township Club',
    theme: 'Chola Dynasty Golden Chariot & Bronze Sculptures',
    description: 'Premier mega-pandal of the industrial heartland of Bengal. Features a towering 80-foot chariot structure adorned with intricate south Indian temple carvings and radiant metal finish.',
    location: { lat: 23.5358, lng: 87.3119 },
    address: 'A-Zone, City Centre, Durgapur, Paschim Bardhaman',
    zone: 'Paschim Bardhaman',
    images: [
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    reviewCount: 840,
    reviews: [
      {
        id: 'r12-1',
        userName: 'Arpan Chakraborty',
        rating: 5,
        comment: 'Durgapur’s biggest attraction! Massive wide roads make hopping easy with ample parking.',
        timestamp: '1 day ago'
      }
    ],
    visitCount: 31000,
    photosPostedCount: 1850,
    trafficLevel: 'low',
    estimatedQueueMins: 15,
    isBeautyPick: true,
    isHeritage: false,
    createdBy: 'community',
    createdAt: '2026-09-02T12:00:00Z',
    crowdDensityPercent: 55,
    bestVisitHours: '6:00 PM - 9:00 PM',
    audioAmbiance: 'Carnatic instruments blended with Dhaak'
  },

  // 13. Naktala Udayan Sangha (South 24 Parganas / Kolkata)
  {
    id: 'pandal-13',
    name: 'Naktala Udayan Sangha',
    pujaName: 'Naktala Udayan Sangha Sarbojanin',
    clubName: 'Naktala Udayan Sangha',
    theme: 'Avant-Garde Kinetic Installation & Mother Earth Awakening',
    description: 'Famous for pioneering hyper-modern avant-garde concept art. Features mechanical kinetic sculptures, dramatic chiaroscuro lighting, and thought-provoking philosophical themes.',
    location: { lat: 22.4744, lng: 88.3667 },
    address: 'Naktala, NSC Bose Road, South 24 Parganas / Kolkata',
    zone: 'South 24 Parganas',
    images: [
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=200&q=80',
    rating: 4.8,
    reviewCount: 1220,
    reviews: [
      {
        id: 'r13-1',
        userName: 'Soham Mukherjee',
        rating: 5,
        comment: 'Mind-blowing conceptual art. The movement of the kinetic structures leaves everyone in awe.',
        timestamp: '6 hours ago'
      }
    ],
    visitCount: 38000,
    photosPostedCount: 2600,
    trafficLevel: 'moderate',
    estimatedQueueMins: 25,
    isBeautyPick: true,
    isHeritage: false,
    createdBy: 'official',
    createdAt: '2026-09-01T13:00:00Z',
    crowdDensityPercent: 74,
    bestVisitHours: '1:00 AM - 4:00 AM',
    audioAmbiance: 'Ambient experimental symphony'
  },

  // 14. Maddox Square (Ballygunge, Kolkata)
  {
    id: 'pandal-14',
    name: 'Maddox Square Club',
    pujaName: 'Maddox Square Sarbojanin Durgotsav',
    clubName: 'Maddox Square Club',
    theme: 'Eternal Traditional Chandi Mandap & Bengal’s Biggest Adda',
    description: 'The social heartbeat of Bengal’s youth. Famous for its quintessential park gathering, warm lighting, open-lawn sitting, traditional Daaker Saaj idol, and unmatched festive camaraderie.',
    location: { lat: 22.5284, lng: 88.3562 },
    address: 'Maddox Square Park, Lansdowne, South Kolkata',
    zone: 'Kolkata',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewCount: 1980,
    reviews: [
      {
        id: 'r14-1',
        userName: 'Riddhima Das',
        rating: 5,
        comment: 'Nothing beats Maddox adda with friends, chai, and sound of Dhaak. The true spirit of Durga Puja!',
        timestamp: '1 hour ago'
      }
    ],
    visitCount: 52000,
    photosPostedCount: 3800,
    trafficLevel: 'heavy',
    estimatedQueueMins: 15,
    isBeautyPick: false,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T07:00:00Z',
    crowdDensityPercent: 88,
    bestVisitHours: 'Evening 6:00 PM - 11:00 PM (Great vibes)',
    audioAmbiance: 'Live acoustic guitar & authentic Dhaak beats'
  },

  // 15. Midnapore Rangamati Durgotsav (Paschim Medinipur)
  {
    id: 'pandal-15',
    name: 'Midnapore Rangamati Yubak Brinda',
    pujaName: 'Rangamati Sarbojanin Durgotsav',
    clubName: 'Rangamati Yubak Brinda',
    theme: 'Red Soil Culture & Traditional Patachitra Folk Art',
    description: 'Celebrates the soul of Jangalmahal and Rarh Bengal. Crafted using red laterite clay, natural plant dyes, and giant narrative Patachitra scrolls depicting Goddess Durga fighting Mahishasura.',
    location: { lat: 22.4257, lng: 87.3204 },
    address: 'Rangamati, Midnapore Town, Paschim Medinipur',
    zone: 'Paschim Medinipur',
    images: [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=200&q=80',
    rating: 4.7,
    reviewCount: 510,
    reviews: [
      {
        id: 'r15-1',
        userName: 'Arup Mahato',
        rating: 5,
        comment: 'Heart-touching tribute to Bengal folk artists. The red soil decor gives such an earthly aroma.',
        timestamp: '1 day ago'
      }
    ],
    visitCount: 22000,
    photosPostedCount: 1400,
    trafficLevel: 'low',
    estimatedQueueMins: 10,
    isBeautyPick: true,
    isHeritage: false,
    createdBy: 'community',
    createdAt: '2026-09-02T13:00:00Z',
    crowdDensityPercent: 48,
    bestVisitHours: '5:00 PM - 9:00 PM',
    audioAmbiance: 'Jhumur folk dance and Madol rhythm'
  },

  // 16. Sovabazar Rajbari (Sovabazar, North Kolkata) - Bonedi Bari Heritage
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
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=200&q=80',
    rating: 4.9,
    reviewCount: 2100,
    reviews: [
      {
        id: 'r16-1',
        userName: 'Pranab Deb',
        rating: 5,
        comment: 'Stepping inside the Natmandir transports you straight to 18th century Bengal. Pure royalty and devotion.',
        timestamp: '5 hours ago'
      }
    ],
    visitCount: 44000,
    photosPostedCount: 3100,
    trafficLevel: 'moderate',
    estimatedQueueMins: 20,
    isBeautyPick: true,
    isHeritage: true,
    createdBy: 'official',
    createdAt: '2026-09-01T08:30:00Z',
    crowdDensityPercent: 72,
    bestVisitHours: '10:00 AM - 1:00 PM (Bhog distribution)',
    audioAmbiance: 'Conch shell blasts with classical Dhrupad'
  }
];
