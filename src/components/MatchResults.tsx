import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Award, CheckCircle2, XCircle, Lightbulb, RotateCcw, Home, Grid, Eye } from 'lucide-react';
import { ScoreCalculationResult, determineWinner } from '../utils/scoring';
import { soundFX, narrator } from '../utils/audio';

interface MatchResultsProps {
  levelTitle: string;
  redScore: ScoreCalculationResult;
  whiteScore: ScoreCalculationResult;
  onPlayAgain: () => void;
  onSelectLevel: () => void;
  onView3DModel: () => void;
  onGoHome: () => void;
  narratorEnabled: boolean;
}

export const MatchResults: React.FC<MatchResultsProps> = ({
  levelTitle,
  redScore,
  whiteScore,
  onPlayAgain,
  onSelectLevel,
  onView3DModel,
  onGoHome,
  narratorEnabled,
}) => {
  const { winner, message } = determineWinner(redScore.totalScore, whiteScore.totalScore);

  useEffect(() => {
    // Sound & Confetti celebration
    soundFX.playVictory();
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#EF4444', '#FFFFFF', '#F59E0B', '#3B82F6'],
    });

    if (narratorEnabled) {
      narrator.speak(`Pertandingan selesai! ${message}`);
    }
  }, [winner, message, narratorEnabled]);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 select-none animate-fade-in overflow-hidden">
      {/* Title & Celebration Header */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-400 text-amber-950 font-black text-sm uppercase tracking-wider mb-1 shadow-md">
          <Trophy className="w-4 h-4" />
          Papan Hasil Pertandingan 2 Tim
        </div>
        <h1 className="font-display font-black text-3xl md:text-4xl text-slate-900 drop-shadow-sm">
          {levelTitle}
        </h1>
        <p className="text-slate-700 text-lg font-bold mt-1 text-red-600 max-w-2xl mx-auto">
          {message}
        </p>
      </div>

      {/* VS Cards: Tim Merah vs Tim Putih */}
      <div className="grid grid-cols-2 gap-8 max-w-5xl mx-auto w-full my-auto">
        {/* TIM MERAH CARD */}
        <div
          className={`relative rounded-3xl p-6 shadow-2xl transition-all border-4 ${
            winner === 'merah'
              ? 'bg-gradient-to-b from-red-500 to-rose-600 text-white border-amber-300 scale-103 ring-8 ring-amber-300/40'
              : 'bg-white/95 text-slate-800 border-red-300'
          }`}
        >
          {winner === 'merah' && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-sm uppercase tracking-wider border-2 border-white">
              <Trophy className="w-4 h-4" /> Pemenang
            </div>
          )}

          <div className="flex items-center justify-between border-b pb-3 mb-3 border-current/20">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-red-600 border-2 border-white"></span>
              <h2 className="font-display font-black text-2xl tracking-wide">TIM MERAH</h2>
            </div>
            <div className="text-3xl md:text-4xl font-black">
              {redScore.totalScore} <span className="text-lg font-bold opacity-80">/ 100</span>
            </div>
          </div>

          <div className="space-y-2 text-sm font-semibold">
            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 opacity-90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Jawaban Benar
              </span>
              <span className="font-bold text-base">{redScore.correctCount} soal (+{redScore.correctCount * 10} poin)</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 opacity-90">
                <XCircle className="w-4 h-4 text-rose-400" /> Jawaban Salah
              </span>
              <span className="font-bold text-base">{redScore.wrongCount} soal</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 opacity-90">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Petunjuk Dipakai
              </span>
              <span className="font-bold text-base">{redScore.hintsUsed} (-{redScore.hintsUsed * 2} poin)</span>
            </div>

            <div className="flex justify-between items-center py-1 border-t border-current/20 pt-2">
              <span className="opacity-90">Tingkat Keberhasilan</span>
              <span className="font-extrabold text-lg">{redScore.percentage}%</span>
            </div>
          </div>
        </div>

        {/* TIM PUTIH CARD */}
        <div
          className={`relative rounded-3xl p-6 shadow-2xl transition-all border-4 ${
            winner === 'putih'
              ? 'bg-gradient-to-b from-blue-600 to-indigo-700 text-white border-amber-300 scale-103 ring-8 ring-amber-300/40'
              : 'bg-white/95 text-slate-800 border-blue-300'
          }`}
        >
          {winner === 'putih' && (
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-950 font-black px-4 py-1 rounded-full shadow-lg flex items-center gap-1.5 text-sm uppercase tracking-wider border-2 border-white">
              <Trophy className="w-4 h-4" /> Pemenang
            </div>
          )}

          <div className="flex items-center justify-between border-b pb-3 mb-3 border-current/20">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 rounded-full bg-white border-2 border-slate-400"></span>
              <h2 className="font-display font-black text-2xl tracking-wide">TIM PUTIH</h2>
            </div>
            <div className="text-3xl md:text-4xl font-black">
              {whiteScore.totalScore} <span className="text-lg font-bold opacity-80">/ 100</span>
            </div>
          </div>

          <div className="space-y-2 text-sm font-semibold">
            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 opacity-90">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Jawaban Benar
              </span>
              <span className="font-bold text-base">{whiteScore.correctCount} soal (+{whiteScore.correctCount * 10} poin)</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 opacity-90">
                <XCircle className="w-4 h-4 text-rose-400" /> Jawaban Salah
              </span>
              <span className="font-bold text-base">{whiteScore.wrongCount} soal</span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 opacity-90">
                <Lightbulb className="w-4 h-4 text-amber-400" /> Petunjuk Dipakai
              </span>
              <span className="font-bold text-base">{whiteScore.hintsUsed} (-{whiteScore.hintsUsed * 2} poin)</span>
            </div>

            <div className="flex justify-between items-center py-1 border-t border-current/20 pt-2">
              <span className="opacity-90">Tingkat Keberhasilan</span>
              <span className="font-extrabold text-lg">{whiteScore.percentage}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons for IFP Touch */}
      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={() => {
            soundFX.playClick();
            onPlayAgain();
          }}
          className="px-6 py-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-lg flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          MAIN LAGI
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            onView3DModel();
          }}
          className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-lg flex items-center gap-2 shadow-lg shadow-amber-500/30 transition-all active:scale-95"
        >
          <Eye className="w-5 h-5" />
          LIHAT HASIL KARYA 3D
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            onSelectLevel();
          }}
          className="px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-lg flex items-center gap-2 shadow-xl shadow-red-500/30 transition-all active:scale-95"
        >
          <Grid className="w-5 h-5" />
          PILIH LEVEL LAIN
        </button>

        <button
          onClick={() => {
            soundFX.playClick();
            onGoHome();
          }}
          className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-lg flex items-center gap-2 shadow-md transition-all active:scale-95"
        >
          <Home className="w-5 h-5" />
          BERANDA
        </button>
      </div>
    </div>
  );
};
