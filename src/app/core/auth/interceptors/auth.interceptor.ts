import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthSessionService } from '../auth-session.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

interface ApiErrorResponse {
  code?: string;
  message?: string;
  timestamp?: string;
}

const AUTH_ENDPOINTS = ['/api/auth/login', '/api/auth/callback', '/api/auth/refresh'];

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const authSession = inject(AuthSessionService);
  const router = inject(Router);

  const isAuthEndpoint = AUTH_ENDPOINTS.some((endpoint) => request.url.startsWith(endpoint));
  const accessToken = authSession.getAccessToken();

  const authenticatedRequest =
    accessToken && request.url.startsWith('/api') && !isAuthEndpoint
      ? request.clone({
          headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
        })
      : request;

  return next(authenticatedRequest).pipe(
    catchError((error: unknown) => {
      if (!isExpiredAccessTokenError(error) || isAuthEndpoint) {
        return throwError(() => error);
      }

      return authSession.refreshAccessToken().pipe(
        switchMap((newAccessToken) =>
          next(
            request.clone({
              headers: request.headers.set('Authorization', `Bearer ${newAccessToken}`),
            }),
          ),
        ),
        catchError((refreshError: unknown) => {
          authSession.clearAccessToken();
          router.navigate(['/login']);
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};

function isExpiredAccessTokenError(error: unknown): error is HttpErrorResponse {
  if (!(error instanceof HttpErrorResponse)) {
    return false;
  }

  const body = error.error as ApiErrorResponse | null;
  return error.status === 401 && body?.code === 'ACCESS_TOKEN_EXPIRED';
}
