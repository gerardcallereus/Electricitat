export type ModuleId =
  | 'dashboard'
  | 'b1-conductors'
  | 'b1-transformacions'
  | 'b2-simbologia'
  | 'b2-circuits'
  | 'b3-unitats'
  | 'b3-llei-dohm'
  | 'b4-codi-colors'
  | 'b5-laboratori-multimetre';

export const CLASS_GROUPS = ['1r A', '1r B', '2n A', '2n B', '3r A', '3r B'] as const;
export type ClassGroup = typeof CLASS_GROUPS[number];

export interface ModuleInfo {
  id: ModuleId;
  blocId: number;
  blocTitle: string;
  title: string;
  shortDesc: string;
  durationMin: number;
  category: 'teoria-pràctica' | 'simulador' | 'joc' | 'tasca-final';
  icon: string;
}

export interface StudentProgress {
  name: string;
  group: string;
  completedModules: string[];
  moduleScores: Record<string, number>;
  multimeterTaskResults?: MultimeterTaskResults;
}

export interface MultimeterTaskResults {
  resistorMeasurements: { id: string; userValue: string; correct: boolean }[];
  voltageMeasurements: { id: string; userValue: string; correct: boolean }[];
  ohmCalculations: { id: string; userValue: string; correct: boolean }[];
  totalScore: number;
  maxScore: number;
  completedAt?: string;
}

export type MultimeterDialPosition =
  | 'OFF'
  | 'DCV_200m'
  | 'DCV_2'
  | 'DCV_20'
  | 'DCV_200'
  | 'RES_200'
  | 'RES_2k'
  | 'RES_20k'
  | 'RES_200k'
  | 'RES_2M';

export interface TestPoint {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
  potentialVolts: number;
  nodeGroup?: string;
}
