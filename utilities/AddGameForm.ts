export const addGamesforms: Record<string, any> = {
  'bgmi-m': {
    forms: [
      {
        labelName: 'In Game Name (REQUIRED)',
        name: 'inGameName',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'In Game Name',
      },
      {
        labelName: 'In Game ID (REQUIRED)',
        name: 'inGameId',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'In Game ID',
      },
      {
        labelName: 'K/D',
        name: 'kd',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '3.2',
      },
      {
        labelName: 'Highest Tier Reached',
        name: 'highestTier',
        formType: 'dropDown',
        dropDownOptions: [
          'Bronze',
          'Silver',
          'Gold',
          'Platinum',
          'Diamond',
          'Crown',
          'Ace',
          'Ace Master',
          'Conqueror',
        ],
        dataType: 'string',
      },
      {
        labelName: 'Highest Damage',
        name: 'damage',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '800',
      },
      {
        labelName: 'Highest Kills',
        name: 'kills',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '10',
      },
      {
        labelName: 'Your achievements / speciality',
        name: 'about',
        formType: 'textArea',
        dataType: 'string',
        placeholder:
          'e.g -\n' +
          "I'm a Sniperer with decent mid-combat skills and excellent in throwables." +
          '\nOwn 2019 PUBGM global championship squad mode, by playing with Awsome Esports.',
      },
    ],
    // Initial Values
    initialValues: {
      inGameId: '',
      inGameName: '',
      kd: '',
      highestTier: '',
      damage: '',
      kills: '',
      about: '',
    },
    // Validation Schema
    validationSchema: undefined,
  },

  'cod-m': {
    forms: [
      {
        labelName: 'In Game Name (REQUIRED)',
        name: 'inGameName',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'In Game Name',
      },
      {
        labelName: 'In Game ID (REQUIRED)',
        name: 'inGameId',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'In Game ID',
      },
      {
        labelName: 'K/D',
        name: 'kd',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '3.2',
      },
      {
        labelName: 'Highest Tier Reached',
        name: 'highestTier',
        formType: 'dropDown',
        dropDownOptions: [
          'Rookie',
          'Veteran',
          'Elite',
          'Pro',
          'Master',
          'Grand Master',
          'Legendary',
        ],
        dataType: 'string',
      },
      {
        labelName: 'Highest Damage',
        name: 'damage',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '800',
      },
      {
        labelName: 'Highest Kills',
        name: 'kills',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '10',
      },
      {
        labelName: 'Your achievements / speciality',
        name: 'about',
        formType: 'textArea',
        dataType: 'string',
        placeholder:
          'e.g -\n' +
          "I'm a Sniperer with decent mid-combat skills and excellent in throwables." +
          '\nOwn 2019 COD Asia region global championship squad mode, playing under Awsome Esports.',
      },
    ],
    // Initial Values
    initialValues: {
      inGameId: '',
      inGameName: '',
      kd: '',
      highestTier: '',
      damage: '',
      kills: '',
      about: '',
    },
    // Validation Schema
    validationSchema: undefined,
  },

  'gff-m': {
    forms: [
      {
        labelName: 'In Game Name (REQUIRED)',
        name: 'inGameName',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'In Game Name',
      },
      {
        labelName: 'In Game ID (REQUIRED)',
        name: 'inGameId',
        formType: 'formInput',
        dataType: 'string',
        placeholder: 'In Game ID',
      },
      {
        labelName: 'K/D',
        name: 'kd',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '3.2',
      },
      {
        labelName: 'Highest Tier Reached',
        name: 'highestTier',
        formType: 'dropDown',
        dropDownOptions: [
          'Bronze',
          'Silver',
          'Platinum',
          'Diamond',
          'Heroic',
          'Grand Master',
        ],
        dataType: 'string',
      },
      {
        labelName: 'Highest Damage',
        name: 'damage',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '800',
      },
      {
        labelName: 'Highest Kills',
        name: 'kills',
        formType: 'formInput',
        dataType: 'number',
        placeholder: '10',
      },
      {
        labelName: 'Your achievements / speciality',
        name: 'about',
        formType: 'textArea',
        dataType: 'string',
        placeholder:
          'e.g -\n' +
          "I'm a Sniperer with decent mid-combat skills and excellent in throwables." +
          '\nReacher Grand Master for two seasons',
      },
    ],
    // Initial Values
    initialValues: {
      inGameId: '',
      inGameName: '',
      kd: '',
      highestTier: '',
      damage: '',
      kills: '',
      about: '',
    },
    // Validation Schema
    validationSchema: undefined,
  },
};
