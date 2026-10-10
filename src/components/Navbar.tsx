import React from 'react';
import { Sparkles, MapPin, Plus, Flame, ShieldAlert, Compass } from 'lucide-react';
import { LatLng } from '../types';

interface NavbarProps {
  userLocation: LatLng;
  totalPandals: number;
  onOpenAddModal: () => void;
  onOpenOptimizer: () => void;
  onOpenFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userLocation,
  totalPandals,
  onOpenAddModal,
  onOpenOptimizer,
  onOpenFinder
}) => {
  return (
    <header className="bg-gradient-to-r from-red-800 via-red-700 to-amber-700 text-white px-4 py-2.5 shadow-lg shrink-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-amber-400 text-amber-950 font-black flex items-center justify-center shadow-md text-lg">
            🪔
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-amber-100">
                Pandal Hopper
              </h1>
              <span className="bg-amber-400/90 text-amber-950 text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase">
                West Bengal Live
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-amber-200 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-300" />
              <span>All Bengal • {totalPandals} Famous & Para Pujas</span>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="nav-finder-btn"
            onClick={onOpenFinder}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-500/30 hover:bg-amber-500/40 text-amber-100 px-3 py-1.5 rounded-xl border border-amber-400/30 transition shadow-xs"
          >
            <span>🎯 Find Distance</span>
          </button>

          <button
            id="nav-optimizer-btn"
            onClick={onOpenOptimizer}
            className="hidden md:flex items-center gap-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl border border-white/20 transition"
          >
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Shortest Route</span>
          </button>

          <button
            id="nav-add-pandal-btn"
            onClick={onOpenAddModal}
            className="flex items-center gap-1 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-amber-950 px-3 py-1.5 rounded-xl shadow-md transition active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden xs:inline">Pin the Pandal</span>
          </button>
        </div>
      </div>
    </header>
  );
};
