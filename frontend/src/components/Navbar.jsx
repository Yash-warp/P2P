import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { 
  ArrowUpRight, 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  Compass, 
  MessageSquare, 
  Heart, 
  Plus 
} from 'lucide-react';

export const Navbar = () => {
  const { 
    activeView, 
    navigateTo, 
    currentUser, 
    isLoggedIn, 
    logout, 
    setIsAuthModalOpen, 
    setAuthMode,
    wishlist, 
    conversations,
    selectedLandingRole,
    setSelectedLandingRole,
    selectLandingRole
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unread ? 1 : 0), 0);

  return (
    <>
      {/* Floating Slim & Rounded Pill Navbar */}
      <nav className="fixed top-0 inset-x-0 z-[100] transition-all duration-300 py-3.5 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative flex items-center justify-between px-4 sm:px-6 h-[54px] rounded-full transition-all duration-300 bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(48,16,94,0.07)]">
            
            {/* Brand Logo - Left */}
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                if (isLoggedIn) {
                  navigateTo('feed');
                } else {
                  setSelectedLandingRole(null);
                  navigateTo('home');
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group cursor-pointer select-none shrink-0"
            >
              <BrandLogo size={32} />
              <span className="text-lg sm:text-xl font-display font-black text-[#30105E] tracking-tight">
                lendit
              </span>
            </a>

            {/* Nav Links - Exact Middle Alignment */}
            <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8">
              <button 
                type="button"
                onClick={() => {
                  setSelectedLandingRole(null);
                  navigateTo('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-sm transition-colors whitespace-nowrap cursor-pointer ${
                  activeView === 'home' && selectedLandingRole === null
                    ? 'font-bold text-[#7C3AED]' 
                    : 'font-semibold text-[#30105E]/80 hover:text-[#7C3AED]'
                }`}
              >
                Home
              </button>

              <button 
                type="button"
                onClick={() => {
                  setSelectedLandingRole('borrower');
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-sm transition-colors whitespace-nowrap cursor-pointer ${
                  activeView === 'home' && selectedLandingRole === 'borrower'
                    ? 'font-bold text-[#7C3AED]' 
                    : 'font-semibold text-[#30105E]/80 hover:text-[#7C3AED]'
                }`}
              >
                Overview
              </button>
            </div>

            {/* Actions - Right */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              {isLoggedIn ? (
                <div className="relative flex items-center gap-2">
                  <button
                    onClick={() => navigateTo('dashboard', { tab: 'wishlist' })}
                    className="p-1.5 rounded-full text-[#30105E]/80 hover:text-[#30105E] hover:bg-[#E9D5FF]/50 transition-colors relative"
                    title="Wishlist"
                  >
                    <Heart className="w-4 h-4" />
                    {wishlist.length > 0 && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#7C3AED]"></span>
                    )}
                  </button>

                  <button
                    onClick={() => navigateTo('messages')}
                    className="p-1.5 rounded-full text-[#30105E]/80 hover:text-[#30105E] hover:bg-[#E9D5FF]/50 transition-colors relative"
                    title="Messages"
                  >
                    <MessageSquare className="w-4 h-4" />
                    {unreadMessagesCount > 0 && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-[#7C3AED] animate-pulse"></span>
                    )}
                  </button>

                  <div className="relative">
                    <button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-[#30105E] bg-white/50 hover:bg-white/80 border border-white/60 shadow-xs active:scale-95 transition-all"
                    >
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name} 
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-[#C4B5FD]"
                      />
                      <span className="max-w-[70px] truncate">{currentUser.name.split(' ')[0]}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#7C3AED]" />
                    </button>

                    {profileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#E9D5FF] p-2 z-50 animate-in fade-in slide-in-from-top-2">
                        <div className="px-3 py-2 border-b border-[#E9D5FF]/70 mb-1">
                          <p className="text-xs font-bold text-[#30105E]">{currentUser.name}</p>
                          <p className="text-[11px] text-[#30105E]/70 truncate">{currentUser.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('feed');
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#FAF8FF] text-[#7C3AED] font-bold flex items-center gap-1.5"
                        >
                          <Compass className="w-3.5 h-3.5" /> Discover Feed
                        </button>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'overview' });
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#FAF8FF] text-[#30105E] font-medium"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'rentals' });
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#FAF8FF] text-[#30105E] font-medium"
                        >
                          My Rentals
                        </button>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('dashboard', { tab: 'listings' });
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#FAF8FF] text-[#30105E] font-medium"
                        >
                          My Listings
                        </button>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            navigateTo('list-item');
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-[#FAF8FF] text-[#7C3AED] font-bold flex items-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" /> List New Gear
                        </button>
                        <div className="border-t border-[#E9D5FF]/70 my-1"></div>
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            logout();
                          }}
                          className="w-full text-left px-3 py-2 text-xs rounded-xl hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-1.5"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="px-4 py-1.5 rounded-full text-xs font-bold text-[#30105E] bg-white/50 hover:bg-white/80 border border-white/60 shadow-xs hover:border-white/90 active:scale-95 transition-all"
                >
                  Sign In
                </button>
              )}

              <button 
                onClick={() => navigateTo('marketplace')}
                className="group flex items-center gap-1.5 bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-4 py-1.5 rounded-full font-display font-bold text-xs shadow-[0_3px_12px_rgba(124,58,237,0.35)] hover:shadow-[0_5px_16px_rgba(124,58,237,0.45)] active:scale-[0.98] transition-all"
              >
                <span>Start Renting</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/50 text-[#30105E] border border-white/60 shadow-xs active:scale-95 transition-all"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[99] md:hidden bg-[#30105E]/40 backdrop-blur-sm animate-in fade-in">
          <div className="absolute top-20 inset-x-4 max-w-md mx-auto bg-[#FAF8FF] rounded-[24px] p-6 shadow-2xl border border-[#E9D5FF] flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9D5FF]">
              <div className="flex items-center gap-2">
                <BrandLogo size={26} />
                <span className="font-display font-black text-lg tracking-tight text-[#30105E]">lendit</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-white text-[#30105E]/70 hover:text-[#30105E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSelectedLandingRole(null);
                  navigateTo('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl hover:bg-[#E9D5FF]/40 text-sm transition-colors cursor-pointer ${
                  activeView === 'home' && selectedLandingRole === null
                    ? 'font-bold text-[#7C3AED] bg-[#E9D5FF]/30' 
                    : 'font-semibold text-[#30105E]'
                }`}
              >
                Home
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSelectedLandingRole('borrower');
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl hover:bg-[#E9D5FF]/40 text-sm transition-colors cursor-pointer ${
                  activeView === 'home' && selectedLandingRole === 'borrower'
                    ? 'font-bold text-[#7C3AED] bg-[#E9D5FF]/30' 
                    : 'font-semibold text-[#30105E]'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('marketplace');
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-[#E9D5FF]/40 text-sm font-semibold text-[#30105E] flex items-center justify-between"
              >
                <span>Browse Marketplace</span>
                <Compass className="w-4 h-4 text-[#7C3AED]" />
              </button>
            </div>

            <div className="pt-3 border-t border-[#E9D5FF] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo('marketplace');
                }}
                className="w-full py-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-display font-bold text-sm shadow-[0_4px_14px_rgba(124,58,237,0.35)] flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <span>Start Renting</span>
                <ArrowUpRight className="w-4 h-4 text-white" />
              </button>

              {isLoggedIn ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigateTo('dashboard', { tab: 'overview' });
                    }}
                    className="flex-1 py-2 rounded-full bg-white text-[#30105E] font-bold text-xs border border-[#E9D5FF]"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="px-4 py-2 rounded-full bg-rose-50 text-rose-600 font-bold text-xs"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode('login');
                    setIsAuthModalOpen(true);
                  }}
                  className="w-full py-2 rounded-full bg-white text-[#30105E] font-bold text-sm border border-[#E9D5FF] shadow-neu-pill hover:shadow-neu-pressed transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
