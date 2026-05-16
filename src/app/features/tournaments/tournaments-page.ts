import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { TournamentApi } from "../../core/api/tournament-api";
import { RouterLink } from "@angular/router";
import { TournamentSummary } from "../../core/models/tournament.model";

@Component({
  selector: 'sm-tournaments-page',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-header">
      <div>
        <h1>Torneos</h1>
        <p>Gestiona los torneos sincronizados con Smash Manager.</p>
      </div>

      <a class="primary-action" routerLink="/tournaments/new">
        Crear torneo
      </a>
    </header>

    @if (tournaments(); as tournaments) {
      @if (tournaments.length > 0) {
        <section class="tournament-grid" aria-label="Listado de torneos">
          @for (tournament of tournaments; track tournament.externalId) {
            <article class="tournament-card">
              <header>
                <h2>
                  <a [routerLink]="['/tournaments', tournament.externalId]">
                    {{ tournament.name }}
                  </a>
                </h2>

                <!-- <span class="status">
                  {{ tournament.status }}
                </span> -->
              </header>

              <dl>
                <div>
                  <dt>Inicio</dt>
                  <dd>{{ tournament.startAt }}</dd>
                </div>

                <div>
                  <dt>Jugadores</dt>
                  <dd>{{ 0 }}</dd>
                </div>

                <div>
                  <dt>Formato</dt>
                  <dd>{{ tournament.isOnline ? 'Online' : 'Offline' }}</dd>
                </div>

                @if (tournament.city) {
                  <div>
                    <dt>City</dt>
                    <dd>{{ tournament.city }}</dd>
                  </div>
                }
              </dl>

              <a class="secondary-action" [routerLink]="['/tournaments', tournament.externalId]">
                See in detail
              </a>
            </article>
          }
        </section>
      } @else {
        <p>No hay torneos todavía.</p>
      }
    }
  `,
   styles: `
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .page-header h1 {
      margin: 0;
      font-size: 2rem;
    }

    .page-header p {
      margin: 0.5rem 0 0;
      color: #5f5f66;
    }

    .primary-action,
    .empty-state a {
      display: inline-flex;
      align-items: center;
      min-height: 2.5rem;
      padding: 0 1rem;
      border-radius: 0.5rem;
      background: #181818;
      color: #ffffff;
      font-weight: 700;
      text-decoration: none;
      white-space: nowrap;
    }

    .primary-action:hover,
    .empty-state a:hover {
      background: #303030;
    }

    .tournament-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1rem;
    }

    .tournament-card {
      display: grid;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #dedee3;
      border-radius: 0.75rem;
      background: #ffffff;
    }

    .card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
    }

    h2 {
      margin: 0;
      font-size: 1.125rem;
    }

    h2 a {
      text-decoration: none;
    }

    h2 a:hover {
      text-decoration: underline;
    }

    .card-header p {
      margin: 0.25rem 0 0;
      color: #66666f;
      font-size: 0.875rem;
    }

    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 999px;
      background: #eeeeef;
      font-size: 0.75rem;
      font-weight: 700;
      white-space: nowrap;
    }

    dl {
      display: grid;
      gap: 0.75rem;
      margin: 0;
    }

    dl div {
      display: flex;
      justify-content: space-between;
      gap: 1rem;
    }

    dt {
      color: #66666f;
      font-weight: 600;
    }

    dd {
      margin: 0;
      text-align: right;
    }

    .secondary-action {
      justify-self: start;
      color: #181818;
      font-weight: 700;
    }

    .empty-state {
      padding: 2rem;
      border: 1px solid #dedee3;
      border-radius: 0.75rem;
      background: #ffffff;
    }

    .empty-state h2 {
      margin: 0;
    }

    .empty-state p {
      margin: 0.5rem 0 1.5rem;
      color: #5f5f66;
    }
  `,
})
export class TournamentsPage {
  private readonly tournamentApi = inject(TournamentApi);

  protected readonly tournaments = input.required<TournamentSummary[]>();
}