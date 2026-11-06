
import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  Calculator,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Wallet,
  CalendarDays,
  Sparkles,
  IndianRupee,
  Zap,
  Clock3,
  CircleHelp,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_PRESETS = [
  {
    id: 'cameras',
    label: 'Cinema & Mirrorless Cameras',
    defaultPrice: 950,
    avgDays: 12,
    itemExample: 'Sony A7 III / FX3',
    icon: '📷',
  },
  {
    id: 'drones',
    label: 'Drones & Aerial Video',
    defaultPrice: 1200,
    avgDays: 10,
    itemExample: 'DJI Mini 3 / Mavic 3',
    icon: '🚁',
  },
  {
    id: 'tools',
    label: 'Power Tools & Equipment',
    defaultPrice: 350,
    avgDays: 14,
    itemExample: 'Bosch Hammer Drill / Circular Saw',
    icon: '🛠️',
  },
  {
    id: 'camping',
    label: 'Camping & Outdoor Gear',
    defaultPrice: 400,
    avgDays: 8,
    itemExample: 'Coleman 4P Tent / Trekking Bags',
    icon: '⛺',
  },
  {
    id: 'bikes',
    label: 'Bicycles & Urban Mobility',
    defaultPrice: 450,
    avgDays: 15,
    itemExample: 'Trek Mountain Bike / E-Scooter',
    icon: '🚲',
  },
  {
    id: 'audio',
    label: 'Audio & Musical Instruments',
    defaultPrice: 350,
    avgDays: 10,
    itemExample: 'Yamaha Guitar / JBL PartyBox',
    icon: '🎸',
  },
];

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Secure Rental Process',
    description:
      'Keep control of your equipment with verified renters and security deposits.',
  },
  {
    icon: Wallet,
    title: 'Transparent Earnings',
    description:
      'See your estimated earnings clearly, including the platform fee.',
  },
  {
    icon: CalendarDays,
    title: 'Your Schedule, Your Rules',
    description:
      'Manage availability, approve requests, and choose when your gear is rented.',
  },
];

