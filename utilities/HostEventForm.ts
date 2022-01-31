import { Descendant } from 'slate';

export const HostEventForm: Record<string, any> = {
  'bgmi-m': {
    form: [
      {
        labelName: 'Type',
        name: 'type',
        formType: 'radio',
        dataType: 'string',
        options: ['Custom Room', 'Classic Tournament'],
      },
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
      {
        labelName: 'Tier',
        name: 'tier',
        formType: 'radio',
        dataType: 'string',
        options: ['T1', 'T2', 'T3'],
      },
    ],
    initialValues: {
      gameCode: 'bgmi-m',
      mode: 'Squad',
      type: 'Custom Room',
      tier: 'T3',
      noOfSlots: 25,
      startTime: new Date(),
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
  'cod-m': {
    form: [
      {
        labelName: 'Game Mode',
        name: 'mode',
        formType: 'radio',
        dataType: 'string',
        options: ['Solo', 'Duo', 'Squad'],
      },
      {
        labelName: 'Tier',
        name: 'tier',
        formType: 'radio',
        dataType: 'string',
        options: ['T1', 'T2', 'T3'],
      },
    ],
    initialValues: {
      gameCode: 'cod-m',
      mode: 'Squad',
      type: 'Custom Room',
      tier: 'T3',
      noOfSlots: 25,
      startTime: new Date(),
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
      {
        labelName: 'Tier',
        name: 'tier',
        formType: 'radio',
        dataType: 'string',
        options: ['T1', 'T2', 'T3'],
      },
    ],
    initialValues: {
      gameCode: 'gff-m',
      mode: 'Squad',
      type: 'Custom Room',
      tier: 'T3',
      noOfSlots: 12,
      startTime: new Date(),
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
