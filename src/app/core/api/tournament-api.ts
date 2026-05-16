import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TournamentDetail, TournamentSummary } from "../models/tournament.model";

@Injectable({providedIn: 'root'})
export class TournamentApi {
  private readonly http = inject(HttpClient);

  findAll(): Observable<TournamentSummary[]> {
    return this.http.get<TournamentSummary[]>('/api/tournaments');
  }

  findById(id: number): Observable<TournamentDetail> {
    return this.http.get<TournamentDetail>(`/api/tournaments/${id}`);
  }

  
}