export interface User {
  uid: string;
  email: string | undefined;
  displayName: string | undefined;
  photoURL: string | undefined;
  country: string | undefined;
  phoneNumber: string | undefined;
}

export interface UserData {
  photoURL: string | undefined;
  uid: string;
  displayName: string | undefined;
  name: string | undefined;
  dob: string | undefined;
  country: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
  youtubeLink: string | undefined;
  twitchLink: string | undefined;
  facebookLink: string | undefined;
  instagramLink: string | undefined;
  twitterLink: string | undefined;
  redditLink: string | undefined;
}
