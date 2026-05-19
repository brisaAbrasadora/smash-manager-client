// export type TournamentStatus = 'draft' | 'registration_open' | 'in_progress' | 'finished';

export interface TournamentSummary {
  externalId: number;
  name: string;
  city: string;
  // status: TournamentStatus;
  startAt: string;
  url: string;
  hasOfflineEvents: boolean;
  hasOnlineEvents: boolean;
  primaryContact: string;
}

export interface RegisteredTournaments {
  upcoming: TournamentSummary[];
  past: TournamentSummary[];
}

export interface Tournament extends TournamentSummary {
  description?: string;
}
