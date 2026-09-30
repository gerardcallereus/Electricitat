export type MultimeterScale =
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

export interface TestPointDef {
  id: string;
  name: string;
  shortLabel: string;
  voltage: number; // Potential relative to reference GND
  isGnd?: boolean;
  circuitId: 'resistors' | 'series' | 'ohm-challenge';
  nodeId: string;
}

export interface CircuitState {
  switchClosed: boolean;
  batteryVoltage: number;
}
