export interface Notification {
  docId: string;
  message?: string;
  data?: any;
  type: string;
  isSeen: boolean;
}
