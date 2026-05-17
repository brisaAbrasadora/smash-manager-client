// export type TournamentStatus = 'draft' | 'registration_open' | 'in_progress' | 'finished';

export interface TournamentSummary {
  externalId: number;
  name: string;
  city: string;
  // status: TournamentStatus;
  startAt: string;
  url: string;
  isOnline: boolean;
  primaryContact: string;
}

export interface Tournament {
  externalId: number;
  name: string;
  city: string;
  // status: TournamentStatus;
  startAt: string;
  description?: string;
  url: string;
  isOnline: boolean;
  primaryContact: string;
}