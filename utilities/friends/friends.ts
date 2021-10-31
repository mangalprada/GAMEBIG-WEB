export interface FriendRequest {
  receiver: {
    photoURL: string;
    username: string;
    about: string;
    games: string[];
    uid: string;
  };
  sender: {
    photoURL: string;
    username: string;
    about: string;
    games: string[];
    uid: string;
  };
  to: string;
  from: string;
  id?: string;
}
