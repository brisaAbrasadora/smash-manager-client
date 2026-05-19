import { ResolveFn } from '@angular/router';
import { RegisteredTournaments } from '../models/tournament.model';
import { inject } from '@angular/core';
import { TournamentApiService } from '../data-access/tournament-api.service';
import { catchError, of } from 'rxjs';

const EMPTY_REGISTERED_TOURNAMENTS: RegisteredTournaments = {
  upcoming: [],
  past: [],
};

export const registeredTournamentSummaryResolver: ResolveFn<RegisteredTournaments> = () => {
  const tournamentApi = inject(TournamentApiService);

  return tournamentApi.findRegistered().pipe(
    catchError((error) => {
      console.error('Error loading registered tournaments', error);
      return of(EMPTY_REGISTERED_TOURNAMENTS);
    }),
  );
};
