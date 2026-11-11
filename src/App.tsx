import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Play,
  Grid,
  BookOpen,
  Volume2,
  Maximize2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Award,
  Eye,
  Compass,
  Scissors,
  Bookmark,
  Users,
} from 'lucide-react';
import { origamiLevels } from './data/origamiData';
import { ttsDataByLevelAndTeam } from './data/ttsData';
import { OrigamiLevel, OrigamiStep, TeamId, TeamScore } from './types';
import { calculateTeamScore, ScoreCalculationResult } from './utils/scoring';
import { soundFX, narrator } from './utils/audio';

import { Header } from './components/Header';
import { MascotOri } from './components/MascotOri';
import { ThreeOrigamiView } from './components/ThreeOrigamiView';
import { ThreeOrigamiFinalModel } from './components/ThreeOrigamiFinalModel';
import { TTSBoard } from './components/TTSBoard';
import { MatchResults } from './components/MatchResults';
import {
  GuideModal,
  FoldTypesModal,
  OrigamiGlossaryModal,
  MaterialsModal,
  SoundSettingsModal,
  ResetConfirmModal,
} from './components/Popups';

type ScreenState =
  | 'home'
  | 'level_select'
  | 'analysis'
  | 'tutorial'
  | 'reflection'
  | 'tts_competition'
  | 'match_results'
  | 'model_3d_inspect';

const STORAGE_KEY = 'sd_teramia_origami_3d_data_v1';

