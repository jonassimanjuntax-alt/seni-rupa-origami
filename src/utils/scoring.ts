import { TeamScore, TTSQuestion } from '../types';

export interface ScoreCalculationResult {
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  hintsUsed: number;
  totalScore: number;
  percentage: number;
}

/**
 * Calculates score for a team based on user submissions and hints used.
 * - Each correct question yields 10 points.
 * - Each hint used deducts 2 points from the potential score.
 * - Score cannot go below 0 and cannot exceed 100 per level.
 */
export function calculateTeamScore(
  questions: TTSQuestion[],
  answers: Record<number, string>,
  hintsUsedPerQuestion: Record<number, boolean>
): ScoreCalculationResult {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  let hintsCount = 0;

  questions.forEach((q) => {
    const rawAnswer = (answers[q.id] || '').trim().toUpperCase();
    const isHintUsed = Boolean(hintsUsedPerQuestion[q.id]);
    if (isHintUsed) {
      hintsCount += 1;
    }

    if (!rawAnswer) {
      unansweredCount += 1;
    } else if (rawAnswer === q.answer.toUpperCase()) {
      correctCount += 1;
    } else {
      wrongCount += 1;
    }
  });

  const basePoints = correctCount * 10;
  const hintDeductions = hintsCount * 2;
  const totalScore = Math.max(0, Math.min(100, basePoints - hintDeductions));
  const percentage = Math.round((totalScore / 100) * 100);

  return {
    correctCount,
    wrongCount,
    unansweredCount,
    hintsUsed: hintsCount,
    totalScore,
    percentage,
  };
}

export function determineWinner(
  redScore: number,
  whiteScore: number
): { winner: 'merah' | 'putih' | 'seri'; message: string } {
  if (redScore > whiteScore) {
    return {
      winner: 'merah',
      message: 'Selamat untuk TIM MERAH! Menunjukkan kekompakan dan pemahaman origami yang luar biasa!',
    };
  } else if (whiteScore > redScore) {
    return {
      winner: 'putih',
      message: 'Selamat untuk TIM PUTIH! Hebat sekali, berhasil meraih poin tertinggi!',
    };
  } else {
    return {
      winner: 'seri',
      message: 'LUAR BIASA! KEDUA TIM BERHASIL MERAIH HASIL YANG SAMA! Kalian semua juara origami sejati!',
    };
  }
}
