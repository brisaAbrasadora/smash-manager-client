import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Tournament } from '../../models/tournament.model';

@Component({
  selector: 'sm-tournament-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, RouterLink],
  templateUrl: './tournament-detail.component.html',
  styleUrl: './tournament-detail.component.scss',
})
export class TournamentDetail {
  readonly tournament = input.required<Tournament>();

  protected readonly format = computed(() => {
    if (this.tournament().hasOnlineEvents && this.tournament().hasOfflineEvents) {
      return 'Mixed';
    } else if (this.tournament().hasOnlineEvents) {
      return 'Online';
    } else {
      return 'Offline';
    }
  });
}
