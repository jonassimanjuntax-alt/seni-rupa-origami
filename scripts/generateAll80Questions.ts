import fs from 'node:fs';

interface QuestionDef {
  clueNumber: number;
  direction: 'mendatar' | 'menurun';
  answer: string;
  startRow: number;
  startCol: number;
  question: string;
  explanation: string;
}

interface GridDef {
  level: number;
  team: 'merah' | 'putih';
  gridRows: number;
  gridCols: number;
  questions: QuestionDef[];
}

const allGrids: GridDef[] = [
  // ========================================================
  // LEVEL 1 - TIM MERAH: Lipatan Dasar & Perahu Kertas
  // ========================================================
  {
    level: 1,
    team: 'merah',
    gridRows: 9,
    gridCols: 9,
    questions: [
      // Mendatar
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 0,
        answer: 'KERTAS',
        question: 'Bahan lembaran tipis yang dilipat untuk membentuk aneka karya origami.',
        explanation: 'Kertas origami biasanya berbentuk persegi dengan warna cerah.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 1,
        answer: 'LIPAT',
        question: 'Kegiatan menekuk kertas menjadi dua bagian atau lebih.',
        explanation: 'Melipat kertas adalah gerakan dasar dalam membuat origami.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 2,
        answer: 'PERAHU',
        question: 'Karya lipatan kertas yang berbentuk alat transportasi air.',
        explanation: 'Perahu kertas dibuat dengan melipat kertas membentuk lambung dan layar perahu.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 0,
        answer: 'GUNUNG',
        question: 'Jenis lipatan kertas yang puncaknya menonjol ke atas seperti bukit.',
        explanation: 'Lipatan gunung (mountain fold) membuat punggung lipatan mengarah ke atas.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 3,
        answer: 'SUDUT',
        question: 'Pojok runcing pada kertas yang harus dipertemukan saat melipat.',
        explanation: 'Mempertemukan sudut dengan presisi membuat origami rapi.'
      },
      // Menurun
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 0,
        answer: 'KOTAK', // intersects KERTAS at (0,0)='K'
        question: 'Bentuk kertas origami yang memiliki empat sisi sama panjang.',
        explanation: 'Kertas origami umumnya berukuran bujur sangkar atau persegi (kotak).'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 3,
        answer: 'TEPI', // intersects KERTAS at (0,3)='T', LIPAT at (2,3)='P' (T-E-P-I)
        question: 'Pinggiran sisi kertas yang harus sejajar saat dilipat.',
        explanation: 'Menyejajarkan tepi kertas menghasilkan lipatan yang simetris.'
      },
      {
        clueNumber: 3,
        direction: 'menurun',
        startRow: 0,
        startCol: 5,
        answer: 'SENI', // intersects KERTAS at (0,5)='S'
        question: 'Keindahan visual yang dihasilkan dari keterampilan tangan dan kreativitas.',
        explanation: 'Origami adalah salah satu cabang seni rupa terapan.'
      },
      {
        clueNumber: 7,
        direction: 'menurun',
        startRow: 4,
        startCol: 6,
        answer: 'HIAS', // intersects PERAHU at (4,6)='H'
        question: 'Membuat benda menjadi lebih indah dipandang.',
        explanation: 'Karya perahu kertas dapat dihias dengan pensil warna atau bendera kecil.'
      },
      {
        clueNumber: 9,
        direction: 'menurun',
        startRow: 6,
        startCol: 5,
        answer: 'GARIS', // intersects GUNUNG at (6,5)='G'
        question: 'Bekas jejak lipatan pada kertas yang menjadi panduan langkah berikutnya.',
        explanation: 'Garis lipatan membantu kita melipat langkah selanjutnya dengan tepat.'
      }
    ]
  },

  // ========================================================
  // LEVEL 1 - TIM PUTIH: Lipatan Dasar & Perahu Kertas
  // ========================================================
  {
    level: 1,
    team: 'putih',
    gridRows: 9,
    gridCols: 9,
    questions: [
      // Mendatar
      {
        clueNumber: 1,
        direction: 'mendatar',
        startRow: 0,
        startCol: 0,
        answer: 'ORIGAMI',
        question: 'Seni tradisional melipat kertas yang berasal dari negara Jepang.',
        explanation: 'Origami melatih kesabaran, ketelitian, dan daya imajinasi anak.'
      },
      {
        clueNumber: 4,
        direction: 'mendatar',
        startRow: 2,
        startCol: 2,
        answer: 'LEMBAH',
        question: 'Jenis lipatan kertas yang membentuk lekukan ke dalam.',
        explanation: 'Lipatan lembah (valley fold) ditandai dengan garis putus-putus.'
      },
      {
        clueNumber: 6,
        direction: 'mendatar',
        startRow: 4,
        startCol: 1,
        answer: 'MERAH',
        question: 'Salah satu warna ceria pada kertas origami yang melambangkan semangat.',
        explanation: 'Warna merah sering digunakan untuk karya origami yang ceria.'
      },
      {
        clueNumber: 8,
        direction: 'mendatar',
        startRow: 6,
        startCol: 0,
        answer: 'LAYAR',
        question: 'Bagian perahu yang membentang tegak menangkap angin.',
        explanation: 'Perahu kertas memiliki bagian atas yang mirip layar kapal.'
      },
      {
        clueNumber: 10,
        direction: 'mendatar',
        startRow: 8,
        startCol: 2,
        answer: 'RAPI',
        question: 'Kondisi hasil lipatan kertas yang lurus, bersih, dan teratur.',
        explanation: 'Lipatan yang rapi membuat bentuk origami terlihat indah dan kokoh.'
      },
      // Menurun
      {
        clueNumber: 1,
        direction: 'menurun',
        startRow: 0,
        startCol: 0,
        answer: 'OMBAK', // intersects ORIGAMI at (0,0)='O'
        question: 'Gelombang air laut tempat perahu kertas berlayar.',
        explanation: 'Perahu kertas dapat mengapung di atas air atau ombak kecil.'
      },
      {
        clueNumber: 2,
        direction: 'menurun',
        startRow: 0,
        startCol: 3,
        answer: 'GAMBAR', // (0,3) in ORIGAMI is 'G'! GAMBAR: G-A-M-B-A-R. (2,3) in LEMBAH is 'E'!
        // Wait: col 2=L, col 3=E in LEMBAH!
        // But GAMBAR has 'M' at row 2, which conflicts with 'E'!
        // Let's use a word that has 'G' at row 0 and 'E' at row 2!
        // Word: GELAS! G-E-L-A-S has row 1='E' and row 2='L'!
        // What about GESEK? G-E-S-E-K has row 2='S'.
        // What about GELER?
        // Wait, why not choose the start of LEMBAH or word carefully?
        // Let's programmatically test every word!
        question: '',
        explanation: ''
      }
    ]
  }
];

console.log("Validator starting");
