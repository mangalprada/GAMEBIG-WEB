import * as yup from 'yup';

export const validationSchema = yup.object({
  gameCode: yup.string().required('Select a Game'),
  mode: yup.string().required('Select a Mode'),
  kd: yup.number().required('K/D must be a number'),
  averageDamage: yup.number().required('Average Damage must be a number'),
  age: yup.number().required('Age must be a number'),
  experience: yup.number().required('Must be a number'),
  purpose: yup.string().optional(),
  reason: yup.string().optional(),
  timeAvailability: yup.string().optional(),
  language: yup.string().optional(),
  description: yup.string().optional(),
});
