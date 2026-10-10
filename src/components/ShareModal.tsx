import React, { useState } from 'react';
import { X, Share2, MessageCircle, Twitter, Facebook, Copy, Check, Sparkles, MapPin } from 'lucide-react';
import { Pandal } from '../types';

interface ShareModalProps {
  pandal: Pandal | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ pandal, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!pandal) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://pandalhopper.app';
  const shareText = `🪔 Explore ${pandal.name} (${pandal.pujaName})! Theme: "${pandal.theme}". Rated ⭐ ${pandal.rating}/5 with gorgeous festive idol & pandal decorations! Check live crowd & route on Pandal Hopper:`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n${currentUrl}?pandal=${pandal.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${pandal.name} - Pandal Hopper`,
          text: shareText,
          url: `${currentUrl}?pandal=${pandal.id}`
        });
      } catch (err) {
        // User cancelled or share not supported
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText}\n${currentUrl}?pandal=${pandal.id}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(`${currentUrl}?pandal=${pandal.id}`)}&hashtags=DurgaPuja,PandalHopping,Utsav`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${currentUrl}?pandal=${pandal.id}`)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        id="share-modal-container"
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-amber-200 overflow-hidden transform transition-all animate-in fade-in slide-in-from-bottom duration-200"
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-200" />
            <h3 className="font-bold text-lg">Share with Friends</h3>
          </div>
          <button 
            onClick={onClose}
            aria-label="Close share dialog"
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Pandal Preview Card */}
          <div className="flex items-center gap-3 p-3 bg-amber-50/80 rounded-2xl border border-amber-200/60">
            <img 
              src={pandal.thumbnail || pandal.images[0]} 
              alt={pandal.name} 
              className="w-16 h-16 rounded-xl object-cover border border-amber-300 shadow-xs"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-gray-900 text-sm truncate">{pandal.name}</h4>
              <p className="text-xs text-red-700 font-medium truncate">{pandal.pujaName}</p>
              <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                <span className="inline-flex items-center gap-0.5 text-amber-700 font-semibold">
                  ⭐ {pandal.rating}
                </span>
                <span>•</span>
                <span className="flex items-center gap-0.5 truncate">
                  <MapPin className="w-3 h-3 text-red-500" /> {pandal.zone}
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-600 text-center font-medium">
            Plan your hopping group together! Send live coordinates and timings.
          </p>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-4 gap-3 pt-1">
            {/* WhatsApp */}
            <button
              id="share-whatsapp-btn"
              onClick={handleWhatsApp}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs mb-1.5">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold">WhatsApp</span>
            </button>

            {/* X / Twitter */}
            <button
              id="share-twitter-btn"
              onClick={handleTwitter}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-xs mb-1.5">
                <Twitter className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">Twitter / X</span>
            </button>

            {/* Facebook */}
            <button
              id="share-facebook-btn"
              onClick={handleFacebook}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs mb-1.5">
                <Facebook className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">Facebook</span>
            </button>

            {/* System / More */}
            <button
              id="share-system-btn"
              onClick={handleNativeShare}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-all hover:scale-105 active:scale-95"
            >
              <div className="w-11 h-11 rounded-full bg-amber-600 text-white flex items-center justify-center shadow-xs mb-1.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold">Native Share</span>
            </button>
          </div>

          {/* Copy Direct Link */}
          <div className="pt-2">
            <button
              id="copy-share-link-btn"
              onClick={handleCopyLink}
              className="w-full py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm flex items-center justify-center gap-2 border border-gray-300 transition-all active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Link & Details Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-600" />
                  <span>Copy Link & Coordinates</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
