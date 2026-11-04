import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, ShieldCheck, Quote, Sparkles } from 'lucide-react';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-[#E9D5FF]/20 border-t border-[#E9D5FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#E9D5FF] text-xs font-bold text-[#30105E] shadow-neu-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Community Stories</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#30105E] tracking-tight">
            Trusted by locals
          </h2>

          <p className="mt-3 text-base sm:text-lg text-[#30105E]/75 font-medium">
            Hear from genuine lenders and borrowers in Bangalore neighborhoods sharing gear and saving money every day.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-[30px] bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-xl hover:border-[#7C3AED]/60 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Top Row: Stars & Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-bold text-[#30105E] bg-[#E9D5FF] border border-[#C4B5FD] px-2.5 py-0.5 rounded-full">
                    {t.earnings}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm sm:text-base text-[#30105E]/85 leading-relaxed italic mb-6">
                  "{t.quote}"
                </p>
              </div>

              {/* User Profile Footer */}
              <div className="pt-4 border-t border-[#E9D5FF]/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-[#C4B5FD]"
                  />
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#30105E] flex items-center gap-1">
                      {t.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />
                    </h4>
                    <p className="text-xs text-[#30105E]/70">{t.role}</p>
                    <p className="text-[11px] text-[#30105E]/50">{t.location}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#30105E]/50 block">Gear</span>
                  <span className="text-xs font-semibold text-[#30105E]">{t.item}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
