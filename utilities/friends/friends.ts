export interface FriendRequest {
  receiver: {
    name: string;
    photoURL: string;
    username: string;
    about?: string;
    games?: string[];
    uid: string;
  };
  sender: {
    name: string;
    photoURL: string;
    username: string;
    about?: string;
    games?: string[];
    uid: string;
  };
  to: string;
  from: string;
  id?: string;
}
