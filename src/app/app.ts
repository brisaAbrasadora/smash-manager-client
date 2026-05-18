import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthSessionService } from './core/auth/auth-session.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('smash-manager-client');

  private readonly authSession = inject(AuthSessionService);
  protected readonly isAuthenticated = computed(() => this.authSession.isAuthenticated());

  protected logout(): void {
    this.authSession.logout();
  }
}
