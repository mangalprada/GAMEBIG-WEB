export interface Notification {
  docId?: string;
  message: string;
  data?: string;
  type: string;
  isRead: boolean;
}
