import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response.model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  refresh(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('/api/auth/refresh', null, {
      withCredentials: true,
    });
  }

  logout(): Observable<void> {
    return this.http.post<void>('/api/auth/logout', null, {
      withCredentials: true,
    });
  }
}
