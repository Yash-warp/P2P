
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useApp } from './context/AppContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Layout & Global Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AuthModal } from './components/AuthModal';

// Homepage Sections
import { Hero } from './components/Hero';
import { NearbyPreview } from './components/NearbyPreview';
import { ActivityTicker } from './components/ActivityTicker';
import { TrendingListings } from './components/TrendingListings';
import { OwnerEarningsCalculator } from './components/OwnerEarningsCalculator';
import { HowItWorks } from './components/HowItWorks';
import { TrustSafety } from './components/TrustSafety';
import { Testimonials } from './components/Testimonials';
import { AppDownloadCTA } from './components/AppDownloadCTA';
import { FinalCTA } from './components/FinalCTA';

// Feed View & Bottom Navigation Bar
import { FeedView } from './components/FeedView';
import { BottomNavBar } from './components/BottomNavBar';

// Additional Pages
import { MarketplaceView } from './components/MarketplaceView';
import { ProductDetailView } from './components/ProductDetailView';
import { DashboardView } from './components/DashboardView';
import { ListItemView } from './components/ListItemView';
import { ChatView } from './components/ChatView';

// Icons
import {
  CheckCircle2,
  AlertCircle,
  Info,
  ArrowRight,
  Search,
  HandCoins,
  ShieldCheck,
  Sparkles,
  LockKeyhole
} from 'lucide-react';

// ---------------------------------------------
// ROLE SELECTION SCREEN
// ---------------------------------------------

