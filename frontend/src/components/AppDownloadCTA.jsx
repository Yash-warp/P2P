import React, { useRef, useEffect, useState } from 'react';
import { Smartphone, QrCode, Bell, Shield, ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export const AppDownloadCTA = () => {
  const containerCardRef = useRef(null);
  const phoneCardRef = useRef(null);
  const [cursorGlow, setCursorGlow] = useState({ x: 50, y: 50, opacity: 0 });

  // GSAP quickTo references for fluid 60fps / 120fps physics
  const rotateXCard = useRef(null);
  const rotateYCard = useRef(null);
  const rotateXPhone = useRef(null);
  const rotateYPhone = useRef(null);
  const xPhone = useRef(null);
  const yPhone = useRef(null);

  useEffect(() => {
    const container = containerCardRef.current;
    const phone = phoneCardRef.current;
    if (!container || !phone) return;

    gsap.set(container, {
      transformPerspective: 1200,
      transformStyle: 'preserve-3d',
    });

    gsap.set(phone, {
      transformPerspective: 1000,
      transformStyle: 'preserve-3d',
    });

    rotateXCard.current = gsap.quickTo(container, 'rotationX', { duration: 0.65, ease: 'power2.out' });
    rotateYCard.current = gsap.quickTo(container, 'rotationY', { duration: 0.65, ease: 'power2.out' });

    rotateXPhone.current = gsap.quickTo(phone, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    rotateYPhone.current = gsap.quickTo(phone, 'rotationY', { duration: 0.5, ease: 'power3.out' });
    xPhone.current = gsap.quickTo(phone, 'x', { duration: 0.5, ease: 'power3.out' });
    yPhone.current = gsap.quickTo(phone, 'y', { duration: 0.5, ease: 'power3.out' });

    return () => {
      rotateXCard.current = null;
      rotateYCard.current = null;
      rotateXPhone.current = null;
      rotateYPhone.current = null;
      xPhone.current = null;
      yPhone.current = null;
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerCardRef.current) return;
    const rect = containerCardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Update cursor spotlight glow
    setCursorGlow({
      x: Number((x * 100).toFixed(1)),
      y: Number((y * 100).toFixed(1)),
      opacity: 1
    });

    // 3D Tilt calculation
    rotateXCard.current?.((0.5 - y) * 4.5);
    rotateYCard.current?.((x - 0.5) * 5.5);

    rotateXPhone.current?.((0.5 - y) * 16);
    rotateYPhone.current?.((x - 0.5) * 20);
    xPhone.current?.((x - 0.5) * 18);
    yPhone.current?.((y - 0.5) * 12);
  };

  const handleMouseLeave = () => {
    setCursorGlow((prev) => ({ ...prev, opacity: 0 }));

    rotateXCard.current?.(0);
    rotateYCard.current?.(0);
    rotateXPhone.current?.(0);
    rotateYPhone.current?.(0);
    xPhone.current?.(0);
    yPhone.current?.(0);
  };

  return (
    <section className="pt-8 pb-4 md:pt-10 md:pb-6 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div
          ref={containerCardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="rounded-[36px] bg-gradient-to-br from-[#30105E] via-[#230b45] to-[#30105E] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-[0_30px_90px_rgba(48,16,94,0.4)] border border-[#DFC5FE]/35 will-change-transform transition-shadow duration-500"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle Glow Background */}
          <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#7C3AED]/25 rounded-full blur-3xl pointer-events-none"></div>

          {/* Dynamic Interactive Cursor Spotlight */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[36px]"
            style={{
              opacity: cursorGlow.opacity,
              background: `radial-gradient(650px circle at ${cursorGlow.x}% ${cursorGlow.y}%, rgba(223, 197, 254, 0.16), transparent 65%)`
            }}
          />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10" style={{ transform: 'translateZ(10px)' }}>
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#C4B5FD] text-xs font-bold border border-white/15">
                <Smartphone className="w-3.5 h-3.5 text-[#DFC5FE]" />
                <span>Lendit Mobile Experience</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight">
                Everything you need,{' '}
                <span className="text-[#DFC5FE]">right in your pocket.</span>
              </h2>

              <p className="text-base sm:text-lg text-[#E9D5FF] max-w-xl leading-relaxed font-medium">
                Browse nearby gear on the go, chat with verified neighbors, scan QR codes for quick handovers, and track your rental earnings in real-time.
              </p>

              {/* App Features List */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#DFC5FE]">
                    <QrCode className="w-4 h-4" />
                  </div>
                  <span>1-Tap QR Handover Scanner</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#DFC5FE]">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span>Instant Booking Push Alerts</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#DFC5FE]">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span>DigiLocker ID In-App Verification</span>
                </div>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#DFC5FE]">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span>PWA & Native App Available</span>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup with High-Definition 3D Tilt */}
            <div className="lg:col-span-5 flex justify-center perspective-[1200px]">
              <div
                ref={phoneCardRef}
                className="relative w-64 sm:w-72 rounded-[42px] border-[8px] border-[#220a44] bg-[#1a0833] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.65)] will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Dynamic Screen Glare Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-[34px] opacity-35 mix-blend-overlay transition-opacity duration-300 z-30"
                  style={{
                    background: `linear-gradient(${115 + (cursorGlow.x - 50) * 0.9}deg, rgba(255,255,255,0.6) 0%, transparent 65%)`
                  }}
                />

                {/* Screen */}
                <div
                  className="rounded-[30px] bg-[#FAF8FF] p-4 text-[#30105E] overflow-hidden shadow-inner relative z-10"
                  style={{ transform: 'translateZ(15px)', transformStyle: 'preserve-3d' }}
                >
                  {/* Phone Header */}
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#30105E] pb-3 border-b border-[#DFC5FE]/80">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse"></span>
                      <span>Indiranagar</span>
                    </span>
                    <span>9:41 AM</span>
                  </div>

                  {/* App Screen Card with Parallax Depth */}
                  <div
                    className="mt-3 p-3 rounded-2xl bg-white shadow-md border border-[#DFC5FE] transition-transform duration-300 hover:scale-105"
                    style={{ transform: 'translateZ(26px)' }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-[#30105E] bg-[#DFC5FE] px-2 py-0.5 rounded-md">
                        Handover Active
                      </span>
                      <span className="text-[10px] text-[#7C3AED] font-bold font-mono">RENT-7829</span>
                    </div>

                    <div className="mt-2.5 flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=120&q=80"
                        alt="Camera"
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#DFC5FE]"
                      />
                      <div>
                        <div className="font-bold text-xs text-[#30105E]">Sony Alpha A7 III</div>
                        <div className="text-[10px] text-[#30105E]/70">Rahul Sharma • 1.2 km away</div>
                      </div>
                    </div>

                    <div className="mt-3 p-2 rounded-xl bg-[#FAF8FF] border border-[#DFC5FE]/80 flex items-center justify-between">
                      <div className="text-[10px] text-[#30105E]/70 font-medium">QR Escrow Code:</div>
                      <span className="font-mono font-bold text-xs text-[#7C3AED]">VERIFIED ✓</span>
                    </div>
                  </div>

                  {/* Notification Pill in Phone with Elevated Parallax */}
                  <div
                    className="mt-3 p-2.5 rounded-xl bg-[#30105E] text-white flex items-center gap-2 text-[10px] border border-[#DFC5FE]/40 shadow-lg"
                    style={{ transform: 'translateZ(38px)' }}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#7C3AED] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      ₹
                    </div>
                    <div>
                      <div className="font-bold">₹1,700 Deposited in UPI</div>
                      <div className="text-[#DFC5FE]">Handover confirmed by Rahul</div>
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
