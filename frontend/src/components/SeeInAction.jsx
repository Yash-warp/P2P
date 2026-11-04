import React, { useState } from 'react';
import { Play, Sparkles, CheckCircle2, Shield, QrCode, CreditCard } from 'lucide-react';

export const SeeInAction = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Section Pill and Header */}
        <div className="mb-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E9D5FF] text-xs font-bold text-[#30105E] shadow-neu-pill">
          <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
          <span>Interactive Tour</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl text-[#30105E] tracking-tight">
          See Rentic in{' '}
          <span className="relative inline-block">
            <span className="bg-[#C4B5FD] text-[#30105E] px-3.5 py-0.5 sm:py-1 rounded-2xl shadow-neu-pill font-display font-bold text-[85%] md:text-[80%] inline-block">
              Action
            </span>
          </span>
        </h2>

        <p className="mt-4 text-[#30105E]/80 font-body max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-medium">
          Watch this quick guide to learn how easy it is to rent and earn with Rentic in your neighborhood.
        </p>

        {/* Video / Interactive Player Container matching exact reference styling */}
        <div className="mt-10 relative rounded-[2.5rem] overflow-hidden border border-[#E9D5FF] shadow-neu-flat bg-[#FAF8FF] p-3 aspect-video w-full max-w-4xl mx-auto">
          <div className="w-full h-full rounded-[2rem] overflow-hidden shadow-neu-pressed relative bg-[#30105E] flex items-center justify-center group">
            {isPlaying ? (
              <iframe
                className="w-full h-full absolute inset-0 border-0"
                src="https://www.youtube.com/embed/7oNQlQTxBGQ?autoplay=1&rel=0"
                title="Rentic Explainer Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <>
                {/* Poster Backdrop */}
                <img
                  src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80"
                  alt="Rentic Video Preview"
                  className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Overlaid UI Highlights */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#30105E] via-[#30105E]/50 to-transparent flex flex-col justify-between p-6 sm:p-10 text-left">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#7C3AED] text-white text-xs font-black px-2.5 py-1 rounded-lg">
                      1:45 MIN OVERVIEW
                    </span>
                    <span className="text-white/90 text-xs font-medium bg-white/15 backdrop-blur-md px-3 py-1 rounded-lg border border-white/20">
                      How P2P Rental Works in India
                    </span>
                  </div>

                  {/* Center Play Button */}
                  <div className="self-center my-auto">
                    <button
                      onClick={() => setIsPlaying(true)}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white flex items-center justify-center shadow-soft-glow group-hover:scale-110 transition-all duration-300 pl-1 cursor-pointer"
                      aria-label="Play Video"
                    >
                      <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white text-white" />
                    </button>
                  </div>

                  {/* 3 Step Pillars Bottom */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-white/15 text-white">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-[#C4B5FD] shrink-0 hidden sm:block" />
                      <div className="text-[11px] sm:text-xs">
                        <span className="font-bold block text-white">1. Verified IDs</span>
                        <span className="text-white/70 hidden sm:inline">DigiLocker Check</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-[#C4B5FD] shrink-0 hidden sm:block" />
                      <div className="text-[11px] sm:text-xs">
                        <span className="font-bold block text-white">2. QR Handover</span>
                        <span className="text-white/70 hidden sm:inline">Proof of Condition</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#C4B5FD] shrink-0 hidden sm:block" />
                      <div className="text-[11px] sm:text-xs">
                        <span className="font-bold block text-white">3. Safe Escrow</span>
                        <span className="text-white/70 hidden sm:inline">Zero Risk Return</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
