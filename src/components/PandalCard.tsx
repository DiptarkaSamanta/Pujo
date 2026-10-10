import React from 'react';
import { Star, MapPin, Navigation, CalendarPlus, Share2, Users, Flame, Award, Clock } from 'lucide-react';
import { Pandal } from '../types';
import { formatDistance } from '../utils/geo';

interface PandalCardProps {
  pandal: Pandal;
  onSelect: (pandal: Pandal) => void;
  onNavigate: (pandal: Pandal) => void;
  onAddToNextVisit: (pandal: Pandal) => void;
  onShare: (pandal: Pandal) => void;
}

export const PandalCard: React.FC<PandalCardProps> = ({
  pandal,
  onSelect,
  onNavigate,
  onAddToNextVisit,
  onShare
}) => {
  return (
    <div className="bg-white rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group">
      {/* Card Header Image */}
      <div 
        onClick={() => onSelect(pandal)}
        className="relative h-44 w-full bg-gray-900 cursor-pointer overflow-hidden"
      >
        <img 
          src={pandal.thumbnail || pandal.images[0]} 
          alt={pandal.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Badges on image */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
          {pandal.isBeautyPick && (
            <span className="bg-amber-500 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Award className="w-3 h-3" /> Best Decor
            </span>
          )}
          {pandal.visitCount > 40000 && (
            <span className="bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Flame className="w-3 h-3" /> Trending
            </span>
          )}
        </div>

        {/* Traffic pill */}
        <div className="absolute top-2.5 right-2.5">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            pandal.trafficLevel === 'low' ? 'bg-emerald-500/90 text-white border-emerald-400' :
            pandal.trafficLevel === 'moderate' ? 'bg-yellow-500/90 text-black border-yellow-300' :
            'bg-red-600/90 text-white border-red-400'
          }`}>
            {pandal.trafficLevel.toUpperCase()}
          </span>
        </div>

        {/* Title over image bottom */}
        <div className="absolute bottom-2.5 left-3 right-3 text-white">
          <h3 className="font-black text-base sm:text-lg leading-tight truncate drop-shadow-sm">
            {pandal.name}
          </h3>
          <p className="text-xs text-amber-200 font-semibold truncate drop-shadow-xs">
            {pandal.pujaName}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Stats Bar */}
          <div className="flex items-center justify-between text-xs text-gray-600 pb-1.5 border-b border-gray-100">
            <div className="flex items-center text-amber-600 font-black">
              <Star className="w-3.5 h-3.5 fill-amber-500 mr-1 text-amber-500" />
              {pandal.rating}
              <span className="text-gray-400 font-normal ml-1">({pandal.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-red-700 font-bold">
              <Users className="w-3.5 h-3.5" />
              {(pandal.visitCount / 1000).toFixed(1)}k visits
            </div>

            {pandal.distanceKm !== undefined && (
              <div className="flex items-center gap-0.5 text-gray-700 font-semibold">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                {formatDistance(pandal.distanceKm)}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-700 line-clamp-2 mt-2 font-medium">
            {pandal.theme} — {pandal.description}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onNavigate(pandal)}
            className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition active:scale-95 shadow-xs"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Navigate</span>
          </button>

          <button
            onClick={() => onAddToNextVisit(pandal)}
            title="Add to Next Visit Itinerary"
            className="p-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition active:scale-95"
          >
            <CalendarPlus className="w-4 h-4" />
          </button>

          <button
            onClick={() => onShare(pandal)}
            title="Share with Friends"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 transition active:scale-95"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
