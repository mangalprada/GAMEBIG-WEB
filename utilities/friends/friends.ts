export interface FriendRequest {
  receiver: {
    name: string;
    photoURL: string;
    username: string;
    games?: string[];
    uid: string;
  };
  sender: {
    name: string;
    photoURL: string;
    username: string;
    games?: string[];
    uid: string;
  };
  senderUid: string;
  receiverUid: string;
  id?: string;
}

export type ProfileCardData = {
  photoURL?: string;
  name?: string;
  username: string;
  games: string[];
  uid: string;
  receiverUid?: string;
  id?: string;
};
