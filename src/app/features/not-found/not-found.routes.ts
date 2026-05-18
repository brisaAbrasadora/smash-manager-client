import { Routes } from '@angular/router';

export const NOT_FOUND_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/not-found-page/not-found-page.component').then((m) => m.NotFoundPage),
    title: 'Page not found | Smash Manager',
  },
];
