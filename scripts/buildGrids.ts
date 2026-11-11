import fs from 'node:fs';
import path from 'node:path';

interface WordPlacement {
  clueNumber: number;
  direction: 'mendatar' | 'menurun';
  question: string;
  answer: string;
  startRow: number;
  startCol: number;
  explanation: string;
}

interface GridDef {
  level: number;
  team: 'merah' | 'putih';
  gridRows: number;
  gridCols: number;
  questions: WordPlacement[];
}

const allGrids: GridDef[] = [
  // ==========================================
  // LEVEL 1 - TIM MERAH (Lipatan Dasar & Perahu)
  // ==========================================
  {
    level: 1,
    team: 'merah',
    gridRows: 9,
    gridCols: 9,
    questions: [
      // 1 Mendatar: (0, 0) KERTAS (len 6)
      {
        clueNumber: 1,
        direction: 'mendatar',
        question: 'Bahan lembaran tipis yang dilipat untuk membuat karya origami.',
        answer: 'KERTAS',
        startRow: 0,
        startCol: 0,
        explanation: 'Kertas adalah media utama dalam melipat origami.'
      },
      // 2 Menurun: (0, 0) KOTAK (len 5) -> (0,0)=K
      {
        clueNumber: 2,
        direction: 'menurun',
        question: 'Bentuk selembar kertas origami standar yang mempunyai 4 sisi sama panjang.',
        answer: 'KOTAK',
        startRow: 0,
        startCol: 0,
        explanation: 'Bentuk dasar kertas origami biasanya berbentuk kotak atau persegi bujur sangkar.'
      },
      // 3 Menurun: (0, 3) TEPI (len 4) -> (0,3)=T
      {
        clueNumber: 3,
        direction: 'menurun',
        question: 'Bagian pinggir kertas yang harus disatukan agar lipatan simetris.',
        answer: 'TEPI',
        startRow: 0,
        startCol: 3,
        explanation: 'Menyejajarkan tepi kertas menghasilkan lipatan yang rapi.'
      },
      // 4 Mendatar: (2, 2) OPAL? Let's check: (2,3) is 'P' from TEPI!
      // Word: LIPAT at (2,1) len 5: col 1=L, 2=I, 3=P, 4=A, 5=T
      {
        clueNumber: 4,
        direction: 'mendatar',
        question: 'Gerakan menekuk kertas menjadi dua sisi atau bagian.',
        answer: 'LIPAT',
        startRow: 2,
        startCol: 1,
        explanation: 'Melipat kertas adalah teknik utama dalam seni melipat.'
      },
      // 5 Menurun: (2, 5) TITIK (len 5) -> (2,5)=T from LIPAT!
      {
        clueNumber: 5,
        direction: 'menurun',
        question: 'Tanda pertemuan dua garis atau sudut saat melipat kertas.',
        answer: 'TITIK',
        startRow: 2,
        startCol: 5,
        explanation: 'Titik sudut yang bertemu dengan presisi membuat lipatan seimbang.'
      },
      // 6 Mendatar: (4, 4) GUNUNG (len 6) -> wait (4,4) to (4,9)? grid is 9 cols.
      // If (4,3) is 'I' from TEPI(0,3) len 4: row 0=T, 1=E, 2=P, 3=I. At row 4, TEPI has ended.
      // At (2,5)=TITIK: row 2=T, row 3=I, row 4=T, row 5=I, row 6=K.
      // So at (4,5) TITIK has 'T'!
      // What word has 'T' at col 5?
      // Say (4,0) to (4,5): K-A-P-A-L-T? No.
      // What about Mendatar at (4,2): PUTIH (len 5): (4,2)=P, (4,3)=U, (4,4)=T, (4,5)=I, (4,6)=H.
      // At (4,5), TITIK has 'T', but PUTIH has 'I'!
      // Let's design words with verified letter matches!
    ]
  }
];
