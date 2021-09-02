import { useCallback, useState } from 'react';
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
import { debounce } from '../../utilities/functions';
import SnackbarAlert from '../Snackbar';
import { UserData } from '../../utilities/types';
import { db } from '../../firebase/config';
import { countries } from '../../utilities/CountryData';

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
const userIdRegExp = /^[a-zA-Z0-9-_]{0,40}$/;

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  userId: yup
    .string()
    .matches(userIdRegExp, 'UserId can only contain letters and numbers')
    .required('UserId is required'),
  dob: yup.date().required('Date of Birth is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
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
  const { isUserIdTaken } = useAuth();
  const styles = useStyles();
  const [showError, setShowError] = useState(false);
  const formik = useFormik({
    initialValues: oldValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      saveUserData(oldValues.uid, values);
      resetForm();
      setSubmitting(false);
    },
  });
  const debounceOnChange = useCallback(debounce(isUserIdTaken, 300), [
    formik.values.userId,
  ]);

  const handleClose = () => {
    setShowError(false);
  };

  const saveUserData = async (uid: string, userData: UserData) => {
    try {
      await db.collection('users').doc(uid).update(userData);
    } catch (err) {
      console.log('err', err);
    } finally {
      push(`/profile/${uid}`);
    }
  };

  return (
    <div className={styles.root}>
      <Link href={`/profile/${oldValues.uid}`} passHref>
        <Button
          color="primary"
          startIcon={<ArrowBackRounded color="primary" />}
        >
          Go Back
        </Button>
      </Link>
      <Typography variant="h5" className={styles.header}>
        Update Your Profile
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="text"
          name="userId"
          label="UserId"
          variant="outlined"
          onChange={(e) => {
            formik.handleChange(e);
            const isTaken = debounceOnChange(e.target.value);
            if (isTaken !== null) setShowError(true);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.userId}
          error={formik.touched.userId && Boolean(formik.errors.userId)}
          helperText={formik.touched.userId && formik.errors.userId}
        />
        <TextField
          type="text"
          name="displayName"
          label="Name"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.displayName}
          error={
            formik.touched.displayName && Boolean(formik.errors.displayName)
          }
          helperText={formik.touched.displayName && formik.errors.displayName}
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
          label="Phone Number (with Country Code)"
          variant="outlined"
          placeholder="+1 (123) 456-7890"
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
          className={styles.button}
        >
          <Typography variant="body1" className={styles.buttonText}>
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
        message="UserId is taken!"
        severity="warning"
      />
    </div>
  );
}

export default ProfileForm;
