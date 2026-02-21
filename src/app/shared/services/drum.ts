import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drum } from '../models/drum.type';

@Injectable({
  providedIn: 'root'
})
export class DrumService {
  private mockDrums: Drum[] = [
    {
      drumId: '588239-106', status: 'IN PROGRESS', treatmentCode: 'LRCTD', generator: 'CRI Environnement',
      address: '123 Industrial Way', epaId: 'N/A', drumSize: '55', drumType: 'DF',
      psn: 'Water-reactive solid, toxic, N.O.S', unNumber: 'UN 3134', hazardClass: '4.3', pg: 'I',
      oxidizer: 'No', nfpaClass: 'N/A',
      chemicals: [
        { id: 1, name: 'calcium carbide', qty: '2', size: '2,5 kg', slg: 'g', ox: '', nfpa: '', wasteCodes: 'RD4.3 gr I' },
        { id: 2, name: 'sodium borohydride', qty: '1', size: '500g', slg: 'p', ox: '', nfpa: '', wasteCodes: 'RD4.3 gr I' }
      ],
      updatedAt: '2/21/2026'
    }
  ];

  private drumsSubject = new BehaviorSubject<Drum[]>(this.mockDrums);
  drums$ = this.drumsSubject.asObservable();

  constructor() { }

  getDrums(): Observable<Drum[]> {
    return this.drums$;
  }

  // Restored method
  getDrumById(id: string): Drum | undefined {
    return this.drumsSubject.value.find(d => d.drumId === id);
  }

  // Added update method for saving changes
  updateDrum(updatedDrum: Partial<Drum> & { drumId: string }) {
    const currentDrums = this.drumsSubject.value;
    const updatedDrums = currentDrums.map(drum =>
      drum.drumId === updatedDrum.drumId ? { ...drum, ...updatedDrum } : drum
    );
    this.drumsSubject.next(updatedDrums);
  }
}