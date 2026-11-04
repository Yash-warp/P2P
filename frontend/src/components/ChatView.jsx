import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  MapPin, 
  ShieldCheck, 
  QrCode, 
  Clock, 
  ChevronLeft,
  CheckCheck,
  Check,
  Sparkles,
  Camera
} from 'lucide-react';

export const ChatView = () => {
  const { 
    conversations, 
    chatActiveThreadId, 
    setChatActiveThreadId, 
    sendChatMessage, 
    navigateTo,
    showToast,
    isLoggedIn 
  } = useApp();

  const [inputText, setInputText] = useState('');

  const activeThread = conversations.find(c => c.id === chatActiveThreadId) || conversations[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    sendChatMessage(activeThread.id, inputText);
    setInputText('');
  };

  const handleQuickAction = (text) => {
    sendChatMessage(activeThread.id, text);
  };

  return (
    <div className={`min-h-screen ${isLoggedIn ? 'pt-6 pb-24' : 'pt-28 pb-20'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1 text-xs font-bold text-[#30105E]/70 hover:text-[#30105E] transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-[#7C3AED]" />
            <span>Home</span>
          </button>
          <span className="text-[#C4B5FD]">•</span>
          <span className="text-xs font-bold text-[#30105E]">Messages & Coordination</span>
        </div>

        {/* Chat Window Frame */}
        <div className="h-[680px] rounded-[32px] bg-white border border-[#E9D5FF] shadow-2xl flex overflow-hidden">
          
          {/* Left: Conversations List */}
          <div className="w-full sm:w-80 md:w-96 border-r border-[#E9D5FF] flex flex-col shrink-0 bg-[#FAF8FF]">
            <div className="p-4 border-b border-[#E9D5FF] bg-white">
              <h2 className="font-display font-black text-xl text-[#30105E]">Messages</h2>
              <p className="text-xs text-[#30105E]/60 mt-0.5">Encrypted neighbor chat</p>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-[#E9D5FF]/60">
              {conversations.map((conv) => {
                const isSelected = conv.id === activeThread.id;
                const lastMsg = conv.messages[conv.messages.length - 1];

                return (
                  <div
                    key={conv.id}
                    onClick={() => setChatActiveThreadId(conv.id)}
                    className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                      isSelected ? 'bg-white shadow-xs border-l-4 border-[#7C3AED]' : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={conv.participantAvatar}
                        alt={conv.participantName}
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#C4B5FD]"
                      />
                      {conv.unread && (
                        <span className="w-3 h-3 rounded-full bg-[#7C3AED] border-2 border-white absolute -top-1 -right-1"></span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-bold text-xs sm:text-sm text-[#30105E] truncate">
                          {conv.participantName}
                        </h4>
                        <span className="text-[10px] text-[#30105E]/50">{lastMsg?.time}</span>
                      </div>

                      <div className="text-[11px] font-semibold text-[#7C3AED] line-clamp-1 mt-0.5">
                        {conv.itemTitle}
                      </div>

                      <p className="text-xs text-[#30105E]/70 truncate mt-1">
                        {lastMsg ? lastMsg.text : 'Start conversation'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Active Chat Thread */}
          <div className="flex-1 flex flex-col bg-white">
            
            {/* Thread Header with Item Banner */}
            <div className="p-4 border-b border-[#E9D5FF] flex items-center justify-between gap-4 bg-[#FAF8FF]">
              <div className="flex items-center gap-3">
                <img
                  src={activeThread.participantAvatar}
                  alt={activeThread.participantName}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#C4B5FD]"
                />
                <div>
                  <h3 className="font-display font-bold text-sm text-[#30105E] flex items-center gap-1.5">
                    {activeThread.participantName}
                    <ShieldCheck className="w-4 h-4 text-[#7C3AED]" />
                  </h3>
                  <div className="text-[11px] text-[#30105E]/70 flex items-center gap-2">
                    <span>Regarding: <strong className="text-[#30105E]">{activeThread.itemTitle}</strong></span>
                    {activeThread.itemPrice > 0 && (
                      <span className="text-[#7C3AED] font-bold">• ₹{activeThread.itemPrice}/day</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Handover pill */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E9D5FF] rounded-xl text-xs font-bold text-[#30105E] shadow-2xs">
                <QrCode className="w-3.5 h-3.5 text-[#7C3AED]" />
                <span>QR Verification Active</span>
              </div>
            </div>

            {/* Quick Action Chips */}
            <div className="px-4 py-2 border-b border-[#E9D5FF]/60 flex items-center gap-2 overflow-x-auto scrollbar-none bg-white text-xs">
              <span className="text-[11px] font-bold text-[#30105E]/60 shrink-0">Quick Actions:</span>
              <button
                onClick={() => handleQuickAction("Can I please inspect the condition photos before meeting?")}
                className="px-2.5 py-1 rounded-lg bg-[#E9D5FF]/60 hover:bg-[#E9D5FF] text-[#30105E] font-medium whitespace-nowrap text-[11px] border border-[#C4B5FD]/60"
              >
                📸 Request Condition Photos
              </button>
              <button
                onClick={() => handleQuickAction("What is the exact landmark for the pickup meetup?")}
                className="px-2.5 py-1 rounded-lg bg-[#E9D5FF]/60 hover:bg-[#E9D5FF] text-[#30105E] font-medium whitespace-nowrap text-[11px] border border-[#C4B5FD]/60"
              >
                📍 Share Pickup Landmark
              </button>
              <button
                onClick={() => handleQuickAction("I have arrived at the pickup location with my ID ready.")}
                className="px-2.5 py-1 rounded-lg bg-[#E9D5FF]/60 hover:bg-[#E9D5FF] text-[#30105E] font-medium whitespace-nowrap text-[11px] border border-[#C4B5FD]/60"
              >
                🤝 Arrived at Meetup
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF8FF]">
              {/* Escrow Guarantee Pill in Chat */}
              <div className="p-3 rounded-2xl bg-[#E9D5FF]/50 border border-[#C4B5FD] text-center text-xs text-[#30105E] max-w-md mx-auto">
                <span className="font-bold text-[#30105E]">SafeEscrow Protection Active</span>
                <p className="text-[11px] text-[#30105E]/70 mt-0.5">
                  Never exchange cash outside the app. Use the encrypted QR code handover for guaranteed deposit refunds.
                </p>
              </div>

              {activeThread.messages.map((msg, index) => {
                const isMe = msg.sender === 'me';

                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-[#30105E] text-white rounded-br-xs shadow-md'
                          : 'bg-white text-[#30105E] border border-[#E9D5FF] rounded-bl-xs shadow-neu-pill'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-[#30105E]/50 px-1">
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-[#7C3AED]" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-[#E9D5FF] bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={`Message ${activeThread.participantName}...`}
                className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF8FF] border border-[#E9D5FF] text-xs sm:text-sm font-medium text-[#30105E] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-3 rounded-2xl bg-[#7C3AED] text-white hover:bg-[#6D28D9] disabled:opacity-40 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
