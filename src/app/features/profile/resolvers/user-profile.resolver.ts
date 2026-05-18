import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ProfileApiService } from '../data-access/profile-api.service';
import { UserProfile } from '../models/user-profile.model';

export const userProfileResolver: ResolveFn<UserProfile> = () => inject(ProfileApiService).getMe();
