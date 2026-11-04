import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calculator, 
  IndianRupee, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  TrendingUp, 
  Calendar, 
  Percent,
  CheckCircle2
} from 'lucide-react';

const CATEGORY_PRESETS = [
  { id: 'cameras', label: 'Cinema & Mirrorless Cameras', defaultPrice: 950, avgDays: 12, itemExample: 'Sony A7 III / FX3' },
  { id: 'drones', label: 'Drones & Aerial Video', defaultPrice: 1200, avgDays: 10, itemExample: 'DJI Mini 3 / Mavic 3' },
  { id: 'tools', label: 'Power Tools & Equipment', defaultPrice: 350, avgDays: 14, itemExample: 'Bosch Hammer Drill / Circular Saw' },
  { id: 'camping', label: 'Camping & Outdoor Gear', defaultPrice: 400, avgDays: 8, itemExample: 'Coleman 4P Tent / Trekking Bags' },
  { id: 'bikes', label: 'Bicycles & Urban Mobility', defaultPrice: 450, avgDays: 15, itemExample: 'Trek Mountain Bike / E-Scooter' },
  { id: 'audio', label: 'Audio & Musical Instruments', defaultPrice: 350, avgDays: 10, itemExample: 'Yamaha Guitar / JBL PartyBox' },
];

