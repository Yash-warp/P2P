import React from 'react';

export const BrandLogo = ({ size = 32, className = '' }) => {
  return (
    <div 
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 120 120"
        width={size}
        height={size}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(124,58,237,0.3)] transition-transform duration-300 group-hover:scale-105"
      >
        <defs>
          <linearGradient id="lendit-logo-bg" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#30105E" />
            <stop offset="50%" stopColor="#230B48" />
            <stop offset="100%" stopColor="#14042E" />
          </linearGradient>

          <linearGradient id="lendit-logo-l" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C4B5FD" />
            <stop offset="45%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#6D28D9" />
          </linearGradient>

          <linearGradient id="lendit-logo-loop" x1="100" y1="20" x2="20" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="35%" stopColor="#06B6D4" />
            <stop offset="85%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>

          <filter id="lendit-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#7C3AED" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* Squircle Pill Container */}
        <rect
          x="4"
          y="4"
          width="112"
          height="112"
          rx="32"
          fill="url(#lendit-logo-bg)"
          stroke="#E9D5FF"
          strokeOpacity="0.35"
          strokeWidth="2.5"
        />

        {/* Inner Highlight Border */}
        <rect
          x="6"
          y="6"
          width="108"
          height="108"
          rx="30"
          fill="none"
          stroke="url(#lendit-logo-l)"
          strokeOpacity="0.25"
          strokeWidth="1"
        />

        <g filter="url(#lendit-logo-glow)">
          {/* Right Sharing Loop (Emerald-Cyan to Violet) */}
          <path
            d="M58 42 C66 32 84 32 90 42 C97 53 97 67 88 76 C80 84 66 82 56 70 L42 54"
            stroke="url(#lendit-logo-loop)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Left 'L' Shape (Lavender to Violet) */}
          <path
            d="M36 28 L36 72 C36 82 46 88 56 88 C68 88 80 82 86 74"
            stroke="url(#lendit-logo-l)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Accent Jewels at Key Nodes */}
          <circle cx="56" cy="70" r="5" fill="#FAF8FF" />
          <circle cx="36" cy="28" r="4.5" fill="#C4B5FD" />
          <circle cx="86" cy="74" r="4.5" fill="#10B981" />
        </g>
      </svg>
    </div>
  );
};
