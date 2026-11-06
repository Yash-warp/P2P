import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShieldCheck,
  QrCode,
  RotateCcw,
  Upload,
  CheckCircle,
  IndianRupee,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('renters');

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const tabsRef = useRef(null);
  const cardsGridRef = useRef(null);
  const ctaRef = useRef(null);

  const renterSteps = [
    {
      step: 'Step 01',
      badge: 'Neighborhood Search',
      title: 'Local Gear Discovery',
      description: 'Search hundreds of verified cameras, power tools, camping tents, and bikes within a 1-5 km radius around your home.',
      icon: Search,
      highlight: 'Real-time location proximity'
    },
    {
      step: 'Step 02',
      badge: 'Zero Risk Booking',
      title: 'Lender Verification & Escrow',
      description: 'Review verified lender ratings and response times. Select your rental dates and pay with 100% refundable escrow deposit protection.',
      icon: ShieldCheck,
      highlight: 'RBI-compliant escrow account'
    },
    {
      step: 'Step 03',
      badge: 'Safe Meetup',
      title: 'QR Code Handover',
      description: 'Meet your neighbor at a local landmark or get doorstep delivery. Inspect the item together and scan the in-app QR code to timestamp condition.',
      icon: QrCode,
      highlight: 'In-app condition photo check'
    },
    {
      step: 'Step 04',
      badge: 'Instant Refund',
      title: 'Return & Review',
      description: 'Return the equipment on schedule. Once the lender confirms return condition, your security deposit is instantly released back to your bank account.',
      icon: RotateCcw,
      highlight: 'Instant UPI deposit refund'
    }
  ];

  const ownerSteps = [
    {
      step: 'Step 01',
      badge: 'Quick Listing',
      title: 'List Your Item in 2 Minutes',
      description: 'Snap a few photos of your unused camera, drone, or tool. Set your daily rental price, security deposit requirement, and neighborhood pickup rules.',
      icon: Upload,
      highlight: 'Zero upfront listing fee'
    },
    {
      step: 'Step 02',
      badge: 'Full Control',
      title: 'Review & Accept Requests',
      description: 'Receive booking requests with full borrower details, government ID verification status, and past rental reviews before you accept.',
      icon: CheckCircle,
      highlight: '100% verified borrowers only'
    },
    {
      step: 'Step 03',
      badge: 'Verified Exchange',
      title: 'QR Handover & Protection',
      description: 'Meet the renter and scan their unique handover QR code. The app records pre-rental condition photos to ensure complete accountability.',
      icon: QrCode,
      highlight: 'Automated digital receipt'
    },
    {
      step: 'Step 04',
      badge: 'Guaranteed Earnings',
      title: 'Instant Bank / UPI Payout',
      description: 'Rental earnings are deposited directly into your linked bank account or UPI ID. Keep 90% of all rental proceeds with complete transparency.',
      icon: IndianRupee,
      highlight: 'Direct UPI transfer'
    }
  ];

  const currentSteps = activeTab === 'renters' ? renterSteps : ownerSteps;

  // ==========================================
  // 1. HEADER SCROLL ANIMATION
  // ==========================================
 // ==========================================
