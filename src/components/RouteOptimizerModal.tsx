import React, { useState, useEffect } from 'react';
import { 
  X, Route, Navigation, Clock, AlertTriangle, CheckCircle, 
  MapPin, Sparkles, ArrowRight, Compass, ShieldAlert, Volume2, VolumeX 
} from 'lucide-react';
import { LatLng, NavigationRoute, Pandal, RouteStep } from '../types';
import { calculateDistanceKm, formatDistance, fetchRoadRoute, optimizePandalRoute } from '../utils/geo';
import confetti from 'canvas-confetti';

interface RouteOptimizerModalProps {
  userLocation: LatLng;
  allPandals: Pandal[];
  initialTargetPandal: Pandal | null;
  onClose: () => void;
  onSelectActivePandal: (pandal: Pandal) => void;
  onUpdateNavRouteOnMap: (route: NavigationRoute | null) => void;
}

export const RouteOptimizerModal: React.FC<RouteOptimizerModalProps> = ({
  userLocation,
  allPandals,
  initialTargetPandal,
  onClose,
  onSelectActivePandal,
  onUpdateNavRouteOnMap
}) => {
  const [mode, setMode] = useState<'single' | 'multi'>(initialTargetPandal ? 'single' : 'multi');
  const [selectedTargetId, setSelectedTargetId] = useState<string>(
    initialTargetPandal ? initialTargetPandal.id : (allPandals[0]?.id || '')
  );

  // Multi-stop selection
  const [selectedMultiIds, setSelectedMultiIds] = useState<string[]>(
    allPandals.slice(0, 4).map(p => p.id)
  );

  // Active Real-time Navigation State
  const [isNavigating, setIsNavigating] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [activeRoute, setActiveRoute] = useState<NavigationRoute | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const targetPandal = allPandals.find(p => p.id === selectedTargetId);

  // Generate real road route for single pandal
  useEffect(() => {
    let isCancelled = false;
    if (mode === 'single' && targetPandal) {
      fetchRoadRoute(
        userLocation, 
        targetPandal.location, 
        targetPandal.name, 
        targetPandal.trafficLevel
      ).then(generated => {
        if (!isCancelled) {
          setActiveRoute(generated);
          onUpdateNavRouteOnMap(generated);
        }
      });
    }
    return () => {
      isCancelled = true;
    };
  }, [mode, selectedTargetId, userLocation]);

  // Compute optimized multi-stop route
  const multiPandals = allPandals.filter(p => selectedMultiIds.includes(p.id));
  const optimizedMulti = optimizePandalRoute(userLocation, multiPandals);

  const handleStartRealtimeNavigation = () => {
    if (!activeRoute) return;
    setIsNavigating(true);
    setCurrentStepIndex(0);
  };

  const handleNextNavStep = () => {
    if (!activeRoute) return;
    if (currentStepIndex < activeRoute.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Arrived!
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 }
      });
      alert(`🎉 You have arrived at ${targetPandal?.name || 'the pandal'}! Enjoy the auspicious Darshan and festivities!`);
      setIsNavigating(false);
    }
  };

  const toggleMultiPandal = (id: string) => {
    if (selectedMultiIds.includes(id)) {
      if (selectedMultiIds.length > 2) {
        setSelectedMultiIds(prev => prev.filter(item => item !== id));
      } else {
        alert('Please keep at least 2 pandals for multi-stop route optimization.');
      }
    } else {
      setSelectedMultiIds(prev => [...prev, id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-xs p-0 sm:p-4">
      <div 
        id="route-optimizer-modal"
        className="w-full max-w-xl max-h-[92vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
      >
        {/* Navigation Mode Banner */}
        {isNavigating && activeRoute ? (
          <div className="bg-slate-900 text-white p-4 shrink-0 flex flex-col gap-2 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Live Turn-by-Turn Navigation Active
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
                </button>
                <button
                  onClick={() => { setIsNavigating(false); }}
                  className="text-xs font-bold bg-red-600 hover:bg-red-700 px-2.5 py-1 rounded-lg text-white"
                >
                  Exit Nav
                </button>
              </div>
            </div>

            {/* Turn instruction card */}
            <div className="bg-slate-800 p-3.5 rounded-2xl border border-slate-700 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shrink-0 shadow-md">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-white leading-tight">
                  {activeRoute.steps[currentStepIndex]?.instruction}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-300 mt-1">
                  <span>Step {currentStepIndex + 1} of {activeRoute.steps.length}</span>
                  <span>•</span>
                  <span>Dist: ~{activeRoute.steps[currentStepIndex]?.distanceMeters}m</span>
                </div>
              </div>
            </div>

            {/* Quick advance button */}
            <button
              onClick={handleNextNavStep}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition"
            >
              <span>{currentStepIndex === activeRoute.steps.length - 1 ? 'Mark As Arrived 🏁' : 'Proceed to Next Turn ➔'}</span>
            </button>
          </div>
        ) : (
          /* Normal Header */
          <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-4 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Route className="w-4 h-4 text-amber-200" />
              </div>
              <div>
                <h3 className="font-bold text-base sm:text-lg leading-tight">Route & Traffic Optimizer</h3>
                <p className="text-[11px] text-amber-200 font-medium">Shortest hopping path & live traffic routing</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Tab Switcher: Single Target Navigation vs Multi-Pandal Hopping Optimizer */}
        {!isNavigating && (
          <div className="p-3 bg-amber-50/70 border-b border-amber-200 shrink-0">
            <div className="grid grid-cols-2 gap-2 bg-gray-200/80 p-1 rounded-xl">
              <button
                type="button"
                id="tab-single-pandal"
                onClick={() => setMode('single')}
                className={`py-2 rounded-lg text-xs font-bold transition ${
                  mode === 'single'
                    ? 'bg-white text-red-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🎯 Single Pandal Shortest Route
              </button>

              <button
                type="button"
                id="tab-multi-pandal"
                onClick={() => setMode('multi')}
                className={`py-2 rounded-lg text-xs font-bold transition ${
                  mode === 'multi'
                    ? 'bg-white text-red-700 shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                ✨ Multi-Stop Hopping Optimizer
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {allPandals.length === 0 ? (
            <div className="p-8 text-center bg-amber-50/50 rounded-3xl border border-dashed border-amber-300">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
                🧭
              </div>
              <h3 className="font-extrabold text-gray-900 text-base">No Locations Marked Yet</h3>
              <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto leading-relaxed">
                Currently, only your location is marked on the map. You can manually mark pandals and clubs on the map first to calculate shortest routes and traffic navigation!
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-bold rounded-2xl shadow-md active:scale-95 transition"
              >
                Return to Map to Mark Pandals
              </button>
            </div>
          ) : (
            <>
              {/* Mode A: Single Pandal Route with Traffic */}
              {mode === 'single' && targetPandal && activeRoute && (
                <div className="space-y-3">
              {/* Target Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Target Pandal:</label>
                <select
                  value={selectedTargetId}
                  onChange={(e) => setSelectedTargetId(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-300 bg-white font-semibold focus:outline-hidden focus:ring-2 focus:ring-red-500"
                >
                  {allPandals.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.zone}) - {p.rating} ⭐
                    </option>
                  ))}
                </select>
              </div>

              {/* Shortest Route Summary Card */}
              <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900">
                    Optimized Shortest Path
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    targetPandal.trafficLevel === 'low' ? 'bg-emerald-100 text-emerald-800' :
                    targetPandal.trafficLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Traffic: {targetPandal.trafficLevel.toUpperCase()}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-white rounded-xl border border-amber-100">
                    <p className="text-xs text-gray-500">Shortest Dist</p>
                    <p className="text-base font-black text-gray-900">{formatDistance(activeRoute.totalDistanceKm)}</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-amber-100">
                    <p className="text-xs text-gray-500">Travel Time</p>
                    <p className="text-base font-black text-red-600">~{activeRoute.totalDurationMins} mins</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-amber-100">
                    <p className="text-xs text-gray-500">Queue Wait</p>
                    <p className="text-base font-black text-amber-600">~{targetPandal.estimatedQueueMins}m</p>
                  </div>
                </div>

                {/* Traffic congestion impact alert */}
                {activeRoute.trafficDelayMins > 0 && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-orange-100 text-orange-900 text-xs">
                    <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Includes ~{activeRoute.trafficDelayMins}m delay due to festive crowd & traffic barricades.</span>
                  </div>
                )}
              </div>

              {/* Step by Step Route Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Navigation Steps ({activeRoute.steps.length})
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {activeRoute.steps.map((step, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                        isNavigating && currentStepIndex === idx 
                          ? 'bg-emerald-50 border-emerald-400 font-semibold' 
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full bg-red-100 text-red-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-gray-900">{step.instruction}</p>
                        <span className="text-[10px] text-gray-500">~{step.distanceMeters}m</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Start Live Navigation Button */}
              {!isNavigating && (
                <button
                  id="start-live-nav-btn"
                  onClick={handleStartRealtimeNavigation}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 active:scale-98 transition"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Start Real-Time GPS Navigation</span>
                </button>
              )}
            </div>
          )}

          {/* Mode B: Multi-Pandal Hopping Optimizer */}
          {mode === 'multi' && (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-950">
                <p className="font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  Smart Hopping Path (TSP Solver)
                </p>
                <p className="text-gray-600">
                  Select your desired pandals below. Our route optimizer calculates the mathematical shortest sequential circuit from your current spot to minimize waiting and road time!
                </p>
              </div>

              {/* Optimized Itinerary Card */}
              <div className="p-4 bg-white rounded-2xl border border-red-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold uppercase tracking-wide text-red-700">
                    Recommended Optimal Sequence
                  </h4>
                  <span className="text-xs font-bold text-gray-800">
                    Total: ~{optimizedMulti.totalDistanceKm} km
                  </span>
                </div>

                {/* Ordered sequence list */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-2 rounded-xl">
                    <MapPin className="w-4 h-4" /> Start: Your Current Location
                  </div>

                  {optimizedMulti.orderedPandals.map((pandal, idx) => (
                    <div 
                      key={pandal.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200 hover:border-red-300 transition"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-6 h-6 rounded-full bg-red-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate">{pandal.name}</p>
                          <p className="text-[10px] text-gray-500 truncate">{pandal.zone} • ⭐ {pandal.rating}</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          pandal.trafficLevel === 'low' ? 'bg-emerald-100 text-emerald-800' :
                          pandal.trafficLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {pandal.trafficLevel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-gray-600 border-t border-gray-100">
                  <span>Estimated Total Time:</span>
                  <span className="font-bold text-gray-900">
                    ~{Math.round(optimizedMulti.estimatedTotalMins / 60)}h {optimizedMulti.estimatedTotalMins % 60}m (incl. Darshan)
                  </span>
                </div>
              </div>

              {/* Selection Checkboxes */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
                  Include / Exclude Pandals in Optimization:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {allPandals.map(p => {
                    const isChecked = selectedMultiIds.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggleMultiPandal(p.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition text-xs ${
                          isChecked 
                            ? 'bg-amber-50/80 border-amber-400 font-semibold' 
                            : 'bg-white border-gray-200 text-gray-500 opacity-70'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-gray-400'
                        }`}>
                          {isChecked && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className="truncate flex-1">{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Set First in Sequence as target and navigate */}
              <button
                type="button"
                onClick={() => {
                  if (optimizedMulti.orderedPandals.length > 0) {
                    const first = optimizedMulti.orderedPandals[0];
                    setSelectedTargetId(first.id);
                    setMode('single');
                  }
                }}
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <span>Navigate to 1st Stop ({optimizedMulti.orderedPandals[0]?.name})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          </>
        )}
        </div>
      </div>
    </div>
  );
};
