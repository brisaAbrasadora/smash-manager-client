import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tournament, TournamentSummary } from "../models/tournament.model";

@Injectable({providedIn: 'root'})
export class TournamentApiService {
  private readonly http = inject(HttpClient);

  findAll(): Observable<TournamentSummary[]> {
    return this.http.get<TournamentSummary[]>('/api/tournaments');
  }

  findById(id: number): Observable<Tournament> {
    return this.http.get<Tournament>(`/api/tournaments/${id}`);
  }

  
}