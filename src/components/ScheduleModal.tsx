import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, Check, MapPin } from 'lucide-react';
import { Pandal, VisitPlanItem } from '../types';
import confetti from 'canvas-confetti';

interface ScheduleModalProps {
  pandal: Pandal | null;
  onClose: () => void;
  onSavePlan: (item: VisitPlanItem) => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  pandal,
  onClose,
  onSavePlan
}) => {
  if (!pandal) return null;

  // Preset time helpers: +1 hour, +2 hours, Tonight 8 PM, Tomorrow 10 AM
  const now = new Date();
  const defaultTimeStr = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16);

  const [scheduledDateTime, setScheduledDateTime] = useState(defaultTimeStr);
  const [notes, setNotes] = useState('');

  const handleQuickSlot = (offsetMinutes: number) => {
    const d = new Date(Date.now() + offsetMinutes * 60 * 1000);
    // Format to YYYY-MM-DDTHH:mm
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    setScheduledDateTime(`${year}-${month}-${day}T${hours}:${mins}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan: VisitPlanItem = {
      id: 'plan-' + Date.now(),
      pandalId: pandal.id,
      scheduledTime: new Date(scheduledDateTime).toISOString(),
      notes: notes.trim() || undefined,
      completed: false,
      addedAt: new Date().toISOString()
    };

    onSavePlan(newPlan);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        id="schedule-visit-modal"
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-200 overflow-hidden animate-in slide-in-from-bottom duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-200" />
            <h3 className="font-bold text-lg">Schedule to Next Visit</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Target Pandal Preview */}
          <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-2xl border border-amber-200/60">
            <img 
              src={pandal.thumbnail || pandal.images[0]} 
              alt={pandal.name} 
              className="w-14 h-14 rounded-xl object-cover border border-amber-300 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-gray-900 text-sm truncate">{pandal.name}</h4>
              <p className="text-xs text-red-700 font-semibold truncate">{pandal.pujaName}</p>
              <span className="text-[11px] text-gray-600">
                Queue wait ~{pandal.estimatedQueueMins}m • {pandal.zone}
              </span>
            </div>
          </div>

          {/* Quick Slot Suggestions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">
              Quick Timings:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickSlot(45)}
                className="py-1.5 px-2 bg-amber-100/70 hover:bg-amber-100 text-amber-900 font-bold rounded-xl text-xs transition border border-amber-200"
              >
                In 45 mins
              </button>
              <button
                type="button"
                onClick={() => handleQuickSlot(120)}
                className="py-1.5 px-2 bg-amber-100/70 hover:bg-amber-100 text-amber-900 font-bold rounded-xl text-xs transition border border-amber-200"
              >
                In 2 hours
              </button>
              <button
                type="button"
                onClick={() => handleQuickSlot(240)}
                className="py-1.5 px-2 bg-amber-100/70 hover:bg-amber-100 text-amber-900 font-bold rounded-xl text-xs transition border border-amber-200"
              >
                Tonight (Late)
              </button>
            </div>
          </div>

          {/* Date & Time Picker */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-red-600" />
              Target Visit Time:
            </label>
            <input
              type="datetime-local"
              required
              value={scheduledDateTime}
              onChange={(e) => setScheduledDateTime(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Personal Notes / Group Meetup Plan:
            </label>
            <input
              type="text"
              placeholder="e.g. Meet Raj at Gate 2; grab rolls from local stalls"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-md text-sm flex items-center justify-center gap-2 active:scale-98 transition"
          >
            <Check className="w-5 h-5" />
            <span>Save to Next Visit Schedule</span>
          </button>
        </form>
      </div>
    </div>
  );
};
