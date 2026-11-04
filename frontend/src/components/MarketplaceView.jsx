import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Star, 
  Heart, 
  ArrowUpDown, 
  Grid, 
  Map as MapIcon, 
  Zap, 
  ShieldCheck, 
  X,
  Filter,
  Check
} from 'lucide-react';

export const MarketplaceView = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory, 
    navigateToProduct, 
    openBookingModal, 
    toggleWishlist, 
    isWishlisted,
    currentLocation,
    isLoggedIn
  } = useApp();

  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating', 'distance'
  const [maxDistance, setMaxDistance] = useState(15);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [instantBookOnly, setInstantBookOnly] = useState(false);
  const [superhostOnly, setSuperhostOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map'
  const [activeMapPin, setActiveMapPin] = useState(null);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Search term
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        if (!matchesTitle && !matchesBrand && !matchesDesc) return false;
      }
      // Price filter
      if (item.pricePerDay > maxPrice) return false;
      // Distance filter
      if (item.distance > maxDistance) return false;
      // Instant book filter
      if (instantBookOnly && !item.isInstantBook) return false;
      // Superhost filter
      if (superhostOnly && !item.isSuperhost) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'distance') return a.distance - b.distance;
      return 0; // default featured
    });
  }, [products, searchQuery, selectedCategory, maxPrice, maxDistance, instantBookOnly, superhostOnly, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxDistance(25);
    setMaxPrice(5000);
    setInstantBookOnly(false);
    setSuperhostOnly(false);
    setSortBy('featured');
  };

  return (
    <div className={`min-h-screen ${isLoggedIn ? 'pt-6 pb-24' : 'pt-28 pb-20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Marketplace Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#30105E]/70 mb-1">
              <span>Marketplace</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#30105E]">
                <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" /> {currentLocation}
              </span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#30105E] tracking-tight">
              Browse Available Gear
            </h1>
          </div>

          {/* View Mode Toggle (Grid vs Map) */}
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-2xl bg-white border border-[#E9D5FF] shadow-neu-pill flex items-center">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'grid' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-[#30105E] hover:text-[#7C3AED]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'map' ? 'bg-[#7C3AED] text-white shadow-xs' : 'text-[#30105E] hover:text-[#7C3AED]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Global Search and Filter Bar */}
        <div className="p-4 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill mb-8">
          <div className="flex flex-col md:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-[#7C3AED] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gear title, brand, or model..."
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-xs sm:text-sm font-medium text-[#30105E] placeholder:text-[#30105E]/50 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#30105E]/50 hover:text-[#30105E]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#FAF8FF] border border-[#E9D5FF] rounded-2xl w-full md:w-auto">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#7C3AED]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-bold text-[#30105E] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest Distance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Filters Row */}
          <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Category Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-2xl scrollbar-none">
              {INITIAL_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
                      : 'bg-[#FAF8FF] hover:bg-[#E9D5FF]/60 text-[#30105E] border border-[#E9D5FF]/70'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-[#30105E]">
                <input
                  type="checkbox"
                  checked={instantBookOnly}
                  onChange={(e) => setInstantBookOnly(e.target.checked)}
                  className="rounded text-[#7C3AED] focus:ring-[#7C3AED]"
                />
                <Zap className="w-3 h-3 text-[#7C3AED] fill-[#7C3AED]" />
                <span>Instant Book</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-[#30105E]">
                <input
                  type="checkbox"
                  checked={superhostOnly}
                  onChange={(e) => setSuperhostOnly(e.target.checked)}
                  className="rounded text-[#7C3AED] focus:ring-[#7C3AED]"
                />
                <ShieldCheck className="w-3 h-3 text-[#7C3AED]" />
                <span>Superhost</span>
              </label>

              <span className="text-[#C4B5FD]">|</span>

              <button
                onClick={resetFilters}
                className="text-[#7C3AED] hover:text-[#6D28D9] font-bold underline"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Sliders Accordion */}
          <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#30105E]/80 mb-1">
                <span>Max Distance: {maxDistance} km</span>
                <span className="text-[#30105E]/50">Within {maxDistance} km radius</span>
              </div>
              <input
                type="range"
                min={1}
                max={25}
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-[#7C3AED] h-1.5 bg-[#E9D5FF] rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-[#30105E]/80 mb-1">
                <span>Max Daily Budget: ₹{maxPrice}</span>
                <span className="text-[#30105E]/50">Up to ₹{maxPrice} /day</span>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#7C3AED] h-1.5 bg-[#E9D5FF] rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="mb-6 flex items-center justify-between text-xs font-semibold text-[#30105E]/70">
          <div>
            Showing <span className="font-bold text-[#30105E]">{filteredProducts.length}</span> verified rental listings
          </div>
          {filteredProducts.length === 0 && (
            <button
              onClick={resetFilters}
              className="px-3 py-1 bg-white rounded-lg border border-[#E9D5FF] text-[#30105E] font-bold hover:bg-[#FAF8FF]"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* VIEW 1: Interactive Map Mode */}
        {viewMode === 'map' && (
          <div className="mb-10 rounded-[32px] overflow-hidden border border-[#E9D5FF] shadow-xl bg-white p-4">
            <div className="relative w-full h-[450px] bg-[#FAF8FF] rounded-2xl overflow-hidden flex items-center justify-center">
              {/* Radial gradient map dots */}
              <div className="absolute inset-0 bg-[#FAF8FF] opacity-90 bg-[radial-gradient(#C4B5FD_1.2px,transparent_1.2px)] [background-size:16px_16px]"></div>

              {/* Map Road Grid Lines */}
              <svg className="absolute inset-0 w-full h-full stroke-white stroke-2 pointer-events-none">
                <line x1="0" y1="120" x2="100%" y2="120" strokeWidth="8" stroke="#E9D5FF" />
                <line x1="0" y1="280" x2="100%" y2="280" strokeWidth="12" stroke="#E9D5FF" />
                <line x1="200" y1="0" x2="200" y2="100%" strokeWidth="10" stroke="#E9D5FF" />
                <line x1="550" y1="0" x2="550" y2="100%" strokeWidth="8" stroke="#E9D5FF" />
                <line x1="850" y1="0" x2="850" y2="100%" strokeWidth="6" stroke="#E9D5FF" />
                <circle cx="50%" cy="50%" r="160" fill="rgba(196, 181, 253, 0.2)" stroke="#7C3AED" strokeDasharray="4 4" />
              </svg>

              {/* Center User Location Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <span className="w-5 h-5 rounded-full bg-[#7C3AED] border-4 border-white shadow-lg animate-ping absolute"></span>
                <span className="w-5 h-5 rounded-full bg-[#7C3AED] border-4 border-white shadow-lg relative"></span>
                <span className="mt-1 bg-[#30105E] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  You are here
                </span>
              </div>

              {/* Interactive Item Pins on Map */}
              {filteredProducts.map((prod, idx) => {
                const angles = [30, 80, 140, 210, 260, 310, 350, 170];
                const angle = (angles[idx % angles.length] * Math.PI) / 180;
                const dist = 70 + (idx * 22);
                const left = `calc(50% + ${Math.cos(angle) * dist}px)`;
                const top = `calc(50% + ${Math.sin(angle) * dist}px)`;

                const isSelected = activeMapPin?.id === prod.id;

                return (
                  <div
                    key={prod.id}
                    style={{ left, top }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                    onClick={() => setActiveMapPin(prod)}
                  >
                    <div className={`px-2.5 py-1 rounded-full text-xs font-black shadow-lg transition-all transform hover:scale-110 flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#7C3AED] text-white ring-4 ring-[#C4B5FD] scale-110'
                        : 'bg-[#30105E] text-white hover:bg-[#7C3AED]'
                    }`}>
                      <span>₹{prod.pricePerDay}</span>
                    </div>
                  </div>
                );
              })}

              {/* Selected Pin Preview Card Popup */}
              {activeMapPin && (
                <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80 bg-white rounded-3xl p-4 shadow-2xl border border-[#E9D5FF] z-40 animate-in fade-in slide-in-from-bottom-2">
                  <button
                    onClick={() => setActiveMapPin(null)}
                    className="absolute top-3 right-3 p-1 rounded-full text-[#30105E]/50 hover:text-[#30105E]"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex gap-3">
                    <img
                      src={activeMapPin.images[0]}
                      alt={activeMapPin.title}
                      className="w-20 h-20 rounded-2xl object-cover shrink-0 ring-1 ring-[#C4B5FD]"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#30105E] bg-[#E9D5FF] px-1.5 py-0.5 rounded">
                        {activeMapPin.distance} km away
                      </span>
                      <h4 className="font-display font-bold text-xs text-[#30105E] mt-1 line-clamp-1">
                        {activeMapPin.title}
                      </h4>
                      <div className="font-display font-black text-sm text-[#30105E] mt-1">
                        ₹{activeMapPin.pricePerDay} <span className="text-[10px] font-normal text-[#30105E]/60">/day</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => navigateToProduct(activeMapPin.id)}
                      className="flex-1 py-1.5 rounded-xl border border-[#E9D5FF] text-xs font-bold text-[#30105E] hover:bg-[#FAF8FF]"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => openBookingModal(activeMapPin)}
                      className="flex-1 py-1.5 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-[#6D28D9]"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const wishlisted = isWishlisted(product.id);

              return (
                <div
                  key={product.id}
                  className="group rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-2xl hover:border-[#7C3AED]/60 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div
                    onClick={() => navigateToProduct(product.id)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                      <span className="bg-[#30105E]/85 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs">
                        {product.distance} km away
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="pointer-events-auto p-2 rounded-full bg-white/95 hover:bg-white text-[#30105E] shadow-sm transition-transform active:scale-90"
                      >
                        <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    {product.isInstantBook && (
                      <div className="absolute bottom-3 left-3 bg-[#C4B5FD] text-[#30105E] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                        <Zap className="w-3 h-3 fill-[#30105E]" /> Instant Book
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#30105E]/70 mb-1">
                        <span className="capitalize font-semibold text-[#7C3AED]">{product.category}</span>
                        <div className="flex items-center gap-1 font-bold text-[#30105E]">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                          <span>{product.rating}</span>
                          <span className="text-[#30105E]/50 font-normal">({product.reviewCount})</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => navigateToProduct(product.id)}
                        className="font-display font-bold text-sm sm:text-base text-[#30105E] hover:text-[#7C3AED] cursor-pointer line-clamp-1 transition-colors"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-[#30105E]/60 mt-1 line-clamp-1">
                        {product.location}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] text-[#30105E]/60 font-medium">Daily rent</div>
                        <div className="font-display font-black text-base text-[#30105E]">
                          ₹{product.pricePerDay}
                          <span className="text-[10px] font-normal text-[#30105E]/60"> /day</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => navigateToProduct(product.id)}
                          className="px-2.5 py-1.5 rounded-xl border border-[#E9D5FF] hover:bg-[#FAF8FF] text-[#30105E] font-semibold text-xs transition-colors"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openBookingModal(product)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs transition-all duration-150 active:scale-95 shadow-xs"
                        >
                          Rent Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center rounded-[32px] bg-white border border-[#E9D5FF] shadow-neu-pill max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF8FF] border border-[#E9D5FF] flex items-center justify-center mx-auto text-[#7C3AED] mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-xl text-[#30105E]">No gear matches your filters</h3>
            <p className="text-xs sm:text-sm text-[#30105E]/70 mt-1 max-w-sm mx-auto">
              Try widening your distance radius or clearing category keywords to discover more items nearby.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white font-bold text-xs hover:bg-[#6D28D9] transition-all shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
