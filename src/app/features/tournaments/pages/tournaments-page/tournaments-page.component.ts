import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisteredTournaments, TournamentSummary } from '../../models/tournament.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sm-tournaments-page',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tournaments-page.component.html',
  styleUrl: './tournaments-page.component.scss',
})
export class TournamentsPage {
  protected readonly registeredTournaments = input.required<RegisteredTournaments>();
  protected readonly tournaments = input.required<TournamentSummary[]>();

  protected computeFormat(tournament: TournamentSummary): string {
    if (tournament.hasOnlineEvents && tournament.hasOfflineEvents) {
      return 'Mixed';
    }

    if (tournament.hasOnlineEvents) {
      return 'Online';
    }

    return 'Offline';
  }
}
