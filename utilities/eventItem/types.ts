export interface EventFormData {
  _id?: string;
  gameCode: string;
  mode: string;
  type: string;
  tier: string;
  noOfSlots: number;
  startTime: Date;
  description: string;
  prize: string;
  entryFee: number;
  slots: Record<string, string>;
  bookingPassword?: string;
  accessibility: string;
  streamLink?: string;
  title?: string;
  pageDisplayPicture?: string;
}

export interface EventData {
  _id: string;
  gameCode: string;
  mode: string;
  type: string;
  tier: string;
  noOfSlots: number;
  startTime: string;
  description: string;
  entryFee: number;
  prize: string;
  pageId: string;
  pageName: string;
  roomId?: string;
  password?: string;
  accessibility: string;
  bookingPassword?: string;
  slots: Record<string, string>;
  streamLink?: string;
  title?: string;
  pageDisplayPicture?: string;
}
