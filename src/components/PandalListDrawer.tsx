import React, { useState } from 'react';
import { Search, Filter, Flame, Camera, Star, Zap, MapPin, Sparkles } from 'lucide-react';
import { Pandal } from '../types';
import { PandalCard } from './PandalCard';

interface PandalListDrawerProps {
  pandals: Pandal[];
  allPandals?: Pandal[];
  onSelectPandal: (pandal: Pandal) => void;
  onNavigate: (pandal: Pandal) => void;
  onAddToNextVisit: (pandal: Pandal) => void;
  onShare: (pandal: Pandal) => void;
  onOpenAddModal?: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
}

export const PandalListDrawer: React.FC<PandalListDrawerProps> = ({
  pandals,
  allPandals = pandals,
  onSelectPandal,
  onNavigate,
  onAddToNextVisit,
  onShare,
  onOpenAddModal,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  selectedZone,
  setSelectedZone
}) => {
  const filters = [
    { id: 'all', label: 'All Pandals', icon: Sparkles },
    { id: 'nearest', label: '📍 Nearest', icon: MapPin },
    { id: 'visited', label: '🔥 Most Visited', icon: Flame },
    { id: 'photos', label: '📸 Most Photos', icon: Camera },
    { id: 'top_rated', label: '✨ Top Rated', icon: Star },
    { id: 'low_traffic', label: '🚦 Low Traffic', icon: Zap },
  ];

  // Dynamic unique districts/zones across all pandals in West Bengal
  const uniqueDistricts = React.useMemo(() => {
    const list = Array.from(new Set(allPandals.map(p => p.zone).filter(Boolean))).sort();
    return list;
  }, [allPandals]);

  return (
    <div className="h-full flex flex-col bg-amber-50/30 overflow-hidden">
      {/* Search and Filters Header */}
      <div className="p-4 bg-white border-b border-amber-200/80 shrink-0 space-y-3">
        {/* Search Box */}
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Pandal Name, Club (e.g. Sreebhumi, Luminous, Maddox), or Area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-gray-100 border border-gray-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-red-500 focus:bg-white transition"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((f) => {
            const isActive = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'bg-amber-100/70 hover:bg-amber-100 text-amber-950 border border-amber-200/60'
                }`}
              >
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* District / Zone Selector Across West Bengal */}
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span className="font-bold text-gray-700">District / Region:</span>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="text-xs p-1.5 rounded-lg border border-gray-300 bg-white font-semibold text-gray-800"
          >
            <option value="all">All of West Bengal ({allPandals.length})</option>
            {uniqueDistricts.map(dist => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Community Contribution Callout Banner */}
      {onOpenAddModal && (
        <div className="mx-4 mt-3 bg-gradient-to-r from-red-600 to-amber-600 text-white rounded-2xl p-3 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🪔</span>
            <div>
              <p className="text-xs font-bold leading-tight text-amber-100">
                Don't see your pandal?
              </p>
              <p className="text-[11px] text-white/90">
                Help map every para & village in West Bengal!
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAddModal}
            className="shrink-0 px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-extrabold rounded-xl shadow-xs active:scale-95 transition"
          >
            + Pin the Pandal
          </button>
        </div>
      )}

      {/* Pandals Grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {allPandals.length === 0 ? (
          <div className="h-72 flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl border border-dashed border-amber-300 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-2xl mb-3 shadow-xs">
              🪔
            </div>
            <h3 className="font-extrabold text-gray-800 text-base">No Locations Marked Yet</h3>
            <p className="text-xs text-gray-600 max-w-xs mt-1 leading-relaxed">
              Only your current location is marked on the map. You can manually mark any Durga Puja pandal or club in your para or neighborhood!
            </p>
            {onOpenAddModal && (
              <button
                onClick={onOpenAddModal}
                className="mt-4 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-bold rounded-2xl shadow-md active:scale-95 transition flex items-center gap-2"
              >
                <span>+ Mark Your First Pandal</span>
              </button>
            )}
          </div>
        ) : pandals.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl border border-dashed border-amber-300">
            <Search className="w-10 h-10 text-gray-400 mb-2" />
            <h3 className="font-bold text-gray-800 text-sm">No pandals matched</h3>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Try adjusting your search terms or filter selection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pandals.map((pandal) => (
              <PandalCard
                key={pandal.id}
                pandal={pandal}
                onSelect={onSelectPandal}
                onNavigate={onNavigate}
                onAddToNextVisit={onAddToNextVisit}
                onShare={onShare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
