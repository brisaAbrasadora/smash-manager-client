import { Routes } from '@angular/router';
import { tournamentsResolver } from './resolvers/tournaments.resolver';
import { tournamentDetailResolver } from './resolvers/tournament-detail.resolver';
import { tournamentIdMatcher } from './routing/tournament-id.matcher';

export const TOURNAMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/tournaments-page/tournaments-page.component').then((m) => m.TournamentsPage),
    resolve: {
      tournaments: tournamentsResolver,
    },
    title: 'Torneos | Smash Manager',
  },
  {
    matcher: tournamentIdMatcher,
    loadComponent: () =>
      import('./pages/tournament-detail/tournament-detail.component').then(
        (m) => m.TournamentDetailPage,
      ),
    resolve: {
      tournament: tournamentDetailResolver,
    },
    title: 'Tournament detail | Smash Manager',
  },
];
