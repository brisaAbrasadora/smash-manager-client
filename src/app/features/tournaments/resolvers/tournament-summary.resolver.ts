import { ResolveFn } from '@angular/router';
import { TournamentSummary } from '../models/tournament.model';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { TournamentApiService } from '../data-access/tournament-api.service';

export const tournamentSummaryResolver: ResolveFn<TournamentSummary[]> = () => {
  const tournamentApi = inject(TournamentApiService);

  return tournamentApi.findAll().pipe(catchError(() => of([])));
};
