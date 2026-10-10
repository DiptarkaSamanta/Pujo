import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Navigation, Layers, Check, Plus, Minus, Star, Clock, 
  MapPin, X, Camera, Image as ImageIcon, Sparkles, RefreshCw,
  Crosshair, Trash2, ArrowRight, Compass, LocateFixed, LocateOff,
  Play, Square, AlertTriangle
} from 'lucide-react';
import { LatLng, NavigationRoute, Pandal, TrafficLevel } from '../types';

export type MapTileStyle = 'osm' | 'hot' | 'esri_streets' | 'satellite';

interface MapViewProps {
  pandals: Pandal[];
  userLocation: LatLng;
  locationDetails?: {
    accuracy?: number;
    heading?: number | null;
    speed?: number | null;
    status: 'prompt' | 'granted' | 'denied' | 'error' | 'unsupported';
    isRealGps: boolean;
    errorMessage?: string;
  };
  isFollowUserMode?: boolean;
  onToggleFollowUser?: () => void;
  onUserDraggedMap?: () => void;
  onSimulateMove?: () => void;
  isSimulating?: boolean;
  activeRoute: NavigationRoute | null;
  selectedPandal: Pandal | null;
  onSelectPandal: (pandal: Pandal) => void;
  onMapClickForPin: (coords: LatLng) => void;
  isPinningMode: boolean;
  manualPinLocation: LatLng | null;
  onClearManualPin: () => void;
  onCancelPinningMode: () => void;
  onStartPinningMode: () => void;
  onSaveNewPandal: (pandal: Omit<Pandal, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => void;
  onOpenAddModal: () => void;
  onRecenterUser: () => void;
  onContinueToAddDetails?: () => void;
  onClearAllPandals?: () => void;
  hasRealGps?: boolean;
  onOpenFinder?: () => void;
  onClearRoute?: () => void;
  isActive?: boolean;
}

const TILE_SERVERS: Record<MapTileStyle, { url: string; subdomains: string; attribution: string; maxZoom: number }> = {
  osm: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    subdomains: 'abc',
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  },
  hot: {
    url: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    subdomains: 'abc',
    attribution: '&copy; OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team',
    maxZoom: 19
  },
  esri_streets: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    subdomains: '',
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    subdomains: '',
    attribution: '&copy; Esri &copy; OpenStreetMap contributors',
    maxZoom: 18
  }
};

const BENGAL_ZONES = [
  'Kolkata', 'North Kolkata', 'South Kolkata', 'Howrah', 
  'Hooghly (Chandannagar)', 'North 24 Parganas', 'South 24 Parganas', 
  'Siliguri', 'Nadia', 'Burdwan', 'Midnapore', 'Murshidabad', 'Other Bengal'
];

