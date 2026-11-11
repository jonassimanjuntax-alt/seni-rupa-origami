import React, { useEffect, useState } from 'react';
import { narrator } from '../utils/audio';
import { Volume2, Sparkles } from 'lucide-react';

interface MascotOriProps {
  speechText: string;
  expression?: 'cheerful' | 'proud' | 'thinking' | 'folding';
  compact?: boolean;
  autoSpeak?: boolean;
}

export const MascotOri: React.FC<MascotOriProps> = ({
  speechText,
  expression = 'cheerful',
  compact = false,
  autoSpeak = false,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsub = narrator.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (autoSpeak && speechText) {
      narrator.speak(speechText);
    }
  }, [speechText, autoSpeak]);

  const handleSpeak = () => {
    narrator.speak(speechText);
  };

  return (
    <div className={`flex items-end gap-3 select-none ${compact ? 'max-w-md' : 'max-w-2xl'}`}>
      {/* Mascot Avatar */}
      <div
        onClick={handleSpeak}
        className="relative cursor-pointer group shrink-0 transition-transform hover:scale-105 active:scale-95"
        title="Klik ORI untuk mendengarkan suara"
      >
        {/* Pulsing glow when speaking */}
        {isSpeaking && (
          <div className="absolute -inset-2 bg-amber-400/50 rounded-full blur-md animate-ping" />
        )}

        <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-b from-amber-200 to-amber-400 p-1.5 shadow-xl border-3 border-white flex items-center justify-center overflow-hidden">
          {/* Animated SVG Character "ORI" - Indonesian Cheerful Student with Red Cap & Origami Headband */}
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow">
            {/* Background aura */}
            <circle cx="50" cy="50" r="46" fill="#FEF3C7" />

            {/* Shoulders / Shirt with SD Red & White collar */}
            <path d="M 20 95 Q 50 78 80 95 L 85 100 L 15 100 Z" fill="#DC2626" />
            <polygon points="45,82 50,92 55,82" fill="#FFFFFF" />

            {/* Neck */}
            <rect x="44" y="70" width="12" height="15" rx="3" fill="#FDBA74" />

            {/* Head */}
            <ellipse cx="50" cy="52" rx="26" ry="24" fill="#FED7AA" />

            {/* Cheeks */}
            <circle cx="34" cy="56" r="5" fill="#FCA5A5" opacity="0.6" />
            <circle cx="66" cy="56" r="5" fill="#FCA5A5" opacity="0.6" />

            {/* Eyes */}
            {expression === 'thinking' ? (
              <>
                <ellipse cx="38" cy="48" rx="3.5" ry="4.5" fill="#1E293B" />
                <ellipse cx="62" cy="46" rx="3.5" ry="4.5" fill="#1E293B" />
              </>
            ) : (
              <>
                <circle cx="38" cy="49" r="4" fill="#0F172A" />
                <circle cx="62" cy="49" r="4" fill="#0F172A" />
                {/* Highlights */}
                <circle cx="36" cy="47" r="1.5" fill="#FFFFFF" />
                <circle cx="60" cy="47" r="1.5" fill="#FFFFFF" />
              </>
            )}

            {/* Smile / Mouth (moves when speaking) */}
            {isSpeaking ? (
              <ellipse cx="50" cy="62" rx="7" ry="5" fill="#BE123C" />
            ) : (
              <path d="M 42 60 Q 50 68 58 60" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            )}

            {/* Hair */}
            <path
              d="M 24 45 C 24 25 35 25 50 25 C 65 25 76 25 76 45 C 76 40 70 30 50 30 C 30 30 24 40 24 45 Z"
              fill="#1E293B"
            />
            {/* Bangs */}
            <path d="M 32 34 Q 40 40 45 35 Q 52 42 60 34" stroke="#1E293B" strokeWidth="3" fill="none" />

            {/* Origami Headband with Red Paper Crane Motif */}
            <path d="M 23 38 Q 50 32 77 38" stroke="#EF4444" strokeWidth="4" fill="none" />
            {/* Mini Paper Crane emblem on headband */}
            <polygon points="50,22 55,30 50,28 45,30" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
          </svg>

          {/* Name Tag */}
          <div className="absolute bottom-0 inset-x-0 bg-red-600 text-white font-black text-[11px] text-center tracking-wider py-0.5 shadow-sm">
            ORI
          </div>
        </div>

        {/* Floating audio badge on mascot */}
        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shadow-md border-2 border-white">
          <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce text-red-600' : ''}`} />
        </div>
      </div>

      {/* Comic Speech Bubble */}
      <div
        onClick={handleSpeak}
        className="relative flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-amber-300 cursor-pointer group hover:border-amber-400 transition-all"
      >
        {/* Tail pointing to Mascot */}
        <div className="absolute left-[-10px] bottom-5 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-amber-300 border-b-8 border-b-transparent" />
        <div className="absolute left-[-8px] bottom-5 w-0 h-0 border-t-8 border-t-transparent border-r-10 border-r-white border-b-8 border-b-transparent" />

        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="font-display font-black text-amber-600 text-sm flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Kata ORI:
          </span>
          <span className="text-[11px] font-semibold text-slate-400 group-hover:text-amber-600 flex items-center gap-1 transition-colors">
            <Volume2 className="w-3 h-3" />
            Klik untuk mendengar
          </span>
        </div>

        <p className="text-slate-800 text-base md:text-lg font-bold leading-snug">
          {speechText}
        </p>
      </div>
    </div>
  );
};
