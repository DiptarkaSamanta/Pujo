import React, { useState, useEffect, useMemo, useRef } from 'react';
import { LatLng, NavigationRoute, Pandal, Review, VisitPlanItem, UserLocationState } from './types';
import { 
  getStoredPandals, 
  saveStoredPandals, 
  addPandalToStorage, 
  deletePandalFromStorage, 
  clearAllPandalsFromStorage, 
  addReviewToPandal, 
  getStoredVisitPlans, 
  saveStoredVisitPlans 
} from './utils/storage';
import { calculateDistanceKm, fetchRoadRoute } from './utils/geo';
import { Navbar } from './components/Navbar';
import { BottomNav, TabType } from './components/BottomNav';
import { MapView } from './components/MapView';
import { PandalListDrawer } from './components/PandalListDrawer';
import { NextVisitList } from './components/NextVisitList';
import { PandalDetailModal } from './components/PandalDetailModal';
import { AddPandalModal } from './components/AddPandalModal';
import { ScheduleModal } from './components/ScheduleModal';
import { ShareModal } from './components/ShareModal';
import { RouteOptimizerModal } from './components/RouteOptimizerModal';
import { ShortestDistanceFinder } from './components/ShortestDistanceFinder';

export default function App() {
  // 1. Core State
  const [pandals, setPandals] = useState<Pandal[]>([]);
  const [visitPlans, setVisitPlans] = useState<VisitPlanItem[]>([]);
  const [currentTab, setCurrentTab] = useState<TabType>('map');

  // 2. User Geolocation & Dynamic Real-Time Tracking State
  const [userLocation, setUserLocation] = useState<LatLng>({
    lat: 22.5726,
    lng: 88.3639
  });
  const [userLocationState, setUserLocationState] = useState<UserLocationState>({
    lat: 22.5726,
    lng: 88.3639,
    accuracy: 30,
    heading: null,
    speed: null,
    isRealGps: false,
    status: 'prompt'
  });
  const [hasRealGps, setHasRealGps] = useState(false);
  const [isFollowUserMode, setIsFollowUserMode] = useState(true);
  const [isSimulatingTravel, setIsSimulatingTravel] = useState(false);
  const simulationIntervalRef = useRef<number | null>(null);

  // 3. Modals and Active Selections
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);
  const [pandalToShare, setPandalToShare] = useState<Pandal | null>(null);
  const [pandalToSchedule, setPandalToSchedule] = useState<Pandal | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [manualPinLocation, setManualPinLocation] = useState<LatLng | null>(null);
  const [isPinningMode, setIsPinningMode] = useState(false);
  const [isRouteOptimizerOpen, setIsRouteOptimizerOpen] = useState(false);
  const [optimizerTargetPandal, setOptimizerTargetPandal] = useState<Pandal | null>(null);
  const [activeNavRoute, setActiveNavRoute] = useState<NavigationRoute | null>(null);

  // 4. Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');

  // Load initial data from persistence
  useEffect(() => {
    const loadedPandals = getStoredPandals();
    setPandals(loadedPandals);

    const loadedPlans = getStoredVisitPlans();
    setVisitPlans(loadedPlans);
  }, []);

  // Request & dynamically watch live GPS location (zero cached age for real-time tracking)
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserLocationState(prev => ({
        ...prev,
        status: 'unsupported',
        errorMessage: 'Geolocation is not supported by your browser.'
      }));
      return;
    }

    // Permission status listener if supported
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: 'geolocation' }).then((permissionStatus) => {
        setUserLocationState(prev => ({
          ...prev,
          status: permissionStatus.state === 'granted' ? 'granted' : permissionStatus.state === 'denied' ? 'denied' : 'prompt'
        }));
        permissionStatus.onchange = () => {
          setUserLocationState(prev => ({
            ...prev,
            status: permissionStatus.state === 'granted' ? 'granted' : permissionStatus.state === 'denied' ? 'denied' : 'prompt'
          }));
        };
      }).catch(() => {});
    }

    const handleSuccess = (pos: GeolocationPosition) => {
      if (isSimulatingTravel) return;
      const { latitude, longitude, accuracy, heading, speed } = pos.coords;
      const coords = { lat: latitude, lng: longitude };
      setUserLocation(coords);
      setUserLocationState({
        lat: latitude,
        lng: longitude,
        accuracy: accuracy,
        heading: heading ?? null,
        speed: speed ?? null,
        timestamp: pos.timestamp,
        isRealGps: true,
        status: 'granted'
      });
      setHasRealGps(true);
    };

    const handleError = (err: GeolocationPositionError) => {
      if (isSimulatingTravel) return;
      let msg = 'Could not acquire GPS location';
      if (err.code === 1) msg = 'Location permission denied by browser. Please enable location permissions.';
      else if (err.code === 2) msg = 'Location unavailable from device GPS sensor.';
      else if (err.code === 3) msg = 'GPS connection timed out.';
      
      setUserLocationState(prev => ({
        ...prev,
        status: err.code === 1 ? 'denied' : 'error',
        errorMessage: msg
      }));
    };

    // Immediate initial query with maximum high accuracy
    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );

    // Continuous watch for movement (maximumAge: 0 forces fresh GPS hardware polling)
    const watchId = navigator.geolocation.watchPosition(
      handleSuccess,
      handleError,
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [isSimulatingTravel]);

  // Real-time travel simulation for interactive testing
  const toggleSimulation = () => {
    if (isSimulatingTravel) {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
        simulationIntervalRef.current = null;
      }
      setIsSimulatingTravel(false);
    } else {
      setIsSimulatingTravel(true);
      setIsFollowUserMode(true);

      const startLat = userLocation.lat;
      const startLng = userLocation.lng;
      let step = 0;
      const totalSteps = 60;

      // Generate a realistic street walking path with curves & headings
      const pathPoints: { lat: number; lng: number; heading: number }[] = [];
      for (let i = 0; i < totalSteps; i++) {
        const offsetLat = (i * 0.00032) + (Math.sin(i / 3) * 0.00015);
        const offsetLng = (i * 0.00025) + (Math.cos(i / 3) * 0.00012);
        const headingAngle = (50 + Math.sin(i / 2) * 25 + 360) % 360;
        pathPoints.push({
          lat: startLat + offsetLat,
          lng: startLng + offsetLng,
          heading: headingAngle
        });
      }

      simulationIntervalRef.current = window.setInterval(() => {
        if (step >= pathPoints.length) {
          step = 0;
        }
        const point = pathPoints[step];
        const newCoords = { lat: point.lat, lng: point.lng };
        setUserLocation(newCoords);
        setUserLocationState({
          lat: point.lat,
          lng: point.lng,
          accuracy: 6,
          heading: point.heading,
          speed: 1.4, // ~5 km/h walking speed
          timestamp: Date.now(),
          isRealGps: true,
          status: 'granted'
        });
        setHasRealGps(true);
        step++;
      }, 1200);
    }
  };

  useEffect(() => {
    return () => {
      if (simulationIntervalRef.current) {
        clearInterval(simulationIntervalRef.current);
      }
    };
  }, []);

  // Calculate distance for each pandal dynamically
  const pandalsWithDistance = useMemo(() => {
    return pandals.map(p => ({
      ...p,
      distanceKm: calculateDistanceKm(userLocation, p.location)
    }));
  }, [pandals, userLocation]);

  // Filtered & prioritized pandals
  const filteredPandals = useMemo(() => {
    let result = [...pandalsWithDistance];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        (p.clubName && p.clubName.toLowerCase().includes(q)) ||
        p.pujaName.toLowerCase().includes(q) ||
        p.theme.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.zone.toLowerCase().includes(q)
      );
    }

    // Zone filter
    if (selectedZone !== 'all') {
      result = result.filter(p => p.zone === selectedZone);
    }

    // Priority & sorting filters
    switch (activeFilter) {
      case 'nearest':
        result.sort((a, b) => (a.distanceKm || 0) - (b.distanceKm || 0));
        break;
      case 'visited': // Highest visited priority
        result.sort((a, b) => b.visitCount - a.visitCount);
        break;
      case 'photos': // Highest picture posted priority
        result.sort((a, b) => b.photosPostedCount - a.photosPostedCount);
        break;
      case 'top_rated': // Grand & beautiful priority
        result.sort((a, b) => b.rating - a.rating || (b.isBeautyPick ? 1 : 0) - (a.isBeautyPick ? 1 : 0));
        break;
      case 'low_traffic':
        result = result.filter(p => p.trafficLevel === 'low');
        break;
      default:
        // Default: sort by trending score (combination of visits & rating)
        result.sort((a, b) => (b.rating * 10000 + b.visitCount) - (a.rating * 10000 + a.visitCount));
        break;
    }

    return result;
  }, [pandalsWithDistance, searchQuery, activeFilter, selectedZone]);

  // Handlers
  const handleSaveNewPandal = (newPandal: Pandal) => {
    const updated = addPandalToStorage(newPandal);
    setPandals(updated);
    setIsAddModalOpen(false);
    setManualPinLocation(null);
    setIsPinningMode(false);
    setSelectedPandal(newPandal);
    setCurrentTab('map');
  };

  const handleAddReview = (pandalId: string, review: Review) => {
    const updated = addReviewToPandal(pandalId, review);
    setPandals(updated);
    if (selectedPandal && selectedPandal.id === pandalId) {
      const refreshed = updated.find(p => p.id === pandalId);
      if (refreshed) setSelectedPandal(refreshed);
    }
  };

  const handleSaveVisitPlan = (plan: VisitPlanItem) => {
    const updated = [plan, ...visitPlans];
    setVisitPlans(updated);
    saveStoredVisitPlans(updated);
  };

  const handleTogglePlanComplete = (planId: string) => {
    const updated = visitPlans.map(p => 
      p.id === planId ? { ...p, completed: !p.completed } : p
    );
    setVisitPlans(updated);
    saveStoredVisitPlans(updated);
  };

  const handleDeletePlan = (planId: string) => {
    const updated = visitPlans.filter(p => p.id !== planId);
    setVisitPlans(updated);
    saveStoredVisitPlans(updated);
  };

  const handleStartNavigation = async (pandal: Pandal) => {
    setSelectedPandal(null);
    setCurrentTab('map');
    const roadRoute = await fetchRoadRoute(userLocation, pandal.location, pandal.name, pandal.trafficLevel);
    setActiveNavRoute(roadRoute);
  };

  const handleMapClickForPin = (coords: LatLng) => {
    setManualPinLocation(coords);
  };

  const handleCancelPinningMode = () => {
    setIsPinningMode(false);
    setManualPinLocation(null);
  };

  const handleClearManualPin = () => {
    setManualPinLocation(null);
  };

  const handleStartPinningMode = () => {
    setCurrentTab('map');
    setIsPinningMode(true);
    setIsAddModalOpen(false);
    if (!manualPinLocation) {
      setManualPinLocation(userLocation);
    }
  };

  const handleContinueToAddDetails = () => {
    setIsPinningMode(false);
    setIsAddModalOpen(true);
  };

  const handleSaveHoverPandal = (newPandalData: Omit<Pandal, 'id' | 'rating' | 'reviewCount' | 'reviews'>) => {
    const created: Pandal = {
      ...newPandalData,
      id: 'pandal-custom-' + Date.now(),
      rating: 5,
      reviewCount: 1,
      reviews: [
        {
          id: 'rev-' + Date.now(),
          userName: 'Community Hopper (You)',
          rating: 5,
          comment: 'Pinned to the Durga Puja Parikrama Bengal Map!',
          timestamp: 'Just now',
          photos: newPandalData.images
        }
      ]
    };
    handleSaveNewPandal(created);
    setIsPinningMode(false);
    setManualPinLocation(null);
    setSelectedPandal(created);
  };

  const handleRecenterUser = () => {
    setIsFollowUserMode(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          setUserLocation(coords);
          setUserLocationState({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            heading: pos.coords.heading ?? null,
            speed: pos.coords.speed ?? null,
            timestamp: pos.timestamp,
            isRealGps: true,
            status: 'granted'
          });
          setHasRealGps(true);
        },
        (err) => {
          if (err.code === 1) {
            setUserLocationState(prev => ({ ...prev, status: 'denied' }));
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    }
  };

  const handleDeletePandal = (pandalId: string) => {
    const updated = deletePandalFromStorage(pandalId);
    setPandals(updated);
    if (selectedPandal?.id === pandalId) {
      setSelectedPandal(null);
    }
    setVisitPlans(prev => prev.filter(p => p.pandalId !== pandalId));
  };

  const handleClearAllPandals = () => {
    if (window.confirm && !window.confirm('Are you sure you want to remove all manually marked locations?')) {
      return;
    }
    clearAllPandalsFromStorage();
    setPandals([]);
    setSelectedPandal(null);
    setVisitPlans([]);
  };

  const pendingPlansCount = visitPlans.filter(p => !p.completed).length;

  return (
    <div className="h-screen w-screen flex flex-col bg-amber-50/20 text-slate-900 overflow-hidden font-['Outfit',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        userLocation={userLocation}
        totalPandals={pandals.length}
        onOpenAddModal={handleStartPinningMode}
        onOpenOptimizer={() => {
          setOptimizerTargetPandal(null);
          setIsRouteOptimizerOpen(true);
        }}
        onOpenFinder={() => setCurrentTab('finder')}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 relative overflow-hidden">
        {/* TAB 1: Live Interactive Map View */}
        <div className={`w-full h-full ${currentTab === 'map' ? 'block' : 'hidden'}`}>
          <MapView
            pandals={filteredPandals}
            userLocation={userLocation}
            locationDetails={userLocationState}
            isFollowUserMode={isFollowUserMode}
            onToggleFollowUser={() => setIsFollowUserMode(prev => !prev)}
            onUserDraggedMap={() => setIsFollowUserMode(false)}
            onSimulateMove={toggleSimulation}
            isSimulating={isSimulatingTravel}
            activeRoute={activeNavRoute}
            selectedPandal={selectedPandal}
            onSelectPandal={(p) => setSelectedPandal(p)}
            onMapClickForPin={handleMapClickForPin}
            isPinningMode={isPinningMode}
            manualPinLocation={manualPinLocation}
            onClearManualPin={handleClearManualPin}
            onCancelPinningMode={handleCancelPinningMode}
            onStartPinningMode={handleStartPinningMode}
            onSaveNewPandal={handleSaveHoverPandal}
            onOpenAddModal={handleStartPinningMode}
            onContinueToAddDetails={handleContinueToAddDetails}
            onClearAllPandals={handleClearAllPandals}
            hasRealGps={hasRealGps}
            onRecenterUser={handleRecenterUser}
            onOpenFinder={() => setCurrentTab('finder')}
            onClearRoute={() => setActiveNavRoute(null)}
            isActive={currentTab === 'map'}
          />
        </div>

        {/* TAB 2: Explore Pandals List */}
        <div className={`w-full h-full ${currentTab === 'list' ? 'block' : 'hidden'}`}>
          <PandalListDrawer
            pandals={filteredPandals}
            allPandals={pandalsWithDistance}
            onSelectPandal={(p) => setSelectedPandal(p)}
            onNavigate={handleStartNavigation}
            onAddToNextVisit={(p) => setPandalToSchedule(p)}
            onShare={(p) => setPandalToShare(p)}
            onOpenAddModal={handleStartPinningMode}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            selectedZone={selectedZone}
            setSelectedZone={setSelectedZone}
          />
        </div>

        {/* TAB 3: Find Club / Pandal & Shortest Distance Section */}
        <div className={`w-full h-full ${currentTab === 'finder' ? 'block' : 'hidden'}`}>
          <ShortestDistanceFinder
            userLocation={userLocation}
            pandals={pandalsWithDistance}
            onSelectPandal={(p) => {
              setSelectedPandal(p);
              setCurrentTab('map');
            }}
            onStartNavigation={(p) => {
              handleStartNavigation(p);
            }}
            onOpenAddModal={handleStartPinningMode}
          />
        </div>

        {/* TAB 4: Next Visit Scheduled Itinerary */}
        <div className={`w-full h-full ${currentTab === 'next_visit' ? 'block' : 'hidden'}`}>
          <NextVisitList
            visitPlans={visitPlans}
            pandals={pandalsWithDistance}
            userLocation={userLocation}
            onToggleComplete={handleTogglePlanComplete}
            onDeletePlan={handleDeletePlan}
            onSelectPandal={(p) => setSelectedPandal(p)}
            onOptimizeRoute={() => {
              setOptimizerTargetPandal(null);
              setIsRouteOptimizerOpen(true);
            }}
            onStartNavigation={handleStartNavigation}
            onAddPlanItem={() => setCurrentTab('list')}
          />
        </div>

        {/* TAB 5: Route Optimizer View */}
        <div className={`w-full h-full ${currentTab === 'optimizer' ? 'block' : 'hidden'}`}>
          <div className="h-full flex items-center justify-center p-4 bg-amber-50/50">
            <button
              onClick={() => {
                setOptimizerTargetPandal(null);
                setIsRouteOptimizerOpen(true);
              }}
              className="py-4 px-6 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold rounded-2xl shadow-xl flex items-center gap-3 text-base hover:scale-105 transition"
            >
              Open Route Optimizer & Shortest Path Solver 🧭
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Mobile Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={(tab) => {
          if (tab === 'optimizer') {
            setOptimizerTargetPandal(null);
            setIsRouteOptimizerOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        pendingPlansCount={pendingPlansCount}
        onOpenAddModal={handleStartPinningMode}
      />

      {/* MODAL 1: Pandal Full Details Sheet */}
      {selectedPandal && (
        <PandalDetailModal
          pandal={selectedPandal}
          onClose={() => setSelectedPandal(null)}
          onStartNavigation={handleStartNavigation}
          onAddToNextVisit={(p) => setPandalToSchedule(p)}
          onShare={(p) => setPandalToShare(p)}
          onAddReview={handleAddReview}
          onDeletePandal={handleDeletePandal}
        />
      )}

      {/* MODAL 2: Add / Pin New Pandal with Camera / Gallery */}
      {isAddModalOpen && (
        <AddPandalModal
          initialLocation={manualPinLocation}
          userLocation={userLocation}
          onClose={() => setIsAddModalOpen(false)}
          onSavePandal={handleSaveNewPandal}
          onSelectMapLocationPrompt={() => {
            setIsAddModalOpen(false);
            setIsPinningMode(true);
            setCurrentTab('map');
          }}
        />
      )}

      {/* MODAL 3: Schedule to Next Visit */}
      {pandalToSchedule && (
        <ScheduleModal
          pandal={pandalToSchedule}
          onClose={() => setPandalToSchedule(null)}
          onSavePlan={handleSaveVisitPlan}
        />
      )}

      {/* MODAL 4: Social Media Sharing */}
      {pandalToShare && (
        <ShareModal
          pandal={pandalToShare}
          onClose={() => setPandalToShare(null)}
        />
      )}

      {/* MODAL 5: Route Optimizer & Turn-by-Turn Navigation */}
      {isRouteOptimizerOpen && (
        <RouteOptimizerModal
          userLocation={userLocation}
          allPandals={pandalsWithDistance}
          initialTargetPandal={optimizerTargetPandal}
          onClose={() => setIsRouteOptimizerOpen(false)}
          onSelectActivePandal={(p) => setSelectedPandal(p)}
          onUpdateNavRouteOnMap={(route) => setActiveNavRoute(route)}
        />
      )}
    </div>
  );
}
