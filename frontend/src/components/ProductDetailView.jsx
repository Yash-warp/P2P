import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Heart, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  AlertCircle, 
  Share2, 
  ChevronLeft, 
  Zap, 
  ShieldAlert, 
  PackageCheck,
  ArrowRight
} from 'lucide-react';

export const ProductDetailView = () => {
  const { 
    products, 
    selectedProductId, 
    navigateTo, 
    openBookingModal, 
    toggleWishlist, 
    isWishlisted, 
    navigateToProduct,
    showToast,
    setChatActiveThreadId,
    isLoggedIn
  } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking widget internal state for instant calculation
  const [startDate, setStartDate] = useState('2026-11-06');
  const [endDate, setEndDate] = useState('2026-11-08');
  const [deliveryMethod, setDeliveryMethod] = useState('pickup'); // 'pickup' | 'delivery'

  const wishlisted = isWishlisted(product.id);

  // Days calculation
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  const days = isNaN(diffTime) || diffTime < 1 ? 1 : diffTime;

  const baseRental = product.pricePerDay * days;
  const deliveryFee = deliveryMethod === 'delivery' ? 149 : 0;
  const serviceFee = Math.round(baseRental * 0.05);
  const totalPayable = baseRental + deliveryFee + serviceFee;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Listing link copied to clipboard!');
    }
  };

  const handleStartChat = () => {
    setChatActiveThreadId('conv-1');
    navigateTo('messages');
  };

  // Similar items
  const similarItems = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className={`min-h-screen ${isLoggedIn ? 'pt-6 pb-24' : 'pt-28 pb-20'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E9D5FF] text-xs">
          <button
            onClick={() => navigateTo('marketplace')}
            className="flex items-center gap-1 font-bold text-[#30105E]/80 hover:text-[#30105E] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#7C3AED]" />
            <span>Back to Marketplace</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white border border-[#E9D5FF] text-[#30105E] hover:bg-[#FAF8FF] shadow-2xs"
              title="Share Listing"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2 rounded-xl bg-white border border-[#E9D5FF] text-[#30105E] hover:bg-[#FAF8FF] shadow-2xs"
              title="Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Gallery & Details (Col 7) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Photo Gallery */}
            <div className="space-y-3">
              <div className="aspect-[16/10] rounded-[32px] overflow-hidden bg-slate-900 border border-[#E9D5FF] shadow-xl relative group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-4 right-4 bg-[#30105E]/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-xl">
                  {activeImageIndex + 1} / {product.images.length} Photos
                </span>
              </div>

              {/* Thumbnail Strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-16 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIndex === idx ? 'border-[#7C3AED] shadow-md ring-2 ring-[#C4B5FD]' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Metadata */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#30105E] bg-[#E9D5FF] border border-[#C4B5FD] px-2.5 py-0.5 rounded-lg">
                  {product.category}
                </span>
                <span className="text-xs font-bold text-[#30105E] bg-[#FAF8FF] border border-[#E9D5FF] px-2.5 py-0.5 rounded-lg">
                  Condition: {product.condition}
                </span>
                {product.isInstantBook && (
                  <span className="text-xs font-black uppercase text-[#30105E] bg-[#C4B5FD] px-2.5 py-0.5 rounded-lg flex items-center gap-1 shadow-xs">
                    <Zap className="w-3 h-3 fill-[#30105E]" /> Instant Book
                  </span>
                )}
              </div>

              <h1 className="font-display font-black text-2xl sm:text-4xl text-[#30105E] tracking-tight">
                {product.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#30105E]/70">
                <div className="flex items-center gap-1 font-bold text-[#30105E]">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[#30105E]/50 font-normal">({product.reviewCount} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 font-medium text-[#30105E]">
                  <MapPin className="w-4 h-4 text-[#7C3AED]" />
                  <span>{product.location} ({product.distance} km away)</span>
                </div>
                <span>•</span>
                <span className="text-[#7C3AED] font-semibold">{product.rentalsCompleted} rentals completed</span>
              </div>
            </div>

            {/* Verified Lender Profile Card */}
            <div className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <img
                  src={product.owner.avatar}
                  alt={product.owner.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-[#C4B5FD]"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display font-bold text-base text-[#30105E]">{product.owner.name}</h3>
                    <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                  </div>
                  <p className="text-xs text-[#30105E]/60 mt-0.5">
                    Lender since {product.owner.joinedDate} • {product.owner.totalRentals} items shared
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-[11px] font-semibold text-[#30105E]/80">
                    <span>Response Rate: <strong className="text-[#30105E]">{product.owner.responseRate}</strong></span>
                    <span>Response Time: <strong className="text-[#30105E]">{product.owner.responseTime}</strong></span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartChat}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E9D5FF] hover:bg-[#FAF8FF] text-[#30105E] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <MessageSquare className="w-4 h-4 text-[#7C3AED]" />
                <span>Chat with Owner</span>
              </button>
            </div>

            {/* Description */}
            <div className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill space-y-3">
              <h3 className="font-display font-bold text-lg text-[#30105E]">About this gear</h3>
              <p className="text-sm text-[#30105E]/75 leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {/* Specifications Table */}
            {product.specs && (
              <div className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill space-y-4">
                <h3 className="font-display font-bold text-lg text-[#30105E]">Technical Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] flex flex-col justify-between">
                      <span className="text-[11px] font-semibold text-[#7C3AED] uppercase tracking-wider">{spec.label}</span>
                      <span className="text-xs sm:text-sm font-bold text-[#30105E] mt-0.5">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included Accessories */}
            {product.included && (
              <div className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill space-y-3">
                <h3 className="font-display font-bold text-lg text-[#30105E] flex items-center gap-2">
                  <PackageCheck className="w-5 h-5 text-[#7C3AED]" />
                  <span>What's included in the box</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-[#30105E]">
                  {product.included.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF8FF] border border-[#E9D5FF]/60">
                      <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Rules */}
            {product.rules && (
              <div className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill space-y-3">
                <h3 className="font-display font-bold text-lg text-[#30105E] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#7C3AED]" />
                  <span>Lender's Rental Guidelines</span>
                </h3>
                <ul className="space-y-2 text-xs text-[#30105E]/75">
                  {product.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#7C3AED] font-bold">•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Handover Location Radius Map Preview */}
            <div className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill space-y-3">
              <h3 className="font-display font-bold text-lg text-[#30105E] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#7C3AED]" />
                <span>Pickup Location</span>
              </h3>
              <p className="text-xs text-[#30105E]/70">
                Exact address is shared instantly after booking approval to protect owner privacy. General neighborhood: <strong>{product.location}</strong>.
              </p>
              
              <div className="relative h-44 rounded-2xl bg-[#FAF8FF] overflow-hidden border border-[#E9D5FF] flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-[#E9D5FF]/40 border-2 border-[#7C3AED] border-dashed animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#30105E] text-white flex items-center justify-center text-xs font-bold shadow-md">
                    <MapPin className="w-4 h-4 text-[#C4B5FD]" />
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs text-[#30105E] border border-[#E9D5FF]">
                  Approx. 500m pickup radius
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Widget (Col 5) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 p-6 sm:p-7 rounded-[32px] bg-white border border-[#E9D5FF] shadow-2xl space-y-6">
              
              {/* Daily Rate Header */}
              <div className="flex items-baseline justify-between pb-4 border-b border-[#E9D5FF]/60">
                <div>
                  <span className="text-xs text-[#30105E]/60 font-semibold uppercase tracking-wider block">Rental Price</span>
                  <div className="font-display font-black text-3xl text-[#30105E]">
                    ₹{product.pricePerDay}
                    <span className="text-sm font-normal text-[#30105E]/60"> /day</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 font-bold text-xs text-[#30105E]">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-[11px] text-[#30105E]/60">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Date Selection Inputs */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70">
                  Select Rental Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF]">
                    <span className="text-[10px] font-bold text-[#7C3AED] uppercase block">Pickup Date</span>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#30105E] focus:outline-none mt-0.5 cursor-pointer"
                    />
                  </div>
                  <div className="p-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF]">
                    <span className="text-[10px] font-bold text-[#7C3AED] uppercase block">Return Date</span>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-transparent text-xs font-bold text-[#30105E] focus:outline-none mt-0.5 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="text-right text-xs font-semibold text-[#30105E]/70">
                  Duration: <strong className="text-[#30105E]">{days} {days === 1 ? 'day' : 'days'}</strong>
                </div>
              </div>

              {/* Delivery Option */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70">
                  Handover Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('pickup')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#30105E] bg-[#30105E] text-white'
                        : 'border-[#E9D5FF] bg-[#FAF8FF] text-[#30105E]'
                    }`}
                  >
                    <div className="text-xs font-bold">Self Pickup</div>
                    <div className="text-[10px] opacity-75">Meet in Indiranagar (Free)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('delivery')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      deliveryMethod === 'delivery'
                        ? 'border-[#30105E] bg-[#30105E] text-white'
                        : 'border-[#E9D5FF] bg-[#FAF8FF] text-[#30105E]'
                    }`}
                  >
                    <div className="text-xs font-bold">Doorstep Courier</div>
                    <div className="text-[10px] opacity-75">Delivered in 2 hrs (+₹149)</div>
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] space-y-2.5 text-xs text-[#30105E]/80">
                <div className="flex justify-between">
                  <span>₹{product.pricePerDay} × {days} days</span>
                  <span className="font-semibold text-[#30105E]">₹{baseRental}</span>
                </div>

                {deliveryFee > 0 && (
                  <div className="flex justify-between">
                    <span>Doorstep delivery fee</span>
                    <span className="font-semibold text-[#30105E]">₹{deliveryFee}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Transparent service fee (5%)</span>
                  <span className="font-semibold text-[#30105E]">₹{serviceFee}</span>
                </div>

                <div className="pt-2 border-t border-[#E9D5FF] flex justify-between text-sm font-black text-[#30105E]">
                  <span>Total Rental Price</span>
                  <span>₹{totalPayable}</span>
                </div>

                {/* Refundable Deposit Notice */}
                <div className="pt-2 border-t border-[#E9D5FF] flex items-center justify-between text-[11px] text-[#30105E] font-bold bg-[#E9D5FF] p-2 rounded-xl">
                  <span>Refundable Security Deposit:</span>
                  <span>₹{product.securityDeposit}</span>
                </div>
                <div className="text-[10px] text-[#30105E]/60 text-center">
                  Deposit is held safely in escrow & released upon safe return.
                </div>
              </div>

              {/* Request to Book CTA (Primary Violet) */}
              <button
                onClick={() => openBookingModal(product)}
                className="w-full py-4 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-display font-black text-sm tracking-tight shadow-md hover:shadow-lg transition-all duration-150 transform active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Request to Book — Instant Confirmation</span>
                <ArrowRight className="w-4 h-4 text-[#C4B5FD] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* SafeEscrow Guarantee badge */}
              <div className="pt-2 flex items-center justify-center gap-2 text-xs font-semibold text-[#30105E]/70">
                <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                <span>100% Safe Escrow • Free Cancellation within 24h</span>
              </div>

            </div>
          </div>

        </div>

        {/* Similar Items Nearby */}
        {similarItems.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[#E9D5FF]">
            <h3 className="font-display font-bold text-2xl text-[#30105E] mb-6">
              Similar Gear in {product.location.split(',')[0]}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {similarItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigateToProduct(item.id)}
                  className="rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-xl hover:border-[#7C3AED]/60 transition-all cursor-pointer p-4 group"
                >
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-40 rounded-2xl object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="mt-3">
                    <div className="text-xs text-[#30105E]/60">{item.distance} km away</div>
                    <h4 className="font-display font-bold text-sm text-[#30105E] line-clamp-1">{item.title}</h4>
                    <div className="mt-2 font-display font-black text-sm text-[#30105E]">
                      ₹{item.pricePerDay} <span className="text-[10px] font-normal text-[#30105E]/60">/day</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
