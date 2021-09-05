import * as yup from 'yup';

const phoneRegExp = new RegExp(
  [
    '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)',
    '|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$',
  ].join('')
);

export const validationSchema = yup.object({
  name: yup.string().required('Name is Required'),
  about: yup.string(),
  location: yup.string().required('Country name is Required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .required('Mobile number is required')
    .matches(phoneRegExp, 'Contact number is not valid')
    .min(10, 'Too short')
    .max(10, 'Too long'),
  website: yup.string().url('Enter a valid URL').notRequired(),
  youtube: yup.string().url('Enter a valid URL').notRequired(),
  twitch: yup.string().url('Enter a valid URL').notRequired(),
  facebook: yup.string().url('Enter a valid URL').notRequired(),
  instagram: yup.string().url('Enter a valid URL').notRequired(),
  twitter: yup.string().url('Enter a valid URL').notRequired(),
  reddit: yup.string().url('Enter a valid URL').notRequired(),
});
