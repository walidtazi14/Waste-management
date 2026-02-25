import { Chemical } from './chemical.type';


export type DrumStatus = 'IN PROGRESS' | 'WAITING APPROVAL' | 'WAITING EXPEDITION' | 'DONE';
export type DrumSize = '5' | '14' | '20' | '30' | '55';
export type DrumType = 'Poly' | 'Steel' | 'DF' | 'DM' | 'DP' | 'CF';

export interface DrumContent {
  chemicalId: number;
  qty: string;
  size: string;
  nfpa: string;
  chemical: Chemical;
}

export interface Drum {
  id: number;
  drumId: string;
  status: DrumStatus;
  treatmentCode: string;
  generator: string;
  drumSize: DrumSize;
  drumType: DrumType;
  unNumber: string;
  hazardClass: string;
  createdAt: string;
  oxidizer: boolean;
  updatedAt: string;
  contents: DrumContent[];
}