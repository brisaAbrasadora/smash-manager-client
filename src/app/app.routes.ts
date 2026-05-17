import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tournaments',
  },
  {
    path: 'tournaments',
    loadChildren: () =>
      import('./features/tournaments/tournaments.routes').then((m) => m.TOURNAMENT_ROUTES),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.routes').then((m) => m.NOT_FOUND_ROUTES),
  },
];
