import { Routes } from '@angular/router';
import { userProfileResolver } from './resolvers/user-profile.resolver';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/profile-page/profile-page.component').then((m) => m.ProfilePage),
    resolve: {
      profile: userProfileResolver,
    },
    title: 'Perfil | Smash Manager',
  },
];