const RoleSelection = () => {
  const { selectLandingRole } = useApp();

  const sectionRef = useRef(null);
  const backgroundRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsRef = useRef([]);
  const trustRef = useRef(null);
  const iconRefs = useRef([]);
  const arrowRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cleanupFunctions = [];

    const ctx = gsap.context(() => {
      const headingWords = gsap.utils.toArray('.role-heading-word');
      const cards = cardsRef.current.filter(Boolean);
      const trustItems = gsap.utils.toArray('.role-trust-item');

      // Initial states
      gsap.set(badgeRef.current, {
        opacity: 0,
        y: 25,
        scale: 0.8
      });

      gsap.set(headingWords, {
        opacity: 0,
        y: 65,
        rotationX: -35,
        filter: 'blur(10px)',
        transformOrigin: '50% 100%'
      });

      gsap.set(descriptionRef.current, {
        opacity: 0,
        y: 25,
        filter: 'blur(6px)'
      });

      gsap.set(cards, {
        opacity: 0,
        y: 90,
        scale: 0.88,
        rotationX: 12,
        filter: 'blur(7px)',
        transformPerspective: 1000
      });

      gsap.set(trustItems, {
        opacity: 0,
        y: 20
      });

      // Entrance animation
      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });

      entrance
        .to(badgeRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.8)'
        })

        .to(headingWords, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.09,
          ease: 'power4.out'
        }, '-=0.3')

        .to(descriptionRef.current, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out'
        }, '-=0.4')

        .to(cards, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.18,
          ease: 'power4.out'
        }, '-=0.25')

        .to(trustItems, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out'
        }, '-=0.3');

      // Background movement
      gsap.to(backgroundRef.current, {
        scale: 1.08,
        y: -20,
        duration: 14,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Floating icons
      iconRefs.current.filter(Boolean).forEach((icon, index) => {
        gsap.to(icon, {
          y: -8,
          rotation: index === 0 ? -6 : 6,
          duration: 2.4 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3
        });
      });

      // Floating arrows
      arrowRefs.current.filter(Boolean).forEach((arrow, index) => {
        gsap.to(arrow, {
          x: 5,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.2
        });
      });

      // Smooth 3D lerp card interactions
      cards.forEach((card) => {
        const rotateX = gsap.quickTo(card, 'rotationX', {
          duration: 0.55,
          ease: 'power3.out'
        });

        const rotateY = gsap.quickTo(card, 'rotationY', {
          duration: 0.55,
          ease: 'power3.out'
        });

        const moveX = gsap.quickTo(card, 'x', {
          duration: 0.55,
          ease: 'power3.out'
        });

        const moveY = gsap.quickTo(card, 'y', {
          duration: 0.55,
          ease: 'power3.out'
        });

        const handleMouseMove = (event) => {
          const rect = card.getBoundingClientRect();

          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;

          rotateX((0.5 - y) * 7);
          rotateY((x - 0.5) * 9);

          moveX((x - 0.5) * 4);
          moveY((y - 0.5) * 4);
        };

        const handleMouseLeave = () => {
          rotateX(0);
          rotateY(0);
          moveX(0);
          moveY(0);

          gsap.to(card, {
            scale: 1,
            duration: 0.45,
            ease: 'power3.out'
          });
        };

        const handleMouseEnter = () => {
          gsap.to(card, {
            scale: 1.025,
            duration: 0.4,
            ease: 'power3.out'
          });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);

        cleanupFunctions.push(() => {
          card.removeEventListener('mousemove', handleMouseMove);
          card.removeEventListener('mouseleave', handleMouseLeave);
          card.removeEventListener('mouseenter', handleMouseEnter);
        });
      });

      // Icon hover animation
      cards.forEach((card, index) => {
        const icon = iconRefs.current[index];
        if (!icon) return;

        const handleEnter = () => {
          gsap.to(icon, {
            scale: 1.2,
            rotation: index === 0 ? -12 : 12,
            duration: 0.4,
            ease: 'back.out(2)'
          });
        };

        const handleLeave = () => {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
          });
        };

        card.addEventListener('mouseenter', handleEnter);
        card.addEventListener('mouseleave', handleLeave);

        cleanupFunctions.push(() => {
          card.removeEventListener('mouseenter', handleEnter);
          card.removeEventListener('mouseleave', handleLeave);
        });
      });

    }, section);

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100svh-72px)] flex flex-col justify-center items-center px-4 py-12 sm:py-16 overflow-hidden isolate"
    >

      {/* SCENIC BACKGROUND */}

      <div
        ref={backgroundRef}
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2400&q=90')"
        }}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FFF8F1]/75 via-[#FFF2E9]/55 to-[#171D1A]/55" />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#FFF6EF]/20 via-transparent to-[#FFF6EF]/20" />

      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-white/30 blur-[100px] pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#C4B5FD]/20 blur-[110px] pointer-events-none" />

      {/* HERO CONTENT */}

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">

        {/* Welcome Badge */}

        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/55 backdrop-blur-xl border border-white/70 shadow-lg mb-7"
        >
          <Sparkles className="w-4 h-4 text-[#6D28D9]" />

          <span className="text-xs sm:text-sm font-semibold text-[#30105E]">
            Welcome to Lendit India
          </span>
        </div>

        {/* Main Heading */}

        <h1
          ref={headingRef}
          aria-label="How would you like to use Lendit?"
          className="font-serif font-medium text-4xl sm:text-6xl md:text-7xl lg:text-[82px] leading-[1.05] tracking-tight text-[#21152C] max-w-5xl mx-auto"
        >
          <span className="role-heading-word inline-block">How</span>{' '}
          <span className="role-heading-word inline-block">would</span>{' '}
          <span className="role-heading-word inline-block">you</span>{' '}
          <span className="role-heading-word inline-block">like to</span>

          <span className="block mt-1">
            <span className="role-heading-word inline-block">use</span>{' '}
            <span className="role-heading-word inline-block italic text-[#6425B9]">
              Lendit?
            </span>
          </span>
        </h1>

        {/* Description */}

        <p
          ref={descriptionRef}
          className="mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#30263A]/85 leading-relaxed font-medium"
        >
          Whether you need equipment or want to earn from what you own,
          there's a place for you here.
        </p>

        {/* ROLE SELECTION CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto mt-10 md:mt-12">

          {/* BORROWER */}

          <button
            ref={(el) => (cardsRef.current[0] = el)}
            onClick={() => selectLandingRole('borrower')}
            className="group relative flex flex-col sm:flex-row min-h-[245px] overflow-hidden rounded-[30px] border border-white/80 bg-white/65 backdrop-blur-xl shadow-[0_15px_50px_rgba(45,25,60,0.13)] hover:shadow-[0_25px_65px_rgba(45,25,60,0.22)] transition-shadow duration-500 text-left"
            style={{ transformStyle: 'preserve-3d' }}
          >

            {/* Borrower Image */}

            <div
              className="relative w-full sm:w-[40%] min-h-[165px] sm:min-h-full bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=900&q=85')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/10 via-transparent to-white/10" />

              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md text-[#30105E] text-[10px] font-bold uppercase tracking-wider">
                Discover & Explore
              </div>
            </div>

            {/* Card Content */}

            <div className="flex-1 p-6 sm:p-6 md:p-7 flex flex-col justify-center relative">

              <div className="flex items-center justify-between mb-4">

                <div
                  ref={(el) => (iconRefs.current[0] = el)}
                  className="w-12 h-12 rounded-2xl bg-[#E9D5FF]/90 flex items-center justify-center"
                >
                  <Search className="w-6 h-6 text-[#6D28D9]" />
                </div>

                <span className="w-10 h-10 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shadow-lg group-hover:bg-[#4C1D95] transition-colors">
                  <ArrowRight
                    ref={(el) => (arrowRefs.current[0] = el)}
                    className="w-5 h-5"
                  />
                </span>

              </div>

              <h2 className="text-2xl sm:text-[26px] font-bold text-[#291B35] tracking-tight">
                I'm a Borrower
              </h2>

              <p className="mt-2 text-sm sm:text-base text-[#51465B] leading-relaxed">
                Find cameras, bikes, tools and other equipment
                available for rent near you.
              </p>

              <span className="mt-5 text-sm font-bold text-[#6D28D9] inline-flex items-center gap-2">
                Explore & Rent
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>

            </div>
          </button>

          {/* LENDER */}

          <button
            ref={(el) => (cardsRef.current[1] = el)}
            onClick={() => selectLandingRole('lender')}
            className="group relative flex flex-col sm:flex-row min-h-[245px] overflow-hidden rounded-[30px] border border-white/80 bg-white/65 backdrop-blur-xl shadow-[0_15px_50px_rgba(45,25,60,0.13)] hover:shadow-[0_25px_65px_rgba(45,25,60,0.22)] transition-shadow duration-500 text-left"
            style={{ transformStyle: 'preserve-3d' }}
          >

            {/* Lender Image */}

            <div
              className="relative w-full sm:w-[40%] min-h-[165px] sm:min-h-full bg-cover bg-center overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-black/10 via-transparent to-white/10" />

              <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full bg-white/75 backdrop-blur-md text-[#30105E] text-[10px] font-bold uppercase tracking-wider">
                Share & Earn
              </div>
            </div>

            {/* Card Content */}

            <div className="flex-1 p-6 sm:p-6 md:p-7 flex flex-col justify-center relative">

              <div className="flex items-center justify-between mb-4">

                <div
                  ref={(el) => (iconRefs.current[1] = el)}
                  className="w-12 h-12 rounded-2xl bg-[#E9D5FF]/90 flex items-center justify-center"
                >
                  <HandCoins className="w-6 h-6 text-[#6D28D9]" />
                </div>

                <span className="w-10 h-10 rounded-full bg-[#6D28D9] text-white flex items-center justify-center shadow-lg group-hover:bg-[#4C1D95] transition-colors">
                  <ArrowRight
                    ref={(el) => (arrowRefs.current[1] = el)}
                    className="w-5 h-5"
                  />
                </span>

              </div>

              <h2 className="text-2xl sm:text-[26px] font-bold text-[#291B35] tracking-tight">
                I'm a Lender
              </h2>

              <p className="mt-2 text-sm sm:text-base text-[#51465B] leading-relaxed">
                Turn your unused equipment into extra income
                by renting it to verified people nearby.
              </p>

              <span className="mt-5 text-sm font-bold text-[#6D28D9] inline-flex items-center gap-2">
                List & Earn
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </span>

            </div>
          </button>

        </div>

        {/* TRUST BAR */}

        <div
          ref={trustRef}
          className="mt-10 md:mt-14 flex flex-wrap justify-center items-center gap-x-7 gap-y-4 text-white"
        >

          <div className="role-trust-item flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-white" />
            <span className="text-xs sm:text-sm font-semibold drop-shadow-md">
              Verified Community
            </span>
          </div>

          <div className="hidden sm:block w-px h-7 bg-white/50" />

          <div className="role-trust-item flex items-center gap-2.5">
            <LockKeyhole className="w-5 h-5 text-white" />
            <span className="text-xs sm:text-sm font-semibold drop-shadow-md">
              Secure Transactions
            </span>
          </div>

          <div className="hidden sm:block w-px h-7 bg-white/50" />

          <div className="role-trust-item flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-white" />
            <span className="text-xs sm:text-sm font-semibold drop-shadow-md">
              Simple & Convenient
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};


// ---------------------------------------------
// MAIN APP
// ---------------------------------------------

export function App() {
  const {
    activeView,
    toast,
    isLoggedIn,
    selectedLandingRole
  } = useApp();

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [activeView]);

  // Show role selection before entering either landing page
  const showRoleSelection =
    !isLoggedIn &&
    activeView === 'home' &&
    selectedLandingRole === null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8FF] text-[#30105E] selection:bg-[#C4B5FD] selection:text-[#30105E] font-body antialiased">

      {/* Navbar */}
      {!isLoggedIn && <Navbar />}

      {/* Main Content */}
      <main className="flex-1">

        {/* Initial Role Selection */}
        {showRoleSelection && <RoleSelection />}

        {/* Logged In Feed */}
        {activeView === 'feed' && <FeedView />}

        {/* BORROWER LANDING PAGE */}
        {activeView === 'home' && selectedLandingRole === 'borrower' && (
          <>
            <Hero />
            <NearbyPreview />
            <ActivityTicker />
            <TrendingListings />
            <HowItWorks />
            <TrustSafety />
            <Testimonials />
            <AppDownloadCTA />
            <FinalCTA />
          </>
        )}

        {/* LENDER LANDING PAGE */}
        {activeView === 'lender-home' && (
          <>
            <OwnerEarningsCalculator />
            <HowItWorks />
            <TrustSafety />
            <Testimonials />
            <FinalCTA />
          </>
        )}

        {/* Dedicated Marketplace */}
        {activeView === 'marketplace' && <MarketplaceView />}

        {/* Product Details */}
        {activeView === 'product-detail' && <ProductDetailView />}

        {/* Dashboard */}
        {activeView === 'dashboard' && <DashboardView />}

        {/* Create Listing */}
        {activeView === 'list-item' && <ListItemView />}

        {/* Messages */}
        {activeView === 'messages' && <ChatView />}

      </main>

      {/* Footer */}
      {!isLoggedIn && <Footer />}

      {/* Bottom Navigation */}
      {isLoggedIn && <BottomNavBar />}

      {/* Booking Modal */}
      <BookingModal />

      {/* Authentication Modal */}
      <AuthModal />

      {/* Global Toast */}
      {toast && (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-[160] max-w-sm flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#E9D5FF] text-[#30105E] shadow-2xl animate-in slide-in-from-bottom-5 duration-300">

          {toast.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
          )}

          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
          )}

          {toast.type === 'info' && (
            <Info className="w-5 h-5 text-[#7C3AED] shrink-0" />
          )}

          <p className="text-xs font-semibold leading-relaxed">
            {toast.message}
          </p>

        </div>
      )}

    </div>
  );
}

export default App;
