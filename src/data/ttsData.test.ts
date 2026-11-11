import test from 'node:test';
import assert from 'node:assert/strict';
import { ttsDataByLevelAndTeam } from './ttsData';

test('TTS Data integrity: all 4 levels exist for both merah and putih', () => {
  for (let lvl = 1; lvl <= 4; lvl++) {
    assert.ok(ttsDataByLevelAndTeam[lvl], `Level ${lvl} must exist`);
    assert.ok(ttsDataByLevelAndTeam[lvl].merah, `Level ${lvl} Merah must exist`);
    assert.ok(ttsDataByLevelAndTeam[lvl].putih, `Level ${lvl} Putih must exist`);
  }
});

test('TTS Data: exactly 10 questions per team per level (total 80 questions)', () => {
  let totalQuestions = 0;
  for (let lvl = 1; lvl <= 4; lvl++) {
    const redQuestions = ttsDataByLevelAndTeam[lvl].merah.questions;
    const whiteQuestions = ttsDataByLevelAndTeam[lvl].putih.questions;

    assert.equal(redQuestions.length, 10, `Level ${lvl} Merah must have exactly 10 questions`);
    assert.equal(whiteQuestions.length, 10, `Level ${lvl} Putih must have exactly 10 questions`);

    totalQuestions += redQuestions.length + whiteQuestions.length;

    // Verify all questions within the same level between red and white are distinct
    const redAnswers = new Set(redQuestions.map(q => q.answer));
    const whiteAnswers = new Set(whiteQuestions.map(q => q.answer));

    for (const ans of redAnswers) {
      assert.ok(!whiteAnswers.has(ans), `Answer ${ans} is duplicated between Merah and Putih in Level ${lvl}`);
    }
  }

  assert.equal(totalQuestions, 80, 'Total questions across all levels must be exactly 80');
});

test('TTS Data: all cell coordinates and intersections are mathematically valid', () => {
  for (let lvl = 1; lvl <= 4; lvl++) {
    for (const team of ['merah', 'putih'] as const) {
      const data = ttsDataByLevelAndTeam[lvl][team];
      const board: string[][] = Array.from({ length: data.gridRows }, () =>
        Array(data.gridCols).fill('.')
      );

      for (const q of data.questions) {
        const letters = q.answer.toUpperCase();
        for (let i = 0; i < letters.length; i++) {
          const r = q.direction === 'mendatar' ? q.startRow : q.startRow + i;
          const c = q.direction === 'mendatar' ? q.startCol + i : q.startCol;

          assert.ok(r >= 0 && r < data.gridRows, `Row ${r} out of bounds in L${lvl} ${team} for ${q.answer}`);
          assert.ok(c >= 0 && c < data.gridCols, `Col ${c} out of bounds in L${lvl} ${team} for ${q.answer}`);

          const existing = board[r][c];
          if (existing !== '.') {
            assert.equal(
              existing,
              letters[i],
              `Intersection mismatch at (${r},${c}) in L${lvl} ${team}: '${existing}' vs '${letters[i]}' in ${q.answer}`
            );
          }
          board[r][c] = letters[i];
        }
      }
    }
  }
});
