import { Chemical } from './chemical.type';

export type DrumStatus = 'Pending' | 'In Treatment' | 'Completed';
export type DrumSize = '5G' | '15G' | '30G' | '55G' | '85G';
export type DrumType = 'Poly' | 'Steel' | 'Fiber';

export interface Drum {
  drumId: string;
  status: DrumStatus;
  treatmentCode: string;
  generator: string;
  address: string;
  epaId: string;
  drumSize: DrumSize;
  drumType: DrumType;
  psn: string;
  unNumber: string;
  hazardClass: string;
  pg: string;
  oxidizer: string;
  nfpaClass: string;
  chemicals: Chemical[];
}