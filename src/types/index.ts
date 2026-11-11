export type TeamId = 'merah' | 'putih';

export interface TTSQuestion {
  id: number;
  clueNumber: number;
  direction: 'mendatar' | 'menurun';
  question: string;
  answer: string; // Uppercase, no spaces
  startRow: number; // 0-indexed row on the grid
  startCol: number; // 0-indexed column on the grid
  explanation: string;
}

export interface TTSLevelData {
  team: TeamId;
  gridRows: number;
  gridCols: number;
  questions: TTSQuestion[]; // 10 questions per team per level
}

export interface AnalysisQuestion {
  question: string;
  imageDescription: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface ReflectionQuestion {
  question: string;
  options: string[];
}

export interface OrigamiStep {
  stepNumber: number;
  title: string;
  description: string;
  reason: string; // Mengapa dilipat di bagian tersebut
  foldType: 'lipatan_lembah' | 'lipatan_gunung' | 'lipatan_tengah' | 'lipatan_sudut' | 'lipatan_sayap';
  lineType: 'putus_putus' | 'titik_garis';
  arrowDirection: 'atas' | 'bawah' | 'kiri' | 'kanan' | 'diagonal_kanan' | 'diagonal_kiri';
  arrowLabel: string;
  keyPoints: string[]; // e.g. "Titik A bertemu Titik B"
  narrationText: string;
  // 3D animation configuration parameters for the folding mesh
  meshConfig: {
    baseShape: 'square' | 'triangle' | 'pentagon' | 'complex';
    foldAngleStart: number;
    foldAngleEnd: number;
    creaseAxis: 'horizontal' | 'vertical' | 'diagonal_main' | 'diagonal_anti' | 'custom';
    creasePosition: number; // -1 to 1 along the axis
    foldedPart: 'left' | 'right' | 'top' | 'bottom' | 'top_right' | 'bottom_corners' | 'wings';
  };
}

export interface OrigamiLevel {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  finalArtName: string;
  finalArtCategory: 'Transportasi' | 'Hewan' | 'Tumbuhan' | 'Benda Dasar';
  paperColor: string; // e.g. '#EF4444' (Merah)
  paperBackFaceColor: string; // e.g. '#F8FAFC' (Putih)
  description: string;
  materials: string[];
  learningOutcomes: string[];
  analysis: AnalysisQuestion;
  steps: OrigamiStep[];
  reflection: ReflectionQuestion;
}

export interface TeamScore {
  correctCount: number;
  wrongCount: number;
  unansweredCount: number;
  hintsUsed: number;
  totalScore: number;
  answers: Record<number, string>; // question id -> user input
  completed: boolean;
}

export interface LevelScoreRecord {
  merah: TeamScore;
  putih: TeamScore;
  completedAt?: string;
}

export interface AppSettings {
  narratorEnabled: boolean;
  sfxEnabled: boolean;
  voiceRate: number; // 0.8 to 1.2
  voiceVolume: number; // 0.1 to 1.0
}
