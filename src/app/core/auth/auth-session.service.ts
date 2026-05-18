import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AuthApiService } from './data-access/auth-api.service';

const ACCESS_TOKEN_KEY = 'smash_manager_access_token';

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);

  private readonly accessToken = signal<string | null>(localStorage.getItem(ACCESS_TOKEN_KEY));

  readonly isAuthenticated = computed(() => this.accessToken() !== null);

  getAccessToken(): string | null {
    return this.accessToken();
  }

  startStartggLogin(): void {
    globalThis.location.assign('/api/auth/login');
  }

  refreshAccessToken(): Observable<string> {
    return this.authApi.refresh().pipe(
      tap((response) => this.storeAccessToken(response.token)),
      map((response) => response.token),
    );
  }

  ensureAuthenticated(): Observable<boolean> {
    if (this.accessToken()) {
      return of(true);
    }

    return this.refreshAccessToken().pipe(
      map(() => true),
      catchError(() => {
        this.clearAccessToken();
        return of(false);
      }),
    );
  }

  logout(): void {
    this.authApi
      .logout()
      .pipe(
        catchError(() => of(undefined)),
        tap(() => {
          this.clearAccessToken();
          this.router.navigate(['/login']);
        }),
      )
      .subscribe();
  }

  private storeAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    this.accessToken.set(token);
  }

  clearAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.accessToken.set(null);
  }
}
