import { ActivatedRouteSnapshot, ResolveFn } from "@angular/router";
import { TournamentDetail } from "../../core/models/tournament.model";
import { inject } from "@angular/core";
import { TournamentApi } from "../../core/api/tournament-api";

export const tournamentDetailResolver: ResolveFn<TournamentDetail> = (
  route: ActivatedRouteSnapshot,
) => {
  const tournamentApi = inject(TournamentApi);
  const tournamentId = Number(route.paramMap.get('id'));

  return tournamentApi.findById(tournamentId);
}