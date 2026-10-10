import React from 'react';
import { Map, ListFilter, Calendar, Navigation, PlusCircle, Compass, Target } from 'lucide-react';

export type TabType = 'map' | 'list' | 'finder' | 'next_visit' | 'optimizer';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  pendingPlansCount: number;
  onOpenAddModal: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  pendingPlansCount,
  onOpenAddModal
}) => {
  return (
    <nav className="bg-white border-t border-amber-200/80 px-2 py-1.5 shadow-2xl shrink-0 z-30 flex items-center justify-around sm:justify-center sm:gap-8">
      {/* 1. Map Tab */}
      <button
        id="tab-btn-map"
        onClick={() => onTabChange('map')}
        className={`flex flex-col items-center py-1 px-3 rounded-2xl transition ${
          currentTab === 'map' ? 'text-red-700 font-black scale-105' : 'text-gray-500 hover:text-gray-900 font-medium'
        }`}
      >
        <Map className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Live Map</span>
      </button>

      {/* 2. Explore List Tab */}
      <button
        id="tab-btn-list"
        onClick={() => onTabChange('list')}
        className={`flex flex-col items-center py-1 px-3 rounded-2xl transition ${
          currentTab === 'list' ? 'text-red-700 font-black scale-105' : 'text-gray-500 hover:text-gray-900 font-medium'
        }`}
      >
        <ListFilter className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Explore</span>
      </button>

      {/* 3. Center Add Floating Action Button */}
      <button
        id="bottom-add-pin-btn"
        onClick={onOpenAddModal}
        className="flex flex-col items-center justify-center -mt-5"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition border-2 border-white">
          <PlusCircle className="w-7 h-7" />
        </div>
        <span className="text-[10px] font-bold text-red-700 mt-0.5">Pin the Pandal</span>
      </button>

      {/* 4. Find Club & Shortest Distance Tab */}
      <button
        id="tab-btn-finder"
        onClick={() => onTabChange('finder')}
        className={`flex flex-col items-center py-1 px-2.5 rounded-2xl transition ${
          currentTab === 'finder' ? 'text-red-700 font-black scale-105' : 'text-gray-500 hover:text-gray-900 font-medium'
        }`}
      >
        <Navigation className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Shortest Path</span>
      </button>

      {/* 5. Next Visit Schedule Tab */}
      <button
        id="tab-btn-next-visit"
        onClick={() => onTabChange('next_visit')}
        className={`relative flex flex-col items-center py-1 px-2.5 rounded-2xl transition ${
          currentTab === 'next_visit' ? 'text-red-700 font-black scale-105' : 'text-gray-500 hover:text-gray-900 font-medium'
        }`}
      >
        <div className="relative">
          <Calendar className="w-5 h-5 mb-0.5" />
          {pendingPlansCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
              {pendingPlansCount}
            </span>
          )}
        </div>
        <span className="text-[10px]">Next Visit</span>
      </button>
    </nav>
  );
};
