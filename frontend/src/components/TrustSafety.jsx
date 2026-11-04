import React from 'react';
import { TRUST_FEATURES } from '../data/mockData';
import { ShieldCheck, Lock, QrCode, MapPin, CheckCircle, ShieldAlert } from 'lucide-react';

export const TrustSafety = () => {
  const getIcon = (name) => {
    switch (name) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#7C3AED]" />;
      case 'Lock': return <Lock className="w-6 h-6 text-[#7C3AED]" />;
      case 'QrCode': return <QrCode className="w-6 h-6 text-[#7C3AED]" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-[#7C3AED]" />;
      default: return <ShieldCheck className="w-6 h-6 text-[#7C3AED]" />;
    }
  };

  return (
    <section id="trust-section" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E9D5FF] border border-[#C4B5FD] text-xs font-bold text-[#30105E] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7C3AED]" />
            <span>Bank-Grade Escrow & ID Verification</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-5xl text-[#30105E] tracking-tight">
            Built on trust,{' '}
            <span className="relative inline-block">
              <span className="bg-[#C4B5FD] text-[#30105E] px-3 py-0.5 rounded-2xl shadow-neu-pill">
                verified in person.
              </span>
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#30105E]/75 font-medium">
            Rentic is engineered with multiple safety layers so you can rent out or borrow expensive equipment with complete peace of mind.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-[28px] bg-white border border-[#E9D5FF] shadow-neu-pill hover:shadow-xl hover:border-[#7C3AED]/70 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] flex items-center justify-center">
                    {getIcon(feature.icon)}
                  </div>
                  <span className="text-[10px] font-bold text-[#30105E] bg-[#E9D5FF] px-2.5 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-[#30105E] mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#30105E]/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Verified check indicator */}
              <div className="mt-6 pt-4 border-t border-[#E9D5FF]/60 flex items-center gap-1.5 text-xs font-bold text-[#30105E]">
                <CheckCircle className="w-4 h-4 text-[#7C3AED]" />
                <span>Rentic Safety Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Security Banner Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-[32px] bg-white border border-[#E9D5FF] shadow-neu-pill flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#7C3AED] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-display font-bold text-base sm:text-lg text-[#30105E]">
                ₹50,000 Equipment Protection Warranty
              </h4>
              <p className="text-xs sm:text-sm text-[#30105E]/70 mt-0.5">
                Every verified rental transaction includes secondary damage reimbursement coverage backed by our community guarantee pool.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <span className="text-xs font-bold text-[#30105E]/70">Regulated Escrow Partner:</span>
            <span className="px-3 py-1 rounded-xl bg-[#E9D5FF] font-mono text-xs font-bold text-[#30105E]">
              RBI Escrow Compliant
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
