export interface User {
  uid: string;
  email?: string | undefined;
  name: string;
  photoURL?: string | undefined;
  linkedOrgId?: string | null | undefined;
}

export interface BasicUserType {
  docId?: string;
  uid: string;
  username: string;
  name?: string;
  photoURL?: string | undefined;
}

export interface UserData {
  docId?: string;
  photoURL?: string | undefined;
  uid: string;
  username: string;
  name?: string | undefined;
  dob?: Date | undefined;
  about?: string;
  location?: string;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  youtubeLink?: string | undefined;
  twitchLink?: string | undefined;
  facebookLink?: string | undefined;
  instagramLink?: string | undefined;
  twitterLink?: string | undefined;
  redditLink?: string | undefined;
  linkedOrganizationId?: string | null;
  linkedOrganizationName?: string | null;
  fcmToken?: string | null;
  games?: string[];
}

export interface GamerData {
  docId?: string | undefined;
  gameCode?: string | undefined;
  inGameName: string | undefined;
  inGameId: string | undefined;
  username?: string | undefined;
  uid: string;
  kd?: string | undefined;
  highestTier?: string | undefined;
  damage?: string | undefined;
  kills?: string | undefined;
  about?: string | undefined;
}
export interface TeamType {
  teamName: string;
  gamers: BasicUserType[];
  inGameLead: string;
  uids: string[];
  docId?: string;
}
