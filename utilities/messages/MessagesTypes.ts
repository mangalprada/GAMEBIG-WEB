export interface MessageReceiver {
  username: string;
  name: string;
  photoURL: string;
  id?: string;
  uid: string;
}

export type MessageType = {
  id?: string;
  message: string;
  createdAt: any;
  username: string;
  uid: string;
};
