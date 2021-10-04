export interface Chat extends InputChat {
  id: string;
  createdAt: string;
}

export interface InputChat {
  userName: string;
  userId: string;
  msg: string;
  subHeader: string | undefined;
}
