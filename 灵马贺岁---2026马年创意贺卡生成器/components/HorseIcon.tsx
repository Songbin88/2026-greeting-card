
import React from 'react';

export const HorseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 120 120" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Rounded Square Stamp Border */}
    <path d="M15 5h90c5.5 0 10 4.5 10 10v90c0 5.5-4.5 10-10 10H15c-5.5 0-10-4.5-10-10V15C5 9.5 9.5 5 15 5z" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="2 1" strokeLinejoin="round" className="opacity-80" />
    
    {/* Spirited Horse Silhouette inspired by the stamp image */}
    <path d="M35 100c-3 0-5-2-5-4 0-5 5-15 10-18 3-2 8-2 10 0 2 2 1 6-2 8-2 1-5 1-8 0-2-1-3 0-4 2-1 2-1 5 1 7 2 2 1 5-2 5z" />
    <path d="M95 70c0 10-10 25-25 25-5 0-8-3-8-8 0-4 2-7 6-8 5-1 10-2 12-6 2-4 0-10-4-12-6-3-12 0-15 5-2 3-5 5-8 5s-6-2-8-5c-3-6 0-15 6-20 6-5 15-5 22-2 10 4 17 16 17 26z" />
    <path d="M30 75c-5-5-10-15-10-25 0-15 12-25 25-25 8 0 15 4 20 10l5 5c2 2 2 5 0 7s-5 2-7 0l-5-5c-3-4-8-7-13-7-8 0-15 6-15 15 0 8 3 15 8 20 2 2 2 5 0 7s-5 2-7 0z" />
    <path d="M55 45c0-10-5-20-12-25-3-2-2-6 2-7 8-2 18 2 24 8 8 8 10 20 8 30-1 4-4 6-8 5s-6-4-6-11z" />
    {/* Foreleg raised */}
    <path d="M40 70c-2 2-5 5-8 5-5 0-8-5-8-10 0-8 5-18 12-20 3-1 6 1 7 4s-1 6-3 7l-5 2c-2 1-3 4-3 6s1 4 3 4 5-2 7-5c2-2 5-2 7 0s2 5 0 7z" />
  </svg>
);
