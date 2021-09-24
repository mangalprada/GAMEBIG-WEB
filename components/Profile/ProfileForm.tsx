import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAuth } from '../../context/authContext';
import SnackbarAlert from '../UI/Snackbar/SnackBar';
import { UserData } from '../../utilities/types';
import { db } from '../../firebase/firebaseClient';
import { countries } from '../../utilities/CountryList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
      },
    },
    header: {
      marginTop: 15,
      marginBottom: 15,
    },
    button: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
  })
);

type Props = {
  oldValues: UserData;
  push: (path: string) => void;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const usernameRegExp = /^[a-zA-Z0-9-_]{0,40}$/;

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  username: yup
    .string()
    .matches(usernameRegExp, 'username can only contain letters and numbers')
    .required('username is required'),
  name: yup
    .string()
    .matches(usernameRegExp, 'username can only contain letters and numbers'),
  dob: yup.date().required('Date of Birth is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .length(10, 'Phone number must be 10 digits long')
    .required('Phone number is required'),
  country: yup.string().required('Country is required'),
  youtubeLink: yup.string().url(),
  twitchLink: yup.string().url(),
  facebookLink: yup.string().url(),
  instagramLink: yup.string().url(),
  twitterLink: yup.string().url(),
  redditLink: yup.string().url(),
});

function ProfileForm({ oldValues, push }: Props) {
  const { isUsernameTaken, updateDisplayName } = useAuth();
  const classes = useStyles();
  const [showError, setShowError] = useState(false);
  const formik = useFormik({
    initialValues: oldValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      setSubmitting(true);
      const isTaken = await isUsernameTaken(values.username);
      if (isTaken) {
        setErrors({ username: 'This username is taken!' });
      } else {
        saveUserData(oldValues.username, values);
        resetForm();
      }
      setSubmitting(false);
    },
  });

  const handleClose = () => {
    setShowError(false);
  };

  const saveUserData = async (username: string, userData: UserData) => {
    updateDisplayName(userData.username);
    try {
      await db.collection('users').doc(oldValues.docId).update(userData);
    } catch (err) {
      console.log('err', err);
    } finally {
      push(`/profile/${username}`);
    }
  };

  return (
    <div className={classes.root}>
      <Link href={`/profile/${oldValues.username}`} passHref>
        <Button
          color="primary"
          startIcon={<ArrowBackRounded color="primary" />}
        >
          Go Back
        </Button>
      </Link>
      <Typography variant="h5" className={classes.header}>
        Update Your Profile
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          disabled
          type="text"
          name="username"
          label="username"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          type="text"
          name="name"
          label="Name"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          id="dob"
          label="Birthday"
          type="date"
          defaultValue="2017-05-24"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dob}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
        />
        <Autocomplete
          disabled
          options={countries}
          getOptionLabel={(option) => option.name}
          onChange={(e, value) => {
            if (value) {
              formik.setFieldValue('country', value.name);
            }
          }}
          defaultValue={{ name: formik.values.country }}
          renderInput={(params) => (
            <TextField {...params} label="Country" variant="outlined" />
          )}
        />
        <TextField
          name="phoneNumber"
          label="Phone Number"
          variant="outlined"
          placeholder="9876543210"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phoneNumber}
          error={
            formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
          }
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
        />
        <TextField
          type="email"
          name="email"
          label="Email"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          type="url"
          name="youtubeLink"
          label="Youtube Link"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.youtubeLink}
          error={
            formik.touched.youtubeLink && Boolean(formik.errors.youtubeLink)
          }
          helperText={formik.touched.youtubeLink && formik.errors.youtubeLink}
        />
        <TextField
          type="url"
          name="twitchLink"
          label="Twitch Link"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.twitchLink}
          error={formik.touched.twitchLink && Boolean(formik.errors.twitchLink)}
          helperText={formik.touched.twitchLink && formik.errors.twitchLink}
        />
        <TextField
          type="url"
          name="facebookLink"
          label="Facebook Link"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.facebookLink}
          error={
            formik.touched.facebookLink && Boolean(formik.errors.facebookLink)
          }
          helperText={formik.touched.facebookLink && formik.errors.facebookLink}
        />
        <TextField
          type="url"
          name="instagramLink"
          label="Instagram Link"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.instagramLink}
          error={
            formik.touched.instagramLink && Boolean(formik.errors.instagramLink)
          }
          helperText={
            formik.touched.instagramLink && formik.errors.instagramLink
          }
        />
        <TextField
          type="url"
          name="twitterLink"
          label="Twitter Link"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.twitterLink}
          error={
            formik.touched.twitterLink && Boolean(formik.errors.twitterLink)
          }
          helperText={formik.touched.twitterLink && formik.errors.twitterLink}
        />
        <TextField
          type="url"
          name="redditLink"
          label="Reddit Link"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.redditLink}
          error={formik.touched.redditLink && Boolean(formik.errors.redditLink)}
          helperText={formik.touched.redditLink && formik.errors.redditLink}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          className={classes.button}
        >
          <Typography variant="body1" className={classes.buttonText}>
            Save Changes
          </Typography>
        </Button>
      </form>
      <SnackbarAlert
        vertical="bottom"
        horizontal="center"
        open={showError}
        onClose={handleClose}
        autoHideDuration={5000}
        message="username is taken!"
        severity="warning"
      />
    </div>
  );
}

export default ProfileForm;
