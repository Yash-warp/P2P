import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Plus, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const FinalCTA = () => {
  const { navigateTo } = useApp();

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Glow */}
        <div className="w-80 h-80 bg-[#7C3AED]/15 rounded-full blur-3xl mx-auto -mb-40 pointer-events-none"></div>

        <div className="p-8 sm:p-14 rounded-[36px] bg-white border border-[#E9D5FF] shadow-2xl relative z-10">
          
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E9D5FF] border border-[#C4B5FD] text-xs font-bold text-[#30105E] mb-6">
            <Sparkles className="w-4 h-4 text-[#7C3AED]" />
            <span>Join India's Fastest Growing Sharing Economy</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#30105E] tracking-tight leading-[1.12]">
            Stop borrowing from stores.{' '}
            <span className="block mt-2">
              Start borrowing from{' '}
              <span className="relative inline-block">
                <span className="bg-[#C4B5FD] text-[#30105E] px-4 py-1 rounded-3xl shadow-neu-pill">
                  neighbors.
                </span>
              </span>
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-xl text-[#30105E]/75 font-medium max-w-2xl mx-auto leading-relaxed">
            Borrow cameras, tools, camping equipment, and drones when you need them. Or turn your unused gear into regular monthly income.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('marketplace')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold text-sm tracking-tight shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Start Renting — It's Free</span>
              <ArrowRight className="w-4 h-4 text-[#C4B5FD] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('list-item')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#E9D5FF] hover:bg-[#DDD6FE] text-[#30105E] font-bold text-sm tracking-tight shadow-md hover:shadow-lg border border-[#C4B5FD] transition-all duration-200 flex items-center justify-center gap-2 group active:scale-95"
            >
              <Plus className="w-4 h-4 stroke-[3] text-[#7C3AED]" />
              <span>List Your Gear & Earn</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-10 pt-8 border-t border-[#E9D5FF]/70 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-[#30105E]/70">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>DigiLocker ID Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>RBI Regulated Escrow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>Encrypted QR Handover</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#7C3AED]" />
              <span>24/7 Community Support</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
