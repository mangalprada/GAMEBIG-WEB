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

export const gameTiers = {
  'bgmi-m': [
    { value: 10, name: 'Bronze' },
    { value: 20, name: 'Silver' },
    { value: 30, name: 'Gold' },
    { value: 40, name: 'Platinum' },
    { value: 50, name: 'Diamond' },
    { value: 60, name: 'Crown' },
    { value: 70, name: 'Ace' },
    { value: 80, name: 'Ace Master' },
    { value: 90, name: 'Conqueror' },
  ],
  'cod-m': [
    { value: 10, name: 'Rookie' },
    { name: 'Veteran', value: 20 },
    { name: 'Elite', value: 30 },
    { name: 'Pro', value: 40 },
    { name: 'Master', value: 50 },
    { name: 'Grand Master', value: 60 },
    { name: 'Legendary', value: 70 },
  ],
  'gff-m': [
    { name: 'Bronze', value: 10 },
    { name: 'Silver', value: 20 },
    { name: 'Platinum', value: 30 },
    { name: 'Diamond', value: 40 },
    { name: 'Heroic', value: 50 },
    { name: 'Grand Master', value: 60 },
  ],
} as Record<string, any>;
