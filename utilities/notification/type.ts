export interface NotificationType {
  docId: string;
  message?: string;
  data?: any;
  type: string;
  isSeen: boolean;
}
