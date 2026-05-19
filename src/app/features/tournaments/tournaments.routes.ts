import { Routes } from '@angular/router';
import { tournamentSummaryResolver } from './resolvers/tournament-summary.resolver';
import { tournamentIdMatcher } from './routing/tournament-id.matcher';
import { tournamentResolver } from './resolvers/tournament.resolver';
import { registeredTournamentSummaryResolver } from './resolvers/registered-tournament-summary.resolver';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/tournaments-page/tournaments-page.component').then((m) => m.TournamentsPage),
    resolve: {
      registeredTournaments: registeredTournamentSummaryResolver,
      tournaments: tournamentSummaryResolver,
    },
    title: 'Torneos | Smash Manager',
  },
  {
    matcher: tournamentIdMatcher,
    loadComponent: () =>
      import('./pages/tournament-detail/tournament-detail.component').then(
        (m) => m.TournamentDetail,
      ),
    resolve: {
      tournament: tournamentResolver,
    },
    title: 'Tournament detail | Smash Manager',
  },
];
