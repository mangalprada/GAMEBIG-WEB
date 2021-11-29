export interface Notification {
  docId: string;
  message: string;
  data?: string;
  type: string;
  isSeen: boolean;
}
