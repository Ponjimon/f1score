import { getScore, systems } from '../systems';

export const useF1Score = (placingStr: string = '') => {
  const placings = placingStr.trim().split(',').filter(Boolean);
  return systems.map(({ label, system, supportedModifiers }) => ({
    label,
    score: placings.reduce(
      (acc, placing) => acc + getScore(placing, system),
      0
    ),
    supportedModifiers,
  }));
};
