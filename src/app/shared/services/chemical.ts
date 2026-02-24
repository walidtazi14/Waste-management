import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chemical } from '../models/chemical.type';

@Injectable({
  providedIn: 'root'
})
export class ChemicalService {
  private mockChemicals: Chemical[] = [
    {
      id: 1,
      name: 'calcium carbide',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 2,
      name: 'sodium borohydride',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 3,
      name: 'sodium cyano borohydride',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'II' }
    },
    {
      id: 4,
      name: 'calcium hydride',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 5,
      name: 'aluminum nitride',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'II' }
    },
    {
      id: 6,
      name: 'strontium powder',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'II' }
    },
    {
      id: 7,
      name: 'zinc phosphide',
      state: 'Solid',
      wasteCode: { code: 'R 4.3', Class: 'Dangerous When Wet', subclass: '6.1', group: 'I' }
    },
    {
      id: 8,
      name: 'trityl chloride',
      state: 'Solid',
      wasteCode: { code: 'RA8', Class: 'Corrosive', subclass: '8', group: 'II' }
    },
    {
      id: 9,
      name: 'thionyl chloride',
      state: 'Liquid',
      wasteCode: { code: '8', Class: 'Corrosive', subclass: '8', group: 'II' }
    },
    {
      id: 10,
      name: 'acetyl chloride',
      state: 'Liquid',
      wasteCode: { code: '3', Class: 'Flammable', subclass: '8', group: 'II' }
    },
    {
      id: 11,
      name: 'metallic hydride debrits',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 12,
      name: 'potassium borohydride',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 13,
      name: 'sodium hydride',
      state: 'Solid',
      wasteCode: { code: 'RD4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 14,
      name: 'zinc powder in oil',
      state: 'Liquid',
      wasteCode: { code: 'LA99H', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 15,
      name: 'Vitride (sodium bis(2-methoxyethoxy)aluminum hydride)',
      state: 'Liquid',
      wasteCode: { code: 'RD 4.3', Class: 'Dangerous When Wet', subclass: '3', group: 'I' }
    },
    {
      id: 16,
      name: 'pyridine',
      state: 'Liquid',
      wasteCode: { code: '3', Class: 'Flammable', subclass: '3', group: 'II' }
    },
    {
      id: 17,
      name: 'phosphorus trichloride',
      state: 'Liquid',
      wasteCode: { code: 'RA I B', Class: 'Corrosive', subclass: '8', group: 'I' }
    },
    {
      id: 18,
      name: 'isobutyl chloroformate',
      state: 'Liquid',
      wasteCode: { code: 'I B 3489', Class: 'Corrosive', subclass: '6.1', group: 'II' }
    },
    {
      id: 19,
      name: 'phenyl chloroformate',
      state: 'Liquid',
      wasteCode: { code: 'C6.1', Class: 'Toxic', subclass: '8', group: 'II' }
    },
    {
      id: 20,
      name: 'lithium aluminum hydride',
      state: 'Solid',
      wasteCode: { code: '4.3', Class: 'Dangerous When Wet', subclass: '4.3', group: 'I' }
    },
    {
      id: 21,
      name: 'magnesium powder',
      state: 'Solid',
      wasteCode: { code: '4.3', Class: 'Dangerous When Wet', subclass: '4.2', group: 'II' }
    },
    {
      id: 22,
      name: 'sodium cyanide',
      state: 'Solid',
      wasteCode: { code: '6.1', Class: 'Toxic', subclass: '6.1', group: 'I' }
    },
    {
      id: 23,
      name: '1 butanethiol',
      state: 'Liquid',
      wasteCode: { code: '3', Class: 'Flammable', subclass: '3', group: 'II' }
    },
    {
      id: 24,
      name: 'tungsten hexacarbonyl',
      state: 'Solid',
      wasteCode: { code: 'C 6.1', Class: 'Toxic', subclass: '6.1', group: 'III' }
    },
    {
      id: 25,
      name: 'vanadium',
      state: 'Solid',
      wasteCode: { code: 'RD4.1', Class: 'Flammable Solid', subclass: '4.1', group: 'II' }
    },
    {
      id: 26,
      name: 'valyric bromide',
      state: 'Liquid',
      wasteCode: { code: '8', Class: 'Corrosive', subclass: '6.1', group: 'I' }
    }
  ];
  private http = inject(HttpClient);
  private apiUrl = '/api/chemicals';

  private chemicalsSubject = new BehaviorSubject<Chemical[]>(this.mockChemicals);
  chemicals$ = this.chemicalsSubject.asObservable();

  constructor() { }

  getChemicals(): Observable<Chemical[]> {
    return this.chemicals$;
    return this.http.get<Chemical[]>(this.apiUrl);
  }

  getChemicalById(id: number): Chemical | undefined {
    return this.chemicalsSubject.value.find(c => c.id === id);
  getChemicalById(id: number): Observable<Chemical> {
    return this.http.get<Chemical>(`${this.apiUrl}/${id}`);
  }

  searchChemicals(query: { name?: string; wasteCode?: string }): Chemical[] {
    let chemicals = this.chemicalsSubject.value;
  searchChemicals(query: { name?: string; wasteCode?: string }): Observable<Chemical[]> {
    let params = new HttpParams();
    if (query.name) {
      chemicals = chemicals.filter(c => c.name.toLowerCase().includes(query.name!.toLowerCase()));
      params = params.set('name', query.name);
    }
    if (query.wasteCode) {
      chemicals = chemicals.filter(c => c.wasteCode.code.toLowerCase().includes(query.wasteCode!.toLowerCase()));
      params = params.set('wasteCode', query.wasteCode);
    }
    return chemicals;
    return this.http.get<Chemical[]>(`${this.apiUrl}/search`, { params });
  }
}