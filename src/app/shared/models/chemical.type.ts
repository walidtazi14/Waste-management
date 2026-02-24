export interface WasteCode {
  code: string;
  Class: string;
  subclass: string;
  group: string;
}

export interface Chemical {
  id: number;
  name: string;
  state: string;
  wasteCode: WasteCode;
}

export interface ChemicalItem extends Chemical {
  qty: string;
  size: string;
  slg: string;
  ox: string;
  nfpa: string;
}
