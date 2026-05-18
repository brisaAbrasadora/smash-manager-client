import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TournamentSummary } from '../../models/tournament.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'sm-tournaments-page',
  imports: [RouterLink, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tournaments-page.component.html',
  styleUrl: './tournaments-page.component.scss',
})
export class TournamentsPage {
  protected readonly tournaments = input.required<TournamentSummary[]>();
}
