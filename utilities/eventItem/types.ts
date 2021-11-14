export interface EventFormData {
  gameCode: string;
  mode: string;
  type: string;
  tier: string;
  noOfSlots: number;
  startTime: Date;
  description: string;
  prize: string;
}

export interface EventData {
  id: string;
  gameCode: string;
  mode: string;
  type: string;
  tier: string;
  noOfSlots: number;
  startTime: string;
  description: string;
  prize: string;
  createdAt: string;
  linkedPageId: string;
  linkedPageName: string;
  roomId?: string;
  password?: string;
}
