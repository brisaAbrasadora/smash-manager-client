import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  private readonly http = inject(HttpClient);

  getMe(): Observable<UserProfile> {
    return this.http.get<UserProfile>('/api/me');
  }
}
