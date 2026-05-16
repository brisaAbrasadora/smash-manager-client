import { Routes } from '@angular/router';
import { tournamentsResolver } from './features/tournaments/tournaments.resolver';
import { tournamentDetailResolver } from './features/tournaments/tournament-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tournaments',
    pathMatch: 'full',
  },
  {
    path: 'tournaments',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/tournaments/tournaments-page').then((m) => m.TournamentsPage),
        resolve: {
          tournaments: tournamentsResolver,
        },
        title: 'Torneos | Smash Manager',
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/tournaments/tournament-detail-page').then(
            (m) => m.TournamentDetailPage,
          ),
        resolve: {
          tournament: tournamentDetailResolver,
        },
        title: 'Tournament detail | Smash Manager',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found-page').then((m) => m.NotFoundPage),
    title: 'Page not found | Smash Manager',
  },
];
