import React from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const TrendingListings = () => {
  const { 
    products, 
    navigateToProduct, 
    openBookingModal, 
    toggleWishlist, 
    isWishlisted, 
    navigateTo 
  } = useApp();

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9D5FF] border border-[#C4B5FD] text-[#30105E] text-xs font-bold mb-2">
              <Zap className="w-3.5 h-3.5 fill-[#7C3AED] text-[#7C3AED]" />
              <span>Most Booked This Week</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#30105E] tracking-tight">
              Trending near you
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#30105E]/70 max-w-xl">
              Discover what your neighbors are renting right now. Save money by borrowing instead of buying.
            </p>
          </div>

          <button
            onClick={() => navigateTo('marketplace')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-[#E9D5FF] shadow-neu-pill text-xs sm:text-sm font-bold text-[#30105E] hover:bg-[#FAF8FF] transition-all group shrink-0"
          >
            <span>View all items</span>
            <ArrowRight className="w-4 h-4 text-[#7C3AED] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((product) => {
            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                className="group rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-2xl hover:border-[#7C3AED]/60 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Image Container with Zoom & Wishlist Button */}
                <div 
                  onClick={() => navigateToProduct(product.id)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer"
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Top Bar Badges */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">
                    <span className="bg-[#30105E]/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl shadow-xs">
                      {product.category.toUpperCase()} · {product.distance} mi
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

                  {/* Superhost Tag */}
                  {product.isSuperhost && (
                    <div className="absolute bottom-3 left-3.5 bg-[#30105E]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs border border-[#C4B5FD]/30">
                      <ShieldCheck className="w-3 h-3 text-[#C4B5FD]" /> Verified Superhost
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Owner & Rating */}
                    <div className="flex items-center justify-between text-xs text-[#30105E]/70 mb-2">
                      <div className="flex items-center gap-1.5">
                        <img
                          src={product.owner.avatar}
                          alt={product.owner.name}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-[#C4B5FD]"
                        />
                        <span className="font-semibold text-[#30105E]">{product.owner.name}</span>
                      </div>

                      <div className="flex items-center gap-1 font-bold text-[#30105E]">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[#30105E]/50 font-normal">({product.reviewCount})</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => navigateToProduct(product.id)}
                      className="font-display font-bold text-base sm:text-lg text-[#30105E] hover:text-[#7C3AED] cursor-pointer line-clamp-1 transition-colors"
                    >
                      {product.title}
                    </h3>

                    {/* Description snippet */}
                    <p className="mt-1 text-xs text-[#30105E]/60 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-5 pt-4 border-t border-[#E9D5FF]/60 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-[#30105E]/60 font-medium">Daily rental</div>
                      <div className="font-display font-black text-xl text-[#30105E]">
                        ₹{product.pricePerDay}
                        <span className="text-xs font-normal text-[#30105E]/60"> /day</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigateToProduct(product.id)}
                        className="px-3 py-2 rounded-xl border border-[#E9D5FF] hover:bg-[#FAF8FF] text-[#30105E] font-semibold text-xs transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => openBookingModal(product)}
                        className="px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs tracking-tight shadow-sm hover:shadow transition-all duration-150 active:scale-95"
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

      </div>
    </section>
  );
};
