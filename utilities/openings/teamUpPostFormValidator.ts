import * as yup from 'yup';

export const validationSchema = yup.object({
  mode: yup.string().required('Select a Mode'),
  perspective: yup.string().required('Select a Perspective'),
  kd: yup
    .number()
    .typeError('K/D must be a number')
    .required('K/D is required'),
  tier: yup.string().required('Select a Tier'),
  averageDamage: yup
    .number()
    .typeError('Average Damage must be a number')
    .required('Average Damage is required'),
  experience: yup
    .number()
    .typeError('Must be a number')
    .required('Experience is required'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required'),
  purpose: yup.string().optional(),
  reason: yup.string().optional(),
  timeAvailability: yup.string().optional(),
  language: yup.string().optional(),
  description: yup.string().optional(),
});
