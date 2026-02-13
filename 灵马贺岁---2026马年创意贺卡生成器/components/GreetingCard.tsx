
import React from 'react';
import { CardData } from '../types';
import { FuIcon } from './FuIcon';

interface GreetingCardProps {
  data: CardData;
  cardRef: React.RefObject<HTMLDivElement>;
}

export const GreetingCard: React.FC<GreetingCardProps> = ({ data, cardRef }) => {
  return (
    <div 
      ref={cardRef}
      className="relative w-full max-w-[400px] aspect-[9/19] bg-[#BC002D] text-[#F9E8C9] overflow-hidden shadow-2xl mx-auto flex flex-col"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #D32F2F 0%, #BC002D 100%)',
      }}
    >
      {/* Decorative Textures */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="text-4xl font-calligraphy">福</div>
          ))}
        </div>
      </div>

      {/* Header Area */}
      <div className="relative z-10 pt-10 px-8 flex flex-col items-center">
        <div className="text-right w-full mb-2">
            <span className="text-xs tracking-[0.2em] border-b border-[#F9E8C9] pb-1">AI CREATIVE STUDIO</span>
        </div>
        
        <h1 className="text-7xl font-calligraphy mb-2 mt-4 drop-shadow-lg">Hello</h1>
        <h2 className="text-6xl font-title tracking-widest drop-shadow-lg">2026!</h2>
        
        <div className="mt-4 text-sm tracking-widest uppercase opacity-80">
          Happy New Year
        </div>

        {/* Floating Fireworks Decor */}
        <div className="absolute top-10 right-5 w-12 h-12 border-2 border-[#F9E8C9] border-dashed rounded-full animate-firework opacity-40"></div>
        <div className="absolute top-32 left-5 w-8 h-8 border border-[#F9E8C9] border-dotted rounded-full animate-firework opacity-30"></div>
      </div>

      {/* Center Section: Main Content */}
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-10 text-center space-y-8">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F9E8C9] to-transparent opacity-50"></div>
        
        <div className="space-y-4">
          <div className="text-lg font-bold tracking-[0.3em] opacity-90 italic">金马迎新春</div>
          <div className="text-3xl font-title leading-relaxed drop-shadow-md">
            {data.greeting}
          </div>
          <div className="text-sm opacity-80 max-w-[280px] mx-auto leading-relaxed">
            {data.subtext}
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#F9E8C9] to-transparent opacity-50"></div>
      </div>

      {/* Centerpiece: Calligraphic 'Fu' character in a traditional plaque style */}
      <div className="relative z-10 flex justify-center py-6">
        <div className="relative group">
           {/* Outer decorative ring */}
           <div className="absolute inset-0 border-2 border-[#F9E8C9] border-opacity-20 rounded-full scale-110 group-hover:scale-125 transition-transform duration-1000"></div>
           <div className="absolute inset-0 border border-[#F9E8C9] border-opacity-10 rounded-full scale-125 group-hover:scale-150 transition-transform duration-1000 border-dashed"></div>
           
           <div className="w-40 h-40 bg-[#F9E8C9] rounded-2xl rotate-45 flex items-center justify-center shadow-inner relative overflow-hidden border-2 border-[#BC002D] border-opacity-10">
             {/* Character */}
             <div className="-rotate-45 text-[#BC002D] text-8xl font-calligraphy select-none drop-shadow-md">
               福
             </div>
             {/* Subtle internal border on the plaque */}
             <div className="absolute inset-2 border border-[#BC002D] opacity-10 rounded-xl"></div>
           </div>
        </div>
      </div>

      {/* Footer Area: Personalized Names (Simplified) */}
      <div className="relative z-10 pb-12 px-8">
        <div className="bg-[#F9E8C9] text-[#BC002D] p-6 shadow-xl relative overflow-hidden rounded-sm">
            {/* Background seal style */}
            <div className="absolute top-0 right-0 p-1 opacity-10 font-calligraphy text-4xl -rotate-12">
              马
            </div>
            
            <div className="space-y-4">
                <div className="border-b border-[#BC002D] border-opacity-20 pb-2">
                    <span className="text-2xl font-bold tracking-widest font-title">{data.receiver}</span>
                </div>
                
                <div className="text-right">
                    <span className="text-xl font-calligraphy tracking-wider">{data.sender} 敬上</span>
                </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center text-[9px] tracking-widest opacity-60 uppercase font-sans">
                <span>Spring Festival</span>
                <span>Lunar Year 2026</span>
            </div>
        </div>

        <div className="mt-8 text-center text-[10px] tracking-[0.5em] opacity-50">
            • 龙马精神 · 万事如意 •
        </div>
      </div>
    </div>
  );
};
