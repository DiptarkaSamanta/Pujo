export type TrafficLevel = 'low' | 'moderate' | 'heavy' | 'jam';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface UserLocationState {
  lat: number;
  lng: number;
  accuracy?: number; // meters
  heading?: number | null; // degrees (0-360)
  speed?: number | null; // meters/sec
  timestamp?: number;
  isRealGps: boolean;
  status: 'prompt' | 'granted' | 'denied' | 'error' | 'unsupported';
  errorMessage?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5
  comment: string;
  timestamp: string;
  photos?: string[];
}

export interface Pandal {
  id: string;
  name: string;
  pujaName: string;
  clubName?: string;
  theme: string;
  description: string;
  location: LatLng;
  address: string;
  zone: string; // West Bengal District / Region (e.g. Kolkata, Howrah, Hooghly, Nadia / Kalyani, Siliguri, etc.)
  images: string[];
  thumbnail: string;
  rating: number; // average rating (1 to 5)
  reviewCount: number;
  reviews: Review[];
  visitCount: number;
  photosPostedCount: number;
  trafficLevel: TrafficLevel;
  estimatedQueueMins: number; // estimated waiting time in minutes
  isBeautyPick?: boolean;
  isHeritage?: boolean;
  createdBy: 'community' | 'official' | 'user';
  createdAt: string;
  distanceKm?: number; // computed dynamically based on user location
  crowdDensityPercent: number; // 0 - 100
  bestVisitHours?: string;
  audioAmbiance?: string;
}

export interface VisitPlanItem {
  id: string;
  pandalId: string;
  scheduledTime: string; // ISO string or time format
  notes?: string;
  completed: boolean;
  addedAt: string;
}

export interface RouteStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
  coordinate: LatLng;
  traffic: TrafficLevel;
}

export interface NavigationRoute {
  destinationId: string;
  totalDistanceKm: number;
  totalDurationMins: number;
  path: LatLng[];
  steps: RouteStep[];
  trafficDelayMins: number;
}
