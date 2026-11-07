import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Star,
  MapPin,
  ShieldCheck,
  Zap,
  Heart,
  Calendar,
  Sparkles,
  ArrowRight,
  Share2,
  CheckCircle2,
  Clock,
  Shield
} from 'lucide-react';

export const ProductCardModal = () => {
  const {
    cardModalProduct,
    closeProductCardModal,
    openBookingModal,
    toggleWishlist,
    isWishlisted,
    showToast
  } = useApp();

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!cardModalProduct) return null;

  const product = cardModalProduct;
  const wishlisted = isWishlisted(product.id);
  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80'];

  const currentImage = images[activeImageIdx] || images[0];

  const handleRentNow = () => {
    closeProductCardModal();
    openBookingModal(product);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Item link copied to clipboard!');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[125] bg-[#30105E]/55 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
      onClick={closeProductCardModal}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-[0_25px_70px_rgba(48,16,94,0.35)] border border-[#DFC5FE] my-auto relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Top Action Bar over image */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="p-2.5 rounded-full bg-white/95 hover:bg-white text-[#30105E] shadow-md hover:scale-110 active:scale-95 transition-all"
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className="p-2.5 rounded-full bg-white/95 hover:bg-white text-[#30105E] shadow-md hover:scale-110 active:scale-95 transition-all"
            title={wishlisted ? 'Saved' : 'Save'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <button
            type="button"
            onClick={closeProductCardModal}
            className="p-2.5 rounded-full bg-white/95 hover:bg-white text-[#30105E] shadow-md hover:scale-110 hover:rotate-90 active:scale-95 transition-all"
            title="Close"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto no-scrollbar">
          {/* Main Photo Gallery */}
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-900 overflow-hidden">
            <img
              src={currentImage}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="bg-[#30105E]/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-xl shadow-xs border border-white/20">
                  {product.category} • {product.distance || 1.2} km away
                </span>
                {product.isInstantBook && (
                  <span className="bg-[#DFC5FE] text-[#30105E] text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-xs">
                    <Zap className="w-3 h-3 fill-[#30105E]" />
                    Instant Book
                  </span>
                )}
              </div>
              {images.length > 1 && (
                <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-0.5 rounded-lg">
                  {activeImageIdx + 1}/{images.length}
                </span>
              )}
            </div>
          </div>

          {/* Thumbnails if multiple images */}
          {images.length > 1 && (
            <div className="px-5 pt-3 pb-1 flex gap-2 overflow-x-auto bg-[#FAF8FF] border-b border-[#DFC5FE]/60">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-11 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIdx === idx ? 'border-[#7C3AED] ring-2 ring-[#DFC5FE] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Details Body */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Title & Ratings */}
            <div>
              <div className="flex items-center justify-between gap-2 text-xs mb-1.5">
                <span className="font-bold uppercase tracking-wider text-[#7C3AED] bg-[#E9D5FF] px-2.5 py-0.5 rounded-lg">
                  {product.brand || product.category}
                </span>
                <span className="text-[#30105E]/70 font-semibold bg-[#FAF8FF] border border-[#DFC5FE] px-2 py-0.5 rounded-lg text-[11px]">
                  Condition: {product.condition || 'Like New'}
                </span>
              </div>

              <h2 className="font-display font-black text-xl sm:text-2xl text-[#30105E] tracking-tight leading-snug">
                {product.title}
              </h2>

              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs text-[#30105E]/75">
                <div className="flex items-center gap-1 font-bold text-[#30105E]">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{product.rating ?? '4.9'}</span>
                  <span className="text-[#30105E]/50 font-normal">({product.reviewCount ?? 12} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                  <span>{product.location || 'Indiranagar, Bangalore'}</span>
                </div>
              </div>
            </div>

            {/* Verified Lender Row */}
            {product.owner && (
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#DFC5FE]/35 via-[#EADBFE]/25 to-white/90 border border-[#DFC5FE] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={product.owner.avatar}
                    alt={product.owner.name}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-[#DFC5FE]"
                  />
                  <div>
                    <div className="flex items-center gap-1 font-bold text-sm text-[#30105E]">
                      <span>{product.owner.name}</span>
                      <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                    </div>
                    <p className="text-[11px] text-[#30105E]/70">
                      Verified Host • {product.owner.responseTime || 'Under 15 mins'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#7C3AED] bg-white px-2.5 py-1 rounded-lg border border-[#DFC5FE] shadow-2xs">
                  ID Verified ✓
                </span>
              </div>
            )}

            {/* Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-1.5">
                About this gear
              </h3>
              <p className="text-xs sm:text-sm text-[#30105E]/85 leading-relaxed">
                {product.description || 'High quality verified rental gear, thoroughly tested and sanitized before handover.'}
              </p>
            </div>

            {/* SafeEscrow Guarantee Pill */}
            <div className="p-3 rounded-2xl bg-[#FAF8FF] border border-[#DFC5FE] flex items-center gap-2.5 text-xs text-[#30105E]">
              <ShieldCheck className="w-4 h-4 text-[#7C3AED] shrink-0" />
              <span className="leading-tight">
                <strong>100% Safe Escrow:</strong> Payment is held securely until you inspect & receive the item.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-white via-[#FAF8FF] to-white border-t border-[#DFC5FE] flex items-center justify-between gap-4 shrink-0">
          <div>
            <div className="text-[10px] text-[#30105E]/60 font-semibold uppercase tracking-wider">
              Rental Rate
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-black text-2xl text-[#30105E]">
                ₹{product.pricePerDay}
              </span>
              <span className="text-xs font-medium text-[#30105E]/70">
                /day
              </span>
            </div>
            {product.securityDeposit && (
              <div className="text-[10px] text-[#30105E]/60 mt-0.5">
                + ₹{product.securityDeposit} refundable deposit
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeProductCardModal}
              className="px-4 py-2.5 rounded-2xl border border-[#DFC5FE] text-xs font-bold text-[#30105E] hover:bg-[#FAF8FF] transition-all"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleRentNow}
              className="px-6 py-2.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_8px_20px_rgba(124,58,237,0.35)] hover:shadow-[0_10px_25px_rgba(124,58,237,0.45)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>Rent Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

