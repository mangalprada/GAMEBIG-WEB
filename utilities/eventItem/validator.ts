import * as yup from 'yup';

export const validationSchema = yup.object({
  game: yup.string(),
  mode: yup.string(),
  type: yup.string(),
  tier: yup.string(),
  noOfSlots: yup.number().moreThan(1),
  startTime: yup.date(),
  // .required('Write a small description about this match'),
  prize: yup.string(),
  entryFee: yup.number(),
});

//todo
