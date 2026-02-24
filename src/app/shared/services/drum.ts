import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drum } from '../models/drum.type';
import { DrumContent } from '../models/drum.type';

@Injectable({
  providedIn: 'root'
})
export class DrumService {
  private mockDrums: Drum[] = [
    {
      id: 99,
      DrumId: 'DRUM-12345',
      Status: 'IN PROGRESS',
      TreatmentCode: 'INCIN',
      Generator: 'Acme Corp',
      DrumSize: '55',
      Oxidizer: false,
      UpdatedAt: '2026-02-24T14:30:00Z',
      Contents: [
        {
          ChemicalId: 1,
          qty: '40 lbs',
          size: 'chunks',
          nfpa: '1-0-0',
          Chemical: {
            id: 1,
            name: 'Sulfuric Acid',
            state: 'Liquid',
            wasteCode: { code: 'D002', Class: 'Corrosive', subclass: 'Acid', group: 'II' }
          }
        }
      ],
    }
  ];

  private drumsSubject = new BehaviorSubject<Drum[]>(this.mockDrums);
  drums$ = this.drumsSubject.asObservable();

  constructor() { }

  getDrums(): Observable<Drum[]> {
    return this.drums$;
  }

  // Restored method
  getDrumById(id: number): Drum | undefined {
    return this.drumsSubject.value.find(d => d.id === id);
  }

  // Added update method for saving changes
  updateDrum(updatedDrum: Partial<Drum> & { id: number }) {
    const currentDrums = this.drumsSubject.value;
    const updatedDrums = currentDrums.map(drum =>
      drum.id === updatedDrum.id ? { ...drum, ...updatedDrum } : drum
    );
    this.drumsSubject.next(updatedDrums);
  }

  searchDrums(query: { drumId?: string; status?: string }): Drum[] {
    let drums = this.drumsSubject.value;
    if (query.drumId) {
      drums = drums.filter(d => d.DrumId.includes(query.drumId!));
    }
    if (query.status) {
      drums = drums.filter(d => d.Status === query.status);
    }
    return drums;
  }

  createDrum(drum: Drum): Drum {
    const newDrum = { ...drum, Contents: [], UpdatedAt: new Date().toISOString() };
    this.drumsSubject.next([...this.drumsSubject.value, newDrum]);
    return newDrum;
  }

  addChemicalToDrum(drumId: string, content: DrumContent): void {
    const currentDrums = this.drumsSubject.value;
    const updatedDrums = currentDrums.map(drum =>
      drum.DrumId === drumId ? {
        ...drum,
        Contents: [
          ...drum.Contents,
          content
        ],
        UpdatedAt: new Date().toISOString()
      } : drum
    );
    this.drumsSubject.next(updatedDrums);
  }
}