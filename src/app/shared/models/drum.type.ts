import { Chemical } from './chemical.type';

export type DrumStatus = 'IN PROGRESS' | 'WAITING APPROVAL' | 'WAITING EXPEDITION' | 'DONE';
export type DrumSize = '5' | '14' | '20' | '30' | '55';
export type DrumType = 'Poly' | 'Steel' | 'DF' | 'DM' | 'DP' | 'CF';

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
  updatedAt: string;
}