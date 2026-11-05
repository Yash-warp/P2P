import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  SlidersHorizontal, 
  Shield, 
  ShieldCheck, 
  Star, 
  X, 
  Search, 
  Plus, 
  House, 
  MessageCircle, 
  User, 
  CheckCircle2, 
  Heart,
  ChevronDown
} from 'lucide-react';

export const FeedView = () => {
  const { 
    products, 
    navigateTo, 
    navigateToProduct, 
    openBookingModal, 
    currentLocation, 
    setCurrentLocation,
    toggleWishlist, 
    isWishlisted,
    currentUser,
    conversations,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(5); // in km
  const [isRadiusActive, setIsRadiusActive] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [locationPickerOpen, setLocationPickerOpen] = useState(false);

  const categories = [
    'All',
    'Electronics',
    'Sports',
    'Tools',
    'Vehicles',
    'Music',
    'Camping',
    'Photography'
  ];

  const distanceOptions = [
    { label: '1 km', value: 1 },
    { label: '3 km', value: 3 },
    { label: '5 km', value: 5 },
    { label: '10 km', value: 10 },
    { label: '25 km', value: 25 },
    { label: '50 km', value: 50 }
  ];

  const locationsList = [
    'Indiranagar, Bangalore',
    'Koramangala, Bangalore',
    'HSR Layout, Bangalore',
    'Whitefield, Bangalore',
    'Jayanagar, Bangalore',
    'Bandra West, Mumbai',
    'Hauz Khas, Delhi'
  ];

  // Reliable category fallbacks to guarantee images always render crisp & relevant
  const CATEGORY_FALLBACK_IMAGES = {
    cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    drones: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=1000&q=80',
    tools: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1000&q=80',
    camping: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
    bikes: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
    audio: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=1000&q=80',
    gaming: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1000&q=80',
  };

  const getFallbackImage = (category) => {
    const cat = (category || '').toLowerCase();
    return CATEGORY_FALLBACK_IMAGES[cat] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80';
  };

  // Map Lendit categories to product dataset categories
  const categoryMap = {
    'Electronics': ['cameras', 'drones', 'audio', 'gaming'],
    'Sports': ['bikes'],
    'Tools': ['tools'],
    'Vehicles': ['bikes'],
    'Music': ['audio'],
    'Camping': ['camping'],
    'Photography': ['cameras', 'drones']
  };

  // Filter products based on active filters
  const filteredProducts = products.filter(item => {
    // Category filter
    if (selectedCategory !== 'All') {
      const allowed = categoryMap[selectedCategory] || [];
      if (!allowed.includes(item.category)) {
        return false;
      }
    }

    // Distance filter
    const dist = item.distance !== undefined ? item.distance : (item.distanceKm !== undefined ? item.distanceKm : 0);
    if (isRadiusActive && dist > selectedRadius) {
      return false;
    }

    // Verified owners only
    const isOwnerVerified = item.owner?.verified || item.owner?.verifiedId;
    if (verifiedOnly && !isOwnerVerified) {
      return false;
    }

    return true;
  });

  const unreadCount = conversations.reduce((acc, c) => acc + (c.unread ? 1 : 0), 0);

  return (
    <div className="min-h-screen bg-[#FAF8FF] text-[#30105E] pb-24 selection:bg-[#C4B5FD] selection:text-[#30105E]">
      
      {/* Exact Lendit Feed Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8FF]/90 backdrop-blur-2xl px-4 sm:px-6 pt-5 pb-3.5 border-b border-[#E9D5FF]/70 shadow-xs">
        <div className="max-w-6xl mx-auto">
          
          {/* Top Row: Title, Location and Actions */}
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#30105E] tracking-tight">
                  Discover
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mt-1" title="Live Local Feed"></span>
              </div>

              {/* Location Subline */}
              <div 
                onClick={() => setLocationPickerOpen(!locationPickerOpen)}
                className="flex items-center gap-1.5 mt-0.5 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <MapPin size={13} className="text-[#7C3AED] flex-shrink-0" />
                <span className="text-xs text-[#30105E]/75 font-body font-medium">
                  {currentLocation ? `${currentLocation.split(',')[0]} • ${isRadiusActive ? `${selectedRadius} km radius` : 'All nearby'}` : 'Indiranagar, Bangalore • All products'}
                </span>
                <ChevronDown size={12} className="text-[#7C3AED]/70" />
              </div>
            </div>

            {/* Right Action Icons: Location Pin + Filter Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLocationPickerOpen(!locationPickerOpen)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  locationPickerOpen
                    ? 'bg-[#E9D5FF] border-[#C4B5FD] text-[#30105E]'
                    : 'bg-white border-[#E9D5FF] text-[#30105E]/80 hover:bg-[#FAF8FF] shadow-2xs'
                }`}
                title="Change location"
              >
                <MapPin size={18} className="text-[#7C3AED]" />
              </button>

              <button
                onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  filterDrawerOpen || isRadiusActive || verifiedOnly
                    ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-[0_4px_12px_rgba(124,58,237,0.3)]'
                    : 'bg-white border-[#E9D5FF] text-[#30105E]/80 hover:bg-[#FAF8FF] shadow-2xs'
                }`}
                title="Toggle filters"
              >
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Location Dropdown Modal */}
          {locationPickerOpen && (
            <div className="mb-3.5 p-3 rounded-2xl bg-white border border-[#E9D5FF] shadow-lg animate-in fade-in slide-in-from-top-2">
              <p className="text-[10px] font-bold text-[#7C3AED] uppercase tracking-wider mb-2 px-1">
                Select Neighborhood
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {locationsList.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setCurrentLocation(loc);
                      setLocationPickerOpen(false);
                      if (showToast) showToast('info', `Location set to ${loc.split(',')[0]}`);
                    }}
                    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold truncate transition-colors ${
                      currentLocation === loc
                        ? 'bg-[#7C3AED] text-white'
                        : 'bg-[#FAF8FF] hover:bg-[#E9D5FF]/50 text-[#30105E]'
                    }`}
                  >
                    {loc.split(',')[0]}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Expandable Filter Drawer (AnimatePresence style) */}
          {filterDrawerOpen && (
            <div className="pb-3.5 pt-1 space-y-3 animate-in fade-in slide-in-from-top-2 border-t border-[#E9D5FF]/60 mt-2">
              <div>
                <p className="text-[10px] font-display uppercase tracking-wider text-[#30105E]/70 mb-2 font-bold">
                  Search Distance Radius
                </p>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                  {distanceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSelectedRadius(opt.value);
                        setIsRadiusActive(true);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-display whitespace-nowrap transition-all ${
                        isRadiusActive && selectedRadius === opt.value
                          ? 'bg-[#7C3AED] text-white font-bold shadow-2xs'
                          : 'bg-white hover:bg-[#E9D5FF]/40 border border-[#E9D5FF] text-[#30105E] font-medium'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                  {isRadiusActive && (
                    <button
                      onClick={() => setIsRadiusActive(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-display whitespace-nowrap bg-rose-50 text-rose-600 font-bold border border-rose-200 transition-all hover:bg-rose-100"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={() => setVerifiedOnly(!verifiedOnly)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-display font-bold transition-all border ${
                    verifiedOnly
                      ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                      : 'bg-white border-[#E9D5FF] text-[#30105E] hover:bg-[#FAF8FF]'
                  }`}
                >
                  <Shield size={14} className={verifiedOnly ? 'text-white' : 'text-[#7C3AED]'} />
                  <span>Verified owners only</span>
                </button>
              </div>
            </div>
          )}

          {/* Horizontal Category Carousel */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6 pt-1 pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-display uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-[#7C3AED] text-white font-bold shadow-[0_3px_10px_rgba(124,58,237,0.25)]'
                    : 'bg-white hover:bg-[#E9D5FF]/50 border border-[#E9D5FF] text-[#30105E]/80 font-semibold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </header>

      {/* Main Feed Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        
        {/* "Get Verified" Promo Banner (Dismissible) */}
        {!bannerDismissed && (
          <div className="mb-5 bg-[#FAF8FF] border border-[#E9D5FF] rounded-2xl p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E9D5FF] rounded-xl flex items-center justify-center shrink-0">
                <Shield size={20} className="text-[#7C3AED]" />
              </div>
              <div>
                <p className="text-[#30105E] text-sm font-display font-bold">
                  Get DigiLocker Verified
                </p>
                <p className="text-[#30105E]/70 text-[11px] font-body mt-0.5">
                  Completely free verification! Boost your gear trust score to 100%.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  if (showToast) showToast('success', 'Your DigiLocker ID is already 100% verified!');
                }}
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-3.5 py-2 rounded-xl text-xs font-display font-bold whitespace-nowrap shadow-[0_2px_8px_rgba(124,58,237,0.25)] active:scale-95 transition-transform"
              >
                Verify
              </button>
              <button
                onClick={() => setBannerDismissed(true)}
                className="p-1.5 text-[#30105E]/50 hover:text-[#30105E] hover:bg-[#E9D5FF]/50 rounded-full transition-colors"
                aria-label="Dismiss banner"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Results Count & Match Status */}
        <div className="flex items-center justify-between mb-3.5">
          <p className="text-[11px] font-display uppercase tracking-wider text-[#30105E]/70 font-bold">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} • Best matches near you
          </p>

          <span className="text-[11px] font-medium text-[#7C3AED] bg-[#E9D5FF] px-2.5 py-0.5 rounded-full border border-[#C4B5FD]">
            {selectedCategory === 'All' ? 'All Categories' : selectedCategory}
          </span>
        </div>

        {/* Product Cards Grid - 1:1 Lendit Grid Layout */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((p) => {
                const wish = isWishlisted(p.id);
                const itemImg = (Array.isArray(p.images) && p.images[0]) || p.image || getFallbackImage(p.category);
                const isOwnerVerified = p.owner?.verified || p.owner?.verifiedId;
                const reviewCount = p.reviewCount || p.reviewsCount || 24;
                const distanceVal = p.distance !== undefined ? p.distance : (p.distanceKm !== undefined ? p.distanceKm : 1.2);

                return (
                  <div
                    key={p.id}
                    onClick={() => navigateToProduct(p.id)}
                    className="bg-white rounded-2xl overflow-hidden border border-[#E9D5FF]/80 shadow-xs hover:shadow-lg hover:border-[#7C3AED]/50 transition-all duration-300 block group cursor-pointer flex flex-col justify-between"
                  >
                    {/* Image Area - Aspect 4/3 */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#FAF8FF]">
                      <img
                        src={itemImg}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = getFallbackImage(p.category);
                        }}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between pointer-events-none">
                        <span className="bg-white/90 backdrop-blur-md text-[#30105E] text-[10px] font-display uppercase tracking-wider px-2 py-0.5 rounded-lg font-bold shadow-2xs border border-white">
                          {p.category}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/40" 
                            title="Available today"
                          ></div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleWishlist(p.id);
                            }}
                            className="pointer-events-auto p-1.5 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
                            aria-label="Wishlist"
                          >
                            <Heart size={12} className={wish ? 'fill-rose-500 text-rose-500' : 'text-white'} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title Row */}
                        <div className="flex items-start gap-1 mb-1">
                          <h3 className="font-display font-semibold text-[#30105E] text-xs sm:text-sm leading-tight line-clamp-2 flex-1">
                            {p.title}
                          </h3>
                          {isOwnerVerified && (
                            <ShieldCheck size={14} className="text-[#7C3AED] flex-shrink-0 mt-0.5" />
                          )}
                        </div>

                        {/* Price & Rating */}
                        <div className="flex items-center justify-between pt-0.5">
                          <p className="text-[#7C3AED] font-display font-black text-sm sm:text-base">
                            ₹{p.pricePerDay.toLocaleString('en-IN')}
                            <span className="text-[10px] text-[#30105E]/60 font-medium ml-0.5">/day</span>
                          </p>

                          {p.rating && (
                            <div className="flex items-center gap-0.5 text-[#30105E]/80 text-[11px]">
                              <Star size={11} className="text-amber-400 fill-amber-400" />
                              <span className="font-display font-bold">{p.rating.toFixed(1)}</span>
                              <span className="text-[9px] text-[#30105E]/60">({reviewCount})</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Owner & Distance Row */}
                      <div className="flex items-center justify-between pt-2 border-t border-[#E9D5FF]/60">
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          {p.owner?.avatar ? (
                            <img
                              src={p.owner.avatar}
                              alt={p.owner.name}
                              className="w-4 h-4 rounded-full flex-shrink-0 object-cover ring-1 ring-[#C4B5FD]"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                              }}
                            />
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-[#E9D5FF] text-[8px] flex items-center justify-center font-display font-bold text-[#30105E] flex-shrink-0">
                              {p.owner?.name?.[0] || 'O'}
                            </div>
                          )}
                          <span className="text-[10px] text-[#30105E]/75 font-medium truncate">
                            {p.owner?.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-0.5 text-[10px] text-[#30105E]/70 flex-shrink-0 font-medium">
                          <MapPin size={9} className="text-[#7C3AED]" />
                          <span>{distanceVal} km</span>
                        </div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* End of Results Ticker */}
            <div className="h-16 flex items-center justify-center mt-6">
              <p className="text-xs text-[#30105E]/60 font-body">
                ✓ You've seen all {filteredProducts.length} results near you
              </p>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#E9D5FF]/40 border border-[#C4B5FD] flex items-center justify-center text-2xl">
              🔍
            </div>
            <p className="text-[#30105E] font-display font-bold text-base">
              No gear found matching filters
            </p>
            <p className="text-[#30105E]/70 text-xs max-w-xs leading-relaxed">
              Try adjusting your category or expanding your distance radius to see more gear nearby.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setIsRadiusActive(false);
                setVerifiedOnly(false);
              }}
              className="mt-2 px-4 py-2 rounded-xl bg-[#7C3AED] text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>
    </div>
  );
};

