export type ModuleId =
  | 'dashboard'
  | 'b1-teoria-atom'
  | 'b2-simulador-conductors'
  | 'b3-transformacions'
  | 'b4-simbologia-circuits'
  | 'b5-llei-dohm'
  | 'b6-codi-colors'
  | 'b7-multimetre';

export const CLASS_GROUPS = ['1r A', '1r B', '2n A', '2n B', '3r A', '3r B'] as const;
export type ClassGroup = typeof CLASS_GROUPS[number];

export interface ModuleInfo {
  id: ModuleId;
  blocId: number;
  blocTitle: string;
  title: string;
  shortDesc: string;
  durationMin: number;
  category: 'teoria' | 'simulador' | 'joc' | 'tasca-final';
  icon: string;
}

export interface StudentProgress {
  name: string;
  group: string;
  completedBlocks: number[];
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
  x: number;
  y: number;
  potentialVolts: number;
  nodeGroup?: string;
}
