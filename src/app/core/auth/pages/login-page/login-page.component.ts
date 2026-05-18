import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthSessionService } from '../../auth-session.service';

@Component({
  selector: 'sm-login-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPage {
  private readonly authSession = inject(AuthSessionService);

  protected loginWithStartgg(): void {
    this.authSession.startStartggLogin();
  }
}