export default function App() {
  // Navigation & Game State
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('home');
  const [selectedLevelId, setSelectedLevelId] = useState<number>(1);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Analysis Stage State
  const [selectedAnalysisOption, setSelectedAnalysisOption] = useState<string | null>(null);

  // 3D Tutorial Folding State
  const [foldProgress, setFoldProgress] = useState<number>(0);
  const [isPlayingFold, setIsPlayingFold] = useState<boolean>(true);
  const [isSlowMotion, setIsSlowMotion] = useState<boolean>(false);

  // Reflection Stage State
  const [selectedReflectionOption, setSelectedReflectionOption] = useState<string | null>(null);

  // TTS Competition State
  const [currentTeam, setCurrentTeam] = useState<TeamId>('merah');
  const [redAnswers, setRedAnswers] = useState<Record<number, string>>({});
  const [redHints, setRedHints] = useState<Record<number, boolean>>({});
  const [whiteAnswers, setWhiteAnswers] = useState<Record<number, string>>({});
  const [whiteHints, setWhiteHints] = useState<Record<number, boolean>>({});

  // Persisted Records (Level Scores & Completed status)
  const [levelScores, setLevelScores] = useState<
    Record<number, { merah: ScoreCalculationResult; putih: ScoreCalculationResult }>
  >({});
  const [completedLevels, setCompletedLevels] = useState<Record<number, boolean>>({});

  // Audio & Settings State
  const [narratorEnabled, setNarratorEnabled] = useState<boolean>(true);
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(true);
  const [voiceRate, setVoiceRate] = useState<number>(0.95);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.9);

  // Modals State
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isFoldTypesOpen, setIsFoldTypesOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);
  const [isSoundSettingsOpen, setIsSoundSettingsOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isTeamSwitchModalOpen, setIsTeamSwitchModalOpen] = useState(false);
  const [isStandingsOpen, setIsStandingsOpen] = useState(false);

  // Active level data
  const currentLevel: OrigamiLevel =
    origamiLevels.find((lvl) => lvl.id === selectedLevelId) || origamiLevels[0];
  const currentStep: OrigamiStep = currentLevel.steps[currentStepIndex] || currentLevel.steps[0];

  // Sync settings with audio singletons
  useEffect(() => {
    narrator.setEnabled(narratorEnabled);
    narrator.setRate(voiceRate);
    narrator.setVolume(voiceVolume);
    soundFX.setSfxEnabled(sfxEnabled);
  }, [narratorEnabled, voiceRate, voiceVolume, sfxEnabled]);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.levelScores) setLevelScores(parsed.levelScores);
        if (parsed.completedLevels) setCompletedLevels(parsed.completedLevels);
      }
    } catch (e) {
      console.warn('Failed to parse saved game data:', e);
    }

    // Check autostart query param for ultra mode testability
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') {
        setCurrentScreen('level_select');
      }
    }
  }, []);

  // Save persisted state whenever changed
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          levelScores,
          completedLevels,
        })
      );
    } catch (e) {
      console.warn('Failed to save game data:', e);
    }
  }, [levelScores, completedLevels]);

  // Voice greeting on home screen
  useEffect(() => {
    if (currentScreen === 'home' && narratorEnabled) {
      narrator.speak(
        'Halo, teman-teman SD TERAMIA! Selamat datang di dunia origami! Hari ini kita akan belajar mengubah selembar kertas menjadi karya seni yang indah. Siap melipat dan berkreasi bersama?'
      );
    }
  }, [currentScreen, narratorEnabled]);

  // Handle Step change in Tutorial
  const handleNextStep = () => {
    soundFX.playFold();
    if (currentStepIndex < currentLevel.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setFoldProgress(0);
      setIsPlayingFold(true);
    } else {
      // Completed all folding steps -> proceed to Reflection
      setCurrentScreen('reflection');
    }
  };

  const handlePrevStep = () => {
    soundFX.playClick();
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setFoldProgress(0);
      setIsPlayingFold(true);
    }
  };

  const handleRepeatStep = () => {
    soundFX.playClick();
    setFoldProgress(0);
    setIsPlayingFold(true);
  };

  // Switch from Red Team to White Team in TTS Competition
  const handleFinishRedTeam = () => {
    soundFX.playCorrect();
    // Calculate Red Team score
    const redQuestions = ttsDataByLevelAndTeam[selectedLevelId].merah.questions;
    const calcRed = calculateTeamScore(redQuestions, redAnswers, redHints);

    // Prompt team switch modal
    setIsTeamSwitchModalOpen(true);
    if (narratorEnabled) {
      narrator.speak(
        `Hebat sekali Tim Merah! Skor sementara ${calcRed.totalScore} poin. Sekarang, giliran Tim Putih bersiap!`
      );
    }
  };

  const handleStartWhiteTeam = () => {
    setIsTeamSwitchModalOpen(false);
    setCurrentTeam('putih');
  };

  // Complete Match: White Team finishes
  const handleFinishMatch = () => {
    soundFX.playVictory();
    const redQuestions = ttsDataByLevelAndTeam[selectedLevelId].merah.questions;
    const whiteQuestions = ttsDataByLevelAndTeam[selectedLevelId].putih.questions;

    const calcRed = calculateTeamScore(redQuestions, redAnswers, redHints);
    const calcWhite = calculateTeamScore(whiteQuestions, whiteAnswers, whiteHints);

    setLevelScores((prev) => ({
      ...prev,
      [selectedLevelId]: {
        merah: calcRed,
        putih: calcWhite,
      },
    }));

    setCompletedLevels((prev) => ({
      ...prev,
      [selectedLevelId]: true,
    }));

    setCurrentScreen('match_results');
  };

  // Reset entire game storage
  const handleConfirmReset = () => {
    setLevelScores({});
    setCompletedLevels({});
    setRedAnswers({});
    setRedHints({});
    setWhiteAnswers({});
    setWhiteHints({});
    setCurrentScreen('home');
    soundFX.playFold();
  };

  // Calculate Cumulative Standings
  const calculateTotalStandings = () => {
    let redTotal = 0;
    let whiteTotal = 0;
    Object.values(levelScores).forEach((score) => {
      redTotal += score.merah.totalScore;
      whiteTotal += score.putih.totalScore;
    });
    return { redTotal, whiteTotal };
  };

  // Navigation title for Header
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'level_select':
        return 'Pilih Level';
      case 'analysis':
        return `${currentLevel.title} • Menganalisis`;
      case 'tutorial':
        return `${currentLevel.title} • Langkah ${currentStepIndex + 1}/${currentLevel.steps.length}`;
      case 'reflection':
        return `${currentLevel.title} • Refleksi`;
      case 'tts_competition':
        return `${currentLevel.title} • TTS (${currentTeam === 'merah' ? 'Tim Merah' : 'Tim Putih'})`;
      case 'match_results':
        return `${currentLevel.title} • Hasil Pertandingan`;
      case 'model_3d_inspect':
        return `${currentLevel.finalArtName} • Model 3D`;
      default:
        return '';
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 select-none">
      {/* GLOBAL HEADER */}
      <Header
        onGoHome={() => setCurrentScreen('home')}
        onGoLevelSelect={() => setCurrentScreen('level_select')}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenSoundSettings={() => setIsSoundSettingsOpen(true)}
        onResetGame={() => setIsResetConfirmOpen(true)}
        onGoBack={() => {
          if (currentScreen === 'tutorial') setCurrentScreen('analysis');
          else if (currentScreen === 'analysis') setCurrentScreen('level_select');
          else if (currentScreen === 'reflection') setCurrentScreen('tutorial');
          else if (currentScreen === 'tts_competition') setCurrentScreen('reflection');
          else if (currentScreen === 'model_3d_inspect') setCurrentScreen('tutorial');
          else setCurrentScreen('home');
        }}
        narratorEnabled={narratorEnabled}
        canGoBack={currentScreen !== 'home'}
        currentScreenTitle={getScreenTitle()}
      />

      {/* MAIN VIEW CONTAINER (strictly single-screen fixed layout, overflow hidden) */}
      <main className="flex-1 w-full h-[calc(100vh-5rem)] overflow-hidden relative flex flex-col">
        {/* ======================================================== */}
        {/* SCREEN 1: BERANDA / HOME */}
        {/* ======================================================== */}
        {currentScreen === 'home' && (
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-8 animate-fade-in">
            {/* Top Title & School Banner */}
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-red-600 text-white font-extrabold text-sm md:text-base tracking-wider shadow-lg border-2 border-white mb-2">
                <Sparkles className="w-4 h-4 text-amber-300" />
                SD TERAMIA • SENI RUPA KELAS 3 SD
              </div>

              <h1 className="font-display font-black text-4xl md:text-6xl text-red-600 tracking-tight drop-shadow-md">
                PETUALANGAN DUNIA ORIGAMI 3D
              </h1>

              <p className="font-display font-bold text-xl md:text-2xl text-amber-800 mt-1 max-w-3xl">
                "Melipat Kertas, Menciptakan Karya, dan Berkreasi Bersama!"
              </p>
            </div>

            {/* Middle Section: Mascot ORI & Interactive Origami Showcase */}
            <div className="flex flex-row items-center justify-around gap-6 my-auto max-w-6xl mx-auto w-full">
              {/* Mascot ORI with Welcome Narration */}
              <div className="flex-1">
                <MascotOri
                  speechText="Halo, teman-teman SD TERAMIA! Selamat datang di dunia origami! Hari ini kita akan belajar mengubah selembar kertas menjadi karya seni yang indah. Siap melipat dan berkreasi bersama?"
                  autoSpeak={false}
                />

                {/* Quick Educational Fact Box */}
                <div className="mt-4 p-4 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-amber-300 shadow-lg text-slate-700 text-sm md:text-base">
                  <div className="font-extrabold text-red-600 flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4" />
                    Tahukah Kamu?
                  </div>
                  Origami bukan hanya seni melipat kertas biasa, tetapi melatih ketelitian tangan,
                  imajinasi ruang 3 dimensi, dan kerja sama tim yang kompak!
                </div>
              </div>

              {/* 4 Artwork Preview Cards */}
              <div className="grid grid-cols-2 gap-3.5 w-[420px] shrink-0">
                {origamiLevels.map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      soundFX.playClick();
                      setSelectedLevelId(lvl.id);
                      setCurrentScreen('analysis');
                    }}
                    className="p-3.5 bg-white/95 rounded-2xl border-2 border-amber-200 shadow-lg hover:border-red-500 hover:scale-103 transition-all flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-md mb-2 group-hover:rotate-6 transition-transform"
                      style={{ backgroundColor: lvl.paperColor }}
                    >
                      {lvl.id}
                    </div>
                    <div className="font-extrabold text-slate-900 text-sm leading-tight">
                      {lvl.finalArtName}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500">
                      Level {lvl.id}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions for IFP Touch */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundFX.playClick();
                  setSelectedLevelId(1);
                  setCurrentScreen('analysis');
                }}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 text-white font-black text-xl md:text-2xl shadow-xl shadow-red-500/40 flex items-center gap-3 transition-all border-2 border-white"
              >
                <Play className="w-7 h-7 fill-white" />
                MULAI PETUALANGAN
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setCurrentScreen('level_select');
                }}
                className="px-6 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-black text-lg md:text-xl shadow-lg shadow-amber-500/30 flex items-center gap-2 transition-all border-2 border-white"
              >
                <Grid className="w-6 h-6" />
                PILIH LEVEL
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsGuideOpen(true);
                }}
                className="px-5 py-4 rounded-2xl bg-white/90 hover:bg-white active:scale-95 text-slate-800 font-bold text-base md:text-lg shadow-md flex items-center gap-2 border border-slate-200"
              >
                <BookOpen className="w-5 h-5 text-red-600" />
                CARA BERMAIN
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsFoldTypesOpen(true);
                }}
                className="px-5 py-4 rounded-2xl bg-white/90 hover:bg-white active:scale-95 text-slate-800 font-bold text-base md:text-lg shadow-md flex items-center gap-2 border border-slate-200"
              >
                <Compass className="w-5 h-5 text-blue-600" />
                JENIS LIPATAN
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 2: PILIH LEVEL (4 LEVELS) */}
        {/* ======================================================== */}
        {currentScreen === 'level_select' && (
          <div className="w-full h-full flex flex-col justify-between p-6 animate-fade-in overflow-hidden">
            <div className="text-center">
              <h1 className="font-display font-black text-3xl md:text-4xl text-slate-900">
                Pilih Petualangan Melipat Kertas
              </h1>
              <p className="text-slate-600 font-semibold text-base mt-1">
                Semua level dapat dipilih langsung oleh guru untuk aktivitas belajar kelas
              </p>
            </div>

            {/* 4 Level Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-7xl mx-auto w-full my-auto">
              {origamiLevels.map((lvl) => {
                const scores = levelScores[lvl.id];
                const isCompleted = completedLevels[lvl.id];

                return (
                  <div
                    key={lvl.id}
                    className="bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-3 border-amber-200 hover:border-red-500 hover:shadow-2xl transition-all flex flex-col justify-between relative group"
                  >
                    {/* Completion badge */}
                    {isCompleted && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white rounded-full p-1.5 shadow-md">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}

                    <div>
                      {/* Top icon and level tag */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 rounded-xl bg-red-100 text-red-700 font-extrabold text-xs uppercase tracking-wider">
                          Level {lvl.id}
                        </span>
                        <span className="text-xs font-bold text-slate-500">{lvl.finalArtCategory}</span>
                      </div>

                      {/* Visual Artwork Color Sphere */}
                      <div
                        className="w-full h-28 rounded-2xl flex items-center justify-center shadow-inner mb-3 relative overflow-hidden group-hover:scale-102 transition-transform"
                        style={{
                          background: `radial-gradient(circle, ${lvl.paperColor} 20%, #1e293b 100%)`,
                        }}
                      >
                        <span className="text-white font-black text-2xl drop-shadow-md text-center px-2">
                          {lvl.finalArtName}
                        </span>
                      </div>

                      <h2 className="font-display font-black text-xl text-slate-900 leading-tight mb-1">
                        {lvl.title.split('–')[1] || lvl.title}
                      </h2>
                      <p className="text-slate-600 text-xs md:text-sm line-clamp-2 mb-3">
                        {lvl.description}
                      </p>
                    </div>

                    <div>
                      {/* Team score recap if played */}
                      {scores && (
                        <div className="bg-slate-100 rounded-xl p-2 mb-3 text-xs flex justify-around font-bold">
                          <span className="text-red-600">Tim Merah: {scores.merah.totalScore}</span>
                          <span className="text-blue-600">Tim Putih: {scores.putih.totalScore}</span>
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            soundFX.playClick();
                            setSelectedLevelId(lvl.id);
                            setCurrentStepIndex(0);
                            setCurrentScreen('analysis');
                          }}
                          className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-md shadow-red-500/20 active:scale-95 transition-all"
                        >
                          MULAI BELAJAR
                        </button>

                        <button
                          onClick={() => {
                            soundFX.playClick();
                            setSelectedLevelId(lvl.id);
                            setCurrentScreen('model_3d_inspect');
                          }}
                          className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <Eye className="w-4 h-4 text-amber-600" />
                          LIHAT KARYA 3D
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Standings & Navigation Bar */}
            <div className="flex items-center justify-between max-w-6xl mx-auto w-full pt-2">
              <button
                onClick={() => setCurrentScreen('home')}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-base flex items-center gap-2 border border-slate-200 shadow-md"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Beranda
              </button>

              <button
                onClick={() => {
                  soundFX.playClick();
                  setIsStandingsOpen(true);
                }}
                className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-base flex items-center gap-2 shadow-lg shadow-amber-500/30"
              >
                <Trophy className="w-5 h-5" />
                Lihat Klasemen Akumulasi Skor Tim
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 3: TAHAP 1 - MENGANALISIS (Amati dan Pikirkan) */}
        {/* ======================================================== */}
        {currentScreen === 'analysis' && (
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-8 animate-fade-in overflow-hidden">
            <div className="text-center">
              <span className="px-4 py-1 rounded-full bg-rose-100 text-rose-700 font-black text-xs md:text-sm uppercase tracking-wider">
                Tahap 1: Menganalisis • Amati dan Pikirkan
              </span>
              <h1 className="font-display font-black text-2xl md:text-4xl text-slate-900 mt-1">
                {currentLevel.title}
              </h1>
            </div>

            {/* Question & Options Panel */}
            <div className="max-w-4xl mx-auto w-full my-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-3 border-amber-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center font-black text-2xl shrink-0">
                  ?
                </div>
                <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 leading-snug">
                  {currentLevel.analysis.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3.5 mt-5">
                {currentLevel.analysis.options.map((opt) => {
                  const isSelected = selectedAnalysisOption === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => {
                        soundFX.playClick();
                        setSelectedAnalysisOption(opt.id);
                        if (opt.isCorrect) {
                          soundFX.playCorrect();
                          if (narratorEnabled) narrator.speak(opt.explanation);
                        } else {
                          soundFX.playWrong();
                          if (narratorEnabled) narrator.speak(opt.explanation);
                        }
                      }}
                      className={`w-full text-left p-4 md:p-5 rounded-2xl font-bold text-base md:text-lg transition-all flex items-start gap-3 border-2 ${
                        isSelected
                          ? opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300/40 shadow-lg'
                            : 'bg-rose-50 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-sm shrink-0 mt-0.5">
                        {isSelected ? (opt.isCorrect ? '✓' : '✗') : '•'}
                      </span>
                      <div className="flex-1">
                        <div>{opt.text}</div>
                        {isSelected && (
                          <div
                            className={`mt-2 text-sm font-semibold ${
                              opt.isCorrect ? 'text-emerald-700' : 'text-rose-600'
                            }`}
                          >
                            {opt.explanation}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
              <button
                onClick={() => setCurrentScreen('level_select')}
                className="px-6 py-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-base flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Pilih Level Lain
              </button>

              <button
                onClick={() => {
                  soundFX.playFold();
                  setCurrentStepIndex(0);
                  setFoldProgress(0);
                  setIsPlayingFold(true);
                  setCurrentScreen('tutorial');
                }}
                disabled={!selectedAnalysisOption}
                className={`px-8 py-4 rounded-2xl font-black text-lg md:text-xl flex items-center gap-2 shadow-xl transition-all ${
                  selectedAnalysisOption
                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/30 active:scale-95'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Ayo Praktik Melipat (3D)</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 4: TAHAP 2 - MENGAPLIKASIKAN (TUTORIAL 3D) */}
        {/* ======================================================== */}
        {currentScreen === 'tutorial' && (
          <div className="w-full h-full flex flex-row gap-4 p-4 overflow-hidden select-none">
            {/* LEFT: Real Three.js 3D Folding Paper View */}
            <div className="flex-1 h-full rounded-3xl overflow-hidden bg-white shadow-2xl border-3 border-amber-300 flex flex-col relative">
              <ThreeOrigamiView
                step={currentStep}
                paperColor={currentLevel.paperColor}
                paperBackFaceColor={currentLevel.paperBackFaceColor}
                isSlowMotion={isSlowMotion}
                foldProgress={foldProgress}
                setFoldProgress={setFoldProgress}
                isPlaying={isPlayingFold}
                setIsPlaying={setIsPlayingFold}
              />
            </div>

            {/* RIGHT: Step Instructions, Why Explanation, and Controls */}
            <div className="w-[520px] h-full flex flex-col justify-between bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-3 border-amber-300">
              {/* Step Counter Badge */}
              <div className="flex items-center justify-between border-b pb-3 border-slate-200">
                <span className="px-3.5 py-1 rounded-xl bg-red-600 text-white font-extrabold text-sm uppercase tracking-wider">
                  Langkah {currentStepIndex + 1} dari {currentLevel.steps.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => narrator.speak(currentStep.narrationText)}
                    className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    Dengarkan
                  </button>

                  <button
                    onClick={() => {
                      soundFX.playClick();
                      setCurrentScreen('model_3d_inspect');
                    }}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1"
                  >
                    <Eye className="w-4 h-4 text-amber-600" />
                    Hasil Akhir 3D
                  </button>
                </div>
              </div>

              {/* Title & Instructions */}
              <div className="my-auto space-y-4">
                <h2 className="font-display font-black text-2xl md:text-3xl text-slate-900 leading-tight">
                  {currentStep.title}
                </h2>

                <p className="text-slate-700 font-bold text-lg md:text-xl leading-relaxed">
                  {currentStep.description}
                </p>

                {/* Mengapa dilipat di bagian tersebut? */}
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="font-bold text-amber-900 text-sm flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    Mengapa Harus Dilipat di Sini?
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {currentStep.reason}
                  </p>
                </div>

                {/* Key Points */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Titik dan Sudut Kunci:
                  </div>
                  {currentStep.keyPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Animation & Step Navigation Controls */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                {/* Animation controls row */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={handleRepeatStep}
                    className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-800 font-bold text-sm flex items-center justify-center gap-1.5 transition-all"
                  >
                    <RotateCcw className="w-4 h-4 text-red-600" />
                    ULANGI ANIMASI
                  </button>

                  <button
                    onClick={() => setIsSlowMotion(!isSlowMotion)}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 transition-all ${
                      isSlowMotion
                        ? 'bg-amber-400 text-amber-950 shadow-md ring-2 ring-amber-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    {isSlowMotion ? '⚡ MODE NORMAL' : '🐢 PERLAHAN'}
                  </button>
                </div>

                {/* Prev / Next step buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className={`flex-1 py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 transition-all ${
                      currentStepIndex === 0
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-slate-800 hover:bg-slate-900 text-white shadow-md active:scale-95'
                    }`}
                  >
                    <ArrowLeft className="w-5 h-5" />
                    LANGKAH SEBELUMNYA
                  </button>

                  <button
                    onClick={handleNextStep}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 active:scale-95 text-white font-black text-base flex items-center justify-center gap-2 shadow-xl shadow-red-500/30 transition-all border-2 border-white"
                  >
                    <span>
                      {currentStepIndex === currentLevel.steps.length - 1
                        ? 'SELESAIKAN TUTORIAL'
                        : 'LANGKAH BERIKUTNYA'}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 5: TAHAP 3 - MEREFLEKSI (Aku Sudah Belajar) */}
        {/* ======================================================== */}
        {currentScreen === 'reflection' && (
          <div className="w-full h-full flex flex-col justify-between p-6 md:p-8 animate-fade-in overflow-hidden">
            <div className="text-center">
              <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 font-black text-xs md:text-sm uppercase tracking-wider">
                Tahap 3: Merefleksi • Aku Sudah Belajar
              </span>
              <h1 className="font-display font-black text-3xl md:text-4xl text-slate-900 mt-1">
                Refleksi Pembelajaran Seni Origami
              </h1>
            </div>

            <div className="max-w-4xl mx-auto w-full my-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border-3 border-amber-300">
              <h2 className="font-display font-bold text-xl md:text-2xl text-slate-900 leading-snug mb-5">
                {currentLevel.reflection.question}
              </h2>

              <div className="space-y-3">
                {currentLevel.reflection.options.map((opt, idx) => {
                  const isSelected = selectedReflectionOption === String(idx);

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        soundFX.playClick();
                        setSelectedReflectionOption(String(idx));
                      }}
                      className={`w-full text-left p-4 md:p-5 rounded-2xl font-bold text-base md:text-lg transition-all flex items-start gap-3 border-2 ${
                        isSelected
                          ? 'bg-amber-100 border-amber-500 text-amber-950 ring-4 ring-amber-300/40 shadow-lg'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="w-7 h-7 rounded-full bg-white border border-slate-300 flex items-center justify-center text-sm shrink-0 mt-0.5">
                        {isSelected ? '★' : '•'}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Inspiring Learning Motto */}
              <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg text-center font-bold text-lg">
                "Setiap lipatan adalah proses belajar. Tidak harus langsung sempurna, yang penting berani mencoba dan terus berkreasi!"
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
              <button
                onClick={() => setCurrentScreen('tutorial')}
                className="px-6 py-3.5 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-base flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Ulangi Tutorial
              </button>

              <button
                onClick={() => {
                  soundFX.playFold();
                  setCurrentTeam('merah');
                  setCurrentScreen('tts_competition');
                }}
                className="px-8 py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-95 text-white font-black text-xl flex items-center gap-3 shadow-xl shadow-red-500/30 border-2 border-white"
              >
                <span>Mulai Pertandingan TTS (2 Tim)</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 6: PERMAINAN TEKA-TEKI SILANG (TTS 2 TIM) */}
        {/* ======================================================== */}
        {currentScreen === 'tts_competition' && (
          <div className="w-full h-full flex flex-col justify-between p-3 overflow-hidden">
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-4 py-1 rounded-full text-white font-black text-sm uppercase tracking-wider shadow-md ${
                    currentTeam === 'merah' ? 'bg-red-600' : 'bg-blue-600'
                  }`}
                >
                  GILIRAN: {currentTeam === 'merah' ? 'TIM MERAH' : 'TIM PUTIH'}
                </span>
                <span className="text-slate-600 font-bold text-sm">
                  {currentLevel.title}
                </span>
              </div>

              {/* Finish Current Team Button */}
              {currentTeam === 'merah' ? (
                <button
                  onClick={handleFinishRedTeam}
                  className="px-6 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Selesai Giliran Tim Merah</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishMatch}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md active:scale-95 transition-all flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  <span>Selesai & Lihat Pemenang</span>
                </button>
              )}
            </div>

            {/* TTS Crossword Board */}
            <div className="flex-1 w-full overflow-hidden">
              <TTSBoard
                ttsData={ttsDataByLevelAndTeam[selectedLevelId][currentTeam]}
                answers={currentTeam === 'merah' ? redAnswers : whiteAnswers}
                setAnswers={currentTeam === 'merah' ? setRedAnswers : setWhiteAnswers}
                hintsUsed={currentTeam === 'merah' ? redHints : whiteHints}
                setHintsUsed={currentTeam === 'merah' ? setRedHints : setWhiteHints}
                team={currentTeam}
                narratorEnabled={narratorEnabled}
              />
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* SCREEN 7: PAPAN HASIL PERTANDINGAN */}
        {/* ======================================================== */}
        {currentScreen === 'match_results' && (
          <MatchResults
            levelTitle={currentLevel.title}
            redScore={
              levelScores[selectedLevelId]?.merah ||
              calculateTeamScore(
                ttsDataByLevelAndTeam[selectedLevelId].merah.questions,
                redAnswers,
                redHints
              )
            }
            whiteScore={
              levelScores[selectedLevelId]?.putih ||
              calculateTeamScore(
                ttsDataByLevelAndTeam[selectedLevelId].putih.questions,
                whiteAnswers,
                whiteHints
              )
            }
            onPlayAgain={() => {
              setRedAnswers({});
              setRedHints({});
              setWhiteAnswers({});
              setWhiteHints({});
              setCurrentTeam('merah');
              setCurrentScreen('tts_competition');
            }}
            onSelectLevel={() => setCurrentScreen('level_select')}
            onView3DModel={() => setCurrentScreen('model_3d_inspect')}
            onGoHome={() => setCurrentScreen('home')}
            narratorEnabled={narratorEnabled}
          />
        )}

        {/* ======================================================== */}
        {/* SCREEN 8: 3D MODEL INSPECT (360 ORBIT) */}
        {/* ======================================================== */}
        {currentScreen === 'model_3d_inspect' && (
          <div className="w-full h-full p-4 flex flex-col justify-between animate-fade-in overflow-hidden">
            <div className="flex items-center justify-between px-2 mb-2">
              <button
                onClick={() => setCurrentScreen('level_select')}
                className="px-5 py-2.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm flex items-center gap-2 border border-slate-200 shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Pilih Level
              </button>

              <h1 className="font-display font-black text-2xl text-slate-900">
                Pemeriksaan Karya 3D: {currentLevel.finalArtName}
              </h1>

              <button
                onClick={() => {
                  setCurrentStepIndex(0);
                  setCurrentScreen('tutorial');
                }}
                className="px-5 py-2.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md"
              >
                Buka Tutorial Lipatan
              </button>
            </div>

            <div className="flex-1 w-full overflow-hidden">
              <ThreeOrigamiFinalModel
                levelId={currentLevel.id}
                artName={currentLevel.finalArtName}
                category={currentLevel.finalArtCategory}
                primaryColor={currentLevel.paperColor}
              />
            </div>
          </div>
        )}
      </main>

      {/* ======================================================== */}
      {/* POPUP: KONFIRMASI PERGANTIAN TIM (MERAH KE PUTIH) */}
      {/* ======================================================== */}
      {isTeamSwitchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border-4 border-amber-300 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Award className="w-9 h-9" />
            </div>

            <h2 className="font-display font-black text-2xl text-slate-900">
              Tim Merah Telah Selesai!
            </h2>
            <p className="text-slate-600 font-bold text-base">
              Jawaban Tim Merah telah tersimpan dengan aman di sistem. Sekarang giliran{' '}
              <strong className="text-blue-600">TIM PUTIH</strong> untuk bertanding dengan 10 soal TTS yang berbeda!
            </p>

            <button
              onClick={handleStartWhiteTeam}
              className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-xl shadow-xl shadow-blue-500/30 transition-all"
            >
              Giliran Tim Putih Bertanding
            </button>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* POPUP: KLASEMEN TOTAL DUA TIM */}
      {/* ======================================================== */}
      {isStandingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 max-w-2xl w-full shadow-2xl border-4 border-amber-300 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-amber-500" />
                <h3 className="font-display font-black text-2xl text-slate-900">
                  Papan Klasemen Akumulasi Skor
                </h3>
              </div>
              <button
                onClick={() => setIsStandingsOpen(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-red-50 border-2 border-red-300 text-center">
                <div className="text-sm font-bold text-red-600 uppercase">Total Tim Merah</div>
                <div className="text-4xl font-black text-red-700 mt-1">
                  {calculateTotalStandings().redTotal}
                </div>
                <div className="text-xs text-slate-500 mt-1">Poin dari semua level</div>
              </div>

              <div className="p-5 rounded-2xl bg-blue-50 border-2 border-blue-300 text-center">
                <div className="text-sm font-bold text-blue-600 uppercase">Total Tim Putih</div>
                <div className="text-4xl font-black text-blue-700 mt-1">
                  {calculateTotalStandings().whiteTotal}
                </div>
                <div className="text-xs text-slate-500 mt-1">Poin dari semua level</div>
              </div>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto">
              {origamiLevels.map((lvl) => {
                const s = levelScores[lvl.id];
                return (
                  <div
                    key={lvl.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm"
                  >
                    <span className="font-bold text-slate-800">
                      Level {lvl.id}: {lvl.finalArtName}
                    </span>
                    <div className="flex items-center gap-4 font-bold">
                      <span className="text-red-600">{s ? s.merah.totalScore : 0} Poin</span>
                      <span className="text-slate-400">vs</span>
                      <span className="text-blue-600">{s ? s.putih.totalScore : 0} Poin</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* POPUPS & MODALS */}
      <GuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <FoldTypesModal isOpen={isFoldTypesOpen} onClose={() => setIsFoldTypesOpen(false)} />
      <OrigamiGlossaryModal isOpen={isGlossaryOpen} onClose={() => setIsGlossaryOpen(false)} />
      <MaterialsModal isOpen={isMaterialsOpen} onClose={() => setIsMaterialsOpen(false)} />
      <SoundSettingsModal
        isOpen={isSoundSettingsOpen}
        onClose={() => setIsSoundSettingsOpen(false)}
        narratorEnabled={narratorEnabled}
        setNarratorEnabled={setNarratorEnabled}
        sfxEnabled={sfxEnabled}
        setSfxEnabled={setSfxEnabled}
        voiceRate={voiceRate}
        setVoiceRate={setVoiceRate}
        voiceVolume={voiceVolume}
        setVoiceVolume={setVoiceVolume}
      />
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}
