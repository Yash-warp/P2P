
import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  Star,
  Heart,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TrendingListings = () => {
  const {
    products,
    openProductCardModal,
    openBookingModal,
    toggleWishlist,
    isWishlisted,
    navigateTo
  } = useApp();

  const sectionRef = useRef(null);

  // MAIN SCROLL ANIMATIONS
  useEffect(() => {
    const ctx = gsap.context(() => {

      // SECTION BADGE
      gsap.fromTo('.trending-badge',
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trending-badge',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // HEADING
      gsap.fromTo('.trending-heading',
        { y: 65, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trending-heading',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // DESCRIPTION
      gsap.fromTo('.trending-description',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trending-description',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // VIEW ALL BUTTON
      gsap.fromTo('.trending-view-all',
        { x: 50, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trending-view-all',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // PRODUCT CARDS
      gsap.fromTo('.trending-product-card',
        {
          y: 90,
          opacity: 0,
          scale: 0.88,
          rotateX: 8
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.16,
          ease: 'power3.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: '.trending-products',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // CARD ICON ENTRANCE
      gsap.fromTo('.trending-icon',
        {
          scale: 0.5,
          opacity: 0,
          rotate: -20
        },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.trending-products',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // CARD HOVER SCALE ANIMATIONS
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(
      '.trending-product-card'
    );

    if (!cards) return;

    const handleCardEnter = (e) => {
      gsap.to(e.currentTarget, {
        scale: 1.025,
        y: -7,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    const handleCardLeave = (e) => {
      gsap.to(e.currentTarget, {
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    cards.forEach(card => {
      card.addEventListener('mouseenter', handleCardEnter);
      card.addEventListener('mouseleave', handleCardLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleCardEnter);
        card.removeEventListener('mouseleave', handleCardLeave);
        gsap.killTweensOf(card);
      });
    };
  }, [products]);

  // BUTTON AND ICON HOVER ANIMATIONS
  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll(
      '.trending-card-button, .trending-icon, .trending-header-icon'
    );

    if (!elements) return;

    const handleEnter = (e) => {
      gsap.to(e.currentTarget, {
        scale: 1.18,
        duration: 0.25,
        ease: 'back.out(2)',
        overwrite: 'auto'
      });
    };

    const handleLeave = (e) => {
      gsap.to(e.currentTarget, {
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    };

    elements.forEach(element => {
      element.addEventListener('mouseenter', handleEnter);
      element.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      elements.forEach(element => {
        element.removeEventListener('mouseenter', handleEnter);
        element.removeEventListener('mouseleave', handleLeave);
        gsap.killTweensOf(element);
      });
    };
  }, [products]);

  return (
    <section
      ref={sectionRef}
      className="pt-6 pb-12 md:pt-8 md:pb-16 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">

          <div>

            {/* BADGE */}
            <div className="trending-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9D5FF] border border-[#C4B5FD] text-[#30105E] text-xs font-bold mb-2">

              <Zap className="trending-header-icon w-3.5 h-3.5 fill-[#7C3AED] text-[#7C3AED]" />

              <span>Most Booked This Week</span>

            </div>

            {/* HEADING */}
            <h2 className="trending-heading font-display font-black text-3xl sm:text-4xl text-[#30105E] tracking-tight">
              Trending near you
            </h2>

            {/* DESCRIPTION */}
            <p className="trending-description mt-2 text-sm sm:text-base text-[#30105E]/70 max-w-xl">
              Discover what your neighbors are renting right now. Save money by borrowing instead of buying.
            </p>

          </div>

          {/* VIEW ALL */}
          <button
            onClick={() => navigateTo('marketplace')}
            className="trending-view-all flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-[#E9D5FF] shadow-neu-pill text-xs sm:text-sm font-bold text-[#30105E] hover:bg-[#FAF8FF] transition-all group shrink-0"
          >
            <span>View all items</span>

            <ArrowRight className="trending-header-icon w-4 h-4 text-[#7C3AED] group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

        {/* PRODUCT GRID */}
        <div className="trending-products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {products.slice(0, 6).map((product) => {

            const wishlisted = isWishlisted(product.id);

            return (
              <div
                key={product.id}
                className="trending-product-card group rounded-[28px] bg-white border border-[#DFC5FE] shadow-neu-pill hover:shadow-2xl hover:border-[#7C3AED]/60 transition-shadow duration-300 flex flex-col overflow-hidden"
                style={{ transformOrigin: 'center center' }}
              >

                {/* IMAGE */}
                <div
                  onClick={() => openProductCardModal(product)}
                  className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer"
                >

                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* BADGES */}
                  <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between pointer-events-none">

                    <span className="bg-[#30105E]/85 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-xl shadow-xs">
                      {product.category.toUpperCase()} · {product.distance} mi
                    </span>

                    {/* WISHLIST */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="trending-card-button pointer-events-auto p-2 rounded-full bg-white/95 hover:bg-white text-[#30105E] shadow-sm transition-colors"
                      title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart
                        className={`trending-icon w-4 h-4 ${wishlisted
                            ? 'fill-rose-500 text-rose-500'
                            : ''
                          }`}
                      />
                    </button>

                  </div>

                  {/* SUPERHOST */}
                  {product.isSuperhost && (
                    <div className="absolute bottom-3 left-3.5 bg-[#30105E]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs border border-[#C4B5FD]/30">

                      <ShieldCheck className="trending-icon w-3 h-3 text-[#C4B5FD]" />

                      Verified Superhost

                    </div>
                  )}

                </div>

                {/* CARD BODY */}
                <div className="p-5 flex-1 flex flex-col justify-between">

                  <div>

                    {/* OWNER & RATING */}
                    <div className="flex items-center justify-between text-xs text-[#30105E]/70 mb-2">

                      <div className="flex items-center gap-1.5">

                        <img
                          src={product.owner.avatar}
                          alt={product.owner.name}
                          className="w-5 h-5 rounded-full object-cover ring-1 ring-[#C4B5FD]"
                        />

                        <span className="font-semibold text-[#30105E]">
                          {product.owner.name}
                        </span>

                      </div>

                      <div className="flex items-center gap-1 font-bold text-[#30105E]">

                        <Star className="trending-icon w-3.5 h-3.5 text-amber-400 fill-amber-400" />

                        <span>{product.rating}</span>

                        <span className="text-[#30105E]/50 font-normal">
                          ({product.reviewCount})
                        </span>

                      </div>

                    </div>

                    {/* TITLE */}
                    <h3
                      onClick={() => openProductCardModal(product)}
                      className="font-display font-bold text-base sm:text-lg text-[#30105E] hover:text-[#7C3AED] cursor-pointer line-clamp-1 transition-colors"
                    >
                      {product.title}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="mt-1 text-xs text-[#30105E]/60 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                  </div>

                  {/* PRICING & ACTIONS */}
                  <div className="mt-5 pt-4 border-t border-[#DFC5FE]/60 flex items-center justify-between">

                    <div>

                      <div className="text-[11px] text-[#30105E]/60 font-medium">
                        Daily rental
                      </div>

                      <div className="font-display font-black text-xl text-[#30105E]">
                        ₹{product.pricePerDay}

                        <span className="text-xs font-normal text-[#30105E]/60">
                          {' '}/day
                        </span>
                      </div>

                    </div>

                    <div className="flex items-center gap-2">

                      {/* DETAILS */}
                      <button
                        onClick={() => openProductCardModal(product)}
                        className="trending-card-button px-3 py-2 rounded-xl border border-[#DFC5FE] hover:bg-[#FAF8FF] text-[#30105E] font-semibold text-xs transition-colors"
                      >
                        Details
                      </button>

                      {/* RENT NOW */}
                      <button
                        onClick={() => openBookingModal(product)}
                        className="trending-card-button px-4 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs tracking-tight shadow-sm hover:shadow transition-colors duration-150"
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
