import React, { useState, useEffect } from 'react';
import { 
  Clock, CheckCircle2, Circle, Trash2, Navigation, 
  Sparkles, Calendar, Plus, MapPin, ArrowRight, Route, AlertCircle 
} from 'lucide-react';
import { Pandal, VisitPlanItem } from '../types';
import { calculateDistanceKm, formatDistance } from '../utils/geo';

interface NextVisitListProps {
  visitPlans: VisitPlanItem[];
  pandals: Pandal[];
  userLocation: { lat: number; lng: number } | null;
  onToggleComplete: (planId: string) => void;
  onDeletePlan: (planId: string) => void;
  onSelectPandal: (pandal: Pandal) => void;
  onOptimizeRoute: () => void;
  onStartNavigation: (pandal: Pandal) => void;
  onAddPlanItem: () => void;
}

export const NextVisitList: React.FC<NextVisitListProps> = ({
  visitPlans,
  pandals,
  userLocation,
  onToggleComplete,
  onDeletePlan,
  onSelectPandal,
  onOptimizeRoute,
  onStartNavigation,
  onAddPlanItem
}) => {
  // Current time state for live countdowns
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Map plans to pandal objects
  const enrichedPlans = visitPlans.map(plan => {
    const pandal = pandals.find(p => p.id === plan.pandalId);
    let distanceKm = 0;
    if (userLocation && pandal) {
      distanceKm = calculateDistanceKm(userLocation, pandal.location);
    }
    return { plan, pandal, distanceKm };
  });

  const getRemainingTimeText = (timeIso: string) => {
    const target = new Date(timeIso).getTime();
    const diffMs = target - now;
    const diffMins = Math.round(diffMs / 60000);

    if (diffMins < -60) {
      const hoursAgo = Math.abs(Math.round(diffMins / 60));
      return { text: `${hoursAgo}h ago`, isUrgent: false, isPast: true };
    } else if (diffMins < 0) {
      return { text: `${Math.abs(diffMins)}m ago`, isUrgent: false, isPast: true };
    } else if (diffMins <= 30) {
      return { text: `in ${diffMins} mins!`, isUrgent: true, isPast: false };
    } else if (diffMins < 120) {
      return { text: `in ${diffMins} mins`, isUrgent: false, isPast: false };
    } else {
      const hours = (diffMins / 60).toFixed(1);
      return { text: `in ${hours} hrs`, isUrgent: false, isPast: false };
    }
  };

  const pendingCount = visitPlans.filter(p => !p.completed).length;

  return (
    <div className="h-full flex flex-col bg-amber-50/30 overflow-hidden">
      {/* Top Banner with Action */}
      <div className="p-4 bg-white border-b border-amber-200/80 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              <span>Next Visit Itinerary</span>
            </h2>
            <p className="text-xs text-gray-600">
              Manage your hopping schedule with timestamps & time management
            </p>
          </div>
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full">
            {pendingCount} Pending
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            id="optimize-itinerary-btn"
            onClick={onOptimizeRoute}
            disabled={visitPlans.length < 2}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow-xs ${
              visitPlans.length >= 2 
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white hover:from-red-700 hover:to-amber-700' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Route className="w-4 h-4" />
            <span>Optimize Shortest Route</span>
          </button>

          <button
            id="add-pandal-to-itinerary-btn"
            onClick={onAddPlanItem}
            className="py-2.5 px-3 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300 flex items-center gap-1 transition"
          >
            <Plus className="w-4 h-4 text-amber-800" />
            <span>Add Pandal</span>
          </button>
        </div>
      </div>

      {/* Plan Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {enrichedPlans.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-white rounded-3xl border border-dashed border-amber-300">
            <Clock className="w-12 h-12 text-amber-400 mb-2 stroke-1" />
            <h3 className="font-bold text-gray-800 text-sm">No pandals in your visit queue</h3>
            <p className="text-xs text-gray-600 max-w-xs mt-1">
              Select pandals from the map or explore list and click "Schedule Visit" to plan your time efficiently!
            </p>
            <button
              onClick={onAddPlanItem}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-sm transition"
            >
              Browse Pandals to Add
            </button>
          </div>
        ) : (
          enrichedPlans.map(({ plan, pandal, distanceKm }, idx) => {
            if (!pandal) return null;
            const timeInfo = getRemainingTimeText(plan.scheduledTime);
            const dateObj = new Date(plan.scheduledTime);
            const timeFormatted = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <div
                key={plan.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  plan.completed
                    ? 'bg-gray-100/80 border-gray-200 opacity-60'
                    : 'bg-white border-amber-200/80 shadow-xs hover:border-amber-400'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Complete checkbox */}
                  <button
                    onClick={() => onToggleComplete(plan.id)}
                    aria-label={plan.completed ? 'Mark unvisited' : 'Mark visited'}
                    className="mt-1 text-gray-400 hover:text-red-600 transition"
                  >
                    {plan.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-5 h-5 hover:text-red-600" />
                    )}
                  </button>

                  {/* Thumbnail */}
                  <div 
                    onClick={() => onSelectPandal(pandal)}
                    className="cursor-pointer relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-200"
                  >
                    <img 
                      src={pandal.thumbnail || pandal.images[0]} 
                      alt={pandal.name} 
                      className="w-full h-full object-cover" 
                    />
                    <span className="absolute top-0.5 left-0.5 bg-black/60 text-white text-[10px] font-bold px-1.5 rounded-sm">
                      #{idx + 1}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 
                          onClick={() => onSelectPandal(pandal)}
                          className={`font-bold text-sm leading-tight cursor-pointer hover:text-red-700 truncate ${
                            plan.completed ? 'line-through text-gray-500' : 'text-gray-900'
                          }`}
                        >
                          {pandal.name}
                        </h4>
                        <p className="text-[11px] text-red-700 font-medium truncate">{pandal.pujaName}</p>
                      </div>

                      <button
                        onClick={() => onDeletePlan(plan.id)}
                        aria-label="Remove from itinerary"
                        className="text-gray-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Timestamp & Countdown Pill */}
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
                      <div className="inline-flex items-center gap-1 font-bold text-gray-800 bg-amber-100/70 px-2 py-0.5 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        <span>{timeFormatted}</span>
                      </div>

                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        timeInfo.isUrgent
                          ? 'bg-red-100 text-red-700 animate-pulse'
                          : timeInfo.isPast
                          ? 'bg-gray-200 text-gray-600'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {timeInfo.text}
                      </span>

                      {distanceKm > 0 && (
                        <span className="text-[11px] text-gray-600 font-medium flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-red-500" />
                          {formatDistance(distanceKm)} away
                        </span>
                      )}
                    </div>

                    {/* Note if any */}
                    {plan.notes && (
                      <p className="text-[11px] text-gray-600 italic mt-1.5 bg-gray-50 p-1.5 rounded-lg border border-gray-200/60">
                        "{plan.notes}"
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                      <button
                        onClick={() => onStartNavigation(pandal)}
                        className="text-[11px] font-bold text-red-700 hover:text-red-800 flex items-center gap-1 bg-red-50 px-2.5 py-1 rounded-lg transition"
                      >
                        <Navigation className="w-3 h-3 text-red-600" />
                        Navigate Here
                      </button>

                      <button
                        onClick={() => onSelectPandal(pandal)}
                        className="text-[11px] font-medium text-gray-600 hover:text-gray-900 flex items-center gap-0.5"
                      >
                        View Details <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
