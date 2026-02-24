import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Chemical } from '../models/chemical.type';

@Injectable({
  providedIn: 'root'
})
export class ChemicalService {
  private http = inject(HttpClient);
  private apiUrl = '/api/chemicals';

  getChemicals(): Observable<Chemical[]> {
    return this.http.get<Chemical[]>(this.apiUrl);
  }

  getChemicalById(id: number): Observable<Chemical> {
    return this.http.get<Chemical>(`${this.apiUrl}/${id}`);
  }

  searchChemicals(query: { name?: string; wasteCode?: string }): Observable<Chemical[]> {
    let params = new HttpParams();
    if (query.name) {
      params = params.set('name', query.name);
    }
    if (query.wasteCode) {
      params = params.set('wasteCode', query.wasteCode);
    }
    return this.http.get<Chemical[]>(`${this.apiUrl}/search`, { params });
  }
}