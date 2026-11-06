
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';

import {
  Search,
  MapPin,
  Star,
  Heart,
  ArrowUpDown,
  Grid,
  Map as MapIcon,
  Zap,
  ShieldCheck,
  X,
  ArrowUpRight
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FALLBACK_IMAGE = 'https://placehold.co/600x450?text=No+Image';

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

  const marketplaceRef = useRef(null);

  const [sortBy, setSortBy] = useState('featured');
  const [maxDistance, setMaxDistance] = useState(15);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [instantBookOnly, setInstantBookOnly] = useState(false);
  const [superhostOnly, setSuperhostOnly] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeMapPin, setActiveMapPin] = useState(null);

  // SAFE PRODUCTS ARRAY
  const safeProducts = Array.isArray(products) ? products : [];

  // FILTER AND SORT PRODUCTS
  const filteredProducts = useMemo(() => {
    return safeProducts
      .filter((item) => {
        if (
          selectedCategory !== 'all' &&
          item.category !== selectedCategory
        ) {
          return false;
        }

        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();

          const matchesTitle = String(item.title ?? '')
            .toLowerCase()
            .includes(q);

          const matchesBrand = String(item.brand ?? '')
            .toLowerCase()
            .includes(q);

          const matchesDesc = String(item.description ?? '')
            .toLowerCase()
            .includes(q);

          if (!matchesTitle && !matchesBrand && !matchesDesc) {
            return false;
          }
        }

        if ((item.pricePerDay ?? 0) > maxPrice) return false;
        if ((item.distance ?? 0) > maxDistance) return false;

        if (instantBookOnly && !item.isInstantBook) return false;
        if (superhostOnly && !item.isSuperhost) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') {
          return (a.pricePerDay ?? 0) - (b.pricePerDay ?? 0);
        }

        if (sortBy === 'price-high') {
          return (b.pricePerDay ?? 0) - (a.pricePerDay ?? 0);
        }

        if (sortBy === 'rating') {
          return (b.rating ?? 0) - (a.rating ?? 0);
        }

        if (sortBy === 'distance') {
          return (a.distance ?? 0) - (b.distance ?? 0);
        }

        return 0;
      });
  }, [
    safeProducts,
    searchQuery,
    selectedCategory,
    maxPrice,
    maxDistance,
    instantBookOnly,
    superhostOnly,
    sortBy
  ]);

  // RESET FILTERS
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMaxDistance(25);
    setMaxPrice(5000);
    setInstantBookOnly(false);
    setSuperhostOnly(false);
    setSortBy('featured');
  };

  // CLEAR INVALID MAP SELECTION
  useEffect(() => {
    if (
      activeMapPin &&
      !filteredProducts.some((product) => product.id === activeMapPin.id)
    ) {
      setActiveMapPin(null);
    }
  }, [filteredProducts, activeMapPin]);

  // GSAP ANIMATIONS
  useEffect(() => {
    const root = marketplaceRef.current;

    if (!root) return;

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reducedMotion) return;

    // Pointer listener cleanup is handled separately from GSAP context.
    const cleanupListeners = [];

    const ctx = gsap.context(() => {
      // HEADER AND SECTION REVEALS
      const revealElements = gsap.utils.toArray(
        '[data-market-reveal]',
        root
      );

      revealElements.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 35
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              once: true
            }
          }
        );
      });

      // CATEGORY CHIP STAGGER
      const chips = gsap.utils.toArray(
        '[data-category-chip]',
        root
      );

      if (chips.length) {
        gsap.fromTo(
          chips,
          {
            opacity: 0,
            y: 15,
            scale: 0.85
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.055,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: chips[0].parentElement,
              start: 'top 90%',
              once: true
            }
          }
        );
      }

      // PRODUCT CARD STAGGER
      const cards = gsap.utils.toArray(
        '[data-market-card]',
        root
      );

      if (cards.length && viewMode === 'grid') {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 65,
            scale: 0.88,
            rotateX: 8
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.13,
            ease: 'power3.out',
            clearProps: 'opacity',
            scrollTrigger: {
              trigger: cards[0].parentElement,
              start: 'top 85%',
              once: true
            }
          }
        );

        // SMOOTH 3D TILT WITH QUICKTO
        cards.forEach((card) => {
          gsap.set(card, {
            transformPerspective: 1000,
            transformOrigin: 'center center'
          });

          const rotateXTo = gsap.quickTo(card, 'rotationX', {
            duration: 0.55,
            ease: 'power3.out'
          });

          const rotateYTo = gsap.quickTo(card, 'rotationY', {
            duration: 0.55,
            ease: 'power3.out'
          });

          const scaleTo = gsap.quickTo(card, 'scale', {
            duration: 0.45,
            ease: 'power3.out'
          });

          const moveTo = gsap.quickTo(card, 'y', {
            duration: 0.45,
            ease: 'power3.out'
          });

          const handlePointerMove = (event) => {
            if (event.pointerType !== 'mouse') return;

            const rect = card.getBoundingClientRect();

            if (!rect.width || !rect.height) return;

            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            rotateYTo((x - 0.5) * 9);
            rotateXTo((0.5 - y) * 7);
          };

          const handlePointerEnter = (event) => {
            if (event.pointerType !== 'mouse') return;

            scaleTo(1.035);
            moveTo(-5);
          };

          const handlePointerLeave = () => {
            rotateXTo(0);
            rotateYTo(0);
            scaleTo(1);
            moveTo(0);
          };

          card.addEventListener('pointermove', handlePointerMove);
          card.addEventListener('pointerenter', handlePointerEnter);
          card.addEventListener('pointerleave', handlePointerLeave);

          cleanupListeners.push(() => {
            card.removeEventListener('pointermove', handlePointerMove);
            card.removeEventListener('pointerenter', handlePointerEnter);
            card.removeEventListener('pointerleave', handlePointerLeave);
          });
        });
      }

      // MAP REVEAL
      const map = root.querySelector('[data-market-map]');

      if (map) {
        gsap.fromTo(
          map,
          {
            opacity: 0,
            y: 40,
            scale: 0.97
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: map,
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      // EMPTY STATE REVEAL
      const emptyState = root.querySelector('[data-market-empty]');

      if (emptyState) {
        gsap.fromTo(
          emptyState,
          {
            opacity: 0,
            y: 35,
            scale: 0.94
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: emptyState,
              start: 'top 85%',
              once: true
            }
          }
        );
      }
    }, root);

    return () => {
      cleanupListeners.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, [filteredProducts, viewMode]);

  return (
    <div
      ref={marketplaceRef}
      className={`min-h-screen ${
        isLoggedIn ? 'pt-6 pb-24' : 'pt-28 pb-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* MARKETPLACE HEADER */}
        <div
          data-market-reveal
          className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#30105E]/70 mb-1">
              <span>Marketplace</span>
              <span>•</span>

              <span className="flex items-center gap-1 text-[#30105E]">
                <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                {currentLocation || 'Your Location'}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#30105E] tracking-tight">
              Browse Available Gear
            </h1>
          </div>

          {/* VIEW MODE */}
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-2xl bg-white border border-[#E9D5FF] shadow-neu-pill flex items-center">

              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 ${
                  viewMode === 'grid'
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'text-[#30105E] hover:text-[#7C3AED]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>

              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 hover:scale-105 ${
                  viewMode === 'map'
                    ? 'bg-[#7C3AED] text-white shadow-xs'
                    : 'text-[#30105E] hover:text-[#7C3AED]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map View</span>
              </button>

            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div
          data-market-reveal
          className="p-4 rounded-3xl bg-white border border-[#E9D5FF] shadow-neu-pill mb-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-3">

            {/* SEARCH */}
            <div className="flex-1 w-full relative">
              <Search className="w-4 h-4 text-[#7C3AED] absolute left-3.5 top-1/2 -translate-y-1/2" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gear title, brand, or model..."
                className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-xs sm:text-sm font-medium text-[#30105E] placeholder:text-[#30105E]/50 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] transition-all duration-300 focus:shadow-lg focus:shadow-purple-100"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#30105E]/50 hover:text-[#30105E] transition-transform hover:scale-125"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* SORT */}
            <div className="w-full md:w-auto flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#FAF8FF] border border-[#E9D5FF] rounded-2xl w-full md:w-auto transition-all duration-300 hover:shadow-md hover:border-[#7C3AED]/50">
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

          {/* QUICK FILTERS */}
          <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 flex flex-wrap items-center justify-between gap-4 text-xs">

            {/* CATEGORY CHIPS */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-2xl scrollbar-none">
              {INITIAL_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  data-category-chip
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold transition-all duration-300 whitespace-nowrap hover:scale-105 hover:-translate-y-0.5 active:scale-95 ${
                    selectedCategory === c.id
                      ? 'bg-[#7C3AED] text-white shadow-xs font-bold'
                      : 'bg-[#FAF8FF] hover:bg-[#E9D5FF]/60 text-[#30105E] border border-[#E9D5FF]/70'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* TOGGLES */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-[#30105E] transition-transform hover:scale-105">
                <input
                  type="checkbox"
                  checked={instantBookOnly}
                  onChange={(e) => setInstantBookOnly(e.target.checked)}
                  className="rounded text-[#7C3AED] focus:ring-[#7C3AED]"
                />

                <Zap className="w-3 h-3 text-[#7C3AED] fill-[#7C3AED]" />
                <span>Instant Book</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-[#30105E] transition-transform hover:scale-105">
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
                className="text-[#7C3AED] hover:text-[#6D28D9] font-bold underline transition-all hover:scale-105"
              >
                Reset
              </button>
            </div>
          </div>

          {/* SLIDERS */}
          <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* DISTANCE */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#30105E]/80 mb-1">
                <span>Max Distance: {maxDistance} km</span>

                <span className="text-[#30105E]/50">
                  Within {maxDistance} km radius
                </span>
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

            {/* PRICE */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#30105E]/80 mb-1">
                <span>Max Daily Budget: ₹{maxPrice}</span>

                <span className="text-[#30105E]/50">
                  Up to ₹{maxPrice} /day
                </span>
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

        {/* RESULTS COUNT */}
        <div
          data-market-reveal
          className="mb-6 flex items-center justify-between text-xs font-semibold text-[#30105E]/70"
        >
          <div>
            Showing{' '}
            <span className="font-bold text-[#30105E]">
              {filteredProducts.length}
            </span>{' '}
            verified rental listings
          </div>

          {filteredProducts.length === 0 && (
            <button
              onClick={resetFilters}
              className="px-3 py-1 bg-white rounded-lg border border-[#E9D5FF] text-[#30105E] font-bold hover:bg-[#FAF8FF] transition-all hover:scale-105"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* MAP VIEW */}
        {viewMode === 'map' && (
          <div
            data-market-map
            className="mb-10 rounded-[32px] overflow-hidden border border-[#E9D5FF] shadow-xl bg-white p-4"
          >
            <div className="relative w-full h-[450px] bg-[#FAF8FF] rounded-2xl overflow-hidden flex items-center justify-center">

              {/* MAP BACKGROUND */}
              <div className="absolute inset-0 bg-[#FAF8FF] opacity-90 bg-[radial-gradient(#C4B5FD_1.2px,transparent_1.2px)] [background-size:16px_16px]" />

              {/* MAP ROADS */}
              <svg className="absolute inset-0 w-full h-full stroke-white stroke-2 pointer-events-none">
                <line
                  x1="0"
                  y1="120"
                  x2="100%"
                  y2="120"
                  strokeWidth="8"
                  stroke="#E9D5FF"
                />

                <line
                  x1="0"
                  y1="280"
                  x2="100%"
                  y2="280"
                  strokeWidth="12"
                  stroke="#E9D5FF"
                />

                <line
                  x1="200"
                  y1="0"
                  x2="200"
                  y2="100%"
                  strokeWidth="10"
                  stroke="#E9D5FF"
                />

                <line
                  x1="550"
                  y1="0"
                  x2="550"
                  y2="100%"
                  strokeWidth="8"
                  stroke="#E9D5FF"
                />

                <line
                  x1="850"
                  y1="0"
                  x2="850"
                  y2="100%"
                  strokeWidth="6"
                  stroke="#E9D5FF"
                />

                <circle
                  cx="50%"
                  cy="50%"
                  r="160"
                  fill="rgba(196, 181, 253, 0.2)"
                  stroke="#7C3AED"
                  strokeDasharray="4 4"
                />
              </svg>

              {/* USER LOCATION */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                <span className="w-5 h-5 rounded-full bg-[#7C3AED] border-4 border-white shadow-lg animate-ping absolute" />

                <span className="w-5 h-5 rounded-full bg-[#7C3AED] border-4 border-white shadow-lg relative" />

                <span className="mt-1 bg-[#30105E] text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                  You are here
                </span>
              </div>

              {/* PRODUCT PINS */}
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
                    <div
                      className={`px-2.5 py-1 rounded-full text-xs font-black shadow-lg transition-all duration-300 hover:scale-125 hover:-translate-y-1 flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#7C3AED] text-white ring-4 ring-[#C4B5FD] scale-110'
                          : 'bg-[#30105E] text-white hover:bg-[#7C3AED]'
                      }`}
                    >
                      <span>₹{prod.pricePerDay}</span>
                    </div>
                  </div>
                );
              })}

              {/* SELECTED PIN PREVIEW */}
              {activeMapPin && (
                <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-80 bg-white rounded-3xl p-4 shadow-2xl border border-[#E9D5FF] z-40 animate-in fade-in slide-in-from-bottom-2">

                  <button
                    onClick={() => setActiveMapPin(null)}
                    className="absolute top-3 right-3 p-1 rounded-full text-[#30105E]/50 hover:text-[#30105E] transition-transform hover:rotate-90"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex gap-3">
                    <img
                      src={activeMapPin.images?.[0] || FALLBACK_IMAGE}
                      alt={activeMapPin.title || 'Rental item'}
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
                        ₹{activeMapPin.pricePerDay}

                        <span className="text-[10px] font-normal text-[#30105E]/60">
                          {' '}/day
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => navigateToProduct(activeMapPin.id)}
                      className="flex-1 py-1.5 rounded-xl border border-[#E9D5FF] text-xs font-bold text-[#30105E] hover:bg-[#FAF8FF] hover:scale-105 transition-all duration-300"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => openBookingModal(activeMapPin)}
                      className="flex-1 py-1.5 rounded-xl bg-[#7C3AED] text-xs font-bold text-white hover:bg-[#6D28D9] hover:scale-105 transition-all duration-300"
                    >
                      Rent Now
                    </button>
                  </div>
                </div>
              )}

              {/* EMPTY MAP MESSAGE */}
              {filteredProducts.length === 0 && (
                <div className="relative z-10 text-center bg-white/90 backdrop-blur-md rounded-2xl px-6 py-5 border border-[#E9D5FF] shadow-lg">
                  <MapPin className="w-7 h-7 text-[#7C3AED] mx-auto mb-2" />

                  <h3 className="font-display font-bold text-sm text-[#30105E]">
                    No listings found
                  </h3>

                  <p className="text-xs text-[#30105E]/60 mt-1">
                    Try adjusting your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCT GRID */}
        {viewMode === 'grid' && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredProducts.map((product) => {
              const wishlisted = isWishlisted(product.id);

              return (
                <div
                  key={product.id}
                  data-market-card
                  className="group relative rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-[0_25px_60px_rgba(48,16,94,0.18)] hover:border-[#7C3AED]/70 transition-[box-shadow,border-color] duration-500 flex flex-col overflow-hidden will-change-transform"
                >
                  {/* PRODUCT IMAGE */}
                  <div
                    onClick={() => navigateToProduct(product.id)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer"
                  >
                    <img
                      src={product.images?.[0] || FALLBACK_IMAGE}
                      alt={product.title || 'Rental item'}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />

                    {/* IMAGE OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#30105E]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* BADGES */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">

                      <span className="bg-[#30105E]/85 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-lg shadow-xs transition-transform duration-300 group-hover:scale-105">
                        {product.distance} km away
                      </span>

                      {/* WISHLIST */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        className="pointer-events-auto p-2 rounded-full bg-white/95 hover:bg-white text-[#30105E] shadow-sm transition-all duration-300 hover:scale-125 hover:-translate-y-1 active:scale-90"
                      >
                        <Heart
                          className={`w-4 h-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-[-12deg] ${
                            wishlisted
                              ? 'fill-rose-500 text-rose-500'
                              : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* INSTANT BOOK */}
                    {product.isInstantBook && (
                      <div className="absolute bottom-3 left-3 bg-[#C4B5FD] text-[#30105E] text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                        <Zap className="w-3 h-3 fill-[#30105E] transition-transform duration-300 group-hover:rotate-12" />
                        Instant Book
                      </div>
                    )}
                  </div>

                  {/* PRODUCT BODY */}
                  <div className="p-4 flex-1 flex flex-col justify-between">

                    <div>
                      <div className="flex items-center justify-between text-xs text-[#30105E]/70 mb-1">

                        <span className="capitalize font-semibold text-[#7C3AED] transition-all duration-300 group-hover:translate-x-1">
                          {product.category}
                        </span>

                        <div className="flex items-center gap-1 font-bold text-[#30105E] transition-transform duration-300 group-hover:scale-110">
                          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 transition-transform duration-500 group-hover:rotate-[72deg] group-hover:scale-125" />

                          <span>{product.rating ?? '—'}</span>

                          <span className="text-[#30105E]/50 font-normal">
                            ({product.reviewCount ?? 0})
                          </span>
                        </div>
                      </div>

                      <h3
                        onClick={() => navigateToProduct(product.id)}
                        className="font-display font-bold text-sm sm:text-base text-[#30105E] hover:text-[#7C3AED] cursor-pointer line-clamp-1 transition-all duration-300 group-hover:translate-x-1"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-[#30105E]/60 mt-1 line-clamp-1 transition-all duration-300 group-hover:translate-x-1">
                        {product.location}
                      </p>
                    </div>

                    {/* PRICE AND ACTIONS */}
                    <div className="mt-4 pt-3 border-t border-[#E9D5FF]/60 flex items-center justify-between">

                      <div className="transition-transform duration-300 group-hover:translate-x-1">
                        <div className="text-[10px] text-[#30105E]/60 font-medium">
                          Daily rent
                        </div>

                        <div className="font-display font-black text-base text-[#30105E]">
                          ₹{product.pricePerDay}

                          <span className="text-[10px] font-normal text-[#30105E]/60">
                            {' '}/day
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">

                        {/* VIEW BUTTON */}
                        <button
                          onClick={() => navigateToProduct(product.id)}
                          className="px-2.5 py-1.5 rounded-xl border border-[#E9D5FF] hover:bg-[#7C3AED] hover:text-white hover:border-[#7C3AED] hover:scale-110 hover:-translate-y-0.5 text-[#30105E] font-semibold text-xs transition-all duration-300"
                        >
                          View
                        </button>

                        {/* RENT NOW BUTTON */}
                        <button
                          onClick={() => openBookingModal(product)}
                          className="group/rent relative overflow-hidden flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(124,58,237,0.35)] active:scale-95"
                        >
                          <span className="relative z-10">
                            Rent Now
                          </span>

                          <ArrowUpRight className="relative z-10 w-3.5 h-3.5 transition-transform duration-300 group-hover/rent:scale-150 group-hover/rent:rotate-45" />

                          {/* SHINE EFFECT */}
                          <span className="absolute inset-0 bg-white/15 -translate-x-full group-hover/rent:translate-x-0 transition-transform duration-500 skew-x-12" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* EMPTY STATE - GRID VIEW ONLY */}
        {viewMode === 'grid' && filteredProducts.length === 0 && (
          <div
            data-market-empty
            className="p-12 text-center rounded-[32px] bg-white border border-[#E9D5FF] shadow-neu-pill max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-[#FAF8FF] border border-[#E9D5FF] flex items-center justify-center mx-auto text-[#7C3AED] mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-12">
              <Search className="w-8 h-8" />
            </div>

            <h3 className="font-display font-bold text-xl text-[#30105E]">
              No gear matches your filters
            </h3>

            <p className="text-xs sm:text-sm text-[#30105E]/70 mt-1 max-w-sm mx-auto">
              Try widening your distance radius or clearing category keywords to discover more items nearby.
            </p>

            <button
              onClick={resetFilters}
              className="mt-6 px-6 py-2.5 rounded-xl bg-[#7C3AED] text-white font-bold text-xs hover:bg-[#6D28D9] hover:scale-110 hover:-translate-y-1 transition-all duration-300 shadow-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
