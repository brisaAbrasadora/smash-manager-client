import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { UserProfile } from '../../models/user-profile.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sm-profile-page',
  imports: [NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePage {
  protected readonly profile = input.required<UserProfile>();

  protected readonly avatarLoadFailed = signal(false);
  protected readonly bannerLoadFailed = signal(false);

  protected readonly displayName = computed(() => {
    const profile = this.profile();
    return profile.gamerTag ?? profile.name ?? 'Usuario autenticado';
  });

  protected readonly fullGamerTag = computed(() => {
    const profile = this.profile();

    if (!profile.gamerTag) {
      return null;
    }

    return profile.prefix ? `${profile.prefix} | ${profile.gamerTag}` : profile.gamerTag;
  });

  protected readonly avatarUrl = computed(() => {
    if (this.avatarLoadFailed()) {
      return null;
    }

    return this.profile().images.find((image) => image.type === 'profile')?.url ?? null;
  });

  protected readonly bannerUrl = computed(() => {
    if (this.bannerLoadFailed()) {
      return null;
    }

    return this.profile().images.find((image) => image.type === 'banner')?.url ?? null;
  });

  protected markAvatarAsFailed(): void {
    this.avatarLoadFailed.set(true);
  }

  protected markBannerAsFailed(): void {
    this.bannerLoadFailed.set(true);
  }
}