export const MapView: React.FC<MapViewProps> = ({
  pandals,
  userLocation,
  locationDetails,
  isFollowUserMode = true,
  onToggleFollowUser,
  onUserDraggedMap,
  onSimulateMove,
  isSimulating = false,
  activeRoute,
  selectedPandal,
  onSelectPandal,
  onMapClickForPin,
  isPinningMode,
  manualPinLocation,
  onClearManualPin,
  onCancelPinningMode,
  onStartPinningMode,
  onSaveNewPandal,
  onOpenAddModal,
  onRecenterUser,
  onContinueToAddDetails,
  onClearAllPandals,
  hasRealGps = false,
  onOpenFinder,
  onClearRoute,
  isActive = true
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerGroupRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const userAccuracyCircleRef = useRef<L.Circle | null>(null);
  const tempPinMarkerRef = useRef<L.Marker | null>(null);

  // Reliable refs to eliminate stale closure bugs in Leaflet map event listeners
  const onUserDraggedMapRef = useRef(onUserDraggedMap);
  useEffect(() => {
    onUserDraggedMapRef.current = onUserDraggedMap;
  });

  const onMapClickForPinRef = useRef(onMapClickForPin);
  useEffect(() => {
    onMapClickForPinRef.current = onMapClickForPin;
  });

  const isPinningModeRef = useRef(isPinningMode);
  useEffect(() => {
    isPinningModeRef.current = isPinningMode;
  });

  const onStartPinningModeRef = useRef(onStartPinningMode);
  useEffect(() => {
    onStartPinningModeRef.current = onStartPinningMode;
  });

  const hasAutoCenteredRef = useRef(false);
  const [gpsStatusMessage, setGpsStatusMessage] = useState<string | null>(null);

  const [hoveredPandal, setHoveredPandal] = useState<Pandal | null>(null);
  const [hoverPosition, setHoverPosition] = useState<{ x: number; y: number } | null>(null);
  const [showTrafficOverlay, setShowTrafficOverlay] = useState(true);
  const [tileStyle, setTileStyle] = useState<MapTileStyle>('osm');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Hovering Pin Form State
  const [quickName, setQuickName] = useState('');
  const [quickClub, setQuickClub] = useState('');
  const [quickZone, setQuickZone] = useState('Kolkata');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Create Leaflet map instance
    const map = L.map(mapContainerRef.current, {
      center: [userLocation.lat, userLocation.lng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false
    });

    const config = TILE_SERVERS[tileStyle];
    tileLayerRef.current = L.tileLayer(config.url, {
      maxZoom: config.maxZoom,
      subdomains: config.subdomains,
      attribution: config.attribution
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    routeLayerGroupRef.current = L.layerGroup().addTo(map);

    // Map click handler for marking location - clicking anywhere on the map drops pin!
    map.on('click', (e: L.LeafletMouseEvent) => {
      if (isPinningModeRef.current) {
        onMapClickForPinRef.current({ lat: e.latlng.lat, lng: e.latlng.lng });
      } else {
        onStartPinningModeRef.current();
        onMapClickForPinRef.current({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    });

    // Notify when user manually drags map so auto-follow can pause smoothly
    map.on('dragstart', () => {
      if (onUserDraggedMapRef.current) {
        onUserDraggedMapRef.current();
      }
    });

    mapInstanceRef.current = map;

    // Continuous ResizeObserver to prevent any disappearing map issue
    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    // Initial multi-stage resize triggers
    setTimeout(() => map.invalidateSize(), 50);
    setTimeout(() => map.invalidateSize(), 250);
    setTimeout(() => map.invalidateSize(), 600);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when tileStyle changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const config = TILE_SERVERS[tileStyle];
    tileLayerRef.current = L.tileLayer(config.url, {
      maxZoom: config.maxZoom,
      subdomains: config.subdomains,
      attribution: config.attribution
    }).addTo(mapInstanceRef.current);
  }, [tileStyle]);

  // Invalidate size on tab activation or pinning mode change
  useEffect(() => {
    if (!mapInstanceRef.current || !isActive) return;

    const t1 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 50);
    const t2 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 200);
    const t3 = setTimeout(() => mapInstanceRef.current?.invalidateSize(), 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isActive, isPinningMode]);

  // Auto-follow user live GPS coordinates as they travel in real life
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (isFollowUserMode) {
      mapInstanceRef.current.panTo([userLocation.lat, userLocation.lng], {
        animate: true,
        duration: 0.7
      });
    } else if (hasRealGps && !hasAutoCenteredRef.current) {
      mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 16, { duration: 1.2 });
      hasAutoCenteredRef.current = true;
    }
  }, [userLocation, isFollowUserMode, hasRealGps]);

  // Update User GPS Marker with high-contrast radar beacon, dynamic heading cone, and accuracy circle
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const heading = locationDetails?.heading ?? null;
    const accuracy = locationDetails?.accuracy ?? (hasRealGps ? 20 : 100);
    const speed = locationDetails?.speed ?? null;

    const headingHtml = heading !== null 
      ? `<div class="user-marker-heading" style="transform: translateX(-50%) rotate(${Math.round(heading)}deg);"></div>` 
      : '';

    const badgeText = hasRealGps 
      ? `YOU (Live GPS • ±${Math.round(accuracy)}m)` 
      : `YOU (Est. Location)`;

    const userIcon = L.divIcon({
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

    if (userMarkerRef.current) {
      userMarkerRef.current.setIcon(userIcon);
      userMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
    } else {
      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
        zIndexOffset: 10000
      }).addTo(mapInstanceRef.current);

      userMarkerRef.current.bindPopup(`
        <div style="font-family: 'Outfit', sans-serif; padding: 4px; min-width: 170px;">
          <h4 style="font-weight: 800; color: #0284c7; margin: 0 0 6px 0; font-size: 13px;">📍 Live Hopper Position</h4>
          <p style="margin: 3px 0; font-size: 11px; color: #334155;"><b>Latitude:</b> ${userLocation.lat.toFixed(6)}</p>
          <p style="margin: 3px 0; font-size: 11px; color: #334155;"><b>Longitude:</b> ${userLocation.lng.toFixed(6)}</p>
          <p style="margin: 3px 0; font-size: 11px; color: #334155;"><b>Accuracy:</b> ±${Math.round(accuracy)}m</p>
          ${speed !== null ? `<p style="margin: 3px 0; font-size: 11px; color: #334155;"><b>Live Speed:</b> ${(speed * 3.6).toFixed(1)} km/h</p>` : ''}
          <p style="margin: 6px 0 0 0; font-size: 10px; color: #16a34a; font-weight: 700;">● Dynamically updating as you travel</p>
        </div>
      `);
    }

    const circleRadius = Math.max(accuracy, 20);
    if (userAccuracyCircleRef.current) {
      userAccuracyCircleRef.current.setLatLng([userLocation.lat, userLocation.lng]);
      userAccuracyCircleRef.current.setRadius(circleRadius);
    } else {
      userAccuracyCircleRef.current = L.circle([userLocation.lat, userLocation.lng], {
        radius: circleRadius,
        color: '#0284c7',
        weight: 1.5,
        opacity: 0.7,
        fillColor: '#38bdf8',
        fillOpacity: 0.15
      }).addTo(mapInstanceRef.current);
    }
  }, [userLocation, hasRealGps, locationDetails]);

  // Render Temporary Pin Marker when manualPinLocation is marked
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (tempPinMarkerRef.current) {
      mapInstanceRef.current.removeLayer(tempPinMarkerRef.current);
      tempPinMarkerRef.current = null;
    }

    if (manualPinLocation) {
      const pinIcon = L.divIcon({
        className: 'custom-temp-pin',
        html: `
          <div class="relative flex flex-col items-center">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 via-red-500 to-amber-400 border-2 border-white shadow-2xl flex items-center justify-center text-white text-2xl animate-bounce">
              🪔
            </div>
            <div class="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-red-600 -mt-0.5"></div>
            <div class="bg-black/85 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full mt-1 whitespace-nowrap shadow-lg border border-amber-300">
              📍 Pinned Spot (Drag me!)
            </div>
          </div>
        `,
        iconSize: [48, 64],
        iconAnchor: [24, 56]
      });

      const marker = L.marker([manualPinLocation.lat, manualPinLocation.lng], {
        icon: pinIcon,
        draggable: true,
        zIndexOffset: 8000
      }).addTo(mapInstanceRef.current);

      marker.on('dragend', (e: L.LeafletEvent) => {
        const pos = (e.target as L.Marker).getLatLng();
        onMapClickForPinRef.current({ lat: pos.lat, lng: pos.lng });
      });

      tempPinMarkerRef.current = marker;
      mapInstanceRef.current.panTo([manualPinLocation.lat, manualPinLocation.lng], { animate: true });
    }
  }, [manualPinLocation]);

  // Render Pandal Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    pandals.forEach((pandal) => {
      const isSelected = selectedPandal?.id === pandal.id;
      const trafficColor = 
        pandal.trafficLevel === 'low' ? '#10b981' :
        pandal.trafficLevel === 'moderate' ? '#f59e0b' :
        '#ef4444';

      const customIcon = L.divIcon({
        className: 'pandal-custom-marker',
        html: `
          <div class="pandal-pin-container ${isSelected ? 'selected' : ''}" style="--traffic-color: ${trafficColor}">
            <div class="pandal-pin-inner">
              <span class="pandal-pin-icon">🪔</span>
              ${pandal.isBeautyPick ? '<span class="pandal-star-badge">★</span>' : ''}
              ${showTrafficOverlay ? `<span class="traffic-dot" style="background-color: ${trafficColor}"></span>` : ''}
            </div>
            <div class="pandal-pin-point"></div>
          </div>
        `,
        iconSize: [38, 48],
        iconAnchor: [19, 46]
      });

      const marker = L.marker([pandal.location.lat, pandal.location.lng], {
        icon: customIcon,
        zIndexOffset: isSelected ? 500 : 100
      });

      marker.on('mouseover', (e: L.LeafletMouseEvent) => {
        if (isPinningMode) return;
        setHoveredPandal(pandal);
        const containerPoint = mapInstanceRef.current!.latLngToContainerPoint(e.latlng);
        setHoverPosition({ x: containerPoint.x, y: containerPoint.y });
      });

      marker.on('mouseout', () => {
        setHoveredPandal(null);
      });

      marker.on('click', (e: L.LeafletMouseEvent) => {
        if (isPinningModeRef.current) {
          L.DomEvent.stopPropagation(e);
          onMapClickForPinRef.current({ lat: pandal.location.lat, lng: pandal.location.lng });
          return;
        }
        onSelectPandal(pandal);
      });

      marker.addTo(markersLayerRef.current!);
    });
  }, [pandals, showTrafficOverlay, selectedPandal, isPinningMode]);

  // Render Real Road Route (NO straight dashed lines!)
  useEffect(() => {
    if (!mapInstanceRef.current || !routeLayerGroupRef.current) return;

    routeLayerGroupRef.current.clearLayers();

    if (activeRoute && activeRoute.path.length > 1) {
      const latLngs = activeRoute.path.map(p => [p.lat, p.lng] as [number, number]);

      // 1. Dark glowing casing for highway visibility
      const casing = L.polyline(latLngs, {
        color: '#7f1d1d',
        weight: 8,
        opacity: 0.45,
        lineCap: 'round',
        lineJoin: 'round'
      });
      casing.addTo(routeLayerGroupRef.current);

      // 2. High-contrast solid road line that turns along streets
      const roadLine = L.polyline(latLngs, {
        color: '#dc2626',
        weight: 5,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round'
      });
      roadLine.addTo(routeLayerGroupRef.current);

      // 3. Start Point Marker (Your location)
      const startIcon = L.divIcon({
        className: 'route-start-icon',
        html: `
          <div class="w-6 h-6 rounded-full bg-emerald-600 border-2 border-white shadow-lg flex items-center justify-center text-white text-[10px] font-bold">
            A
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      L.marker(latLngs[0], { icon: startIcon, zIndexOffset: 800 }).addTo(routeLayerGroupRef.current);

      // 4. Destination Marker (Target Pandal)
      const endIcon = L.divIcon({
        className: 'route-end-icon',
        html: `
          <div class="w-7 h-7 rounded-full bg-red-600 border-2 border-amber-300 shadow-xl flex items-center justify-center text-white text-xs font-black">
            🪔
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      L.marker(latLngs[latLngs.length - 1], { icon: endIcon, zIndexOffset: 850 }).addTo(routeLayerGroupRef.current);

      // Fit map bounds to show complete road route
      mapInstanceRef.current.fitBounds(roadLine.getBounds(), {
        padding: [60, 60],
        maxZoom: 16
      });
    }
  }, [activeRoute]);

  const handleCenterUser = () => {
    setGpsStatusMessage('📍 Fetching your current location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([coords.lat, coords.lng], 16, { duration: 1 });
          }
          setGpsStatusMessage(`✓ Centered at (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`);
          setTimeout(() => setGpsStatusMessage(null), 3000);
          onRecenterUser();
        },
        () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1 });
          }
          setGpsStatusMessage(`✓ Centered at (${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)})`);
          setTimeout(() => setGpsStatusMessage(null), 3000);
          onRecenterUser();
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 1 });
      }
      onRecenterUser();
    }
  };

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  // Image Upload Handlers for Hovering Pin Panel
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file) {
        const reader = new FileReader();
        reader.onload = (loadEvt) => {
          if (loadEvt.target?.result) {
            setUploadedPhotos(prev => [...prev, loadEvt.target!.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const addSamplePhoto = () => {
    const samples = [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ];
    const pick = samples[uploadedPhotos.length % samples.length];
    setUploadedPhotos(prev => [...prev, pick]);
  };

  const removePhoto = (idx: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== idx));
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim()) {
      setFormError('Please enter a pandal or puja name');
      return;
    }

    const finalCoord = manualPinLocation || userLocation;
    const defaultImg = 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80';
    const finalPhotos = uploadedPhotos.length > 0 ? uploadedPhotos : [defaultImg];

    onSaveNewPandal({
      name: quickName.trim(),
      pujaName: `${quickName.trim()} Sarbojanin Durgotsav`,
      clubName: quickClub.trim() || undefined,
      theme: 'Community Festive Pratima & Illumination',
      description: 'Newly pinned Durga Puja pandal contributed by a community hopper in West Bengal.',
      location: finalCoord,
      address: `${quickZone}, West Bengal`,
      zone: quickZone,
      images: finalPhotos,
      thumbnail: finalPhotos[0],
      visitCount: 1,
      photosPostedCount: finalPhotos.length,
      trafficLevel: 'moderate',
      estimatedQueueMins: 15,
      isBeautyPick: true,
      isHeritage: false,
      createdBy: 'user',
      audioAmbiance: 'Rhythmic Dhak & Kanshor',
      bestVisitHours: '1:00 AM - 4:00 AM'
    });

    // Reset local state
    setQuickName('');
    setQuickClub('');
    setUploadedPhotos([]);
    setFormError(null);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f3ece4]">
      {/* The Leaflet Canvas */}
      <div 
        ref={mapContainerRef} 
        id="leaflet-map"
        className={`w-full h-full ${isPinningMode ? 'cursor-crosshair' : ''}`}
      />

      {/* 1. Active Navigation Route Banner on Top (Only when navigating) */}
      {activeRoute && (
        <div 
          id="active-nav-route-banner"
          className="absolute top-4 inset-x-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:min-w-[340px] z-40 bg-gradient-to-r from-red-700 to-amber-700 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-amber-300/60 flex items-center justify-between gap-3 backdrop-blur-md animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-sm font-black shrink-0">
              🚗
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-black">
                <span>Shortest Road Route: {activeRoute.totalDistanceKm} km</span>
                <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                  ~{activeRoute.totalDurationMins}m
                </span>
              </div>
              <p className="text-[11px] text-amber-100 font-medium truncate max-w-[200px] sm:max-w-xs">
                To: {activeRoute.destinationId}
              </p>
            </div>
          </div>

          {onClearRoute && (
            <button
              id="clear-nav-route-btn"
              onClick={onClearRoute}
              className="px-2.5 py-1 bg-white/20 hover:bg-white text-white hover:text-red-700 text-xs font-bold rounded-xl transition flex items-center gap-1 shrink-0"
              title="Exit Navigation"
            >
              <X className="w-3.5 h-3.5" />
              <span>Exit</span>
            </button>
          )}
        </div>
      )}

      {/* Toast GPS Notification */}
      {gpsStatusMessage && (
        <div 
          id="map-gps-status-toast"
          className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 text-white text-xs font-bold px-4 py-2 rounded-full shadow-2xl backdrop-blur-sm border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-top-2"
        >
          <span>{gpsStatusMessage}</span>
        </div>
      )}

      {/* 2. Sleek, Non-Obtrusive Pinning Interface on Map (Map remains 100% visible) */}
      {isPinningMode && (
        <>
          {/* Top Pinning Control Banner */}
          <div 
            id="map-pinning-top-banner"
            className="absolute top-4 inset-x-3 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:min-w-[480px] z-40 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl border-2 border-amber-400 text-gray-800 animate-in slide-in-from-top duration-200"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                  🪔
                </div>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-gray-900 leading-tight flex items-center gap-1.5">
                    <span>Pin the Pandal on Map</span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-amber-300">
                      Step 1 of 2
                    </span>
                  </h3>
                  <p className="text-[11px] text-gray-600">
                    {manualPinLocation 
                      ? `Pinned: ${manualPinLocation.lat.toFixed(4)}, ${manualPinLocation.lng.toFixed(4)}` 
                      : 'Tap anywhere on the map or use buttons below:'}
                  </p>
                </div>
              </div>

              {/* TWO SEPARATE ACTION BUTTONS */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {/* Button 1: Use My Current Location */}
                <button
                  id="map-btn-use-current-loc"
                  type="button"
                  onClick={() => {
                    handleCenterUser();
                    onMapClickForPin(userLocation);
                  }}
                  className="flex-1 sm:flex-initial px-3 py-1.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5 transition"
                  title="Place Pin at My Current GPS Location"
                >
                  <Navigation className="w-3.5 h-3.5 fill-white" />
                  <span>Use My Location</span>
                </button>

                {/* Button 2: Mark Manually on Map */}
                <button
                  id="map-btn-mark-manually"
                  type="button"
                  onClick={() => {
                    setGpsStatusMessage('📍 Tap anywhere on the map or drag the 🪔 pin');
                    setTimeout(() => setGpsStatusMessage(null), 3500);
                  }}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center justify-center gap-1.5 transition active:scale-95 ${
                    manualPinLocation 
                      ? 'bg-amber-100 text-amber-900 border-amber-400' 
                      : 'bg-red-50 text-red-700 border-red-300 ring-2 ring-red-400'
                  }`}
                  title="Tap anywhere on the map to pinpoint"
                >
                  <Crosshair className="w-3.5 h-3.5 text-red-600" />
                  <span>{manualPinLocation ? 'Tap / Drag to Move' : 'Tap Map to Pin'}</span>
                </button>

                {/* Cancel Pinning */}
                <button
                  id="map-btn-cancel-pinning"
                  type="button"
                  onClick={onCancelPinningMode}
                  className="p-1.5 text-gray-500 hover:text-red-700 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                  title="Cancel Pinning"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Confirmation Bar (Appears once a location is chosen) */}
          {manualPinLocation && (
            <div 
              id="map-pinning-bottom-confirm"
              className="absolute bottom-20 inset-x-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto sm:min-w-[420px] z-40 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-2xl border-2 border-emerald-500 flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200"
            >
              <div className="flex items-center gap-2.5 text-left w-full sm:w-auto">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-black shrink-0">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                    <span>Spot Marked:</span>
                    <span className="font-mono text-emerald-700 font-bold">
                      {manualPinLocation.lat.toFixed(4)}, {manualPinLocation.lng.toFixed(4)}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500">Tap anywhere on map or drag 🪔 pin to adjust</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  id="confirm-pin-and-add-btn"
                  type="button"
                  onClick={() => {
                    if (onContinueToAddDetails) {
                      onContinueToAddDetails();
                    } else {
                      onOpenAddModal();
                    }
                  }}
                  className="flex-1 sm:flex-initial px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-extrabold rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition"
                >
                  <span>Continue: Add Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={onClearManualPin}
                  className="px-2.5 py-2 text-xs font-semibold text-gray-600 hover:text-red-700 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
                  title="Clear Marked Pin"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* 3. Hover Floating Rating & Info Card (When NOT pinning) */}
      {hoveredPandal && hoverPosition && !isPinningMode && (
        <div 
          id="pandal-hover-card"
          className="absolute z-50 pointer-events-none bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-amber-300 w-56 transform -translate-y-2 transition-all"
          style={{ left: `${hoverPosition.x}px`, top: `${hoverPosition.y}px` }}
        >
          <div className="flex items-center gap-2.5">
            <img 
              src={hoveredPandal.thumbnail || hoveredPandal.images[0]} 
              alt={hoveredPandal.name} 
              className="w-11 h-11 rounded-xl object-cover border border-amber-300 shrink-0 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-black text-gray-900 truncate">{hoveredPandal.name}</h4>
              <p className="text-[10px] text-red-700 font-semibold truncate">{hoveredPandal.pujaName}</p>
              
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="flex items-center text-amber-500 text-xs font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                  {hoveredPandal.rating}
                </div>
                <span className="text-[10px] text-gray-600">
                  ({hoveredPandal.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-2 border-t border-amber-100 flex items-center justify-between text-[10px] font-medium text-gray-700">
            <span className="flex items-center gap-0.5">
              <Clock className="w-3 h-3 text-blue-600" />
              ~{hoveredPandal.estimatedQueueMins}m wait
            </span>
            <span className={`px-1.5 py-0.5 rounded-sm font-bold ${
              hoveredPandal.trafficLevel === 'low' ? 'bg-emerald-100 text-emerald-800' :
              hoveredPandal.trafficLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {hoveredPandal.trafficLevel} traffic
            </span>
          </div>
        </div>
      )}

      {/* 4. Top Floating Action Bar (When NOT pinning) */}
      {!isPinningMode && (
        <div className="absolute top-4 left-4 right-16 sm:right-auto z-40 flex flex-wrap items-center gap-2 max-w-xl pointer-events-none">
          {onOpenFinder && (
            <button
              id="map-top-finder-btn"
              onClick={onOpenFinder}
              className="pointer-events-auto bg-white/95 hover:bg-white text-gray-800 hover:text-red-700 px-3.5 py-2 rounded-2xl shadow-xl border border-amber-300/80 text-xs font-bold flex items-center gap-2 backdrop-blur-md active:scale-95 transition"
            >
              <span className="w-6 h-6 rounded-xl bg-red-600 text-white flex items-center justify-center text-xs font-black">
                🎯
              </span>
              <div className="text-left">
                <span className="block font-black text-xs text-gray-900 leading-none">
                  Find Pandal / Club
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Shortest distance calculator
                </span>
              </div>
            </button>
          )}

          <button
            id="map-top-pin-pandal-btn"
            onClick={onStartPinningMode}
            className="pointer-events-auto bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white px-3.5 py-2 rounded-2xl shadow-xl text-xs font-extrabold flex items-center gap-1.5 active:scale-95 transition"
          >
            <span>🪔 Pin the Pandal</span>
          </button>

          {/* Location Status Indicator & Quick Center */}
          <button
            id="map-top-location-badge"
            onClick={handleCenterUser}
            className="pointer-events-auto bg-white/95 hover:bg-white text-gray-800 px-3 py-2 rounded-2xl shadow-xl border border-blue-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md active:scale-95 transition"
            title="Click to center map on your location"
          >
            <div className={`w-2.5 h-2.5 rounded-full ${hasRealGps ? 'bg-blue-600 animate-ping' : 'bg-blue-600'}`} />
            <span className="font-extrabold text-blue-900">
              {hasRealGps ? `My Location (${userLocation.lat.toFixed(3)}, ${userLocation.lng.toFixed(3)})` : 'My Current Location 📍'}
            </span>
          </button>

          {/* User Location / Marked Spots Status Badge */}
          {pandals.length === 0 ? (
            <div 
              id="map-only-user-location-badge"
              className="pointer-events-auto bg-amber-500/95 text-amber-950 px-3 py-2 rounded-2xl shadow-xl border border-amber-300 text-xs font-bold flex items-center gap-1.5 backdrop-blur-md"
            >
              <span>📍 Only your location is marked • Tap map to mark pandals</span>
            </div>
          ) : (
            <div 
              id="map-marked-pandals-badge"
              className="pointer-events-auto bg-white/95 text-gray-800 px-3 py-2 rounded-2xl shadow-xl border border-emerald-300 text-xs font-bold flex items-center gap-2 backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-emerald-950 font-bold">{pandals.length} Manually Marked Location{pandals.length > 1 ? 's' : ''}</span>
              {onClearAllPandals && (
                <button
                  type="button"
                  onClick={onClearAllPandals}
                  className="ml-1 text-[11px] text-red-600 hover:text-red-800 font-extrabold hover:underline"
                  title="Remove all marked locations"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* GPS Warning Banner if denied or error */}
      {locationDetails?.status === 'denied' && (
        <div 
          id="map-gps-denied-alert"
          className="absolute top-16 inset-x-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto z-50 bg-rose-600 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3 text-xs font-bold border border-rose-400 backdrop-blur-md"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-200 animate-pulse" />
            <span>GPS access is blocked by browser. Allow location in your browser's address bar 🔒 to track your real-life movement.</span>
          </div>
          <button
            onClick={handleCenterUser}
            className="px-2.5 py-1 bg-white text-rose-700 hover:bg-rose-50 text-[11px] font-extrabold rounded-xl shrink-0"
          >
            Retry GPS
          </button>
        </div>
      )}

      {/* 5. Floating Map Controls (Right Side) */}
      <div className="absolute top-4 right-4 z-40 flex flex-col gap-2">
        {/* Recenter GPS */}
        <button
          id="map-recenter-user-btn"
          onClick={handleCenterUser}
          title="Center on My Location"
          className="w-11 h-11 rounded-2xl bg-white shadow-xl border border-amber-200 text-gray-700 hover:text-blue-600 flex items-center justify-center active:scale-95 transition"
        >
          <Navigation className="w-5 h-5 fill-blue-600 text-blue-600" />
        </button>

        {/* Live Follow Me Toggle Button */}
        {onToggleFollowUser && (
          <button
            id="map-follow-user-toggle-btn"
            onClick={onToggleFollowUser}
            title={isFollowUserMode ? "Auto-Follow Me: ACTIVE (Map pans as you move)" : "Auto-Follow Me: OFF (Click to track my movement)"}
            className={`w-11 h-11 rounded-2xl shadow-xl border flex items-center justify-center active:scale-95 transition ${
              isFollowUserMode 
                ? 'bg-blue-600 text-white border-blue-700 shadow-blue-500/40 ring-2 ring-blue-300' 
                : 'bg-white text-gray-700 border-amber-200 hover:text-blue-600'
            }`}
          >
            {isFollowUserMode ? <LocateFixed className="w-5 h-5 animate-pulse" /> : <LocateOff className="w-5 h-5" />}
          </button>
        )}

        {/* Simulation button for testing dynamic movement */}
        {onSimulateMove && (
          <button
            id="map-simulate-move-btn"
            onClick={onSimulateMove}
            title={isSimulating ? "Stop Simulated Travel" : "Simulate Live Travel Movement (Test Hopper)"}
            className={`w-11 h-11 rounded-2xl shadow-xl border flex items-center justify-center active:scale-95 transition ${
              isSimulating
                ? 'bg-amber-600 text-white border-amber-700 shadow-amber-500/40 animate-pulse'
                : 'bg-white text-gray-700 border-amber-200 hover:text-amber-700'
            }`}
          >
            {isSimulating ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-amber-600 text-amber-600" />}
          </button>
        )}

        {/* Map Layers / Style Switcher */}
        <div className="relative">
          <button
            id="map-tile-layer-btn"
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            title="Leaflet Tile Layers"
            className="w-11 h-11 rounded-2xl bg-white shadow-xl border border-amber-200 text-gray-700 hover:text-amber-700 flex items-center justify-center active:scale-95 transition"
          >
            <Layers className="w-5 h-5" />
          </button>

          {/* Layer Selector Dropdown */}
          {showLayerMenu && (
            <div className="absolute right-0 top-13 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-amber-200 p-2 space-y-1 text-xs z-50">
              <div className="px-2 py-1 font-bold text-gray-500 uppercase text-[10px] tracking-wider border-b border-gray-100 mb-1">
                Leaflet Map Tiles
              </div>
              
              <button
                onClick={() => { setTileStyle('osm'); setShowLayerMenu(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-xl font-semibold flex items-center justify-between ${
                  tileStyle === 'osm' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>Classic OpenStreetMap</span>
                {tileStyle === 'osm' && <Check className="w-3.5 h-3.5 text-red-600" />}
              </button>

              <button
                onClick={() => { setTileStyle('hot'); setShowLayerMenu(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-xl font-semibold flex items-center justify-between ${
                  tileStyle === 'hot' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>Festive Streets (OSM Hot)</span>
                {tileStyle === 'hot' && <Check className="w-3.5 h-3.5 text-red-600" />}
              </button>

              <button
                onClick={() => { setTileStyle('esri_streets'); setShowLayerMenu(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-xl font-semibold flex items-center justify-between ${
                  tileStyle === 'esri_streets' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>Esri World Streets</span>
                {tileStyle === 'esri_streets' && <Check className="w-3.5 h-3.5 text-red-600" />}
              </button>

              <button
                onClick={() => { setTileStyle('satellite'); setShowLayerMenu(false); }}
                className={`w-full text-left px-2.5 py-1.5 rounded-xl font-semibold flex items-center justify-between ${
                  tileStyle === 'satellite' ? 'bg-red-50 text-red-700' : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <span>Satellite Imagery</span>
                {tileStyle === 'satellite' && <Check className="w-3.5 h-3.5 text-red-600" />}
              </button>
            </div>
          )}
        </div>

        {/* Traffic toggle */}
        <button
          id="map-toggle-traffic-btn"
          onClick={() => setShowTrafficOverlay(!showTrafficOverlay)}
          title="Toggle Traffic Dots"
          className={`w-11 h-11 rounded-2xl shadow-xl border flex items-center justify-center active:scale-95 transition ${
            showTrafficOverlay 
              ? 'bg-amber-600 text-white border-amber-700 shadow-amber-600/30' 
              : 'bg-white text-gray-600 border-gray-200'
          }`}
        >
          <span className="text-[11px] font-black">🚦</span>
        </button>

        {/* Zoom In Button */}
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="w-11 h-11 rounded-2xl bg-white shadow-xl border border-amber-200 text-gray-700 hover:text-red-700 flex items-center justify-center active:scale-95 transition"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="w-11 h-11 rounded-2xl bg-white shadow-xl border border-amber-200 text-gray-700 hover:text-red-700 flex items-center justify-center active:scale-95 transition"
        >
          <Minus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* Floating Map Traffic Legend (Hidden while pinning to keep view uncluttered) */}
      {!isPinningMode && (
        <div className="absolute bottom-20 left-4 z-30 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-amber-200/80 text-[10px] flex items-center gap-3 text-gray-700">
          <span className="font-bold text-gray-900 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            Live Crowd:
          </span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Smooth</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Moderate</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Packed</span>
        </div>
      )}

      {/* Leaflet Attribution Badge Bottom Right */}
      <div className="absolute bottom-20 right-4 z-20 bg-black/50 text-white text-[9px] px-2 py-0.5 rounded-md backdrop-blur-xs pointer-events-none hidden sm:block">
        Leaflet v1.9 • OpenStreetMap
      </div>
    </div>
  );
};
