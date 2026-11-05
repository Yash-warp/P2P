import React from 'react';
import { Smartphone, QrCode, Bell, Shield, ArrowRight } from 'lucide-react';

export const AppDownloadCTA = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="rounded-[36px] bg-gradient-to-br from-[#30105E] via-[#230b45] to-[#30105E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-[#E9D5FF]/30">
          
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#C4B5FD] text-xs font-bold border border-white/15">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Lendit Mobile Experience</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Everything you need,{' '}
                <span className="text-[#C4B5FD]">right in your pocket.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#E9D5FF] max-w-xl leading-relaxed">
                Browse nearby gear on the go, chat with verified neighbors, scan QR codes for quick handovers, and track your rental earnings in real-time.
              </p>

              {/* App Features List */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C4B5FD]">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span>1-Tap QR Handover Scanner</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C4B5FD]">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span>Instant Booking Push Alerts</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C4B5FD]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>DigiLocker ID In-App Verification</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C4B5FD]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span>PWA & Native App Available</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white text-[#30105E] hover:bg-[#FAF8FF] transition-all shadow-md group"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a1.94 1.94 0 0 1-.22-.383C3.136 21.218 3 20.447 3 19.5V4.5c0-.947.136-1.718.39-2.303.064-.145.14-.275.219-.383zm11.233 11.233L4.994 22.895c.298.07.643.105 1.006.105.85 0 1.705-.226 2.45-.668l9.53-5.498-3.138-3.787zm0-2.094l3.138-3.787-9.53-5.498c-.745-.442-1.6-.668-2.45-.668-.363 0-.708.035-1.006.105l9.848 9.848zM19.38 10.9l-2.49 1.437 2.49 1.437c.725.419 1.12 1.065 1.12 1.826 0 .76-.395 1.407-1.12 1.825l-1.077.622-3.18-3.884 3.18-3.884 1.077.622c.725.418 1.12 1.065 1.12 1.825 0 .761-.395 1.407-1.12 1.826z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] font-semibold text-[#7C3AED] uppercase tracking-wider">GET IT ON</div>
                    <div className="text-xs font-bold text-[#30105E]">Google Play</div>
                  </div>
                </a>

                <a
                  href="https://apple.com/app-store"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all shadow-md group"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.65-.8 1.09-1.92.97-3.04-.95.04-2.1.63-2.77 1.42-.58.68-1.09 1.79-.95 2.87 1.06.08 2.1-.45 2.75-1.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-[10px] font-semibold text-[#E9D5FF] uppercase tracking-wider">Download on the</div>
                    <div className="text-xs font-bold text-white">App Store</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-72 rounded-[40px] border-[8px] border-[#220a44] bg-[#1a0833] p-3 shadow-2xl">
                {/* Screen */}
                <div className="rounded-[30px] bg-[#FAF8FF] p-4 text-[#30105E] overflow-hidden shadow-inner">
                  {/* Phone Header */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#30105E] pb-3 border-b border-[#E9D5FF]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[#7C3AED]"></span> Indiranagar
                    </span>
                    <span>9:41 AM</span>
                  </div>

                  {/* App Screen Card */}
                  <div className="mt-3 p-3 rounded-2xl bg-white shadow-sm border border-[#E9D5FF]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#30105E] bg-[#E9D5FF] px-2 py-0.5 rounded-md">
                        Handover Active
                      </span>
                      <span className="text-[10px] text-[#7C3AED] font-bold">RENT-7829</span>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=120&q=80"
                        alt="Camera"
                        className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#C4B5FD]"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#30105E]">Sony Alpha A7 III</div>
                        <div className="text-[10px] text-[#30105E]/70">Rahul Sharma • 1.2 km away</div>
                      </div>
                    </div>

                    <div className="mt-3 p-2 rounded-xl bg-[#FAF8FF] border border-[#E9D5FF] flex items-center justify-between">
                      <div className="text-[10px] text-[#30105E]/70 font-medium">QR Escrow Code:</div>
                      <span className="font-mono font-bold text-xs text-[#7C3AED]">VERIFIED ✓</span>
                    </div>
                  </div>

                  {/* Notification Pill in Phone */}
                  <div className="mt-3 p-2.5 rounded-xl bg-[#30105E] text-white flex items-center gap-2 text-[10px] border border-[#E9D5FF]/30">
                    <div className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold">
                      ₹
                    </div>
                    <div>
                      <div className="font-bold">₹1,700 Deposited in UPI</div>
                      <div className="text-[#C4B5FD]">Handover confirmed by Rahul</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
