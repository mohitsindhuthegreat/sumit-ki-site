import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ className = "", size = 'md', showText = true }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Beautiful SVG Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        <svg 
          viewBox="0 0 48 48" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
            </filter>
          </defs>
          
          {/* Main Circle Background */}
          <circle 
            cx="24" 
            cy="24" 
            r="22" 
            fill="url(#logoGradient)" 
            filter="url(#logoShadow)"
            className="drop-shadow-lg"
          />
          
          {/* WiFi/Network Symbol */}
          <g transform="translate(24, 24)">
            {/* Computer/Monitor Symbol */}
            <rect x="-8" y="-4" width="16" height="10" rx="1" fill="white" opacity="0.9"/>
            <rect x="-6" y="-2" width="12" height="6" fill="url(#logoGradient)"/>
            <rect x="-2" y="6" width="4" height="2" fill="white" opacity="0.9"/>
            <rect x="-4" y="8" width="8" height="1" fill="white" opacity="0.9"/>
            
            {/* WiFi Waves */}
            <path d="M -12 -8 Q -6 -14 0 -8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
            <path d="M 0 -8 Q 6 -14 12 -8" stroke="white" strokeWidth="1.5" fill="none" opacity="0.8"/>
            <path d="M -10 -6 Q -5 -10 0 -6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
            <path d="M 0 -6 Q 5 -10 10 -6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.9"/>
            
            {/* Central Connection Dot */}
            <circle cx="0" cy="-8" r="1.5" fill="white"/>
          </g>
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-bold text-gray-900 dark:text-white leading-tight ${textSizeClasses[size]}`}>
            Mahech Internet Cafe
          </h1>
          <p className="text-xs text-brand-blue font-medium leading-tight">
            महेच इंटरनेट कैफे
          </p>
        </div>
      )}
    </div>
  );
}