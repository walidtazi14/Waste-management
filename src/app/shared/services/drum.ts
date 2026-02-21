import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Drum } from '../models/drum.type';

@Injectable({
  providedIn: 'root'
})
export class DrumService {
  // Mock Data
  private mockDrums: Drum[] = [
    {
      drumId: 'DRM-1001', status: 'Pending', treatmentCode: 'TC-01', generator: 'Acme Corp',
      address: '123 Industrial Way', epaId: 'EPA123456789', drumSize: '55G', drumType: 'Steel',
      psn: 'Waste Flammable Liquid, n.o.s.', unNumber: 'UN1993', hazardClass: '3', pg: 'II',
      oxidizer: 'No', nfpaClass: '3', chemicals: []
    },
    {
      drumId: 'DRM-1002', status: 'In Treatment', treatmentCode: 'TC-02', generator: 'TechDyne',
      address: '404 Silicon Ave', epaId: 'EPA987654321', drumSize: '30G', drumType: 'Poly',
      psn: 'Waste Corrosive Liquid, acidic', unNumber: 'UN3264', hazardClass: '8', pg: 'III',
      oxidizer: 'No', nfpaClass: '2', chemicals: []
    }
  ];

  private drumsSubject = new BehaviorSubject<Drum[]>(this.mockDrums);
  drums$ = this.drumsSubject.asObservable();

  constructor() { }

  getDrums(): Observable<Drum[]> {
    return this.drums$;
  }

  getDrumById(id: string): Drum | undefined {
    return this.drumsSubject.value.find(d => d.drumId === id);
  }

  updateDrumStatus(drumId: string, newStatus: any) {
    const currentDrums = this.drumsSubject.value;
    const updatedDrums = currentDrums.map(drum =>
      drum.drumId === drumId ? { ...drum, status: newStatus } : drum
    );
    this.drumsSubject.next(updatedDrums);
  }
}