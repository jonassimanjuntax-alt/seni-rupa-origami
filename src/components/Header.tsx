import React, { useState, useEffect } from 'react';
import {
  Home,
  Grid,
  BookOpen,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { soundFX } from '../utils/audio';

interface HeaderProps {
  onGoHome: () => void;
  onGoLevelSelect: () => void;
  onOpenGuide: () => void;
  onOpenSoundSettings: () => void;
  onResetGame: () => void;
  onGoBack: () => void;
  narratorEnabled: boolean;
  canGoBack: boolean;
  currentScreenTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onGoLevelSelect,
  onOpenGuide,
  onOpenSoundSettings,
  onResetGame,
  onGoBack,
  narratorEnabled,
  canGoBack,
  currentScreenTitle,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    soundFX.playClick();
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.warn('Fullscreen request failed:', err);
      alert('Mode Layar Penuh dapat diaktifkan melalui tombol F11 pada keyboard atau menu layar browser Anda.');
    }
  };

  return (
    <header className="w-full h-20 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-xl px-5 flex items-center justify-between z-30 select-none border-b-4 border-amber-300 shrink-0">
      {/* LEFT: School Identity & Origami Logo */}
      <div className="flex items-center gap-3.5">
        {/* Visual origami logo symbol */}
        <div className="w-13 h-13 rounded-2xl bg-amber-400 p-2 shadow-lg flex items-center justify-center transform hover:rotate-6 transition-transform border-2 border-white/80 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-red-600 drop-shadow-sm">
            <polygon points="50,10 90,85 50,65 10,85" />
            <polygon points="50,10 50,65 10,85" fill="#DC2626" />
            <polygon points="50,10 90,85 50,65" fill="#EF4444" />
            <polygon points="50,65 50,95 20,85" fill="#B91C1C" />
            <polygon points="50,65 80,85 50,95" fill="#991B1B" />
          </svg>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-2xl tracking-wide text-amber-200 drop-shadow">
              PETUALANGAN DUNIA ORIGAMI 3D
            </span>
            <span className="hidden xl:inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider">
              Hisense IFP 75"
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs md:text-sm font-semibold text-rose-100">
            <span className="font-extrabold text-white bg-red-800/80 px-2 py-0.5 rounded-md border border-red-500/50">
              SD TERAMIA
            </span>
            <span>• Seni Rupa Kelas 3 SD</span>
            <span>• Melipat Kertas (Origami)</span>
            {currentScreenTitle && (
              <>
                <span className="text-amber-300 font-bold">»</span>
                <span className="text-amber-200 font-bold underline decoration-amber-400 underline-offset-4">
                  {currentScreenTitle}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: The 7 Mandated Global Buttons (Large touch targets for 75" IFP) */}
      <div className="flex items-center gap-2">
        {/* 7. KEMBALI */}
        {canGoBack && (
          <button
            onClick={() => {
              soundFX.playClick();
              onGoBack();
            }}
            className="px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-sm md:text-base flex items-center gap-1.5 transition-all border border-white/20 shadow-md"
            aria-label="Kembali ke halaman sebelumnya"
          >
            <ArrowLeft className="w-5 h-5 text-amber-200" />
            <span className="hidden lg:inline">KEMBALI</span>
          </button>
        )}

        {/* 1. BERANDA */}
        <button
          onClick={() => {
            soundFX.playClick();
            onGoHome();
          }}
          className="px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-sm md:text-base flex items-center gap-1.5 transition-all border border-white/20 shadow-md"
          aria-label="Kembali ke Beranda"
        >
          <Home className="w-5 h-5 text-amber-200" />
          <span className="hidden lg:inline">BERANDA</span>
        </button>

        {/* 2. PILIH LEVEL */}
        <button
          onClick={() => {
            soundFX.playClick();
            onGoLevelSelect();
          }}
          className="px-3.5 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-sm md:text-base flex items-center gap-1.5 transition-all border border-white/20 shadow-md"
          aria-label="Buka Menu Pilih Level"
        >
          <Grid className="w-5 h-5 text-amber-200" />
          <span className="hidden lg:inline">LEVEL</span>
        </button>

        {/* 3. PETUNJUK */}
        <button
          onClick={() => {
            soundFX.playClick();
            onOpenGuide();
          }}
          className="px-3.5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-amber-950 font-black text-sm md:text-base flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/30"
          aria-label="Buka Petunjuk Permainan"
        >
          <BookOpen className="w-5 h-5" />
          <span className="hidden lg:inline">PETUNJUK</span>
        </button>

        {/* 4. SUARA NARATOR */}
        <button
          onClick={() => {
            soundFX.playClick();
            onOpenSoundSettings();
          }}
          className={`px-3 py-2.5 rounded-2xl active:scale-95 font-bold text-sm md:text-base flex items-center gap-1.5 transition-all shadow-md ${
            narratorEnabled
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/30'
              : 'bg-slate-700 text-slate-300'
          }`}
          aria-label="Pengaturan Suara Narator dan Musik"
        >
          {narratorEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          <span className="hidden xl:inline">SUARA</span>
        </button>

        {/* 6. ULANGI PERMAINAN */}
        <button
          onClick={() => {
            soundFX.playClick();
            onResetGame();
          }}
          className="px-3 py-2.5 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-95 text-white font-bold text-sm md:text-base flex items-center gap-1.5 transition-all border border-white/20 shadow-md"
          aria-label="Ulangi Permainan"
        >
          <RotateCcw className="w-5 h-5 text-amber-200" />
          <span className="hidden xl:inline">ULANGI</span>
        </button>

        {/* 5. LAYAR PENUH */}
        <button
          onClick={toggleFullscreen}
          className="px-3.5 py-2.5 rounded-2xl bg-yellow-400 hover:bg-yellow-300 active:scale-95 text-yellow-950 font-black text-sm md:text-base flex items-center gap-1.5 transition-all shadow-md shadow-yellow-500/30"
          aria-label={isFullscreen ? 'Keluar Layar Penuh' : 'Masuk Layar Penuh'}
        >
          {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          <span className="hidden md:inline">{isFullscreen ? 'KELUAR' : 'LAYAR PENUH'}</span>
        </button>
      </div>
    </header>
  );
};
