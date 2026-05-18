import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthSessionService } from '../auth-session.service';
import { map } from 'rxjs';

export const authGuard: CanMatchFn = () => {
  const authSession = inject(AuthSessionService);
  const router = inject(Router);

  return authSession
    .ensureAuthenticated()
    .pipe(map((isAuthenticated) => isAuthenticated || router.createUrlTree(['/login'])));
};
