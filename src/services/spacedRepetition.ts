import { addDays, format } from 'date-fns';
import { RevisionRating } from '../db/types';

export interface NextReviewResult {
  intervalDays: number;
  nextDueDate: string; // YYYY-MM-DD
}

/**
 * Calculates next review interval based on spaced repetition schedule:
 * - Forgot: 1 day interval (immediate re-drill)
 * - Shaky: 1 day, then 3 days, then 7 days
 * - Solid: 7 days, then 14 days, then 30 days
 */
export function calculateNextReview(
  rating: RevisionRating,
  currentInterval: number = 1,
  repetitionCount: number = 0
): NextReviewResult {
  let nextInterval = 1;

  if (rating === 'forgot') {
    nextInterval = 1;
  } else if (rating === 'shaky') {
    if (repetitionCount === 0 || currentInterval <= 1) {
      nextInterval = 3;
    } else if (currentInterval <= 3) {
      nextInterval = 7;
    } else {
      nextInterval = 7;
    }
  } else if (rating === 'solid') {
    if (repetitionCount === 0 || currentInterval < 7) {
      nextInterval = 7;
    } else if (currentInterval <= 7) {
      nextInterval = 14;
    } else {
      nextInterval = 30;
    }
  }

  const nextDueDate = format(addDays(new Date(), nextInterval), 'yyyy-MM-dd');

  return {
    intervalDays: nextInterval,
    nextDueDate,
  };
}
