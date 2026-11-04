import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { MapPin, Star, ShieldCheck, Heart, Sparkles, ArrowRight, Zap } from 'lucide-react';

export const NearbyPreview = () => {
  const { 
    products, 
    navigateToProduct, 
    openBookingModal, 
    toggleWishlist, 
    isWishlisted, 
    currentLocation,
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="features" className="py-12 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header with User Greeting and Location */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#30105E] bg-[#E9D5FF] border border-[#C4B5FD] px-3 py-1 rounded-full w-max mb-2">
              <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>{currentLocation}</span>
              <span className="text-[#7C3AED]">•</span>
              <span>23 items available within 5 km</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-[#30105E] tracking-tight">
              Find what you need,{' '}
              <span className="text-[#30105E]/70 font-medium">around the corner.</span>
            </h2>
          </div>

          <button
            onClick={() => navigateTo('marketplace')}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7C3AED] hover:text-[#6D28D9] transition-colors group"
          >
            <span>View all 48 nearby items</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#7C3AED]" />
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6">
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-2 ${
                activeTab === cat.id
                  ? 'bg-[#7C3AED] text-white shadow-md font-bold'
                  : 'bg-white hover:bg-[#FAF8FF] text-[#30105E] border border-[#E9D5FF] shadow-2xs'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                activeTab === cat.id ? 'bg-[#C4B5FD] text-[#30105E] font-bold' : 'bg-[#E9D5FF]/60 text-[#30105E]'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProducts.slice(0, 4).map((product) => {
            const wishlisted = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="group rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-xl hover:border-[#7C3AED]/60 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                    <span className="bg-[#30105E]/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs">
                      {product.distance} km away
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="pointer-events-auto p-2 rounded-full bg-white/95 hover:bg-white text-[#30105E] shadow-sm transition-transform active:scale-90"
                      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
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

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Location */}
                    <div className="flex items-center justify-between text-xs text-[#30105E]/70 mb-1">
                      <span className="capitalize font-semibold text-[#7C3AED]">{product.category}</span>
                      <div className="flex items-center gap-1 font-bold text-[#30105E]">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[#30105E]/50 font-normal">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => navigateToProduct(product.id)}
                      className="font-display font-bold text-sm sm:text-base text-[#30105E] line-clamp-2 hover:text-[#7C3AED] cursor-pointer transition-colors"
                    >
                      {product.title}
                    </h3>
                  </div>

                  {/* Price & Action Button */}
                  <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#30105E]/60 font-medium">Daily rent</div>
                      <div className="font-display font-black text-lg text-[#30105E]">
                        ₹{product.pricePerDay}
                        <span className="text-xs font-normal text-[#30105E]/60">/day</span>
                      </div>
                    </div>

                    <button
                      onClick={() => openBookingModal(product)}
                      className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs transition-all duration-150 shadow-sm active:scale-95"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
