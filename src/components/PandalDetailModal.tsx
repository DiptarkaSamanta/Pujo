import React, { useState } from 'react';
import { 
  X, Star, MapPin, Navigation, Share2, CalendarPlus, Camera, 
  Users, Clock, AlertTriangle, Music, Flame, Award, Heart, 
  ChevronLeft, ChevronRight, Upload, Send, MessageSquare, Trash2 
} from 'lucide-react';
import { Pandal, Review, TrafficLevel } from '../types';
import { formatDistance } from '../utils/geo';
import confetti from 'canvas-confetti';

interface PandalDetailModalProps {
  pandal: Pandal;
  onClose: () => void;
  onStartNavigation: (pandal: Pandal) => void;
  onAddToNextVisit: (pandal: Pandal) => void;
  onShare: (pandal: Pandal) => void;
  onAddReview: (pandalId: string, review: Review) => void;
  onDeletePandal?: (pandalId: string) => void;
}

export const PandalDetailModal: React.FC<PandalDetailModalProps> = ({
  pandal,
  onClose,
  onStartNavigation,
  onAddToNextVisit,
  onShare,
  onAddReview,
  onDeletePandal
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [uploadedReviewPhotos, setUploadedReviewPhotos] = useState<string[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const images = pandal.images && pandal.images.length > 0 
    ? pandal.images 
    : [pandal.thumbnail || 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80'];

  const getTrafficBadge = (level: TrafficLevel) => {
    switch (level) {
      case 'low':
        return { label: 'Traffic: Smooth Flow', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' };
      case 'moderate':
        return { label: 'Traffic: Moderate Rush', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', dot: 'bg-yellow-500' };
      case 'heavy':
        return { label: 'Traffic: Heavy Congestion', color: 'bg-orange-100 text-orange-800 border-orange-300', dot: 'bg-orange-500' };
      case 'jam':
        return { label: 'Traffic: Jam / Pedestrian Only', color: 'bg-red-100 text-red-800 border-red-300', dot: 'bg-red-500' };
    }
  };

  const trafficInfo = getTrafficBadge(pandal.trafficLevel);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setUploadedReviewPhotos(prev => [...prev, loadEvt.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) return;

    const newRev: Review = {
      id: 'rev-' + Date.now(),
      userName: reviewerName.trim(),
      rating: userRating,
      comment: reviewComment.trim(),
      timestamp: 'Just now',
      photos: uploadedReviewPhotos.length > 0 ? uploadedReviewPhotos : undefined
    };

    onAddReview(pandal.id, newRev);
    setShowReviewForm(false);
    setReviewComment('');
    setUploadedReviewPhotos([]);
    
    // Confetti celebration
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        id="pandal-detail-sheet"
        className="w-full max-w-xl max-h-[92vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250"
      >
        {/* Top Image Carousel Header */}
        <div className="relative h-64 sm:h-72 w-full bg-black shrink-0">
          <img 
            src={images[activeImageIndex]} 
            alt={pandal.name} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

          {/* Carousel navigation controls if multiple photos */}
          {images.length > 1 && (
            <>
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-xs transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 right-4 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-medium backdrop-blur-xs">
                📸 {activeImageIndex + 1} / {images.length} photos
              </div>
            </>
          )}

          {/* Top Floating Control Buttons */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="flex gap-2">
              {pandal.isBeautyPick && (
                <span className="inline-flex items-center gap-1 bg-amber-500 text-amber-950 px-2.5 py-1 rounded-full text-xs font-extrabold shadow-md">
                  <Award className="w-3.5 h-3.5" /> Best Decor
                </span>
              )}
              {pandal.visitCount > 40000 && (
                <span className="inline-flex items-center gap-1 bg-red-600 text-white px-2.5 py-1 rounded-full text-xs font-extrabold shadow-md">
                  <Flame className="w-3.5 h-3.5" /> Trending
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {onDeletePandal && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm && window.confirm(`Remove "${pandal.name}" from marked locations?`)) {
                      onDeletePandal(pandal.id);
                      onClose();
                    }
                  }}
                  title="Remove this marked location"
                  aria-label="Remove this marked location"
                  className="w-9 h-9 rounded-full bg-red-600/90 hover:bg-red-700 text-white flex items-center justify-center backdrop-blur-md transition shadow-md active:scale-95"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsLiked(!isLiked)}
                aria-label="Favorite this pandal"
                className={`w-9 h-9 rounded-full flex items-center justify-center transition backdrop-blur-md ${
                  isLiked ? 'bg-red-600 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button
                onClick={() => onShare(pandal)}
                aria-label="Share pandal"
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button 
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-md transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Pandal Title on image bottom */}
          <div className="absolute bottom-3 left-4 right-20 text-white">
            <h2 className="text-xl sm:text-2xl font-black leading-tight tracking-tight drop-shadow-md">
              {pandal.name}
            </h2>
            <p className="text-xs sm:text-sm text-amber-200 font-semibold truncate drop-shadow-xs">
              {pandal.pujaName}
            </p>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-amber-50/80 border border-amber-200 p-2.5 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="flex items-center text-amber-600 font-black text-base">
                <Star className="w-4 h-4 fill-amber-500 mr-1 text-amber-500" />
                {pandal.rating}
              </div>
              <span className="text-[11px] text-gray-600 font-medium">
                {pandal.reviewCount} reviews
              </span>
            </div>

            <div className="bg-red-50/80 border border-red-200 p-2.5 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="flex items-center text-red-700 font-black text-base">
                <Users className="w-4 h-4 mr-1" />
                {(pandal.visitCount / 1000).toFixed(1)}k
              </div>
              <span className="text-[11px] text-gray-600 font-medium">Visitors</span>
            </div>

            <div className="bg-blue-50/80 border border-blue-200 p-2.5 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="flex items-center text-blue-700 font-black text-base">
                <Clock className="w-4 h-4 mr-1" />
                ~{pandal.estimatedQueueMins}m
              </div>
              <span className="text-[11px] text-gray-600 font-medium">Queue wait</span>
            </div>
          </div>

          {/* Real-time Traffic and Crowd Status Alert Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${trafficInfo.color}`}>
                  <span className={`w-2 h-2 rounded-full ${trafficInfo.dot} animate-pulse`} />
                  {trafficInfo.label}
                </span>
                {pandal.distanceKm !== undefined && (
                  <span className="text-xs font-semibold text-gray-700">
                    • {formatDistance(pandal.distanceKm)} away
                  </span>
                )}
              </div>
              <span className="text-[11px] text-gray-600 font-medium">Live traffic radar</span>
            </div>

            <div className="space-y-1 pt-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-gray-700">Crowd Density:</span>
                <span className="font-bold text-gray-900">{pandal.crowdDensityPercent}% capacity</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    pandal.crowdDensityPercent > 80 ? 'bg-red-600' :
                    pandal.crowdDensityPercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${pandal.crowdDensityPercent}%` }}
                />
              </div>
            </div>

            {pandal.bestVisitHours && (
              <div className="text-xs text-amber-900 bg-amber-100/60 p-2 rounded-xl flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                <span><strong>Pro Tip:</strong> Best visit time: {pandal.bestVisitHours}</span>
              </div>
            )}
          </div>

          {/* Theme & Concept */}
          <div className="space-y-1">
            <h4 className="text-xs uppercase tracking-wider font-extrabold text-red-700">Artisan Theme & Concept</h4>
            <p className="text-base font-bold text-gray-900">{pandal.theme}</p>
            <p className="text-sm text-gray-700 leading-relaxed pt-1">{pandal.description}</p>
          </div>

          {/* Location details */}
          <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/50 text-xs text-gray-700">
            <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-gray-900">{pandal.address}</span>
              <p className="text-gray-600 mt-0.5">Zone: {pandal.zone} • Coordinates: {pandal.location.lat.toFixed(4)}, {pandal.location.lng.toFixed(4)}</p>
            </div>
          </div>

          {/* Audio Ambiance */}
          {pandal.audioAmbiance && (
            <div className="flex items-center gap-2 p-3 bg-red-50/60 rounded-2xl border border-red-200/60 text-xs text-red-900">
              <Music className="w-4 h-4 text-red-600 shrink-0" />
              <span><strong>Festive Soundscape:</strong> {pandal.audioAmbiance}</span>
            </div>
          )}

          {/* Photo Gallery Thumbnail Strip */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase tracking-wider font-extrabold text-gray-600">
                Shared Photos ({images.length})
              </h4>
              <span className="text-xs text-amber-700 font-semibold">Idol & Pandals</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-red-600 scale-95 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Pandal view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Community Reviews & Ratings Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-red-600" />
                <h4 className="text-sm font-bold text-gray-900">
                  Community Reviews & Ratings ({pandal.reviews ? pandal.reviews.length : 0})
                </h4>
              </div>
              <button
                id="open-review-form-btn"
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-xs font-bold text-red-700 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition"
              >
                {showReviewForm ? 'Cancel Review' : '+ Rate & Add Photo'}
              </button>
            </div>

            {/* Review Submission Form */}
            {showReviewForm && (
              <form onSubmit={handleReviewSubmit} className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-3">
                <h5 className="text-xs font-bold text-amber-950 uppercase tracking-wide">Share Your Darshan Experience</h5>
                
                {/* Star rating selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-700">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="p-1 text-amber-400 hover:text-amber-500 transition-transform hover:scale-110"
                      >
                        <Star className={`w-5 h-5 ${star <= userRating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'}`} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-amber-800 ml-1">{userRating}/5</span>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name (e.g. Diptarka)"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <textarea
                    required
                    rows={2}
                    placeholder="Describe the idol, lighting, queue management, or bhog stalls..."
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Upload photos for review */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-red-600" />
                      Attach Photos:
                    </label>
                    <label className="cursor-pointer text-xs font-bold text-red-700 bg-white border border-red-300 px-2.5 py-1 rounded-lg hover:bg-red-50 transition flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      Browse / Snap
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        capture="environment"
                        onChange={handlePhotoUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {uploadedReviewPhotos.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto py-1">
                      {uploadedReviewPhotos.map((photo, i) => (
                        <img 
                          key={i} 
                          src={photo} 
                          alt="Review attachment" 
                          className="w-14 h-14 rounded-lg object-cover border border-amber-300"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" /> Submit Review & Photos
                </button>
              </form>
            )}

            {/* List of existing reviews */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {pandal.reviews && pandal.reviews.length > 0 ? (
                pandal.reviews.map((rev) => (
                  <div key={rev.id} className="p-3 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
                          {rev.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900">{rev.userName}</p>
                          <span className="text-[10px] text-gray-600">{rev.timestamp}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-amber-500 text-xs font-bold">
                        ⭐ {rev.rating}
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">{rev.comment}</p>
                    {rev.photos && rev.photos.length > 0 && (
                      <div className="flex gap-1.5 pt-1">
                        {rev.photos.map((p, idx) => (
                          <img key={idx} src={p} alt="User shot" className="w-12 h-12 rounded-lg object-cover border border-gray-300" />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-600 italic text-center py-2">
                  Be the first to leave a review and photo for this pandal!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Floating Primary Actions */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2.5 shrink-0">
          <button
            id="pandal-navigate-btn"
            onClick={() => onStartNavigation(pandal)}
            className="flex-1 py-3 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-md text-sm flex items-center justify-center gap-2 active:scale-98 transition"
          >
            <Navigation className="w-4 h-4 text-white" />
            <span>Navigate Shortest Route</span>
          </button>

          <button
            id="pandal-add-visit-btn"
            onClick={() => onAddToNextVisit(pandal)}
            title="Add to Next Visit Itinerary"
            className="py-3 px-3.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-2xl border border-amber-300 text-sm flex items-center justify-center gap-1.5 transition active:scale-98"
          >
            <CalendarPlus className="w-4 h-4 text-amber-800" />
            <span className="hidden sm:inline">Schedule Visit</span>
          </button>
        </div>
      </div>
    </div>
  );
};
