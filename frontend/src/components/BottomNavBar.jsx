import React from 'react';
import { useApp } from '../context/AppContext';
import { House, Search, Plus, MessageCircle, User } from 'lucide-react';

export const BottomNavBar = () => {
  const { activeView, navigateTo, conversations } = useApp();

  const unreadCount = conversations.reduce((acc, c) => acc + (c.unread ? 1 : 0), 0);

  const isHomeActive = activeView === 'feed' || activeView === 'home';
  const isSearchActive = activeView === 'marketplace' || activeView === 'product-detail';
  const isChatActive = activeView === 'messages';
  const isProfileActive = activeView === 'dashboard';
  const isListActive = activeView === 'list-item';

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-t border-[#DFC5FE] shadow-[0_-4px_25px_rgba(48,16,94,0.06)] animate-fade-scale">
      <div className="max-w-lg mx-auto flex items-center justify-around py-2 px-3 relative">
        
        {/* Tab 1: HOME */}
        <button
          onClick={() => navigateTo('feed')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative ${
            isHomeActive ? 'text-[#7C3AED]' : 'text-[#30105E]/60 hover:text-[#30105E]'
          }`}
          aria-label="Home Feed"
        >
          <House size={22} strokeWidth={isHomeActive ? 2.5 : 2} />
          <span className="text-[10px] font-display tracking-wider uppercase font-bold">
            Home
          </span>
          {isHomeActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 absolute bottom-0.5"></div>
          )}
        </button>

        {/* Tab 2: SEARCH */}
        <button
          onClick={() => navigateTo('marketplace')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative ${
            isSearchActive ? 'text-[#7C3AED]' : 'text-[#30105E]/60 hover:text-[#30105E]'
          }`}
          aria-label="Search Marketplace"
        >
          <Search size={22} strokeWidth={isSearchActive ? 2.5 : 2} />
          <span className="text-[10px] font-display tracking-wider uppercase font-bold">
            Search
          </span>
          {isSearchActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 absolute bottom-0.5"></div>
          )}
        </button>

        {/* Tab 3: Center Elevated Action Button (+) */}
        <button
          onClick={() => navigateTo('list-item')}
          className={`relative -mt-6 w-[58px] h-[58px] rounded-[1.25rem] shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 z-50 bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-[0_8px_25px_rgba(124,58,237,0.38)] ${
            isListActive ? 'ring-4 ring-[#C4B5FD]' : ''
          }`}
          title="List Your Equipment"
          aria-label="List New Item"
        >
          <Plus size={28} strokeWidth={2.5} className="transition-transform duration-300" />
        </button>

        {/* Tab 4: CHAT */}
        <button
          onClick={() => navigateTo('messages')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative ${
            isChatActive ? 'text-[#7C3AED]' : 'text-[#30105E]/60 hover:text-[#30105E]'
          }`}
          aria-label="Chat Messages"
        >
          <MessageCircle size={22} strokeWidth={isChatActive ? 2.5 : 2} />
          <span className="text-[10px] font-display tracking-wider uppercase font-bold">
            Chat
          </span>
          {isChatActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 absolute bottom-0.5"></div>
          )}
          {unreadCount > 0 && (
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute top-1 right-3 border-2 border-white"></span>
          )}
        </button>

        {/* Tab 5: PROFILE */}
        <button
          onClick={() => navigateTo('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl transition-all duration-200 relative ${
            isProfileActive ? 'text-[#7C3AED]' : 'text-[#30105E]/60 hover:text-[#30105E]'
          }`}
          aria-label="User Profile"
        >
          <User size={22} strokeWidth={isProfileActive ? 2.5 : 2} />
          <span className="text-[10px] font-display tracking-wider uppercase font-bold">
            Profile
          </span>
          {isProfileActive && (
            <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] mt-0.5 absolute bottom-0.5"></div>
          )}
        </button>

      </div>
    </nav>
  );
};

