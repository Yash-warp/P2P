import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  ShieldCheck,
  QrCode,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Lock,
  Check,
  Camera,
  Bike
} from 'lucide-react';
import { useApp } from '../context/AppContext';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const HowItWorks = () => {
  const { navigateTo } = useApp();
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const cardsGridRef = useRef(null);
  const ctaRef = useRef(null);

  // RENTER WORKFLOW STEPS (Core 4 Steps)
  const steps = [
    {
      step: 'Step 01',
      counter: '1 of 4',
      badge: 'Neighborhood Search',
      title: 'Local Gear Discovery',
      description: 'Search hundreds of verified cameras, power tools, camping tents, and bikes within a 1-5 km radius around your home.',
      icon: Search,
      highlight: 'Real-time location proximity',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-[#0e0a1a] border border-[#7C3AED]/35 text-white relative overflow-hidden font-mono text-[11px] select-none shadow-inner">
          {/* Blueprint grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

          {/* Radar area */}
          <div className="relative h-28 flex items-center justify-center">
            {/* Concentric radar circles */}
            <div className="absolute w-24 h-24 rounded-full border border-[#7C3AED]/25" />
            <div className="absolute w-16 h-16 rounded-full border border-[#7C3AED]/35" />
            <div className="absolute w-8 h-8 rounded-full border border-[#7C3AED]/60 bg-[#7C3AED]/15 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#C4B5FD] animate-ping" />
            </div>

            {/* Smooth radar sweep cone */}
            <div
              className="absolute w-24 h-24 rounded-full border-t border-r border-[#C4B5FD]/45 pointer-events-none"
              style={{ animation: 'spin 6s linear infinite' }}
            />

            {/* Pulsing Pin 1 */}
            <div className="absolute top-2 left-4 flex items-center gap-1 bg-[#1a122e] px-2 py-0.5 rounded-md border border-[#7C3AED]/50 text-[9px] text-[#DDD6FE] shadow-sm">
              <Camera className="w-2.5 h-2.5 text-[#C4B5FD]" />
              <span>Canon R5 · 0.8 km</span>
            </div>

            {/* Pulsing Pin 2 */}
            <div className="absolute bottom-2 right-4 flex items-center gap-1 bg-[#1a122e] px-2 py-0.5 rounded-md border border-[#7C3AED]/50 text-[9px] text-[#DDD6FE] shadow-sm">
              <Bike className="w-2.5 h-2.5 text-[#C4B5FD]" />
              <span>Trek Bike · 1.2 km</span>
            </div>
          </div>

          {/* Footer Status Log */}
          <div className="mt-1 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
            <div className="flex items-center gap-1.5 text-[#C4B5FD] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4B5FD] animate-pulse" />
              <span>RADAR LOG: 32 ITEMS NEARBY</span>
            </div>
            <span className="text-[9px] text-zinc-500">LIVE · 5 KM</span>
          </div>
        </div>
      )
    },
    {
      step: 'Step 02',
      counter: '2 of 4',
      badge: 'Direct Connect',
      title: 'Verified Profiles & Direct Chat',
      description: 'Review verified neighbor ratings, government ID badges, and past reviews. Chat directly to agree on rental duration and pickup terms with zero platform fees.',
      icon: ShieldCheck,
      highlight: 'Direct neighbor in-app chat',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-[#0e0a1a] border border-[#7C3AED]/35 text-white relative overflow-hidden font-mono text-[11px] select-none shadow-inner">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

          <div className="relative h-28 flex flex-col justify-center px-1">
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#1a122e] border border-[#7C3AED]/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#7C3AED]/25 border border-[#7C3AED]/60 flex items-center justify-center text-[#C4B5FD]">
                  <ShieldCheck className="w-4 h-4 text-[#C4B5FD]" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-white">Rahul Sharma · 4.9 ★</div>
                  <div className="text-[9px] text-[#A78BFA] font-medium">DigiLocker KYC Verified</div>
                </div>
              </div>
              <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-[#7C3AED]/30 text-[#C4B5FD] border border-[#7C3AED]/40">
                ZERO FEES
              </span>
            </div>

            <div className="mt-2 p-1.5 rounded-lg bg-white/5 border border-white/10 text-[9px] text-zinc-300">
              <span className="text-[#C4B5FD] font-semibold">Direct Chat:</span> "Sony A7 III is ready. Indiranagar pickup on Sat 10am."
            </div>
          </div>

          <div className="mt-1 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
            <span className="text-[#C4B5FD]">DIRECT CONNECT</span>
            <span className="text-emerald-400 font-bold text-[9px]">MUTUAL AGREEMENT CONFIRMED ✓</span>
          </div>
        </div>
      )
    },
    {
      step: 'Step 03',
      counter: '3 of 4',
      badge: 'Safe Meetup',
      title: 'QR Code Handover',
      description: 'Meet your neighbor at a local landmark or doorstep. Inspect the item together and scan the in-app QR code to timestamp handover condition.',
      icon: QrCode,
      highlight: 'In-app condition photo check',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-[#0e0a1a] border border-[#7C3AED]/35 text-white relative overflow-hidden font-mono text-[11px] select-none shadow-inner">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

          <div className="relative h-28 flex items-center gap-3 px-1">
            {/* Smooth Laser Scanning QR Code */}
            <div className="w-20 h-20 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 relative overflow-hidden shadow-md">
              <QrCode className="w-full h-full text-[#30105E]" />
              <div className="absolute left-1 right-1 h-[2px] bg-[#7C3AED] shadow-[0_0_8px_#7C3AED] animate-laser-scan" />
            </div>

            {/* Checklist */}
            <div className="flex-1 space-y-1 text-[9px]">
              <div className="flex items-center gap-1.5 text-zinc-300">
                <div className="w-3 h-3 rounded bg-[#7C3AED]/30 text-[#C4B5FD] flex items-center justify-center text-[7px] font-bold">✓</div>
                <span>Condition Photos Logged</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <div className="w-3 h-3 rounded bg-[#7C3AED]/30 text-[#C4B5FD] flex items-center justify-center text-[7px] font-bold">✓</div>
                <span>Timestamp Verified</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-300">
                <div className="w-3 h-3 rounded bg-emerald-500/25 text-emerald-300 flex items-center justify-center text-[7px] font-bold">✓</div>
                <span>Handover Recorded</span>
              </div>
            </div>
          </div>

          <div className="mt-1 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
            <span className="text-[#C4B5FD]">HANDOVER STATUS</span>
            <span className="text-emerald-400 font-bold text-[9px]">DIGITALLY CONFIRMED</span>
          </div>
        </div>
      )
    },
    {
      step: 'Step 04',
      counter: '4 of 4',
      badge: 'Community Trust',
      title: 'Return & Review',
      description: 'Return the equipment on schedule, complete the quick handback check with your neighbor, and exchange mutual reviews to build your trust score.',
      icon: RotateCcw,
      highlight: 'Mutual peer reputation score',
      diagram: (
        <div className="p-3.5 rounded-2xl bg-[#0e0a1a] border border-[#7C3AED]/35 text-white relative overflow-hidden font-mono text-[11px] select-none shadow-inner">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:14px_14px] pointer-events-none" />

          <div className="relative h-28 flex flex-col justify-center px-1">
            <div className="p-2 rounded-xl bg-[#1a122e] border border-[#7C3AED]/50">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-zinc-400">GEAR RETURN VERIFIED</span>
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/25 text-emerald-300">COMPLETED ✓</span>
              </div>
              <div className="text-xs font-bold text-[#C4B5FD] mt-1">Item Inspected & Handed Back Safely</div>
              <div className="text-[8px] text-zinc-400">Handback confirmed by Rahul Sharma (Owner)</div>
            </div>

            <div className="mt-1.5 flex items-center justify-between text-[9px] text-amber-300 bg-white/5 p-1 rounded-lg border border-white/10">
              <span className="text-zinc-400">Mutual Feedback:</span>
              <span className="font-bold flex items-center gap-0.5">★★★★★ 5.0 Star Neighbor (+50 pts)</span>
            </div>
          </div>

          <div className="mt-1 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400">
            <span className="text-[#C4B5FD]">RENTAL COMPLETE</span>
            <span className="text-emerald-400 font-bold text-[9px]">REPUTATION LOGGED ✓</span>
          </div>
        </div>
      )
    }
  ];

  // Header animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo(badgeRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(descriptionRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-12 md:py-16 bg-[#E9D5FF]/20 border-y border-[#E9D5FF] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* SECTION HEADER (Cleaned: toggle removed as requested) */}
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
        </div>

        {/* INTERACTIVE EXPANDING CARD DECK - Smooth, Calm, Liquid Transition */}
        <div
          ref={cardsGridRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-start"
        >
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStep === index;

            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(index)}
                className={`relative rounded-[28px] p-5 sm:p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer flex flex-col justify-between select-none
                  ${
                    isActive
                      ? 'bg-gradient-to-b from-white via-white to-[#FAF8FF] border-2 border-[#7C3AED] shadow-[0_20px_50px_rgba(124,58,237,0.18)] ring-4 ring-[#7C3AED]/12 -translate-y-2 z-10'
                      : 'bg-white/85 hover:bg-white border border-[#E9D5FF] hover:border-[#C4B5FD] shadow-xs hover:shadow-md translate-y-0 opacity-85 hover:opacity-100 z-0'
                  }`}
              >
                {/* Active Card Progress Bar - Calm, Relaxed 8.5s Pace */}
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[3.5px] bg-[#E9D5FF]/60 overflow-hidden rounded-t-[28px] pointer-events-none">
                    <div
                      key={`progress-${activeStep}`}
                      className="h-full w-full bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#A855F7] origin-left shadow-[0_0_8px_rgba(124,58,237,0.4)]"
                      style={{
                        animation: 'lenditProgress 8.5s linear forwards',
                        animationPlayState: isPaused ? 'paused' : 'running'
                      }}
                      onAnimationEnd={() => {
                        if (!isPaused) {
                          setActiveStep((curr) => (curr + 1) % 4);
                        }
                      }}
                    />
                  </div>
                )}

                <div>
                  {/* Step Header: Icon & Counter (e.g. 1 of 4) */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isActive
                          ? 'bg-[#7C3AED] text-white shadow-md scale-105'
                          : 'bg-[#FAF8FF] text-[#7C3AED] border border-[#E9D5FF]'
                      }`}
                    >
                      <Icon className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 font-mono">
                        {item.counter}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-md transition-colors duration-400 ${
                          isActive
                            ? 'bg-[#7C3AED] text-white'
                            : 'bg-[#E9D5FF] text-[#30105E]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3
                    className={`font-display font-bold text-base sm:text-lg transition-colors duration-400 leading-snug ${
                      isActive ? 'text-[#7C3AED]' : 'text-[#30105E]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description: Consistent across states so text never reflows or jumps */}
                  <p className="mt-2 text-xs sm:text-sm text-[#30105E]/75 leading-relaxed font-normal">
                    {item.description}
                  </p>

                  {/* Blueprint Graphic Preview - Smooth CSS Grid Rollout */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isActive
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-0.5">
                        {item.diagram}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Highlight */}
                <div
                  className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-bold transition-all duration-400 ${
                    isActive
                      ? 'border-[#7C3AED]/20 text-[#7C3AED]'
                      : 'border-[#E9D5FF]/60 text-[#30105E]/60'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-400 ${
                        isActive ? 'bg-[#7C3AED] scale-125' : 'bg-[#E9D5FF]'
                      }`}
                    />
                    <span>{item.highlight}</span>
                  </div>

                  {!isActive && (
                    <span className="text-[10px] text-[#7C3AED] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to expand →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div ref={ctaRef} className="mt-12 text-center">
          <button
            onClick={() => navigateTo('marketplace')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md
            transition-all duration-300 transform
            hover:scale-105 hover:-translate-y-0.5
            hover:shadow-[0_0_20px_rgba(124,58,237,0.45)]
            active:scale-95 group"
          >
            <span>Browse Available Gear Now</span>
            <ArrowRight className="w-4 h-4 text-[#C4B5FD] transition-all duration-300 group-hover:translate-x-1" />
          </button>
        </div>

      </div>
    </section>
  );
};
