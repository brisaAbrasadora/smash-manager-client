import { ResolveFn } from "@angular/router";
import { TournamentSummary } from "../../core/models/tournament.model";
import { inject } from "@angular/core";
import { TournamentApi } from "../../core/api/tournament-api";
import { catchError, of } from "rxjs";

export const tournamentsResolver: ResolveFn<TournamentSummary[]> = () => {
  const tournamentApi = inject(TournamentApi);

  return tournamentApi.findAll().pipe(
    catchError(() => of([])),
  );
}