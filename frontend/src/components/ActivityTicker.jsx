import React from 'react';
import { LIVE_ACTIVITY_STREAM } from '../data/mockData';
import { Zap, Camera, IndianRupee, PlusCircle, Wrench, Music, Flame } from 'lucide-react';

export const ActivityTicker = () => {
  // Duplicate array for seamless infinite marquee loop
  const tickerItems = [...LIVE_ACTIVITY_STREAM, ...LIVE_ACTIVITY_STREAM];

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Camera': return <Camera className="w-3.5 h-3.5 text-[#7C3AED]" />;
      case 'IndianRupee': return <IndianRupee className="w-3.5 h-3.5 text-[#7C3AED]" />;
      case 'PlusCircle': return <PlusCircle className="w-3.5 h-3.5 text-[#7C3AED]" />;
      case 'Wrench': return <Wrench className="w-3.5 h-3.5 text-[#7C3AED]" />;
      case 'Music': return <Music className="w-3.5 h-3.5 text-[#7C3AED]" />;
      default: return <Zap className="w-3.5 h-3.5 text-[#7C3AED]" />;
    }
  };

  return (
    <div className="py-4 bg-[#E9D5FF]/30 border-y border-[#E9D5FF] overflow-hidden relative select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#FAF8FF] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#FAF8FF] to-transparent z-10 pointer-events-none"></div>

      <div className="flex items-center">
        {/* Live Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 ml-4 bg-[#30105E] text-white rounded-full text-xs font-bold shrink-0 z-20 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#C4B5FD] animate-ping"></span>
          <span>LIVE ACTIVITY</span>
        </div>

        {/* Marquee Ticker Track */}
        <div className="animate-marquee flex items-center gap-4 pl-4">
          {tickerItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E9D5FF] shadow-neu-pill text-xs text-[#30105E] whitespace-nowrap hover:border-[#7C3AED] transition-colors"
            >
              <span className="p-1 rounded-full bg-[#FAF8FF] flex items-center justify-center">
                {getIcon(item.icon)}
              </span>
              <span className="font-bold text-[#30105E]">{item.user}</span>
              <span className="text-[#30105E]/60">in</span>
              <span className="font-medium text-[#30105E]/80">{item.location}</span>
              <span className="text-[#30105E]/70">{item.action}</span>
              <span className="font-bold text-[#30105E] underline decoration-[#C4B5FD]">{item.item}</span>
              <span className="text-[10px] text-[#30105E]/70 ml-1 bg-[#FAF8FF] px-1.5 py-0.5 rounded-md border border-[#E9D5FF]/60">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
