export interface Chat extends InputChat {
  id: string;
  createdAt: any;
}

export interface InputChat {
  userName: string;
  uid: string;
  msg: string;
  subHeader: string | undefined;
}
