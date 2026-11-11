import fs from 'node:fs';

interface WordDef {
  clueNumber: number;
  direction: 'mendatar' | 'menurun';
  answer: string;
  startRow: number;
  startCol: number;
  question: string;
  explanation: string;
}

interface GridSpec {
  level: number;
  team: 'merah' | 'putih';
  gridRows: number;
  gridCols: number;
  words: WordDef[];
}

function check(spec: GridSpec): boolean {
  const board: string[][] = Array.from({ length: spec.gridRows }, () =>
    Array(spec.gridCols).fill('.')
  );

  for (const w of spec.words) {
    const letters = w.answer.toUpperCase();
    for (let i = 0; i < letters.length; i++) {
      const r = w.direction === 'mendatar' ? w.startRow : w.startRow + i;
      const c = w.direction === 'mendatar' ? w.startCol + i : w.startCol;
      if (r >= spec.gridRows || c >= spec.gridCols || r < 0 || c < 0) {
        console.error(`Out of bounds: ${w.answer} at (${r},${c})`);
        return false;
      }
      if (board[r][c] !== '.' && board[r][c] !== letters[i]) {
        console.error(`Conflict at (${r},${c}): was '${board[r][c]}', new '${letters[i]}' in ${w.answer}`);
        return false;
      }
      board[r][c] = letters[i];
    }
  }

  // Print grid
  console.log(`\n=== LEVEL ${spec.level} - TIM ${spec.team.toUpperCase()} ===`);
  for (let r = 0; r < spec.gridRows; r++) {
    console.log(board[r].join(' '));
  }
  return true;
}

// Let's test a sample grid:
// Across:
// 1. (0,0) KERTAS (len 6)
// 3. (2,1) LIPAT (len 5)
// 5. (4,2) PERAHU (len 6)
// 7. (6,0) GUNUNG (len 6)
// 9. (8,3) SUDUT (len 5)
//
// Let's check columns:
// (0,0) K, (0,1) E, (0,2) R, (0,3) T, (0,4) A, (0,5) S
// (2,1) L, (2,2) I, (2,3) P, (2,4) A, (2,5) T
// (4,2) P, (4,3) E, (4,4) R, (4,5) A, (4,6) H, (4,7) U
// (6,0) G, (6,1) U, (6,2) N, (6,3) U, (6,4) N, (6,5) G
// (8,3) S, (8,4) U, (8,5) D, (8,6) U, (8,7) T
//
// Now Down words:
// At col 0: (0,0)=K. Can we have KOTAK at (0,0) down len 5?
// row 0=K, row 1=O, row 2=T, row 3=A, row 4=K.
// row 2 col 0 is empty (LIPAT starts at col 1).
// row 4 col 0 is empty (PERAHU starts at col 2).
// row 6 col 0 is G (GUNUNG starts at col 0, row 6). KOTAK ends at row 4!
// So KOTAK at (0,0) down has NO conflict! And intersects KERTAS at (0,0)=K!
//
// At col 4:
// row 0 col 4 is 'A' (from KERTAS)
// row 2 col 4 is 'A' (from LIPAT)
// row 4 col 4 is 'R' (from PERAHU)
// Can we have a down word?
// What if Down word starts at row 2 col 3?
// row 2 col 3 is 'P' (from LIPAT)
// row 4 col 3 is 'E' (from PERAHU)
// row 6 col 3 is 'U' (from GUNUNG)
// row 8 col 3 is 'S' (from SUDUT)
// Down word at (2,3) len 7: row 2=P, row 3=?, row 4=E, row 5=?, row 6=U, row 7=?, row 8=S -> P-?-E-?-U-?-S
// Or simpler: Down words don't have to span all rows! They can span 2 rows or 1 row!
// For example:
// A down word can be:
// at (0,3) down: TEPI (len 4) -> row 0=T (matches KERTAS at 0,3), row 1=E, row 2=P (matches LIPAT at 2,3!), row 3=I.
// Exactly T-E-P-I:
// row 0=T (KERTAS has T at index 3!), row 1=E, row 2=P (LIPAT has P at index 2, which is col 3!), row 3=I!
// That is an absolute 100% perfect double intersection!
//
// What about at col 5:
// row 0 col 5 is 'S' (from KERTAS)
// row 2 col 5 is 'T' (from LIPAT)
// Can we have a down word?
// Or at (2,5): TITIK down (len 5): row 2=T (matches LIPAT!), row 3=I, row 4=T, row 5=I, row 6=K.
// And row 4 col 5 is 'A' in PERAHU, so if PERAHU has 'A' at col 5, it conflicts with TITIK's 'T'.
// But if Down word at (4,6) is HIAS (len 4): row 4=H (matches PERAHU at 4,6!), row 5=I, row 6=A, row 7=S.
// And at (6,0) GUNUNG has G at (6,0). Down at (5,0): PAGI (len 4) -> row 5=P, row 6=A (conflicts with G).
// But if down at (6,0) is GELAP (len 5): row 6=G (matches GUNUNG!), row 7=E, row 8=L, row 9=A, row 10=P!
//
// See how clean and elegant this is!
console.log("Ready to generate all 8 grids");
