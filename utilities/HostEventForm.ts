import { Descendant } from 'slate';

export const HostEventForm: Record<string, any> = {
  'bgmi-m': {
    form: [
      {
        labelName: 'Type',
        name: 'type',
        formType: 'radio',
        dataType: 'string',
        options: ['Custom Room', 'Classic Tournament', 'TDM Tournament'],
      },
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
    ],
    initialValues: {
      gameCode: 'bgmi-m',
      mode: 'Squad',
      type: 'Custom Room',
      accessibility: 'Open',
      bookingPassword: '',
      tier: 'T3',
      noOfSlots: 25,
      startTime: new Date(),
      idpTime: new Date(),
      description: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        } as Descendant,
      ],
      title: '',
      prize: '',
      entryFee: 0,
    },
  },
  'cod-m': {
    form: [
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
    ],
    initialValues: {
      gameCode: 'cod-m',
      mode: 'Squad',
      type: 'Custom Room',
      accessibility: 'Open',
      bookingPassword: '',
      tier: 'T3',
      title: '',
      noOfSlots: 25,
      startTime: new Date(),
      idpTime: new Date(),
      description: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        } as Descendant,
      ],
      prize: '',
      entryFee: 0,
    },
  },
  'gff-m': {
    form: [
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
    ],
    initialValues: {
      gameCode: 'gff-m',
      mode: 'Squad',
      type: 'Custom Room',
      tier: 'T3',
      accessibility: 'Open',
      title: '',
      bookingPassword: '',
      noOfSlots: 12,
      startTime: new Date(),
      idpTime: new Date(),
      description: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        } as Descendant,
      ],
      prize: '',
      entryFee: 0,
    },
  },
};
