export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  country: string | null;
  phoneNumber: string | null;
}

export interface UserData {
  name: string | null;
  dob: string | null;
  country: string | null;
  phoneNumber: string | null;
  email: string | null;
  youtubeLink: string | null;
  twitchLink: string | null;
  facebookLink: string | null;
  instagramLink: string | null;
  twitterLink: string | null;
  redditLink: string | null;
}
