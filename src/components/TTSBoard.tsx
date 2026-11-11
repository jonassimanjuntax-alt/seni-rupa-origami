import React, { useState, useEffect } from 'react';
import { TTSLevelData, TTSQuestion } from '../types';
import { soundFX, narrator } from '../utils/audio';
import { Lightbulb, ArrowRight, ArrowDown, Delete, CheckCircle2, HelpCircle } from 'lucide-react';

interface TTSBoardProps {
  ttsData: TTSLevelData;
  answers: Record<number, string>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, string>>>;
  hintsUsed: Record<number, boolean>;
  setHintsUsed: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
  team: 'merah' | 'putih';
  onAllCompleted?: () => void;
  narratorEnabled: boolean;
}

export const TTSBoard: React.FC<TTSBoardProps> = ({
  ttsData,
  answers,
  setAnswers,
  hintsUsed,
  setHintsUsed,
  team,
  onAllCompleted,
  narratorEnabled,
}) => {
  const { questions, gridRows, gridCols } = ttsData;

  const [activeQuestionId, setActiveQuestionId] = useState<number>(questions[0]?.id || 101);
  const [activeCharIndex, setActiveCharIndex] = useState<number>(0);

  const activeQuestion = questions.find((q) => q.id === activeQuestionId) || questions[0];

  // Whenever active question changes, read it out if narrator is enabled
  useEffect(() => {
    if (activeQuestion && narratorEnabled) {
      const dirText = activeQuestion.direction === 'mendatar' ? 'mendatar' : 'menurun';
      narrator.speak(`Nomor ${activeQuestion.clueNumber} ${dirText}: ${activeQuestion.question}`);
    }
  }, [activeQuestionId, narratorEnabled]);

  // Build grid cell mapping
  // Map of "row-col" -> { letter: string, questionIds: number[], clueNumber?: number, isStart: boolean }
  const cellMap: Record<
    string,
    {
      row: number;
      col: number;
      clueNumber?: number;
      questionIds: number[];
      charIndices: Record<number, number>; // questionId -> index in that question
    }
  > = {};

  questions.forEach((q) => {
    const letters = q.answer.toUpperCase();
    for (let i = 0; i < letters.length; i++) {
      const r = q.direction === 'mendatar' ? q.startRow : q.startRow + i;
      const c = q.direction === 'mendatar' ? q.startCol + i : q.startCol;
      const key = `${r}-${c}`;

      if (!cellMap[key]) {
        cellMap[key] = {
          row: r,
          col: c,
          questionIds: [],
          charIndices: {},
        };
      }
      cellMap[key].questionIds.push(q.id);
      cellMap[key].charIndices[q.id] = i;

      if (i === 0) {
        cellMap[key].clueNumber = q.clueNumber;
      }
    }
  });

  // Calculate current user character for a cell
  const getCellChar = (row: number, col: number): string => {
    const key = `${row}-${col}`;
    const info = cellMap[key];
    if (!info) return '';

    // Check if any question intersecting this cell has a character entered
    for (const qId of info.questionIds) {
      const userWord = answers[qId] || '';
      const idx = info.charIndices[qId];
      if (userWord[idx]) {
        return userWord[idx];
      }
    }
    return '';
  };

  // Check if a question is fully and correctly answered
  const isQuestionCorrect = (q: TTSQuestion): boolean => {
    const userWord = (answers[q.id] || '').toUpperCase();
    return userWord === q.answer.toUpperCase();
  };

  // Keyboard typing input
  const handleVirtualKey = (letter: string) => {
    if (!activeQuestion) return;

    soundFX.playClick();
    const currentWord = answers[activeQuestion.id] || '';
    const lettersArr = currentWord.padEnd(activeQuestion.answer.length, ' ').split('');

    lettersArr[activeCharIndex] = letter.toUpperCase();
    const newWord = lettersArr.join('');

    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: newWord,
    }));

    // Auto-advance to next letter index
    if (activeCharIndex < activeQuestion.answer.length - 1) {
      setActiveCharIndex(activeCharIndex + 1);
    } else {
      // Finished word check
      if (newWord.trim() === activeQuestion.answer) {
        soundFX.playCorrect();
      }
    }
  };

  const handleBackspace = () => {
    if (!activeQuestion) return;
    soundFX.playClick();

    const currentWord = answers[activeQuestion.id] || '';
    const lettersArr = currentWord.padEnd(activeQuestion.answer.length, ' ').split('');

    lettersArr[activeCharIndex] = ' ';
    const newWord = lettersArr.join('');

    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: newWord,
    }));

    if (activeCharIndex > 0) {
      setActiveCharIndex(activeCharIndex - 1);
    }
  };

  const handleClearWord = () => {
    if (!activeQuestion) return;
    soundFX.playClick();
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: '',
    }));
    setActiveCharIndex(0);
  };

  // Use hint (-2 points)
  const handleUseHint = () => {
    if (!activeQuestion) return;
    if (hintsUsed[activeQuestion.id]) return; // Already used hint on this question

    soundFX.playFold();
    setHintsUsed((prev) => ({
      ...prev,
      [activeQuestion.id]: true,
    }));

    // Reveal the current letter or the first unfilled letter
    const targetChar = activeQuestion.answer[activeCharIndex];
    const currentWord = answers[activeQuestion.id] || '';
    const lettersArr = currentWord.padEnd(activeQuestion.answer.length, ' ').split('');
    lettersArr[activeCharIndex] = targetChar;

    setAnswers((prev) => ({
      ...prev,
      [activeQuestion.id]: lettersArr.join(''),
    }));

    if (activeCharIndex < activeQuestion.answer.length - 1) {
      setActiveCharIndex(activeCharIndex + 1);
    }
  };

  // Cell click handler
  const handleCellClick = (r: number, c: number) => {
    const key = `${r}-${c}`;
    const info = cellMap[key];
    if (!info) return;

    soundFX.playClick();
    // If the cell belongs to the currently active question, just focus that character
    if (info.questionIds.includes(activeQuestionId)) {
      setActiveCharIndex(info.charIndices[activeQuestionId]);
    } else {
      // Switch active question to the first question in this cell
      const newQId = info.questionIds[0];
      setActiveQuestionId(newQId);
      setActiveCharIndex(info.charIndices[newQId]);
    }
  };

  // Virtual keyboard layout
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];

  const teamColorBorder = team === 'merah' ? 'border-red-500' : 'border-blue-500';
  const teamBgAccent = team === 'merah' ? 'bg-red-500' : 'bg-blue-600';

  return (
    <div className="w-full h-full flex flex-row gap-4 p-2 overflow-hidden select-none">
      {/* LEFT: Authentic Interactive Crossword Grid */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-3xl p-4 shadow-xl border-2 border-slate-200 overflow-hidden">
        <div className="text-center mb-2 flex items-center justify-between w-full px-2">
          <div className="flex items-center gap-2">
            <span className={`w-3.5 h-3.5 rounded-full ${teamBgAccent}`}></span>
            <span className="font-display font-black text-xl text-slate-800">
              Papan TTS {team === 'merah' ? 'Tim Merah' : 'Tim Putih'}
            </span>
          </div>
          <div className="text-sm font-bold text-slate-500">
            {questions.filter((q) => isQuestionCorrect(q)).length} dari 10 Soal Terjawab Benar
          </div>
        </div>

        {/* The Grid */}
        <div
          className="grid gap-1.5 p-2 bg-slate-100 rounded-2xl border-2 border-slate-300 shadow-inner max-h-[75vh]"
          style={{
            gridTemplateRows: `repeat(${gridRows}, minmax(0, 1fr))`,
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
            aspectRatio: `${gridCols} / ${gridRows}`,
            width: 'min(70vh, 560px)',
          }}
        >
          {Array.from({ length: gridRows }).map((_, r) =>
            Array.from({ length: gridCols }).map((_, c) => {
              const key = `${r}-${c}`;
              const cell = cellMap[key];

              if (!cell) {
                // Inactive dark cell in crossword
                return (
                  <div
                    key={key}
                    className="w-full h-full bg-slate-800/85 rounded-lg opacity-90 shadow-sm"
                  />
                );
              }

              // Active cell
              const isCurrentQuestionCell = cell.questionIds.includes(activeQuestionId);
              const isCurrentActiveChar =
                isCurrentQuestionCell && cell.charIndices[activeQuestionId] === activeCharIndex;

              const char = getCellChar(r, c);

              return (
                <button
                  key={key}
                  onClick={() => handleCellClick(r, c)}
                  className={`relative w-full h-full rounded-lg font-black text-xl md:text-2xl flex items-center justify-center transition-all cursor-pointer focus:outline-none ${
                    isCurrentActiveChar
                      ? 'bg-amber-300 text-amber-950 ring-4 ring-red-500 scale-105 z-10 shadow-lg animate-pulse'
                      : isCurrentQuestionCell
                      ? 'bg-amber-100 text-slate-900 border-2 border-amber-400'
                      : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
                  }`}
                  aria-label={`Kotak baris ${r + 1} kolom ${c + 1}${char ? ', huruf ' + char : ''}`}
                >
                  {/* Clue Number Badge */}
                  {cell.clueNumber && (
                    <span className="absolute top-0.5 left-1 text-[10px] md:text-xs font-bold text-slate-500 leading-none">
                      {cell.clueNumber}
                    </span>
                  )}
                  <span>{char || ''}</span>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* RIGHT: Clue Panel, Answer Slot, and Virtual Touch Keyboard */}
      <div className="w-[520px] flex flex-col gap-3 justify-between">
        {/* Active Clue Header & Details */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-2 border-slate-200 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-xl text-white font-bold text-sm ${teamBgAccent}`}>
                Nomor {activeQuestion.clueNumber}
              </span>
              <span className="px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-bold text-sm flex items-center gap-1 border border-slate-200">
                {activeQuestion.direction === 'mendatar' ? (
                  <>
                    <ArrowRight className="w-4 h-4 text-emerald-600" />
                    MENDATAR
                  </>
                ) : (
                  <>
                    <ArrowDown className="w-4 h-4 text-indigo-600" />
                    MENURUN
                  </>
                )}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Voice repeat */}
              <button
                onClick={() => narrator.speak(activeQuestion.question)}
                className="p-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                title="Dengarkan Pertanyaan"
              >
                <HelpCircle className="w-4 h-4" />
                Dengarkan
              </button>

              {/* Hint button */}
              <button
                onClick={handleUseHint}
                disabled={Boolean(hintsUsed[activeQuestion.id])}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                  hintsUsed[activeQuestion.id]
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-600 text-white shadow-md active:scale-95'
                }`}
                title="Buka 1 Huruf (-2 Poin)"
              >
                <Lightbulb className="w-4 h-4" />
                {hintsUsed[activeQuestion.id] ? 'Petunjuk Terpakai' : 'Buka Huruf (-2 Poin)'}
              </button>
            </div>
          </div>

          {/* Big Question Text */}
          <div className="text-xl md:text-2xl font-bold text-slate-900 leading-snug">
            "{activeQuestion.question}"
          </div>

          {/* Answer Preview Boxes */}
          <div className="flex items-center gap-1.5 justify-center py-2 bg-slate-50 rounded-2xl border border-slate-200">
            {Array.from({ length: activeQuestion.answer.length }).map((_, idx) => {
              const currentWord = answers[activeQuestion.id] || '';
              const char = currentWord[idx] || '';
              const isSelected = idx === activeCharIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveCharIndex(idx)}
                  className={`w-11 h-12 rounded-xl font-black text-2xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-900 ring-4 ring-amber-300 shadow-md scale-105'
                      : 'bg-white text-slate-800 border-2 border-slate-300 hover:border-amber-400'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation if correct */}
          {isQuestionCorrect(activeQuestion) && (
            <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl p-2.5 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{activeQuestion.explanation}</span>
            </div>
          )}
        </div>

        {/* Question Selector Tabs (10 Questions for fast IFP touch) */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-slate-200">
          <div className="text-xs font-bold text-slate-500 mb-1.5 px-2">Daftar Soal Level Ini:</div>
          <div className="grid grid-cols-5 gap-1.5">
            {questions.map((q) => {
              const isDone = isQuestionCorrect(q);
              const isActive = q.id === activeQuestionId;

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    soundFX.playClick();
                    setActiveQuestionId(q.id);
                    setActiveCharIndex(0);
                  }}
                  className={`py-2 rounded-xl font-bold text-sm flex items-center justify-center gap-1 transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-500/30 ring-2 ring-red-400'
                      : isDone
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>{q.clueNumber}</span>
                  <span className="text-[10px] font-semibold">
                    {q.direction === 'mendatar' ? '➡' : '⬇'}
                  </span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Virtual On-Screen Keyboard */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-3 shadow-xl border-2 border-slate-200 flex flex-col gap-1.5">
          {keyboardRows.map((row, rIdx) => (
            <div key={rIdx} className="flex justify-center gap-1.5">
              {row.map((k) => (
                <button
                  key={k}
                  onClick={() => handleVirtualKey(k)}
                  className="flex-1 py-3 bg-amber-50 hover:bg-amber-100 active:bg-amber-300 active:scale-95 text-slate-900 font-black text-xl rounded-xl border border-amber-200 shadow-sm transition-all"
                >
                  {k}
                </button>
              ))}
            </div>
          ))}

          {/* Action row (Clear and Backspace) */}
          <div className="flex gap-2 mt-1">
            <button
              onClick={handleClearWord}
              className="flex-1 py-2.5 bg-slate-200 hover:bg-slate-300 active:scale-95 text-slate-700 font-bold text-sm rounded-xl transition-all"
            >
              Hapus Kata
            </button>
            <button
              onClick={handleBackspace}
              className="flex-2 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Delete className="w-5 h-5" />
              Hapus Huruf
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