export const OwnerEarningsCalculator = () => {
  const { navigateTo } = useApp();

  const [selectedCatId, setSelectedCatId] = useState('cameras');
  const [dailyPrice, setDailyPrice] = useState(950);
  const [rentalDays, setRentalDays] = useState(12);

  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const calculatorRef = useRef(null);
  const resultRef = useRef(null);
  const glowRef = useRef(null);

  const rotateXTo = useRef(null);
  const rotateYTo = useRef(null);

  const selectedPreset = CATEGORY_PRESETS.find(
    (category) => category.id === selectedCatId
  );

  const grossMonthly = dailyPrice * rentalDays;
  const platformFee = Math.round(grossMonthly * 0.1);
  const netMonthly = grossMonthly - platformFee;
  const annualIncome = netMonthly * 12;

  const handleCategoryChange = (catId) => {
    setSelectedCatId(catId);

    const preset = CATEGORY_PRESETS.find(
      (category) => category.id === catId
    );

    if (preset) {
      setDailyPrice(preset.defaultPrice);
      setRentalDays(preset.avgDays);
    }
  };

  const handlePriceChange = (value) => {
    const parsedValue = Number(value);

    if (!Number.isFinite(parsedValue)) return;

    setDailyPrice(Math.min(5000, Math.max(50, parsedValue)));
  };

  const formatCurrency = (value) =>
    `₹${value.toLocaleString('en-IN')}`;

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (isReducedMotion) return;

      const intro = introRef.current;
      const calculator = calculatorRef.current;

      gsap.fromTo(
        intro.querySelectorAll('.owner-intro-item'),
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: intro,
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        calculator,
        {
          opacity: 0,
          y: 75,
          rotateX: 7,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: calculator,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        calculator.querySelectorAll('.calculator-animate'),
        {
          opacity: 0,
          y: 22,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: calculator,
            start: 'top 78%',
            once: true,
          },
        }
      );

      gsap.to(glowRef.current, {
        y: -35,
        x: 20,
        scale: 1.12,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      gsap.to('.owner-floating-dot', {
        y: -14,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
        ease: 'sine.inOut',
      });

      gsap.set(calculator, {
        transformPerspective: 1100,
        transformOrigin: 'center center',
      });

      rotateXTo.current = gsap.quickTo(calculator, 'rotationX', {
        duration: 0.65,
        ease: 'power3.out',
      });

      rotateYTo.current = gsap.quickTo(calculator, 'rotationY', {
        duration: 0.65,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      rotateXTo.current = null;
      rotateYTo.current = null;
    };
  }, []);

  // Animate earnings when values change
  useEffect(() => {
    if (!resultRef.current) return;

    gsap.fromTo(
      resultRef.current,
      { scale: 0.985 },
      {
        scale: 1,
        duration: 0.45,
        ease: 'power3.out',
      }
    );
  }, [netMonthly, annualIncome]);

  // Smooth 3D card movement
  const handleCardMouseMove = (event) => {
    if (!calculatorRef.current || !rotateXTo.current) return;

    const rect = calculatorRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    rotateYTo.current((x - 0.5) * 5);
    rotateXTo.current((0.5 - y) * 5);
  };

  const handleCardMouseLeave = () => {
    rotateXTo.current?.(0);
    rotateYTo.current?.(0);
  };

  return (
    <section
      id="calculator-section"
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-[#FAF8FF]"
    >
      {/* Background decorations */}
      <div
        ref={glowRef}
        className="absolute -top-32 -right-32 w-[550px] h-[550px] bg-[#C4B5FD]/30 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="owner-floating-dot absolute top-28 right-[16%] w-3 h-3 rounded-full bg-[#A78BFA]/60 blur-[1px] pointer-events-none" />

      <div className="owner-floating-dot absolute bottom-36 left-[8%] w-4 h-4 rounded-full bg-[#7C3AED]/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* LEFT CONTENT */}
          <div
            ref={introRef}
            className="lg:col-span-5 space-y-7"
          >
            <div className="owner-intro-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9D5FF] border border-[#C4B5FD] text-[#30105E] text-xs font-bold shadow-sm">
              <TrendingUp className="w-4 h-4 text-[#7C3AED]" />
              <span>Passive Income for Owners</span>
              <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            </div>

            <div className="owner-intro-item space-y-5">
              <h2 className="font-display font-black text-4xl sm:text-5xl xl:text-[3.6rem] text-[#30105E] tracking-tight leading-[1.08]">
                Your unused gear deserves to{' '}
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-[#7C3AED]">
                    earn.
                  </span>
                  <span className="absolute bottom-1 left-0 w-full h-3 bg-[#C4B5FD]/60 -rotate-2 rounded-full" />
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#30105E]/75 leading-relaxed font-medium">
                Your equipment doesn't have to sit unused. Put it to work,
                share it with people nearby, and create an additional source
                of income.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-5 pt-2">
              {BENEFITS.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="owner-intro-item group flex items-start gap-4"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-2xl bg-white border border-[#E9D5FF] shadow-sm flex items-center justify-center text-[#7C3AED] group-hover:bg-[#7C3AED] group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="pt-0.5">
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#30105E]">
                        {benefit.title}
                      </h4>

                      <p className="text-sm text-[#30105E]/65 mt-1 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="owner-intro-item pt-3">
              <button
                onClick={() => navigateTo('list-item')}
                className="group relative overflow-hidden px-7 py-4 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-lg shadow-[#7C3AED]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95 flex items-center gap-3"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                <span className="relative">
                  Start Earning — List Your Gear
                </span>

                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <p className="text-xs text-[#30105E]/50 mt-3 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Simple listing process. You're in control.
              </p>
            </div>
          </div>

          {/* RIGHT CALCULATOR */}
          <div className="lg:col-span-7">
            <div
              ref={calculatorRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative p-6 sm:p-8 lg:p-9 rounded-[32px] bg-white border border-[#E9D5FF] shadow-[0_25px_80px_-25px_rgba(48,16,94,0.22)] will-change-transform"
            >
              <div className="absolute top-0 left-10 right-10 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-[#7C3AED] to-transparent" />

              {/* Header */}
              <div className="calculator-animate flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E9D5FF]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#A78BFA] flex items-center justify-center text-white shadow-lg shadow-[#7C3AED]/20">
                    <Calculator className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="font-display font-black text-xl text-[#30105E]">
                      Earnings Calculator
                    </h3>

                    <p className="text-xs text-[#30105E]/55 mt-1">
                      Estimate your potential rental income
                    </p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 w-fit text-[11px] font-bold text-[#30105E] bg-[#E9D5FF] border border-[#C4B5FD] px-3 py-2 rounded-full">
                  <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />
                  Live Estimate
                </span>
              </div>

              {/* Calculator controls */}
              <div className="mt-7 space-y-7">

                {/* CATEGORY CARDS */}
                <div className="calculator-animate">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/65 mb-3">
                    Select your equipment category
                  </label>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {CATEGORY_PRESETS.map((preset) => {
                      const isActive = selectedCatId === preset.id;

                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => handleCategoryChange(preset.id)}
                          className={`relative z-0 min-h-[88px] p-3 rounded-2xl border text-left transform-gpu transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-1 hover:z-10 hover:shadow-xl active:scale-95 ${
                            isActive
                              ? 'bg-[#F1E9FF] border-[#7C3AED] shadow-md shadow-[#7C3AED]/10'
                              : 'bg-[#FAF8FF] border-[#E9D5FF] hover:border-[#7C3AED] hover:bg-white'
                          }`}
                        >
                          <span className="text-xl block mb-2 transition-transform duration-300 group-hover:scale-110">
                            {preset.icon}
                          </span>

                          <span
                            className={`block text-xs font-bold leading-tight ${
                              isActive
                                ? 'text-[#6D28D9]'
                                : 'text-[#30105E]/75'
                            }`}
                          >
                            {preset.id.charAt(0).toUpperCase() +
                              preset.id.slice(1)}
                          </span>

                          {isActive && (
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#7C3AED] shadow-[0_0_10px_rgba(124,58,237,0.6)]" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {selectedPreset && (
                    <p className="text-xs text-[#30105E]/50 mt-3">
                      Example equipment: {selectedPreset.itemExample}
                    </p>
                  )}
                </div>

                {/* DAILY RENTAL PRICE */}
                <div className="calculator-animate">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#30105E]/65">
                      Daily rental price
                    </label>

                    <span className="text-sm font-black text-[#7C3AED] bg-[#F1E9FF] px-3 py-1.5 rounded-xl">
                      {formatCurrency(dailyPrice)} / day
                    </span>
                  </div>

                  <input
                    type="range"
                    min={50}
                    max={5000}
                    step={50}
                    value={Math.min(dailyPrice, 5000)}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#7C3AED] bg-[#E9D5FF]"
                  />

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[11px] text-[#30105E]/45">
                      ₹50
                    </span>

                    <div className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] focus-within:border-[#7C3AED] focus-within:ring-2 focus-within:ring-[#7C3AED]/10 transition-all">
                      <IndianRupee className="w-3.5 h-3.5 text-[#30105E]/50" />

                      <input
                        type="number"
                        min={50}
                        max={5000}
                        value={dailyPrice}
                        onChange={(e) => handlePriceChange(e.target.value)}
                        className="w-20 bg-transparent text-sm font-bold text-[#30105E] focus:outline-none"
                      />
                    </div>

                    <span className="text-[11px] text-[#30105E]/45">
                      ₹5,000
                    </span>
                  </div>
                </div>

                {/* RENTAL DAYS */}
                <div className="calculator-animate">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#30105E]/65">
                      Rental days per month
                    </label>

                    <span className="text-sm font-black text-[#7C3AED] bg-[#F1E9FF] px-3 py-1.5 rounded-xl">
                      {rentalDays} days
                    </span>
                  </div>

                  <input
                    type="range"
                    min={1}
                    max={28}
                    step={1}
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer accent-[#7C3AED] bg-[#E9D5FF]"
                  />

                  <div className="flex justify-between text-[11px] text-[#30105E]/45 mt-2">
                    <span>1 day</span>
                    <span>14 days</span>
                    <span>28 days</span>
                  </div>
                </div>
              </div>

              {/* RESULTS */}
              <div
                ref={resultRef}
                className="mt-8 p-6 sm:p-7 rounded-[26px] bg-gradient-to-br from-[#30105E] via-[#241044] to-[#170A2D] text-white relative overflow-hidden border border-[#A78BFA]/30 shadow-xl shadow-[#30105E]/15"
              >
                <div className="absolute -top-20 -right-16 w-56 h-56 bg-[#7C3AED]/30 rounded-full blur-[55px] pointer-events-none" />

                <div className="absolute -bottom-24 -left-10 w-48 h-48 bg-[#A78BFA]/15 rounded-full blur-[55px] pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-5">
                    <Sparkles className="w-4 h-4 text-[#C4B5FD]" />

                    <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#E9D5FF]">
                      Your earning potential
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <span className="text-[10px] sm:text-xs font-semibold text-[#E9D5FF]/75 uppercase tracking-wider block">
                        Estimated monthly
                      </span>

                      <div className="font-display font-black text-3xl sm:text-4xl text-[#C4B5FD] mt-2 tracking-tight">
                        {formatCurrency(netMonthly)}
                      </div>

                      <span className="text-[11px] text-white/55 mt-1 block">
                        After platform fee
                      </span>
                    </div>

                    <div className="border-l border-white/15 pl-5">
                      <span className="text-[10px] sm:text-xs font-semibold text-[#E9D5FF]/75 uppercase tracking-wider block">
                        Annual potential
                      </span>

                      <div className="font-display font-black text-2xl sm:text-3xl text-white mt-2 tracking-tight">
                        {formatCurrency(annualIncome)}
                      </div>

                      <span className="text-[11px] text-white/55 mt-1 block">
                        If monthly usage stays similar
                      </span>
                    </div>
                  </div>

                  {/* Earnings breakdown */}
                  <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-white/55 block">
                        Gross rental revenue
                      </span>

                      <span className="text-sm font-bold text-white mt-1 block">
                        {formatCurrency(grossMonthly)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-white/55 block">
                        Estimated 10% fee
                      </span>

                      <span className="text-sm font-bold text-[#FCA5A5] mt-1 block">
                        -{formatCurrency(platformFee)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Clock3 className="w-3.5 h-3.5 text-[#C4B5FD]" />

                      <span>
                        {rentalDays} days × {formatCurrency(dailyPrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => navigateTo('list-item')}
                      className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#C4B5FD] hover:bg-white text-[#30105E] text-xs font-black transition-all duration-300 hover:-translate-y-0.5"
                    >
                      List Your Equipment

                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="calculator-animate flex items-start gap-2 mt-5 text-[11px] text-[#30105E]/50 leading-relaxed">
                <CircleHelp className="w-4 h-4 shrink-0 mt-0.5" />

                <p>
                  These figures are estimates, not guaranteed earnings.
                  Actual income depends on demand, availability, pricing,
                  rental duration, and applicable fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
