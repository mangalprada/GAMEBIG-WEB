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
  location: yup.string(),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phone: yup
    .string()
    .length(10, 'Mobile number must be 10 digits long')
    .required('Mobile number is required')
    .matches(phoneRegExp, 'Mobile number is not valid'),
  website: yup.string().url('Enter a valid URL'),
  youtube: yup.string().url('Enter a valid URL'),
  twitch: yup.string().url('Enter a valid URL'),
  facebook: yup.string().url('Enter a valid URL'),
  instagram: yup.string().url('Enter a valid URL'),
  twitter: yup.string().url('Enter a valid URL'),
  reddit: yup.string().url('Enter a valid URL'),
  discord: yup.string().url('Enter a valid URL'),
});
