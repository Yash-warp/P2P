import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, MapPin, Heart, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setSelectedCategory } = useApp();

  return (
    <footer className="bg-[#30105E] text-[#E9D5FF] border-t border-[#E9D5FF]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">

          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2.5 cursor-pointer group select-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#230b45] border border-[#E9D5FF]/20 flex items-center justify-center shadow-sm">
                <svg className="w-5 h-5 text-[#C4B5FD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="3" fill="#C4B5FD" />
                </svg>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-xl tracking-tight text-white">
                  Rentic<span className="text-[#C4B5FD]">.</span>
                </span>
                <span className="bg-[#C4B5FD] text-[#30105E] text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md">
                  India
                </span>
              </div>
            </div>

            <p className="text-sm text-[#E9D5FF]/80 max-w-sm leading-relaxed">
              The hyper-local peer-to-peer (P2P) rental marketplace. Borrow cameras, tools, camping gear, and bikes from verified neighbors in your neighborhood.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#E9D5FF]/80 font-medium">
              <Mail className="w-4 h-4 text-[#C4B5FD]" />
              <span>support@rentic.in</span>
              <span className="text-[#E9D5FF]/40">•</span>
              <Phone className="w-4 h-4 text-[#C4B5FD]" />
              <span>+91 80 4920 1800</span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E9D5FF]/80">
              <li>
                <button onClick={() => navigateTo('marketplace')} className="hover:text-white transition-colors">
                  Browse Gear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('list-item')} className="hover:text-white transition-colors">
                  List an Item
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Earnings Calculator
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('dashboard', { tab: 'rentals' })} className="hover:text-white transition-colors">
                  Manage Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Popular Categories */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E9D5FF]/80">
              <li>
                <button onClick={() => { setSelectedCategory('cameras'); navigateTo('marketplace'); }} className="hover:text-white transition-colors">
                  Cameras & Lenses
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('drones'); navigateTo('marketplace'); }} className="hover:text-white transition-colors">
                  Drones & Aerial Video
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('tools'); navigateTo('marketplace'); }} className="hover:text-white transition-colors">
                  Power Tools & Drills
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('camping'); navigateTo('marketplace'); }} className="hover:text-white transition-colors">
                  Camping & Tents
                </button>
              </li>
              <li>
                <button onClick={() => { setSelectedCategory('bikes'); navigateTo('marketplace'); }} className="hover:text-white transition-colors">
                  Bicycles & Mobility
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#E9D5FF]/80">
              <li>
                <button
                  onClick={() => {
                    navigateTo('home');
                    setTimeout(() => document.getElementById('trust-section')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  }}
                  className="hover:text-white transition-colors"
                >
                  Trust & Safety
                </button>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#escrow" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Escrow & Refund Rules
                </a>
              </li>
              <li>
                <a href="#community" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">
                  Community Guidelines
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Hyperlocal Cities Bar */}
        <div className="py-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#E9D5FF]/80">
          <div className="flex items-center gap-1.5 font-bold text-white">
            <MapPin className="w-3.5 h-3.5 text-[#C4B5FD]" />
            <span>Active Neighborhoods:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="hover:text-white cursor-pointer">Indiranagar (BLR)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Koramangala (BLR)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">HSR Layout (BLR)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Bandra (MUM)</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Hauz Khas (DEL)</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E9D5FF]/70">
          <div>
            © 2026 Rentic Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#E9D5FF] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#C4B5FD]" />
              100% Safe Peer-to-Peer Rental Network
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
