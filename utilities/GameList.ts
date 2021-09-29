export const games = {
  'bgmi-m': {
    imageSource:
      'https://play-lh.googleusercontent.com/jwL7aqLp7v_7owPxf30e41MCggN-ot3MeP3zxbIMVKdiGkUs33jmGW7c7QmYxMFamHSj=s180-rw',
    name: 'Battlegrounds Mobile India',
    shortName: 'BGMI',
    gameCode: 'bgmi-m',
  },
  'cod-m': {
    imageSource:
      'https://play-lh.googleusercontent.com/r42Js__Kw3TM5-vAG-1LdGZWjJD9-K52i32aXp92SCddIklg0XP5eAisge-pG0qRPkfk=s180-rw',
    name: 'Call of Duty: Mobile',
    shortName: 'CODM',
    gameCode: 'cod-m',
  },
  'gff-m': {
    imageSource:
      'https://play-lh.googleusercontent.com/k9mpwqPYChfePRtUlTSEkX73TCDnwyvSkD5AvsdUTAQ4H0c2OAIEiiiUwrVEd7_k1E8=s180-rw',
    name: 'Garena Free Fire',
    shortName: 'Free Fire',
    gameCode: 'gff-m',
  },
} as Record<
  string,
  {
    imageSource: string;
    name: string;
    shortName: string;
    gameCode: string;
  }
>;
