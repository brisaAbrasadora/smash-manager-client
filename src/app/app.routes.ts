import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'tournaments',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/pages/login-page/login-page.component').then((m) => m.LoginPage),
    title: 'Login | Smash Manager',
  },
  {
    path: 'tournaments',
    canMatch: [authGuard],
    loadChildren: () =>
      import('./features/tournaments/tournaments.routes').then((m) => m.TOURNAMENT_ROUTES),
  },
  {
    path: 'profile',
    canMatch: [authGuard],
    loadChildren: () => import('./features/profile/profile.routes').then((m) => m.PROFILE_ROUTES),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.routes').then((m) => m.NOT_FOUND_ROUTES),
  },
];
