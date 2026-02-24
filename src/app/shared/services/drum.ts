import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drum } from '../models/drum.type';
import { DrumContent } from '../models/drum.type';

@Injectable({
  providedIn: 'root'
})
export class DrumService {
  private http = inject(HttpClient);
  private apiUrl = '/api/drums';

  getDrums(): Observable<Drum[]> {
    return this.http.get<Drum[]>(this.apiUrl);
  }

  getDrumById(id: string | number): Observable<Drum> {
    return this.http.get<Drum>(`${this.apiUrl}/${id}`);
  }

  updateDrum(updatedDrum: Partial<Drum> & { id: number }): Observable<Drum> {
    return this.http.put<Drum>(`${this.apiUrl}/${updatedDrum.id}`, updatedDrum);
  }

  searchDrums(query: { drumId?: string; status?: string }): Observable<Drum[]> {
    let params = new HttpParams();
    if (query.drumId) {
      params = params.set('drumId', query.drumId);
    }
    if (query.status) {
      params = params.set('status', query.status);
    }
    return this.http.get<Drum[]>(`${this.apiUrl}/search`, { params });
  }

  createDrum(drum: Drum): Observable<Drum> {
    return this.http.post<Drum>(this.apiUrl, drum);
  }

  addChemicalToDrum(drumId: string, content: DrumContent): Observable<any> {
    return this.http.post(`${this.apiUrl}/${drumId}/chemicals`, content);
  }
}