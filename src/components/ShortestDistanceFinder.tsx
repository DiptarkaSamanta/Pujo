import React, { useState, useMemo } from 'react';
import { Search, MapPin, Navigation, Car, Bike, Footprints, Clock, Star, Flame, Sparkles, ChevronRight, X, ArrowRight, ShieldAlert, Award } from 'lucide-react';
import { LatLng, Pandal } from '../types';
import { calculateDistanceKm, formatDistance } from '../utils/geo';

interface ShortestDistanceFinderProps {
  userLocation: LatLng;
  pandals: Pandal[];
  onSelectPandal: (pandal: Pandal) => void;
  onStartNavigation: (pandal: Pandal) => void;
  onOpenAddModal: () => void;
  onClose?: () => void;
  isModalView?: boolean;
}

export const ShortestDistanceFinder: React.FC<ShortestDistanceFinderProps> = ({
  userLocation,
  pandals,
  onSelectPandal,
  onStartNavigation,
  onOpenAddModal,
  onClose,
  isModalView = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTargetId, setSelectedTargetId] = useState<string>(pandals[0]?.id || '');

  // Filter pandals by pandal name OR club name OR puja name OR district
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return pandals;
    const q = searchQuery.toLowerCase().trim();
    return pandals.filter(p => 
      p.name.toLowerCase().includes(q) ||
      (p.clubName && p.clubName.toLowerCase().includes(q)) ||
      p.pujaName.toLowerCase().includes(q) ||
      p.zone.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q)
    );
  }, [pandals, searchQuery]);

  // Selected Target Pandal
  const targetPandal = useMemo(() => {
    return pandals.find(p => p.id === selectedTargetId) || searchResults[0] || null;
  }, [pandals, selectedTargetId, searchResults]);

  // Shortest Distance calculations
  const distanceMetrics = useMemo(() => {
    if (!targetPandal) return null;
    const distKm = calculateDistanceKm(userLocation, targetPandal.location);
    
    // Estimates
    const walkMins = Math.round((distKm / 4.5) * 60);
    const bikeMins = Math.max(2, Math.round((distKm / 28) * 60 + (targetPandal.trafficLevel === 'jam' ? 12 : targetPandal.trafficLevel === 'heavy' ? 7 : 2)));
    const carMins = Math.max(3, Math.round((distKm / 20) * 60 + (targetPandal.trafficLevel === 'jam' ? 25 : targetPandal.trafficLevel === 'heavy' ? 14 : targetPandal.trafficLevel === 'moderate' ? 6 : 2)));

    return {
      distKm,
      formattedDist: formatDistance(distKm),
      walkMins,
      bikeMins,
      carMins
    };
  }, [userLocation, targetPandal]);

  const content = (
    <div className="flex flex-col h-full bg-white text-slate-900">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-red-800 via-red-700 to-amber-700 text-white flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 font-black flex items-center justify-center text-sm shadow-xs">
            🎯
          </div>
          <div>
            <h2 className="font-extrabold text-base sm:text-lg leading-tight text-amber-100">
              Find Pandal or Club
            </h2>
            <p className="text-xs text-amber-200">
              Search by pandal or club name & get shortest distance
            </p>
          </div>
        </div>

        {isModalView && onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type Pandal Name (e.g. Sreebhumi) or Club Name (e.g. Luminous Club, Maddox)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-amber-50/50 border border-amber-300 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Community Contribution Callout Banner */}
        <div className="bg-gradient-to-r from-amber-500/15 via-red-500/10 to-amber-500/15 border border-amber-300/80 rounded-2xl p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
              🪔
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <span>Manually Mark Any Pandal or Club</span>
                <span className="bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase">Custom</span>
              </h4>
              <p className="text-[11px] text-gray-600 mt-0.5 leading-snug">
                Every neighborhood club in West Bengal matters! Mark your club, pin the location, and post your idol’s photos.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAddModal}
            className="shrink-0 px-3 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs active:scale-95 transition"
          >
            + Pin the Pandal
          </button>
        </div>

        {pandals.length === 0 ? (
          <div className="p-8 text-center bg-amber-50/50 rounded-3xl border border-dashed border-amber-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl mx-auto mb-3 shadow-xs">
              🎯
            </div>
            <h3 className="font-extrabold text-gray-900 text-sm">No Pandals Marked Yet</h3>
            <p className="text-xs text-gray-600 mt-1 max-w-sm mx-auto leading-relaxed">
              Currently only your location is marked on the map. Tap anywhere on the map or click the button below to manually mark your first pandal location!
            </p>
            <button
              onClick={onOpenAddModal}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-bold rounded-2xl shadow-md active:scale-95 transition inline-flex items-center gap-1.5"
            >
              <span>+ Pin First Pandal on Map</span>
            </button>
          </div>
        ) : (
          <>
            {/* Target Pandal Shortest Distance Spotlight Card */}
            {targetPandal && distanceMetrics && (
              <div className="bg-gradient-to-br from-amber-50/90 to-red-50/40 rounded-3xl border-2 border-red-200 p-4 shadow-md space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={targetPandal.thumbnail || targetPandal.images[0]}
                    alt={targetPandal.name}
                    className="w-18 h-18 rounded-2xl object-cover border-2 border-amber-300 shadow-sm shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-red-700 uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Targeted Location</span>
                    </div>
                    <h3 className="text-base font-black text-gray-900 leading-tight truncate mt-0.5">
                      {targetPandal.name}
                    </h3>
                    {targetPandal.clubName && (
                      <p className="text-xs text-amber-900 font-bold flex items-center gap-1 mt-0.5">
                        <span className="text-red-700">Club:</span> {targetPandal.clubName}
                      </p>
                    )}
                    <p className="text-[11px] text-gray-500 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      {targetPandal.address} ({targetPandal.zone})
                    </p>
                  </div>
                </div>

                {/* Distance & ETA Highlight Bar */}
                <div className="bg-white rounded-2xl p-3 border border-amber-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                      Shortest Distance
                    </span>
                    <div className="text-2xl font-black text-red-700 leading-none mt-0.5">
                      {distanceMetrics.formattedDist}
                    </div>
                  </div>

                  {/* Transit Modes ETA */}
                  <div className="flex items-center gap-2 text-center text-xs">
                    <div className="bg-amber-50 px-2.5 py-1.5 rounded-xl border border-amber-200">
                      <div className="flex items-center justify-center gap-1 text-amber-900 font-bold">
                        <Bike className="w-3.5 h-3.5" />
                        <span>{distanceMetrics.bikeMins}m</span>
                      </div>
                      <span className="text-[9px] text-gray-500">Bike</span>
                    </div>

                    <div className="bg-red-50 px-2.5 py-1.5 rounded-xl border border-red-200">
                      <div className="flex items-center justify-center gap-1 text-red-700 font-bold">
                        <Car className="w-3.5 h-3.5" />
                        <span>{distanceMetrics.carMins}m</span>
                      </div>
                      <span className="text-[9px] text-gray-500">Car/Cab</span>
                    </div>

                    <div className="bg-gray-50 px-2.5 py-1.5 rounded-xl border border-gray-200">
                      <div className="flex items-center justify-center gap-1 text-gray-700 font-bold">
                        <Footprints className="w-3.5 h-3.5" />
                        <span>{distanceMetrics.walkMins}m</span>
                      </div>
                      <span className="text-[9px] text-gray-500">Walk</span>
                    </div>
                  </div>
                </div>

                {/* Real-time Traffic and Queue status */}
                <div className="flex items-center justify-between text-xs pt-1 px-1">
                  <div className="flex items-center gap-1 text-gray-700">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Queue wait: ~{targetPandal.estimatedQueueMins} mins</span>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                    targetPandal.trafficLevel === 'low' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                    targetPandal.trafficLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                    'bg-red-100 text-red-800 border-red-300'
                  }`}>
                    Traffic: {targetPandal.trafficLevel.toUpperCase()}
                  </span>
                </div>

                {/* Direct Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onStartNavigation(targetPandal)}
                    className="py-2.5 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Navigate Shortest Path</span>
                  </button>

                  <button
                    onClick={() => onSelectPandal(targetPandal)}
                    className="py-2.5 px-3 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition"
                  >
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>View Full Details & Photos</span>
                  </button>
                </div>
              </div>
            )}

            {/* Search Results / All Pandals & Clubs List */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span className="font-bold text-gray-800">
                  {searchResults.length} Durga Puja Pandals & Clubs marked:
                </span>
                <span className="text-[11px] text-gray-500">Tap to calculate shortest distance</span>
              </div>

              <div className="space-y-2">
                {searchResults.map((pandal) => {
                  const isSelected = pandal.id === targetPandal?.id;
                  const dist = calculateDistanceKm(userLocation, pandal.location);
                  return (
                    <div
                      key={pandal.id}
                      onClick={() => setSelectedTargetId(pandal.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-red-50 border-red-500 shadow-xs ring-2 ring-red-400/30'
                          : 'bg-white hover:bg-amber-50/50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={pandal.thumbnail || pandal.images[0]}
                          alt={pandal.name}
                          className="w-12 h-12 rounded-xl object-cover border border-amber-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-xs font-bold text-gray-900 truncate">
                              {pandal.name}
                            </h4>
                            {pandal.isBeautyPick && (
                              <span className="bg-amber-100 text-amber-900 text-[9px] font-extrabold px-1.5 py-0.2 rounded-sm shrink-0">
                                ★ Top
                              </span>
                            )}
                          </div>
                          {pandal.clubName && (
                            <p className="text-[11px] text-red-700 font-semibold truncate">
                              Club: {pandal.clubName}
                            </p>
                          )}
                          <p className="text-[10px] text-gray-500 truncate">
                            {pandal.zone} • {pandal.theme}
                          </p>
                        </div>
                      </div>

                      {/* Distance pill */}
                      <div className="text-right shrink-0">
                        <div className="text-xs font-extrabold text-red-700">
                          {formatDistance(dist)}
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">from you</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );

  if (isModalView) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
        <div className="w-full max-w-lg h-[90vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-200 flex flex-col">
          {content}
        </div>
      </div>
    );
  }

  return content;
};
