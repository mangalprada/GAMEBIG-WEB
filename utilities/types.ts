export interface User {
  uid: string;
  email?: string | undefined;
  displayName?: string | undefined;
  photoURL?: string | undefined;
}

export interface UserData {
  photoURL?: string | undefined;
  uid: string;
  username: string;
  displayName?: string | undefined;
  dob?: Date | undefined;
  country: string;
  phoneNumber?: string | undefined;
  email?: string | undefined;
  youtubeLink?: string | undefined;
  twitchLink?: string | undefined;
  facebookLink?: string | undefined;
  instagramLink?: string | undefined;
  twitterLink?: string | undefined;
  redditLink?: string | undefined;
}

export interface GameData {
  docId?: string | undefined;
  gameCode?: string | undefined;
  ingamename: string | undefined;
  ingameid: string | undefined;
}

export type TeamType = {
  teamName: string;
  players: Array<string>;
  inGameLead: string;
  docId?: string;
};