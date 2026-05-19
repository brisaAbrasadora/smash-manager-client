import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisteredTournaments, Tournament, TournamentSummary } from '../models/tournament.model';

@Injectable({ providedIn: 'root' })
export class TournamentApiService {
  private readonly http = inject(HttpClient);

  findAll(): Observable<TournamentSummary[]> {
    return this.http.get<TournamentSummary[]>('/api/tournaments');
  }

  findById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`/api/tournaments/${id}`);
  }

  findRegistered(): Observable<RegisteredTournaments> {
    return this.http.get<RegisteredTournaments>('/api/tournaments/registered');
  }
}
