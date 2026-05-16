import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { TournamentApi } from "../../core/api/tournament-api";
import { AsyncPipe, DatePipe } from "@angular/common";
import { TournamentDetail } from "../../core/models/tournament.model";

@Component({
  selector: 'sm-tournament-detail-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe, AsyncPipe, RouterLink],
   template: `
      <header class="page-header">
        <div>
          <a class="back-link" routerLink="/tournaments">← Volver a torneos</a>
          <h1>{{ tournament().name }}</h1>
          <p>{{ tournament().description || 'Sin descripción.' }}</p>
        </div>
      </header>

      <section class="detail-card" aria-labelledby="tournament-info-title">
        <h2 id="tournament-info-title">Información del torneo</h2>

        <dl>
          <div>
            <dt>Inicio</dt>
            <dd>{{ tournament().startAt | date: 'dd/MM/yyyy' }}</dd>
          </div>

          <div>
            <dt>Fin</dt>
            <dd>{{ 'Sin definir' }}</dd>
          </div>

          <div>
            <dt>Jugadores</dt>
            <dd>{{ 0 }}</dd>
          </div>

          <div>
            <dt>Máximo de jugadores</dt>
            <dd>{{ 'Sin límite' }}</dd>
          </div>

          <div>
            <dt>Formato</dt>
            <dd>{{ tournament().isOnline ? 'Online' : 'Presencial' }}</dd>
          </div>

          <div>
            <dt>Ciudad</dt>
            <dd>{{ tournament().city || 'Sin definir' }}</dd>
          </div>

          <!-- <div>
            <dt>Ruleset</dt>
            <dd>{{ tournament().rulesetName || 'Sin ruleset' }}</dd>
          </div> -->
        </dl>
      </section>
  `,
  styles: `
    .page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .back-link {
      display: inline-flex;
      margin-bottom: 0.75rem;
      color: #4f4f57;
      font-weight: 700;
      text-decoration: none;
    }

    .back-link:hover {
      text-decoration: underline;
    }

    h1 {
      margin: 0;
      font-size: 2rem;
    }

    .page-header p {
      max-width: 48rem;
      margin: 0.5rem 0 0;
      color: #5f5f66;
    }

    .status {
      padding: 0.35rem 0.75rem;
      border-radius: 999px;
      background: #eeeeef;
      font-size: 0.75rem;
      font-weight: 700;
      white-space: nowrap;
    }

    .detail-card {
      padding: 1.5rem;
      border: 1px solid #dedee3;
      border-radius: 0.75rem;
      background: #ffffff;
    }

    h2 {
      margin: 0 0 1rem;
      font-size: 1.25rem;
    }

    dl {
      display: grid;
      gap: 1rem;
      margin: 0;
    }

    dl div {
      display: grid;
      grid-template-columns: minmax(10rem, 16rem) 1fr;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #eeeeef;
    }

    dt {
      color: #66666f;
      font-weight: 700;
    }

    dd {
      margin: 0;
    }
  `,
})
export class TournamentDetailPage {
  private readonly route = inject(ActivatedRoute);
  private readonly tournamentApi = inject(TournamentApi);

  readonly tournament = input.required<TournamentDetail>();
}