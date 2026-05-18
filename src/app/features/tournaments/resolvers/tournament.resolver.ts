import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Tournament } from '../models/tournament.model';
import { inject } from '@angular/core';
import { TournamentApiService } from '../data-access/tournament-api.service';

export const tournamentResolver: ResolveFn<Tournament> = (route: ActivatedRouteSnapshot) => {
  const tournamentApi = inject(TournamentApiService);
  const tournamentId = Number(route.paramMap.get('id'));

  return tournamentApi.findById(tournamentId);
};
