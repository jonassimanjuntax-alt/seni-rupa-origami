import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateTeamScore, determineWinner } from './scoring';
import { TTSQuestion } from '../types';

const mockQuestions: TTSQuestion[] = [
  { id: 1, clueNumber: 1, direction: 'mendatar', question: 'Q1', answer: 'KERTAS', startRow: 0, startCol: 0, explanation: '' },
  { id: 2, clueNumber: 2, direction: 'menurun', question: 'Q2', answer: 'LIPAT', startRow: 0, startCol: 0, explanation: '' },
  { id: 3, clueNumber: 3, direction: 'mendatar', question: 'Q3', answer: 'SUDUT', startRow: 2, startCol: 0, explanation: '' },
  { id: 4, clueNumber: 4, direction: 'mendatar', question: 'Q4', answer: 'PERAHU', startRow: 4, startCol: 0, explanation: '' },
];

test('calculateTeamScore: 100% correct with no hints yields 40 for 4 questions (capped at 100)', () => {
  const answers = {
    1: 'KERTAS',
    2: 'LIPAT',
    3: 'SUDUT',
    4: 'PERAHU',
  };
  const result = calculateTeamScore(mockQuestions, answers, {});
  assert.equal(result.correctCount, 4);
  assert.equal(result.wrongCount, 0);
  assert.equal(result.unansweredCount, 0);
  assert.equal(result.hintsUsed, 0);
  assert.equal(result.totalScore, 40);
});

test('calculateTeamScore: deducts 2 points per hint used', () => {
  const answers = {
    1: 'KERTAS',
    2: 'LIPAT',
    3: 'SUDUT',
    4: 'PERAHU',
  };
  const hints = { 1: true, 2: true };
  const result = calculateTeamScore(mockQuestions, answers, hints);
  assert.equal(result.correctCount, 4);
  assert.equal(result.hintsUsed, 2);
  // 40 - (2 * 2) = 36
  assert.equal(result.totalScore, 36);
});

test('calculateTeamScore: handles wrong and empty answers correctly', () => {
  const answers = {
    1: 'KERTAS', // correct (+10)
    2: 'SALAH',  // wrong (0)
    // 3 missing (unanswered)
    4: 'PERAHU', // correct (+10)
  };
  const hints = { 1: true }; // -2
  const result = calculateTeamScore(mockQuestions, answers, hints);
  assert.equal(result.correctCount, 2);
  assert.equal(result.wrongCount, 1);
  assert.equal(result.unansweredCount, 1);
  assert.equal(result.hintsUsed, 1);
  assert.equal(result.totalScore, 18);
});

test('determineWinner: red, white, or tie', () => {
  assert.equal(determineWinner(90, 80).winner, 'merah');
  assert.equal(determineWinner(70, 85).winner, 'putih');
  assert.equal(determineWinner(80, 80).winner, 'seri');
});
