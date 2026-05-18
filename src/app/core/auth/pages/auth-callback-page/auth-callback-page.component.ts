import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AuthSessionService } from '../../auth-session.service';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'sm-auth-callback-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth-callback-page.component.html',
})
export class AuthCallbackPage implements OnInit {
  private readonly authSession = inject(AuthSessionService);
  private readonly router = inject(Router);

  protected readonly failed = signal(false);

  ngOnInit(): void {
    this.authSession
      .refreshAccessToken()
      .pipe(
        tap(() => this.router.navigate(['/tournaments'])),
        catchError(() => {
          this.failed.set(true);
          return of(undefined);
        }),
      )
      .subscribe();
  }
}
