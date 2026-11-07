
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Star, 
  ArrowRight,
  Bell,
  Heart,
  Camera,
  Bike,
  Plane,
  Wrench,
  House,
  MessageSquare
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const { navigateTo, setSearchQuery, setSelectedCategory } = useApp();

  const [term, setTerm] = useState('');
  const [radius, setRadius] = useState('5 km');

  const heroTitleRef = useRef(null);
  const heroSectionRef = useRef(null);
  const videoRef = useRef(null);

  // MAIN HERO ENTRANCE ANIMATION - Fast & Instant Response
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power2.out'
        }
      });

      // 1. Heading & Phone Mockup enter immediately together on mount
      tl.fromTo(
        heroTitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45 },
        0
      );

      tl.fromTo(
        '.hero-phone-mockup',
        { y: 24, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45 },
        0
      );

      // 2. Description fades in promptly
      tl.fromTo(
        '.hero-description',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        0.08
      );

      // 3. Search bar
      tl.fromTo(
        '.hero-search',
        { y: 18, scale: 0.96, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: 'back.out(1.2)'
        },
        0.12
      );

      // 4. Popular categories
      tl.fromTo(
        '.popular-category',
        { y: 12, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: 0.03
        },
        0.18
      );

      // 5. Owner CTA
      tl.fromTo(
        '.hero-owner-cta',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        0.24
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
      className="relative isolate pt-28 pb-6 md:pt-36 md:pb-8 overflow-hidden"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* TWO-COLUMN HERO GRID: Text & Search on Left, Component 1 Mockup on Right */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Column: Headline, Description, Search & Shortcuts */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Main Headline */}
            <h1
              ref={heroTitleRef}
              className="font-display font-black text-4xl sm:text-5xl md:text-6xl xl:text-[66px] tracking-tight text-[#30105E] leading-[1.08] sm:leading-[1.1]"
            >
              Lendit India.{' '}
              <span className="block mt-1 sm:mt-1.5 text-[#30105E]">
                Rent anything,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-[#C4B5FD]/90 backdrop-blur-sm text-[#30105E] px-3 sm:px-4 py-0.5 rounded-2xl shadow-md">
                    near you.
                  </span>
                </span>
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="hero-description mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-[#30105E]/85 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Join the fastest-growing peer-to-peer (P2P) network. Borrow cameras, tools, bikes, and camping gear from{' '}
              <span className="text-[#30105E] font-bold underline decoration-[#C4B5FD] decoration-4 underline-offset-4">
                verified neighbours
              </span>.
              Save money, monetize idle assets, and reduce waste.
            </p>

            {/* Large Rental Search Bar */}
            <div className="mt-5 sm:mt-6 max-w-2xl mx-auto lg:mx-0">
              <form
                onSubmit={handleSearchSubmit}
                className="hero-search p-2 rounded-[24px] bg-[#FAF8FF]/95 backdrop-blur-xl border border-white shadow-[0_12px_40px_rgba(48,16,94,0.12)] flex flex-col sm:flex-row items-center gap-2"
              >
                {/* Search Input */}
                <div className="flex-1 flex items-center gap-2.5 px-3 py-1.5 w-full">
                  <Search className="w-4 h-4 text-[#7C3AED] flex-shrink-0" />
                  <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Search for cameras, drones, camping tents, power tools..."
                    className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#30105E] placeholder:text-[#30105E]/50 focus:outline-none"
                  />
                </div>

                {/* Radius Selector */}
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-xl border border-[#E9D5FF] w-full sm:w-auto justify-between sm:justify-start">
                  <MapPin className="w-3.5 h-3.5 text-[#7C3AED] flex-shrink-0" />
                  <select
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    className="bg-transparent text-xs font-semibold text-[#30105E] focus:outline-none cursor-pointer pr-1"
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
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-xs tracking-tight transition-all duration-150 flex items-center justify-center gap-1.5 group shadow-md hover:shadow-lg active:scale-95"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C4B5FD] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </form>

              {/* Popular Category Shortcuts */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 text-xs text-[#30105E]">
                <span className="font-semibold text-[#30105E]/70 mr-1 text-[11px]">
                  Popular:
                </span>
                {popularShortcuts.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleCategoryClick(item.catId)}
                    className="popular-category px-2.5 py-1 rounded-lg bg-white/75 hover:bg-[#E9D5FF] backdrop-blur-md text-[#30105E] font-semibold text-[11px] border border-white/80 shadow-2xs hover:shadow-xs transition-all duration-150 flex items-center gap-1"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Owner Secondary CTA */}
              <p className="hero-owner-cta mt-4 text-xs sm:text-sm text-[#30105E]/85">
                Have gear collecting dust?{' '}
                <button
                  onClick={() => navigateTo('list-item')}
                  className="font-bold text-[#30105E] underline decoration-[#7C3AED] decoration-2 hover:text-[#7C3AED] transition-colors"
                >
                  List an item and start earning →
                </button>
              </p>
            </div>
          </div>

          {/* Right Column: Component 1 Phone Mockup (Dark Mode with Floating Badges) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0 hero-phone-mockup">
            <div className="relative w-full max-w-[280px] sm:max-w-[300px] mx-auto lg:mr-2">
              
              {/* Floating Badge 1 - Top Left: ID Verified */}
              <div className="absolute -top-3.5 -left-4 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 shadow-[0_12px_28px_rgba(48,16,94,0.14)] border border-white flex items-center gap-2.5 pointer-events-none animate-float">
                <div className="w-8 h-8 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white shrink-0 shadow-xs">
                  <ShieldCheck className="w-4.5 h-4.5 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-xs text-[#18181b] leading-tight">
                    ID Verified
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium">
                    Every owner checked
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Right: 23 nearby */}
              <div className="absolute -bottom-3.5 -right-4 sm:-right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl px-3 py-2 shadow-[0_12px_28px_rgba(48,16,94,0.14)] border border-white flex items-center gap-2.5 pointer-events-none animate-float-delayed">
                <div className="w-8 h-8 rounded-full bg-[#EDE9FE] flex items-center justify-center text-[#7C3AED] shrink-0 shadow-xs">
                  <MapPin className="w-4 h-4 fill-[#7C3AED] text-[#7C3AED]" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-xs text-[#18181b] leading-tight">
                    23 nearby
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium">
                    Within 3 miles
                  </div>
                </div>
              </div>

              {/* Phone Body Chassis */}
              <div className="relative rounded-[44px] border-[8px] border-[#18181b] bg-[#0c0c0e] p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(48,16,94,0.25)] ring-1 ring-white/15 overflow-hidden">
                
                {/* Phone Status Bar */}
                <div className="flex items-center justify-between text-[11px] font-bold text-zinc-300 px-3 pt-1 pb-1.5">
                  <span>9:41</span>
                  <div className="w-16 h-3 bg-black rounded-full mx-auto -mt-0.5"></div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <span className="text-[9px]">5G</span>
                    <div className="w-3.5 h-2 border border-zinc-400 rounded-xs p-0.5 flex items-center">
                      <div className="w-full h-full bg-[#A855F7] rounded-2xs"></div>
                    </div>
                  </div>
                </div>

                {/* Inner Screen Content */}
                <div className="rounded-[30px] bg-[#121214] p-3 text-white overflow-hidden shadow-inner">
                  
                  {/* App Bar */}
                  <div className="flex items-center justify-between pb-1.5">
                    <span className="font-display font-black text-sm tracking-tight text-[#C4B5FD]">
                      lendit
                    </span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#27272a] flex items-center justify-center text-zinc-300">
                        <Bell className="w-3 h-3" />
                      </div>
                      <div className="w-6 h-6 rounded-full bg-[#27272a] flex items-center justify-center text-[#C4B5FD]">
                        <Search className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Header Subtitle */}
                  <div className="text-left my-1">
                    <div className="font-display font-black text-xs sm:text-sm text-white tracking-tight">
                      23 items near you
                    </div>
                  </div>

                  {/* Category Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar my-1.5">
                    <span className="bg-[#7C3AED] text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full shrink-0 shadow-xs">
                      All
                    </span>
                    <span className="bg-[#27272a] text-zinc-300 font-semibold text-[9px] px-2.5 py-0.5 rounded-full shrink-0">
                      Cameras
                    </span>
                    <span className="bg-[#27272a] text-zinc-300 font-semibold text-[9px] px-2.5 py-0.5 rounded-full shrink-0">
                      Bikes
                    </span>
                    <span className="bg-[#27272a] text-zinc-300 font-semibold text-[9px] px-2.5 py-0.5 rounded-full shrink-0">
                      Tools
                    </span>
                  </div>

                  {/* Rental Items List */}
                  <div className="space-y-1.5 mt-1.5">
                    
                    {/* Item 1: Canon R5 */}
                    <div className="p-2 rounded-xl bg-[#1c1c20] border border-zinc-800/80 flex items-center gap-2 text-left transition-colors hover:bg-zinc-800/70">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                        <Camera className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] text-white truncate">Canon R5 + Lens</div>
                        <div className="text-[9px] text-zinc-400 flex items-center gap-1">
                          <span className="text-amber-400">★ 4.9</span>
                          <span>·</span>
                          <span>0.8 mi</span>
                        </div>
                        <div className="mt-0.5">
                          <span className="bg-[#7C3AED]/25 text-[#DDD6FE] text-[8px] font-bold px-1.5 py-0.5 rounded">
                            Popular
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Heart className="w-3 h-3 text-zinc-500 mb-1 ml-auto" />
                        <div className="font-black text-[11px] text-[#C4B5FD]">
                          ₹65<span className="text-[8px] text-zinc-400 font-normal">/day</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 2: Trek Bike */}
                    <div className="p-2 rounded-xl bg-[#1c1c20] border border-zinc-800/80 flex items-center gap-2 text-left transition-colors hover:bg-zinc-800/70">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                        <Bike className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] text-white truncate">Trek Carbon Bike</div>
                        <div className="text-[9px] text-zinc-400 flex items-center gap-1">
                          <span className="text-amber-400">★ 4.8</span>
                          <span>·</span>
                          <span>1.2 mi</span>
                        </div>
                        <div className="mt-0.5">
                          <span className="bg-[#7C3AED]/20 text-[#DDD6FE] text-[8px] font-bold px-1.5 py-0.5 rounded">
                            Near You
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Heart className="w-3 h-3 text-zinc-500 mb-1 ml-auto" />
                        <div className="font-black text-[11px] text-[#C4B5FD]">
                          ₹45<span className="text-[8px] text-zinc-400 font-normal">/day</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 3: DJI Mini 4 */}
                    <div className="p-2 rounded-xl bg-[#1c1c20] border border-zinc-800/80 flex items-center gap-2 text-left transition-colors hover:bg-zinc-800/70">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                        <Plane className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] text-white truncate">DJI Mini 4 Pro</div>
                        <div className="text-[9px] text-zinc-400 flex items-center gap-1">
                          <span className="text-amber-400">★ 5</span>
                          <span>·</span>
                          <span>0.5 mi</span>
                        </div>
                        <div className="mt-0.5">
                          <span className="bg-[#7C3AED]/25 text-[#DDD6FE] text-[8px] font-bold px-1.5 py-0.5 rounded">
                            Verified
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Heart className="w-3 h-3 text-zinc-500 mb-1 ml-auto" />
                        <div className="font-black text-[11px] text-[#C4B5FD]">
                          ₹55<span className="text-[8px] text-zinc-400 font-normal">/day</span>
                        </div>
                      </div>
                    </div>

                    {/* Item 4: DeWalt Drill */}
                    <div className="p-2 rounded-xl bg-[#1c1c20] border border-zinc-800/80 flex items-center gap-2 text-left transition-colors hover:bg-zinc-800/70">
                      <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 shrink-0">
                        <Wrench className="w-4 h-4 text-zinc-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] text-white truncate">DeWalt 20V Drill</div>
                        <div className="text-[9px] text-zinc-400 flex items-center gap-1">
                          <span className="text-amber-400">★ 4.7</span>
                          <span>·</span>
                          <span>2.1 mi</span>
                        </div>
                        <div className="mt-0.5">
                          <span className="bg-[#7C3AED]/20 text-[#DDD6FE] text-[8px] font-bold px-1.5 py-0.5 rounded">
                            New
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <Heart className="w-3 h-3 text-zinc-500 mb-1 ml-auto" />
                        <div className="font-black text-[11px] text-[#C4B5FD]">
                          ₹35<span className="text-[8px] text-zinc-400 font-normal">/day</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Phone Bottom Nav Bar */}
                  <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-around text-[9px]">
                    <div className="flex flex-col items-center gap-0.5 text-[#C4B5FD] font-bold">
                      <div className="w-3.5 h-3.5 rounded bg-[#7C3AED]/30 flex items-center justify-center">
                        <House className="w-2.5 h-2.5 text-[#C4B5FD]" />
                      </div>
                      <span>Explore</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-zinc-500 font-medium">
                      <Search className="w-3 h-3" />
                      <span>Search</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-zinc-500 font-medium">
                      <Camera className="w-3 h-3" />
                      <span>List</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-zinc-500 font-medium">
                      <MessageSquare className="w-3 h-3" />
                      <span>Chats</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Statistics & Proof Bar */}
        <div className="hero-statistics mt-8 pt-5 border-t border-[#E9D5FF]/80 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">

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
