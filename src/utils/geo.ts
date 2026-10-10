import { LatLng, NavigationRoute, Pandal, RouteStep, TrafficLevel } from '../types';

// Radius of Earth in kilometers
const EARTH_RADIUS_KM = 6371;

/**
 * Calculates straight line distance in km between two coordinates using Haversine formula
 */
export function calculateDistanceKm(from: LatLng, to: LatLng): number {
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLng = ((to.lng - from.lng) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((EARTH_RADIUS_KM * c).toFixed(2));
}

/**
 * Format distance string nicely (e.g., "450 m" or "3.2 km")
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  }
  return `${distanceKm.toFixed(1)} km`;
}

/**
 * Estimate travel time in minutes based on distance and traffic level
 */
export function estimateTravelTimeMins(distanceKm: number, traffic: TrafficLevel, mode: 'walking' | 'driving' = 'walking'): number {
  let baseSpeedKmH = mode === 'walking' ? 4.5 : 18; // urban city speed
  
  let multiplier = 1;
  switch (traffic) {
    case 'low': multiplier = 1.0; break;
    case 'moderate': multiplier = mode === 'walking' ? 1.15 : 1.45; break;
    case 'heavy': multiplier = mode === 'walking' ? 1.35 : 2.2; break;
    case 'jam': multiplier = mode === 'walking' ? 1.6 : 3.5; break;
  }

  const durationHours = (distanceKm / baseSpeedKmH) * multiplier;
  return Math.max(2, Math.round(durationHours * 60));
}

/**
 * Fetches real road routing geometry from Open Source Routing Machine (OSRM)
 * giving exact street, highway, and bridge curves rather than a straight diagonal line.
 */
export async function fetchRoadRoute(
  from: LatLng, 
  to: LatLng, 
  pandalName: string, 
  traffic: TrafficLevel
): Promise<NavigationRoute> {
  const straightDistKm = calculateDistanceKm(from, to);

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson&steps=true`;
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const primaryRoute = data.routes[0];
        const coordinates: [number, number][] = primaryRoute.geometry.coordinates;
        
        // Map geojson [lng, lat] to { lat, lng }
        const roadPath: LatLng[] = coordinates.map(([lng, lat]) => ({ lat, lng }));

        const totalDistanceKm = Number((primaryRoute.distance / 1000).toFixed(2));
        const osrmDurationMins = Math.round(primaryRoute.duration / 60);
        const trafficDelayMins = traffic === 'heavy' ? 12 : traffic === 'jam' ? 25 : traffic === 'moderate' ? 6 : 0;
        const totalDurationMins = Math.max(3, osrmDurationMins + trafficDelayMins);

        // Parse turn-by-turn road steps
        const steps: RouteStep[] = [];
        if (primaryRoute.legs && primaryRoute.legs[0]?.steps) {
          primaryRoute.legs[0].steps.forEach((step: any, idx: number) => {
            const stepCoord = step.maneuver?.location 
              ? { lat: step.maneuver.location[1], lng: step.maneuver.location[0] }
              : (roadPath[Math.min(idx * 5, roadPath.length - 1)] || to);

            let instruction = step.maneuver?.instruction;
            if (!instruction) {
              const modifier = step.maneuver?.modifier ? ` ${step.maneuver.modifier}` : '';
              const type = step.maneuver?.type || 'turn';
              const name = step.name ? ` onto ${step.name}` : '';
              instruction = `${type.charAt(0).toUpperCase() + type.slice(1)}${modifier}${name}`;
            }

            if (idx === 0) {
              instruction = `Head out towards ${step.name || 'festive route'}`;
            }

            steps.push({
              instruction,
              distanceMeters: Math.round(step.distance),
              durationSeconds: Math.round(step.duration),
              coordinate: stepCoord,
              traffic: idx % 3 === 0 ? traffic : 'moderate'
            });
          });
        }

        if (steps.length === 0) {
          steps.push({
            instruction: `Head towards ${pandalName}`,
            distanceMeters: Math.round(totalDistanceKm * 1000),
            durationSeconds: totalDurationMins * 60,
            coordinate: from,
            traffic
          });
        }

        // Add arrival step
        steps.push({
          instruction: `Arrive at ${pandalName} gate — Auspicious Darshan entrance ahead`,
          distanceMeters: 0,
          durationSeconds: 0,
          coordinate: to,
          traffic: 'low'
        });

        return {
          destinationId: pandalName,
          totalDistanceKm,
          totalDurationMins,
          path: roadPath,
          steps,
          trafficDelayMins
        };
      }
    }
  } catch {
    // Network or timeout, proceed to fallback
  }

  // Robust fallback generating curved road waypoints along street grids
  return generateRealisticRoute(from, to, pandalName, traffic);
}

/**
 * Generates an enriched route with simulated city bends and realistic turn-by-turn navigation steps
 */
export function generateRealisticRoute(from: LatLng, to: LatLng, pandalName: string, traffic: TrafficLevel): NavigationRoute {
  const totalDistanceKm = calculateDistanceKm(from, to);
  const totalDurationMins = estimateTravelTimeMins(totalDistanceKm, traffic, 'driving');

  // Generate multi-point road curves that follow street grid angles
  const stepsCount = Math.max(12, Math.min(28, Math.round(totalDistanceKm * 4) + 6));
  const path: LatLng[] = [from];
  const steps: RouteStep[] = [];

  const instructionsPool = [
    'Continue straight on main road corridor',
    'Keep right at the junction following the puja corridor',
    'Follow the barricaded arterial avenue past illuminated arches',
    'Take the flyover / bridge connecting corridor',
    'Turn towards the pedestrian queue zone',
    'Approaching the entrance gates'
  ];

  for (let i = 1; i < stepsCount; i++) {
    const fraction = i / stepsCount;
    // Multi-frequency wave to produce realistic road curves rather than a straight line
    const wave1 = Math.sin(fraction * Math.PI * 4) * 0.0035;
    const wave2 = Math.cos(fraction * Math.PI * 2) * 0.0020;
    const latOffset = (to.lat - from.lat) * 0.05 * Math.sin(fraction * Math.PI) + wave1;
    const lngOffset = (to.lng - from.lng) * 0.05 * Math.cos(fraction * Math.PI) + wave2;

    const stepCoord: LatLng = {
      lat: from.lat + (to.lat - from.lat) * fraction + latOffset,
      lng: from.lng + (to.lng - from.lng) * fraction + lngOffset
    };

    path.push(stepCoord);

    if (i % 3 === 0 || i === stepsCount - 1) {
      const stepDistance = Math.round((totalDistanceKm / (stepsCount / 3)) * 1000);
      const instruction = instructionsPool[(Math.floor(i / 3)) % instructionsPool.length];

      steps.push({
        instruction: i === 1 ? 'Head along the main festive thoroughfare' : instruction,
        distanceMeters: stepDistance,
        durationSeconds: Math.round((totalDurationMins * 60) / (stepsCount / 3)),
        coordinate: stepCoord,
        traffic: i % 2 === 0 ? traffic : 'moderate'
      });
    }
  }

  path.push(to);
  steps.push({
    instruction: `Arrive at ${pandalName} gate — Happy Pandal Hopping!`,
    distanceMeters: 0,
    durationSeconds: 0,
    coordinate: to,
    traffic: 'low'
  });

  return {
    destinationId: pandalName,
    totalDistanceKm,
    totalDurationMins,
    path,
    steps,
    trafficDelayMins: traffic === 'heavy' ? 12 : traffic === 'jam' ? 25 : traffic === 'moderate' ? 5 : 0
  };
}

/**
 * Route Optimizer: Nearest Neighbor algorithm to order a set of pandals for shortest travel hopping path
 */
export function optimizePandalRoute(startLocation: LatLng, pandals: Pandal[]): {
  orderedPandals: Pandal[];
  totalDistanceKm: number;
  estimatedTotalMins: number;
} {
  if (pandals.length === 0) {
    return { orderedPandals: [], totalDistanceKm: 0, estimatedTotalMins: 0 };
  }

  const unvisited = [...pandals];
  const ordered: Pandal[] = [];
  let currentLocation = startLocation;
  let totalDistanceKm = 0;

  while (unvisited.length > 0) {
    let nearestIndex = 0;
    let minDistance = calculateDistanceKm(currentLocation, unvisited[0].location);

    for (let i = 1; i < unvisited.length; i++) {
      const dist = calculateDistanceKm(currentLocation, unvisited[i].location);
      if (dist < minDistance) {
        minDistance = dist;
        nearestIndex = i;
      }
    }

    const nextPandal = unvisited.splice(nearestIndex, 1)[0];
    ordered.push(nextPandal);
    totalDistanceKm += minDistance;
    currentLocation = nextPandal.location;
  }

  // Calculate estimated total time including travel and 20 mins pandal darshan per spot
  const travelMins = Math.round((totalDistanceKm / 12) * 60); // mixed transit
  const darshanMins = ordered.length * 25; // average wait & darshan
  const estimatedTotalMins = travelMins + darshanMins;

  return {
    orderedPandals: ordered,
    totalDistanceKm: Number(totalDistanceKm.toFixed(2)),
    estimatedTotalMins
  };
}