export const OwnerEarningsCalculator = () => {
  const { navigateTo } = useApp();

  const [selectedCatId, setSelectedCatId] = useState('cameras');
  const [dailyPrice, setDailyPrice] = useState(950);
  const [rentalDays, setRentalDays] = useState(12);

  const handleCategoryChange = (catId) => {
    setSelectedCatId(catId);
    const preset = CATEGORY_PRESETS.find(c => c.id === catId);
    if (preset) {
      setDailyPrice(preset.defaultPrice);
      setRentalDays(preset.avgDays);
    }
  };

  // Calculations:
  // Owner keeps 90% (platform fee is 10% on lender side)
  const grossMonthly = dailyPrice * rentalDays;
  const netMonthly = Math.round(grossMonthly * 0.90);
  const annualIncome = netMonthly * 12;

  return (
    <section id="calculator-section" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-[#7C3AED]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9D5FF] border border-[#C4B5FD] text-[#30105E] text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-[#7C3AED]" />
              <span>Passive Income for Owners</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#30105E] tracking-tight leading-tight">
              Turn your idle gear into{' '}
              <span className="relative inline-block">
                <span className="bg-[#C4B5FD] text-[#30105E] px-3 py-0.5 rounded-2xl shadow-neu-pill">
                  monthly cash.
                </span>
              </span>
            </h2>

            <p className="text-base sm:text-lg text-[#30105E]/80 leading-relaxed font-medium">
              Why let your expensive equipment collect dust in closets? The average Bangalore household has over <strong className="text-[#30105E]">₹65,000</strong> in underutilized gear. Rent it out securely to verified neighbors.
            </p>

            {/* Benefit Bullets */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#7C3AED] text-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#30105E]">Zero Risk Escrow Deposits</h4>
                  <p className="text-xs text-[#30105E]/70 mt-0.5">Renters deposit security value before picking up your gear.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#7C3AED] text-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#30105E]">Instant Direct Bank / UPI Payouts</h4>
                  <p className="text-xs text-[#30105E]/70 mt-0.5">Earnings are credited directly to your bank account as soon as rental starts.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-full bg-[#7C3AED] text-white shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#30105E]">You Control Availability & Rules</h4>
                  <p className="text-xs text-[#30105E]/70 mt-0.5">Accept or decline requests, block dates, and set your own terms.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('list-item')}
                className="px-6 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm transition-all duration-200 shadow-md flex items-center gap-2 group active:scale-95"
              >
                <span>Start Earning — List Your Gear</span>
                <ArrowRight className="w-4 h-4 text-[#C4B5FD] group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive ROI Calculator Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-[32px] bg-white border border-[#E9D5FF] shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-6 border-b border-[#E9D5FF]/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#E9D5FF] flex items-center justify-center text-[#7C3AED]">
                    <Calculator className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#30105E]">Rental Income Calculator</h3>
                    <p className="text-xs text-[#30105E]/60">Calculate estimated earnings for your equipment</p>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-[11px] font-bold text-[#30105E] bg-[#E9D5FF] border border-[#C4B5FD] px-3 py-1 rounded-full">
                  Real Market Estimates
                </span>
              </div>

              {/* Form Controls */}
              <div className="mt-6 space-y-6">
                
                {/* 1. Category Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#30105E]/70 mb-2">
                    Item Category
                  </label>
                  <select
                    value={selectedCatId}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-sm font-semibold text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
                  >
                    {CATEGORY_PRESETS.map((preset) => (
                      <option key={preset.id} value={preset.id}>
                        {preset.label} (e.g. {preset.itemExample})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Daily Price Input */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#30105E]/70">
                      Daily Rental Rate (₹)
                    </label>
                    <span className="text-xs font-bold text-[#30105E]">
                      ₹{dailyPrice} / day
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={150}
                      max={5000}
                      step={50}
                      value={dailyPrice}
                      onChange={(e) => setDailyPrice(Number(e.target.value))}
                      className="w-full accent-[#7C3AED] h-2 bg-[#E9D5FF] rounded-lg cursor-pointer"
                    />
                    <div className="w-28 shrink-0 flex items-center px-3 py-2 bg-[#FAF8FF] rounded-xl border border-[#E9D5FF]">
                      <span className="text-xs text-[#30105E]/60 mr-1">₹</span>
                      <input
                        type="number"
                        value={dailyPrice}
                        onChange={(e) => setDailyPrice(Math.max(50, Number(e.target.value)))}
                        className="w-full bg-transparent font-bold text-sm text-[#30105E] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Days per Month Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#30105E]/70">
                      Estimated Days Rented Per Month
                    </label>
                    <span className="text-xs font-bold text-[#30105E] bg-[#E9D5FF] px-2.5 py-1 rounded-lg">
                      {rentalDays} days / month
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={28}
                    step={1}
                    value={rentalDays}
                    onChange={(e) => setRentalDays(Number(e.target.value))}
                    className="w-full accent-[#7C3AED] h-2 bg-[#E9D5FF] rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#30105E]/60 mt-1">
                    <span>1 day (occasional)</span>
                    <span>14 days (weekends)</span>
                    <span>28 days (heavy)</span>
                  </div>
                </div>

              </div>

              {/* Dynamic Calculation Results Banner */}
              <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-[#30105E] via-[#240c49] to-[#30105E] text-white relative overflow-hidden border border-[#E9D5FF]/30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#7C3AED]/20 rounded-full blur-2xl pointer-events-none"></div>

                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div>
                    <span className="text-xs font-semibold text-[#E9D5FF] uppercase tracking-wider block">
                      Estimated Monthly Income
                    </span>
                    <div className="font-display font-black text-3xl sm:text-4xl text-[#C4B5FD] mt-1">
                      ₹{netMonthly.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-white/70"> /mo</span>
                    </div>
                    <span className="text-[11px] text-white/70 mt-0.5 block">
                      After 10% platform fee
                    </span>
                  </div>

                  <div className="border-l border-white/20 pl-4 sm:pl-6">
                    <span className="text-xs font-semibold text-[#E9D5FF] uppercase tracking-wider block">
                      Annual Potential
                    </span>
                    <div className="font-display font-black text-2xl sm:text-3xl text-white mt-1">
                      ₹{annualIncome.toLocaleString('en-IN')}
                      <span className="text-xs font-normal text-white/70"> /yr</span>
                    </div>
                    <span className="text-[11px] text-[#C4B5FD] font-semibold mt-0.5 block">
                      Paid directly to your UPI
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                  <span>Based on {rentalDays} rental days @ ₹{dailyPrice}/day</span>
                  <button
                    onClick={() => navigateTo('list-item')}
                    className="font-bold text-[#C4B5FD] hover:underline flex items-center gap-1"
                  >
                    <span>List This Item</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
