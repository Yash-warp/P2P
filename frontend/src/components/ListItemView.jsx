import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Upload, 
  Sparkles, 
  Plus, 
  MapPin, 
  IndianRupee, 
  ShieldCheck, 
  Image as ImageIcon,
  CheckCircle2,
  X,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Sony A7 Camera', url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80' },
  { label: 'DJI Drone', url: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Power Drill', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Camping Tent', url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Mountain Bike', url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Acoustic Guitar', url: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80' }
];

export const ListItemView = () => {
  const { addProductListing, navigateTo, currentLocation, isLoggedIn } = useApp();

  const [step, setStep] = useState(1); // 1: Info, 2: Photos, 3: Pricing & Rules
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('cameras');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('Like New');
  const [description, setDescription] = useState('');
  const [pricePerDay, setPricePerDay] = useState(650);
  const [securityDeposit, setSecurityDeposit] = useState(3000);
  const [location, setLocation] = useState(currentLocation);
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [isInstantBook, setIsInstantBook] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const finalImage = customImageUrl.trim() || selectedImage;

    addProductListing({
      title,
      category,
      brand: brand || 'Brand',
      condition,
      description: description || 'High quality equipment in great condition, tested before every rental.',
      pricePerDay: Number(pricePerDay),
      securityDeposit: Number(securityDeposit),
      minRentalDays: 1,
      location,
      distance: 0.5,
      images: [finalImage],
      isInstantBook,
      isSuperhost: true,
      specs: [
        { label: 'Category', value: category.toUpperCase() },
        { label: 'Condition', value: condition },
        { label: 'Instant Booking', value: isInstantBook ? 'Yes' : 'No' }
      ],
      included: ['Main Equipment Body', 'Protective Carry Case', 'Power Cable / Charger'],
      rules: ['Valid Govt ID required at pickup', 'Return with clean condition', 'Report any damage immediately']
    });
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-[#DFC5FE]/55 via-[#EEDBFE]/40 to-[#DFC5FE]/30 text-[#30105E] ${isLoggedIn ? 'pt-6 pb-24' : 'pt-28 pb-20'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9D5FF] text-[#30105E] text-xs font-bold mb-2 border border-[#C4B5FD]">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" /> List Your Gear
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-[#30105E] tracking-tight">
            Start Earning From Your Idle Gear
          </h1>
          <p className="text-xs sm:text-sm text-[#30105E]/70 mt-1 max-w-md mx-auto">
            List in under 2 minutes. Renters are 100% ID verified with escrow security deposits.
          </p>
        </div>

        {/* Steps Wizard Indicators */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[
            { s: 1, label: 'Gear Info' },
            { s: 2, label: 'Photos' },
            { s: 3, label: 'Pricing & Rules' }
          ].map((item) => (
            <div key={item.s} className="flex items-center gap-2">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === item.s 
                  ? 'bg-[#30105E] text-white shadow-sm' 
                  : step > item.s 
                  ? 'bg-[#7C3AED] text-white' 
                  : 'bg-[#E9D5FF] text-[#30105E]'
              }`}>
                {step > item.s ? '✓' : item.s}
              </span>
              <span className={`text-xs font-semibold hidden sm:inline ${step === item.s ? 'text-[#30105E] font-bold' : 'text-[#30105E]/50'}`}>
                {item.label}
              </span>
              {item.s < 3 && <div className="w-6 h-0.5 bg-[#E9D5FF] hidden sm:block"></div>}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#E9D5FF] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* STEP 1: Gear Info */}
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                    Listing Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Sony Alpha a7 IV with 24-70mm GM Lens"
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none"
                    >
                      <option value="cameras">Cameras & Video</option>
                      <option value="drones">Drones</option>
                      <option value="tools">Power Tools</option>
                      <option value="camping">Camping & Outdoors</option>
                      <option value="bikes">Bikes & Mobility</option>
                      <option value="audio">Audio & Music</option>
                      <option value="gaming">VR & Gaming</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                      Brand / Manufacturer
                    </label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="e.g. Sony, DJI, Bosch"
                      className="w-full px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                    Item Condition
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Like New', 'Excellent', 'Good'].map((cond) => (
                      <button
                        type="button"
                        key={cond}
                        onClick={() => setCondition(cond)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          condition === cond
                            ? 'bg-[#30105E] text-white border-[#30105E]'
                            : 'bg-[#FAF8FF] text-[#30105E] border-[#E9D5FF]'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                    Description & Included Accessories
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your item, key features, what accessories are included, and any special guidelines..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-xs sm:text-sm font-medium text-[#30105E] focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    disabled={!title.trim()}
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs disabled:opacity-50 flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Next: Add Photos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Photos */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-2">
                    Select High-Res Demo Photo Preset
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PRESET_IMAGES.map((preset) => (
                      <div
                        key={preset.label}
                        onClick={() => setSelectedImage(preset.url)}
                        className={`rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                          selectedImage === preset.url ? 'border-[#7C3AED] ring-2 ring-[#C4B5FD]' : 'border-transparent opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-24 object-cover" />
                        <div className="p-2 bg-[#FAF8FF] text-[11px] font-bold text-[#30105E] text-center truncate border-t border-[#E9D5FF]">
                          {preset.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                    Or Enter Custom Image URL
                  </label>
                  <input
                    type="url"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-xs text-[#30105E] focus:outline-none"
                  />
                </div>

                {/* Selected Image Preview */}
                <div className="p-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] flex items-center gap-4">
                  <img
                    src={customImageUrl.trim() || selectedImage}
                    alt="Preview"
                    className="w-20 h-20 rounded-xl object-cover ring-1 ring-[#C4B5FD]"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#7C3AED] uppercase">Selected Cover Image</span>
                    <h5 className="font-bold text-xs text-[#30105E] mt-0.5">{title || 'Gear Cover Photo'}</h5>
                    <p className="text-[11px] text-[#30105E]/50">High-resolution cover ready</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl border border-[#E9D5FF] text-[#30105E] font-bold text-xs flex items-center gap-1.5 hover:bg-[#FAF8FF]"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Next: Pricing & Location</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Pricing & Location */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                      Daily Rental Rate (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#30105E]/50 font-bold">₹</span>
                      <input
                        type="number"
                        required
                        min={50}
                        value={pricePerDay}
                        onChange={(e) => setPricePerDay(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-base font-bold text-[#30105E] focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-[#7C3AED] font-semibold mt-1 block">You receive ~90% (₹{Math.round(pricePerDay * 0.90)}/day)</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                      Refundable Security Deposit (₹) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#30105E]/50 font-bold">₹</span>
                      <input
                        type="number"
                        required
                        min={0}
                        value={securityDeposit}
                        onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-base font-bold text-[#30105E] focus:outline-none"
                      />
                    </div>
                    <span className="text-[10px] text-[#7C3AED] font-semibold mt-1 block">Held safely in escrow during rental</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1">
                    Pickup Neighborhood *
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF]">
                    <MapPin className="w-4 h-4 text-[#7C3AED] shrink-0" />
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Indiranagar, Bangalore"
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-[#30105E] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs text-[#30105E]">Enable Instant Booking</div>
                    <div className="text-[11px] text-[#30105E]/70">Verified borrowers can book without waiting for manual confirmation.</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isInstantBook}
                    onChange={(e) => setIsInstantBook(e.target.checked)}
                    className="w-5 h-5 accent-[#7C3AED] rounded cursor-pointer"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-5 py-2.5 rounded-xl border border-[#E9D5FF] text-[#30105E] font-bold text-xs flex items-center gap-1.5 hover:bg-[#FAF8FF]"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-display font-black text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#C4B5FD]" />
                    <span>Publish Listing to Marketplace</span>
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>

      </div>
    </div>
  );
};