// 1. HEADER STAGGER SCROLL ANIMATION
// ==========================================
useEffect(() => {
  const ctx = gsap.context(() => {

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse',
        markers: false
      }
    });

    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 35, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo(headingRef.current,
      { opacity: 0, y: 60, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(tabsRef.current,
      { opacity: 0, y: 30, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'back.out(1.7)' },
      '-=0.3'
    );

  }, sectionRef);

  return () => ctx.revert();
}, []);
  // ==========================================
  // 2. CARD SCROLL REVEAL
  // ==========================================
  useEffect(() => {
    const ctx = gsap.context(() => {

      const cards = gsap.utils.toArray(
        '.how-step-card',
        cardsGridRef.current
      );

      if (!cards.length) return;

      const revealCards = () => {
        gsap.fromTo(cards,
          {
            opacity: 0,
            y: 65,
            scale: 0.88
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: 'power3.out',
            clearProps: 'transform'
          }
        );
      };

      if (ScrollTrigger.isInViewport(cardsGridRef.current, 0.1)) {
        revealCards();
      } else {
        gsap.fromTo(cards,
          { opacity: 0, y: 65, scale: 0.88 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.16,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: cardsGridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none none'
            }
          }
        );
      }

      // Icon reveal
      cards.forEach((card, index) => {
        const icon = card.querySelector('.how-step-icon');

        if (icon) {
          gsap.fromTo(icon,
            { scale: 0.5, rotation: -20 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.65,
              delay: index * 0.12,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: cardsGridRef.current,
                start: 'top 82%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

    }, cardsGridRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#E9D5FF]/20 border-y border-[#E9D5FF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* SECTION HEADER */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">

          <div
            ref={badgeRef}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E9D5FF] shadow-neu-pill text-xs font-bold text-[#30105E] mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Simple, Hyperlocal & Protected</span>
          </div>

          <h2
            ref={headingRef}
            className="font-display font-black text-3xl sm:text-5xl text-[#30105E] tracking-tight"
          >
            How Lendit Works
          </h2>

          <p
            ref={descriptionRef}
            className="mt-3 text-base sm:text-lg text-[#30105E]/75 font-medium"
          >
            A secure, peer-to-peer local matching workflow built to protect both Renters and Lenders.
          </p>

          {/* TABS */}
          <div
            ref={tabsRef}
            className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-[#E9D5FF] shadow-neu-pill"
          >
            <button
              onClick={() => setActiveTab('renters')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform hover:scale-[1.04] active:scale-95 ${
                activeTab === 'renters'
                  ? 'bg-[#30105E] text-white shadow-[0_0_18px_rgba(48,16,94,0.35)]'
                  : 'text-[#30105E]/70 hover:text-[#30105E] hover:bg-[#E9D5FF]/50'
              }`}
            >
              For Renters (Borrow Gear)
            </button>

            <button
              onClick={() => setActiveTab('owners')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 transform hover:scale-[1.04] active:scale-95 ${
                activeTab === 'owners'
                  ? 'bg-[#7C3AED] text-white shadow-[0_0_20px_rgba(124,58,237,0.45)]'
                  : 'text-[#30105E]/70 hover:text-[#30105E] hover:bg-[#E9D5FF]/50'
              }`}
            >
              For Owners (Earn Money)
            </button>
          </div>
        </div>

        {/* STEP CARDS */}
        <div
          ref={cardsGridRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {currentSteps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={`${activeTab}-${item.step}`}
                className="how-step-card p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill flex flex-col justify-between group cursor-pointer
                transition-all duration-500 ease-out
                hover:scale-[1.045] hover:-translate-y-2
                hover:shadow-[0_15px_40px_rgba(124,58,237,0.22)]
                hover:border-[#7C3AED]/70
                active:scale-[0.98]"
              >
                <div>

                  {/* STEP HEADER */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-[#7C3AED] transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1">
                      {item.step}
                    </span>

                    <span className="text-[10px] font-bold text-[#30105E] bg-[#E9D5FF] px-2.5 py-0.5 rounded-md transition-all duration-300 group-hover:bg-[#7C3AED] group-hover:text-white">
                      {item.badge}
                    </span>
                  </div>

                  {/* ICON */}
                  <div
                    className="how-step-icon w-12 h-12 rounded-2xl bg-[#FAF8FF] group-hover:bg-[#E9D5FF] text-[#7C3AED] flex items-center justify-center transition-all duration-500 mb-4 border border-[#E9D5FF]
                    group-hover:scale-125 group-hover:rotate-6 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                  >
                    <Icon className="w-6 h-6 stroke-[2] transition-transform duration-500 group-hover:scale-110" />
                  </div>

                  {/* TITLE */}
                  <h3 className="font-display font-bold text-lg text-[#30105E] transition-all duration-300 group-hover:text-[#7C3AED] group-hover:translate-x-1">
                    {item.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-2 text-xs sm:text-sm text-[#30105E]/70 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* FOOTER HIGHLIGHT */}
                <div className="mt-6 pt-4 border-t border-[#E9D5FF]/60 flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED] transition-all duration-300 group-hover:translate-x-1">

                  <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] transition-all duration-300 group-hover:scale-150 group-hover:shadow-[0_0_10px_rgba(124,58,237,0.8)]"></div>

                  <span>{item.highlight}</span>
                </div>

              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div
          ref={ctaRef}
          className="mt-12 text-center"
        >
          <button
            onClick={() => navigateTo(activeTab === 'renters' ? 'marketplace' : 'list-item')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md
            transition-all duration-300 transform
            hover:scale-110 hover:-translate-y-1
            hover:shadow-[0_0_20px_rgba(124,58,237,0.6),0_0_45px_rgba(124,58,237,0.3)]
            active:scale-95 group"
          >
            <span>
              {activeTab === 'renters'
                ? 'Browse Available Gear Now'
                : 'List an Item & Start Earning'}
            </span>

            <ArrowRight className="w-4 h-4 text-[#C4B5FD] transition-all duration-300 group-hover:translate-x-2 group-hover:scale-125" />
          </button>
        </div>

      </div>
    </section>
  );
};