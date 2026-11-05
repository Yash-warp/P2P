import React, { useState } from 'react';
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

export const HowItWorks = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('renters'); // 'renters' | 'owners'

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

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-[#E9D5FF]/20 border-y border-[#E9D5FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E9D5FF] shadow-neu-pill text-xs font-bold text-[#30105E] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Simple, Hyperlocal & Protected</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#30105E] tracking-tight">
            How Lendit Works
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#30105E]/75 font-medium">
            A secure, peer-to-peer local matching workflow built to protect both Renters and Lenders.
          </p>

          {/* User Journey Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-[#E9D5FF] shadow-neu-pill">
            <button
              onClick={() => setActiveTab('renters')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'renters'
                  ? 'bg-[#30105E] text-white shadow-sm'
                  : 'text-[#30105E]/70 hover:text-[#30105E]'
              }`}
            >
              For Renters (Borrow Gear)
            </button>
            <button
              onClick={() => setActiveTab('owners')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'owners'
                  ? 'bg-[#7C3AED] text-white shadow-sm'
                  : 'text-[#30105E]/70 hover:text-[#30105E]'
              }`}
            >
              For Owners (Earn Money)
            </button>
          </div>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentSteps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-xl hover:border-[#7C3AED]/70 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-[#7C3AED]">
                      {item.step}
                    </span>
                    <span className="text-[10px] font-bold text-[#30105E] bg-[#E9D5FF] px-2.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8FF] group-hover:bg-[#E9D5FF] text-[#7C3AED] flex items-center justify-center transition-colors duration-200 mb-4 border border-[#E9D5FF]">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display font-bold text-lg text-[#30105E] group-hover:text-[#7C3AED] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-[#30105E]/70 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Footer Highlight */}
                <div className="mt-6 pt-4 border-t border-[#E9D5FF]/60 flex items-center gap-1.5 text-[11px] font-bold text-[#7C3AED]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]"></div>
                  <span>{item.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigateTo(activeTab === 'renters' ? 'marketplace' : 'list-item')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm shadow-md transition-all active:scale-95 group"
          >
            <span>{activeTab === 'renters' ? 'Browse Available Gear Now' : 'List an Item & Start Earning'}</span>
            <ArrowRight className="w-4 h-4 text-[#C4B5FD] group-hover:translate-x-1 transition-all" />
          </button>
        </div>

      </div>
    </section>
  );
};
