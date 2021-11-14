import * as yup from 'yup';

const phoneRegExp = new RegExp(
  [
    '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)',
    '|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$',
  ].join('')
);

export const validationSchema = yup.object({
  name: yup.string().required('Name is Required'),
  category: yup.string().required('For is Required'),
  about: yup.string(),
  location: yup.string().notRequired(),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .length(10, 'Mobile number must be 10 digits long')
    .required('Mobile number is required')
    .matches(phoneRegExp, 'Mobile number is not valid'),
  website: yup.string().url('Enter a valid URL').notRequired(),
  youtube: yup.string().url('Enter a valid URL').notRequired(),
  twitch: yup.string().url('Enter a valid URL').notRequired(),
  facebook: yup.string().url('Enter a valid URL').notRequired(),
  instagram: yup.string().url('Enter a valid URL').notRequired(),
  twitter: yup.string().url('Enter a valid URL').notRequired(),
  reddit: yup.string().url('Enter a valid URL').notRequired(),
  discord: yup.string().url('Enter a valid URL').notRequired(),
});
