
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import { Search, MapPin, ShieldCheck, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { navigateTo, setSearchQuery, setSelectedCategory } = useApp();

  const [term, setTerm] = useState('');
  const [radius, setRadius] = useState('5 km');

  const heroTitleRef = useRef(null);
  const heroSectionRef = useRef(null);
  const videoRef = useRef(null);

  // MAIN HERO ENTRANCE ANIMATION
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          ease: 'power3.out'
        }
      });

      // 1. Top badge
      tl.fromTo(
        '.hero-badge',
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      );

      // 2. Main heading
      tl.fromTo(
        heroTitleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.3'
      );

      // 3. Description
      tl.fromTo(
        '.hero-description',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=0.7'
      );

      // 4. Search bar
      tl.fromTo(
        '.hero-search',
        { y: 45, scale: 0.92, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'back.out(1.4)'
        },
        '-=0.5'
      );

      // 5. Popular categories
      tl.fromTo(
        '.popular-category',
        { y: 25, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out'
        },
        '-=0.4'
      );

      // 6. Owner CTA
      tl.fromTo(
        '.hero-owner-cta',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.2'
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // SEARCH BAR + CATEGORY HOVER ANIMATIONS
  useEffect(() => {
    const section = heroSectionRef.current;
    if (!section) return;

    const searchElements = section.querySelectorAll('.hero-search');
    const categoryElements = section.querySelectorAll('.popular-category');

    const cleanupFunctions = [];

    const addHoverAnimation = (element, scale, duration) => {
      const handleEnter = () => {
        gsap.to(element, {
          scale,
          duration,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      const handleLeave = () => {
        gsap.to(element, {
          scale: 1,
          duration,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      };

      element.addEventListener('mouseenter', handleEnter);
      element.addEventListener('mouseleave', handleLeave);

      cleanupFunctions.push(() => {
        element.removeEventListener('mouseenter', handleEnter);
        element.removeEventListener('mouseleave', handleLeave);
      });
    };

    searchElements.forEach((element) => {
      addHoverAnimation(element, 1.03, 0.3);
    });

    categoryElements.forEach((element) => {
      addHoverAnimation(element, 1.08, 0.25);
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());

      gsap.killTweensOf([
        ...searchElements,
        ...categoryElements
      ]);
    };
  }, []);

  // STATISTICS SCROLL REVEAL
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-stat-card',
        {
          y: 55,
          opacity: 0,
          scale: 0.94
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.hero-statistics',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  // KEEP BACKGROUND VIDEO PLAYING WHEN POSSIBLE
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playVideo = () => {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Browser may block autoplay; poster remains visible.
        });
      }
    };

    playVideo();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.pause();
    };
  }, []);

  const popularShortcuts = [
    { label: 'Cameras', icon: '📷', catId: 'cameras' },
    { label: 'Tools', icon: '🛠️', catId: 'tools' },
    { label: 'Camping', icon: '⛺', catId: 'camping' },
    { label: 'Bikes', icon: '🚲', catId: 'bikes' },
    { label: 'Drones', icon: '🚁', catId: 'drones' },
    { label: 'Audio', icon: '🎧', catId: 'audio' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(term);
    navigateTo('marketplace');
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    navigateTo('marketplace');
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative isolate pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden"
    >

      {/* ---------------------------------
          FULL-SCREEN BACKGROUND VIDEO
      --------------------------------- */}

      <video
        ref={videoRef}
        className="absolute inset-0 z-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=85"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source
          src="https://videos.pexels.com/video-files/36974946/15664489_2160_3840_60fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Soft lavender overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-[#FAF8FF]/75 pointer-events-none" />

      {/* Extra gradient for cinematic depth */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#FAF8FF]/85 via-[#FAF8FF]/55 to-[#FAF8FF]/90 pointer-events-none" />

      {/* Background Radial Glow */}
      <div className="absolute z-[2] top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[520px] bg-gradient-to-tr from-[#7C3AED]/20 via-[#C4B5FD]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Subtle bottom purple glow */}
      <div className="absolute z-[2] bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FAF8FF]/70 to-transparent pointer-events-none" />


      {/* ---------------------------------
          HERO CONTENT
      --------------------------------- */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">

        {/* Top Badge Pill */}
        <div className="hero-badge inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/80 shadow-lg mb-6">

          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C3AED] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C3AED]"></span>
          </span>

          <span className="text-xs font-semibold text-[#30105E]">
            India's #1 P2P Rental Marketplace
          </span>

          <span className="text-[#C4B5FD]">•</span>

          <span className="text-xs font-bold text-[#30105E] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />
            100% Safe & Verified
          </span>
        </div>

        {/* Main Headline */}
        <h1
          ref={heroTitleRef}
          className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight text-[#30105E] max-w-4xl mx-auto leading-[1.1] sm:leading-[1.12]"
        >
          Lendit India.{' '}

          <span className="block mt-1 sm:mt-2 text-[#30105E]">
            Rent anything,{' '}

            <span className="relative inline-block">
              <span className="relative z-10 bg-[#C4B5FD]/90 backdrop-blur-sm text-[#30105E] px-3.5 sm:px-5 py-0.5 sm:py-1 rounded-2xl sm:rounded-3xl shadow-lg">
                near you.
              </span>
            </span>
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="hero-description mt-6 text-base sm:text-xl text-[#30105E]/85 font-medium max-w-2xl mx-auto leading-relaxed">
          Join the fastest-growing peer-to-peer (P2P) network. Borrow cameras, tools, bikes, and camping gear from{' '}
          <span className="text-[#30105E] font-bold underline decoration-[#C4B5FD] decoration-4 underline-offset-4">
            verified neighbours
          </span>.
          Save money, monetize idle assets, and reduce waste.
        </p>

        {/* Large Rental Search Bar */}
        <div className="mt-8 sm:mt-10 max-w-3xl mx-auto">

          <form
            onSubmit={handleSearchSubmit}
            className="hero-search p-2 sm:p-2.5 rounded-[26px] bg-[#FAF8FF]/95 backdrop-blur-xl border border-white shadow-[0_15px_45px_rgba(48,16,94,0.14)] flex flex-col sm:flex-row items-center gap-2"
          >

            {/* Search Input */}
            <div className="flex-1 flex items-center gap-3 px-4 py-2 w-full">
              <Search className="w-5 h-5 text-[#7C3AED] flex-shrink-0" />

              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search for cameras, drones, camping tents, power tools..."
                className="w-full bg-transparent text-sm sm:text-base font-medium text-[#30105E] placeholder:text-[#30105E]/50 focus:outline-none"
              />
            </div>

            {/* Radius Selector */}
            <div className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-2xl border border-[#E9D5FF] w-full sm:w-auto justify-between sm:justify-start">

              <MapPin className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />

              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-[#30105E] focus:outline-none cursor-pointer pr-2"
              >
                <option value="3 km">Within 3 km</option>
                <option value="5 km">Within 5 km</option>
                <option value="10 km">Within 10 km</option>
                <option value="25 km">Within 25 km</option>
              </select>
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm tracking-tight transition-all duration-150 flex items-center justify-center gap-2 group shadow-md hover:shadow-lg active:scale-95"
            >
              <span>Search</span>

              <ArrowRight className="w-4 h-4 text-[#C4B5FD] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </form>

          {/* Popular Category Shortcuts */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 text-xs text-[#30105E]">

            <span className="font-semibold text-[#30105E]/70 mr-1">
              Popular:
            </span>

            {popularShortcuts.map((item) => (
              <button
                key={item.label}
                onClick={() => handleCategoryClick(item.catId)}
                className="popular-category px-3 py-1.5 rounded-xl bg-white/75 hover:bg-[#E9D5FF] backdrop-blur-md text-[#30105E] font-semibold border border-white/80 shadow-sm hover:shadow-md transition-all duration-150 flex items-center gap-1.5"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Owner Secondary CTA */}
          <p className="hero-owner-cta mt-5 text-sm text-[#30105E]/85">
            Have gear collecting dust?{' '}

            <button
              onClick={() => navigateTo('list-item')}
              className="font-bold text-[#30105E] underline decoration-[#7C3AED] decoration-2 hover:text-[#7C3AED] transition-colors"
            >
              List an item and start earning →
            </button>
          </p>
        </div>

        {/* Statistics & Proof Bar */}
        <div className="hero-statistics mt-12 pt-8 border-t border-[#E9D5FF]/80 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

          <div className="hero-stat-card p-3 rounded-2xl bg-white/80 backdrop-blur-lg border border-white shadow-sm">
            <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] tracking-tight">
              3,200+
            </div>
            <div className="text-xs font-semibold text-[#30105E]/70 mt-0.5">
              Active Renters
            </div>
          </div>

          <div className="hero-stat-card p-3 rounded-2xl bg-white/80 backdrop-blur-lg border border-white shadow-sm">
            <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] tracking-tight flex items-center justify-center gap-1">
              4.9 <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-xs font-semibold text-[#30105E]/70 mt-0.5">
              Average Rating
            </div>
          </div>

          <div className="hero-stat-card p-3 rounded-2xl bg-white/80 backdrop-blur-lg border border-white shadow-sm">
            <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] tracking-tight">
              1,200+
            </div>
            <div className="text-xs font-semibold text-[#30105E]/70 mt-0.5">
              Verified Gear Items
            </div>
          </div>

          <div className="hero-stat-card p-3 rounded-2xl bg-white/80 backdrop-blur-lg border border-white shadow-sm">
            <div className="font-display font-black text-2xl sm:text-3xl text-[#30105E] tracking-tight">
              ₹24 Lakhs+
            </div>
            <div className="text-xs font-semibold text-[#30105E]/70 mt-0.5">
              Earned by Neighbors
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
