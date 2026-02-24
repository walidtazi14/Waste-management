import { Chemical } from './chemical.type';


export type DrumStatus = 'IN PROGRESS' | 'WAITING APPROVAL' | 'WAITING EXPEDITION' | 'DONE';
export type DrumSize = '5' | '14' | '20' | '30' | '55';
export type DrumType = 'Poly' | 'Steel' | 'DF' | 'DM' | 'DP' | 'CF';

export interface DrumContent {
  ChemicalId: number;
  qty: string;
  size: string;
  nfpa: string;
  Chemical: Chemical;
}

export interface Drum {
  id: number;
  DrumId: string;
  Status: DrumStatus;
  TreatmentCode: string;
  Generator: string;
  DrumSize: DrumSize;
  Oxidizer: boolean;
  UpdatedAt: string;
  Contents: DrumContent[];
}