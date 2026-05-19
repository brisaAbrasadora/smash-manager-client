import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisteredTournaments, TournamentSummary } from '../../models/tournament.model';

type TournamentsTab = 'registered' | 'spain';

const INITIAL_PAST_TOURNAMENTS_LIMIT = 6;
const PAST_TOURNAMENTS_INCREMENT = 6;

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

  protected readonly activeTab = signal<TournamentsTab>('registered');
  protected readonly pastTournamentsLimit = signal(INITIAL_PAST_TOURNAMENTS_LIMIT);

  protected readonly visiblePastTournaments = computed(() =>
    this.registeredTournaments().past.slice(0, this.pastTournamentsLimit()),
  );

  protected readonly hasHiddenPastTournaments = computed(
    () => this.registeredTournaments().past.length > this.visiblePastTournaments().length,
  );

  protected selectTab(tab: TournamentsTab): void {
    this.activeTab.set(tab);
  }

  protected showMorePastTournaments(): void {
    this.pastTournamentsLimit.update((currentLimit) => currentLimit + PAST_TOURNAMENTS_INCREMENT);
  }

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
