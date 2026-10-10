import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import { 
  X, MapPin, Camera, Image as ImageIcon, Star, Plus, Check, 
  Sparkles, Navigation, AlertCircle, RefreshCw, Video, VideoOff,
  Crosshair, Maximize2, Loader2
} from 'lucide-react';
import { LatLng, Pandal, TrafficLevel } from '../types';
import confetti from 'canvas-confetti';

interface AddPandalModalProps {
  initialLocation: LatLng | null;
  userLocation: LatLng | null;
  onClose: () => void;
  onSavePandal: (pandal: Pandal) => void;
  onSelectMapLocationPrompt: () => void;
}

export const AddPandalModal: React.FC<AddPandalModalProps> = ({
  initialLocation,
  userLocation,
  onClose,
  onSavePandal,
  onSelectMapLocationPrompt
}) => {
  // Location selection mode: 'current' or 'manual'
  const [locationMode, setLocationMode] = useState<'current' | 'manual'>(
    initialLocation ? 'manual' : userLocation ? 'current' : 'manual'
  );

  const [chosenCoord, setChosenCoord] = useState<LatLng>(
    initialLocation || userLocation || { lat: 22.5726, lng: 88.3639 }
  );
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsFeedback, setGpsFeedback] = useState<string | null>(null);

  const miniMapContainerRef = useRef<HTMLDivElement | null>(null);
  const miniMapInstanceRef = useRef<L.Map | null>(null);
  const miniMapMarkerRef = useRef<L.Marker | null>(null);

  const [name, setName] = useState('');
  const [pujaName, setPujaName] = useState('');
  const [clubName, setClubName] = useState('');
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [zone, setZone] = useState<string>('Kolkata');
  const [customZone, setCustomZone] = useState<string>('');
  const [audioAmbiance, setAudioAmbiance] = useState('Rhythmic Dhak & Kanshor');
  const [bestVisitHours, setBestVisitHours] = useState('1:00 AM - 4:00 AM');
  const [trafficLevel, setTrafficLevel] = useState<TrafficLevel>('moderate');
  const [initialRating, setInitialRating] = useState<number>(5);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isCapturingLive, setIsCapturingLive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Initialize interactive Leaflet mini-map in the modal
  useEffect(() => {
    if (!miniMapContainerRef.current) return;
    if (miniMapInstanceRef.current) {
      miniMapInstanceRef.current.invalidateSize();
      return;
    }

    const map = L.map(miniMapContainerRef.current, {
      center: [chosenCoord.lat, chosenCoord.lng],
      zoom: 14,
      zoomControl: true,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    const pinIcon = L.divIcon({
      className: 'mini-pandal-pin',
      html: `
        <div class="relative flex flex-col items-center">
          <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 border-2 border-white shadow-lg flex items-center justify-center text-white text-base">
            🪔
          </div>
          <div class="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-red-600 -mt-0.5"></div>
        </div>
      `,
      iconSize: [32, 38],
      iconAnchor: [16, 36]
    });

    const marker = L.marker([chosenCoord.lat, chosenCoord.lng], {
      icon: pinIcon,
      draggable: true
    }).addTo(map);

    marker.on('dragend', (e) => {
      const pos = e.target.getLatLng();
      setChosenCoord({ lat: pos.lat, lng: pos.lng });
      setLocationMode('manual');
      setGpsFeedback(`Pin dragged to: ${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`);
    });

    map.on('click', (e: L.LeafletMouseEvent) => {
      setChosenCoord({ lat: e.latlng.lat, lng: e.latlng.lng });
      marker.setLatLng([e.latlng.lat, e.latlng.lng]);
      setLocationMode('manual');
      setGpsFeedback(`Pin placed at: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`);
    });

    miniMapInstanceRef.current = map;
    miniMapMarkerRef.current = marker;

    const t1 = setTimeout(() => map.invalidateSize(), 80);
    const t2 = setTimeout(() => map.invalidateSize(), 300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      map.remove();
      miniMapInstanceRef.current = null;
    };
  }, []);

  // Update mini-map position when chosenCoord changes
  useEffect(() => {
    if (miniMapMarkerRef.current) {
      miniMapMarkerRef.current.setLatLng([chosenCoord.lat, chosenCoord.lng]);
    }
  }, [chosenCoord]);

  // Separate Handler 1: Use Current Location
  const handleUseCurrentLocation = () => {
    setGpsLoading(true);
    setGpsFeedback('Fetching high-precision GPS position...');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setChosenCoord(loc);
          setLocationMode('current');
          setGpsLoading(false);
          setGpsFeedback(`✓ Locked to current GPS: ${loc.lat.toFixed(4)}, ${loc.lng.toFixed(4)}`);
          if (!address) setAddress('Current GPS Location, West Bengal');
          if (miniMapInstanceRef.current && miniMapMarkerRef.current) {
            miniMapMarkerRef.current.setLatLng([loc.lat, loc.lng]);
            miniMapInstanceRef.current.flyTo([loc.lat, loc.lng], 15, { duration: 0.8 });
          }
        },
        (err) => {
          console.warn('GPS error, using available location:', err);
          if (userLocation) {
            setChosenCoord(userLocation);
            setLocationMode('current');
            setGpsFeedback(`✓ Using device location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`);
            if (miniMapInstanceRef.current && miniMapMarkerRef.current) {
              miniMapMarkerRef.current.setLatLng([userLocation.lat, userLocation.lng]);
              miniMapInstanceRef.current.flyTo([userLocation.lat, userLocation.lng], 15, { duration: 0.8 });
            }
          } else {
            setGpsFeedback('Could not fetch GPS. Please tap "Mark Manually" below.');
          }
          setGpsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else if (userLocation) {
      setChosenCoord(userLocation);
      setLocationMode('current');
      setGpsLoading(false);
      setGpsFeedback(`✓ Device location: ${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`);
    } else {
      setGpsLoading(false);
      setGpsFeedback('GPS not supported in browser. Please use "Mark Manually".');
    }
  };

  // Separate Handler 2: Mark Manually on Map - Takes user directly to full map
  const handleMarkManually = () => {
    setLocationMode('manual');
    if (onSelectMapLocationPrompt) {
      onSelectMapLocationPrompt();
    } else {
      setGpsFeedback('📍 Tap anywhere on the map or drag the pin to your exact spot.');
      if (miniMapInstanceRef.current) {
        setTimeout(() => miniMapInstanceRef.current?.invalidateSize(), 50);
      }
    }
  };

  // Start live webcam/camera stream
  const startLiveCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCapturingLive(true);
    } catch (err) {
      console.warn('Live camera stream error, falling back to camera input file:', err);
      setCameraError('Direct camera preview not supported in this frame; please use the Camera Capture button below.');
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      }
    }
  };

  const stopLiveCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturingLive(false);
  };

  const captureFrameFromLiveVideo = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setUploadedPhotos(prev => [...prev, dataUrl]);
    }
    stopLiveCamera();
  };

  // Handle files from Gallery or Camera Capture input
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setUploadedPhotos(prev => [...prev, loadEvt.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Fallback sample photos if user does not have camera or wants sample festive images
  const addSampleFestivePhoto = () => {
    const samplePool = [
      'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571597438372-540dd352bf41?auto=format&fit=crop&w=800&q=80'
    ];
    const pick = samplePool[uploadedPhotos.length % samplePool.length];
    setUploadedPhotos(prev => [...prev, pick]);
  };

  const removePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const defaultImg = 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=800&q=80';
    const finalPhotos = uploadedPhotos.length > 0 ? uploadedPhotos : [defaultImg];

    const finalZone = zone === 'Other' && customZone.trim() ? customZone.trim() : zone;

    const newPandal: Pandal = {
      id: 'pandal-custom-' + Date.now(),
      name: name.trim(),
      pujaName: pujaName.trim() || `${name.trim()} Sarbojanin Durgotsav`,
      clubName: clubName.trim() || undefined,
      theme: theme.trim() || 'Auspicious Festive Illuminations & Clay Pratima',
      description: description.trim() || 'A newly discovered festive pandal marked by a community hopper with vibrant celebrations and idol.',
      location: chosenCoord,
      address: address.trim() || `${finalZone}, West Bengal`,
      zone: finalZone,
      images: finalPhotos,
      thumbnail: finalPhotos[0],
      rating: initialRating,
      reviewCount: 1,
      reviews: [
        {
          id: 'rev-init-' + Date.now(),
          userName: 'Explorer (You)',
          rating: initialRating,
          comment: description.trim() || 'Marked this wonderful pandal! Great atmosphere and artistry.',
          timestamp: 'Just now',
          photos: finalPhotos.slice(0, 2)
        }
      ],
      visitCount: 1,
      photosPostedCount: finalPhotos.length,
      trafficLevel,
      estimatedQueueMins: trafficLevel === 'jam' ? 45 : trafficLevel === 'heavy' ? 30 : trafficLevel === 'moderate' ? 15 : 5,
      isBeautyPick: initialRating >= 5,
      isHeritage: false,
      createdBy: 'user',
      createdAt: new Date().toISOString(),
      crowdDensityPercent: trafficLevel === 'jam' ? 90 : trafficLevel === 'heavy' ? 75 : 45,
      bestVisitHours,
      audioAmbiance
    };

    stopLiveCamera();
    onSavePandal(newPandal);

    // Confetti
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        id="add-pandal-container"
        className="w-full max-w-lg max-h-[92vh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 p-4 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-200" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">Pin the Pandal</h3>
              <p className="text-[11px] text-amber-200 font-medium">Mark your local club, idol, and route on the map</p>
            </div>
          </div>
          <button 
            onClick={() => { stopLiveCamera(); onClose(); }}
            className="p-1 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-gray-800">
          
          {/* Community Encouragement Banner */}
          <div className="bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white rounded-2xl p-3 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 text-xl">
              🪔
            </div>
            <div className="text-xs">
              <strong className="block font-extrabold text-amber-100">
                Map Your Local Para's Puja!
              </strong>
              <span className="text-white/90 leading-tight">
                From Kolkata to Siliguri, Kalyani to Medinipur — help fellow hoppers discover the beauty of your local club's pandal and idol!
              </span>
            </div>
          </div>

          {/* Location Mode Selector with Two Separate Buttons & Embedded Map */}
          <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-amber-950 uppercase tracking-wide flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-600" />
                Pandal Location Setup
              </span>
              <span className="text-[11px] font-mono text-gray-700 bg-white/90 px-2 py-0.5 rounded-lg border border-amber-200">
                {chosenCoord.lat.toFixed(4)}, {chosenCoord.lng.toFixed(4)}
              </span>
            </div>

            {/* TWO SEPARATE BUTTONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Button 1: Use My Current Location */}
              <button
                type="button"
                id="select-current-loc-btn"
                onClick={handleUseCurrentLocation}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition flex items-center justify-center gap-2 active:scale-95 ${
                  locationMode === 'current'
                    ? 'bg-blue-600 text-white border-blue-700 shadow-md ring-2 ring-blue-400/30'
                    : 'bg-white text-blue-900 border-blue-200 hover:bg-blue-50/70'
                }`}
              >
                {gpsLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-current" />
                ) : (
                  <Navigation className="w-4 h-4 fill-current" />
                )}
                <span>Use My Current Location</span>
              </button>

              {/* Button 2: Mark Manually on Map */}
              <button
                type="button"
                id="select-manual-loc-btn"
                onClick={handleMarkManually}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition flex items-center justify-center gap-2 active:scale-95 ${
                  locationMode === 'manual'
                    ? 'bg-amber-600 text-white border-amber-700 shadow-md ring-2 ring-amber-400/30'
                    : 'bg-white text-amber-950 border-amber-300 hover:bg-amber-50/70'
                }`}
              >
                <Crosshair className="w-4 h-4 text-current" />
                <span>Mark Manually on Map</span>
              </button>
            </div>

            {/* Live GPS / Action Feedback */}
            {gpsFeedback && (
              <div className="text-[11px] font-medium text-amber-900 bg-white/80 p-2 rounded-xl border border-amber-200 flex items-center justify-between">
                <span>{gpsFeedback}</span>
              </div>
            )}

            {/* Embedded Interactive Map for Pinning */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300 shadow-inner bg-gray-100 h-44">
              <div 
                ref={miniMapContainerRef} 
                className="w-full h-full cursor-crosshair"
                style={{ zIndex: 10 }}
              />

              {/* Floating Fullscreen Map Button */}
              <button
                type="button"
                id="open-fullscreen-map-pin-btn"
                onClick={onSelectMapLocationPrompt}
                className="absolute top-2 right-2 z-20 px-2.5 py-1 bg-white/95 hover:bg-white text-gray-800 text-[11px] font-bold rounded-xl shadow-md border border-gray-200 flex items-center gap-1 active:scale-95 transition"
                title="Open in Fullscreen Map"
              >
                <Maximize2 className="w-3 h-3 text-red-600" />
                <span>Fullscreen Map</span>
              </button>

              {/* Floating Bottom Help Note */}
              <div className="absolute bottom-2 inset-x-2 z-20 bg-black/60 backdrop-blur-xs text-white text-[10px] py-1 px-2.5 rounded-xl flex items-center justify-between pointer-events-none">
                <span className="truncate">
                  {locationMode === 'manual' ? '📍 Click map or drag 🪔 pin to adjust' : '📍 Centered at your location'}
                </span>
                <span className="font-mono text-amber-300 shrink-0 ml-2">
                  {chosenCoord.lat.toFixed(4)}, {chosenCoord.lng.toFixed(4)}
                </span>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Pandal / Club Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maddox Square, Hatibagan Sarbojanin, Badamtala..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs sm:text-sm p-3 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Organizing Club / Baroari Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Luminous Club, Yubak Sangha..."
                  value={clubName}
                  onChange={(e) => setClubName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Puja Banner Name</label>
                <input
                  type="text"
                  placeholder="e.g. 75th Year Sharad Utsav"
                  value={pujaName}
                  onChange={(e) => setPujaName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">District / Region (West Bengal)</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 font-medium"
              >
                <option value="Kolkata">Kolkata</option>
                <option value="Howrah">Howrah</option>
                <option value="Hooghly">Hooghly / Chandannagar</option>
                <option value="Nadia">Nadia / Kalyani</option>
                <option value="North 24 Parganas">North 24 Parganas</option>
                <option value="South 24 Parganas">South 24 Parganas</option>
                <option value="Siliguri & North Bengal">Siliguri & North Bengal</option>
                <option value="Paschim Bardhaman">Paschim Bardhaman (Durgapur / Asansol)</option>
                <option value="Purba Bardhaman">Purba Bardhaman</option>
                <option value="Paschim Medinipur">Paschim Medinipur</option>
                <option value="Purba Medinipur">Purba Medinipur</option>
                <option value="Bankura">Bankura</option>
                <option value="Purulia">Purulia</option>
                <option value="Birbhum">Birbhum (Bolpur / Suri)</option>
                <option value="Malda">Malda</option>
                <option value="Murshidabad">Murshidabad</option>
                <option value="Jalpaiguri">Jalpaiguri</option>
                <option value="Cooch Behar">Cooch Behar</option>
                <option value="Darjeeling">Darjeeling & Hills</option>
                <option value="Other">Other District / Custom Area</option>
              </select>

              {zone === 'Other' && (
                <input
                  type="text"
                  placeholder="Enter district, subdivision, or village name..."
                  value={customZone}
                  onChange={(e) => setCustomZone(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-amber-400 bg-amber-50/50 mt-2 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                />
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Theme & Pandal Concept</label>
              <input
                type="text"
                placeholder="e.g. Eco-friendly Jute Palace, Ancient Temple replica..."
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Address / Landmark</label>
              <input
                type="text"
                placeholder="e.g. Near Kalighat Metro Station, Hazra Road"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Experience Description</label>
              <textarea
                rows={2}
                placeholder="Highlight the idol details, lighting, crowd lines, food stalls..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Photo Upload & Camera Integration */}
          <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-red-600" />
                  Upload Idol & Pandal Photos
                </h4>
                <p className="text-[11px] text-gray-600">The 1st photo becomes the map locator bubble!</p>
              </div>
              <span className="text-xs font-bold text-amber-700">
                {uploadedPhotos.length} photo{uploadedPhotos.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Live Camera Stream View if activated */}
            {isCapturingLive && (
              <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute bottom-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={captureFrameFromLiveVideo}
                    className="px-4 py-2 bg-red-600 text-white rounded-full font-bold text-xs shadow-lg hover:bg-red-700 flex items-center gap-1.5"
                  >
                    <Camera className="w-4 h-4" /> Snap Photo
                  </button>
                  <button
                    type="button"
                    onClick={stopLiveCamera}
                    className="px-3 py-2 bg-black/60 text-white rounded-full text-xs font-medium backdrop-blur-xs"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {cameraError && (
              <p className="text-[11px] text-amber-800 bg-amber-100/70 p-2 rounded-xl">
                {cameraError}
              </p>
            )}

            {/* Capture / Upload Buttons Grid */}
            <div className="grid grid-cols-3 gap-2">
              {/* Option A: Direct Camera Capture (works natively on Mobile Android/iOS) */}
              <button
                type="button"
                id="btn-open-camera"
                onClick={() => {
                  if (cameraInputRef.current) {
                    cameraInputRef.current.click();
                  } else {
                    startLiveCamera();
                  }
                }}
                className="py-2.5 px-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl text-red-800 text-xs font-bold flex flex-col items-center justify-center gap-1 transition"
              >
                <Camera className="w-4 h-4 text-red-600" />
                <span>Open Camera</span>
              </button>

              {/* Option B: Upload from Gallery */}
              <button
                type="button"
                id="btn-upload-gallery"
                onClick={() => fileInputRef.current?.click()}
                className="py-2.5 px-2 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl text-blue-800 text-xs font-bold flex flex-col items-center justify-center gap-1 transition"
              >
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <span>From Gallery</span>
              </button>

              {/* Option C: Sample Festival Photo */}
              <button
                type="button"
                onClick={addSampleFestivePhoto}
                className="py-2.5 px-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-amber-800 text-xs font-bold flex flex-col items-center justify-center gap-1 transition"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Festive Stock</span>
              </button>
            </div>

            {/* Hidden native inputs */}
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFiles}
              className="hidden"
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFiles}
              className="hidden"
            />

            {/* Uploaded Photos Preview Thumbnails */}
            {uploadedPhotos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {uploadedPhotos.map((img, i) => (
                  <div key={i} className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-amber-300 shadow-xs group">
                    <img src={img} alt="Uploaded preview" className="w-full h-full object-cover" />
                    {i === 0 && (
                      <span className="absolute bottom-0 inset-x-0 bg-red-600/90 text-[8px] text-white font-bold text-center py-0.5">
                        Map Pin
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 text-white flex items-center justify-center text-[10px] hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Traffic & Rating settings */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Current Traffic</label>
              <select
                value={trafficLevel}
                onChange={(e) => setTrafficLevel(e.target.value as TrafficLevel)}
                className="w-full text-xs p-2.5 rounded-xl border border-gray-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500"
              >
                <option value="low">🟢 Smooth Flow</option>
                <option value="moderate">🟡 Moderate Rush</option>
                <option value="heavy">🟠 Heavy Traffic</option>
                <option value="jam">🔴 Jam / Pedestrian only</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Your Rating</label>
              <div className="flex items-center gap-1 p-2 bg-gray-50 border border-gray-200 rounded-xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setInitialRating(star)}
                    className="text-amber-400 hover:text-amber-500 transition"
                  >
                    <Star className={`w-4 h-4 ${star <= initialRating ? 'fill-amber-400 text-amber-500' : 'text-gray-300'}`} />
                  </button>
                ))}
                <span className="text-xs font-bold text-amber-800 ml-1">{initialRating}/5</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              id="submit-pandal-btn"
              className="w-full py-3 px-4 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg text-sm flex items-center justify-center gap-2 active:scale-98 transition"
            >
              <Check className="w-5 h-5" />
              <span>Publish Pandal Pin to Community Map</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
