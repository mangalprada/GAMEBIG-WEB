export interface TournamentFormData {
  game: string;
  mode: string;
  type: string;
  tier: string;
  noOfSlots: number;
  startTime: Date;
  description: string;
  prize: string;
}

export interface TournamentData {
  id: string;
  game: string;
  mode: string;
  type: string;
  tier: string;
  noOfSlots: number;
  startTime: string;
  description: string;
  prize: string;
  createdAt: string;
}
