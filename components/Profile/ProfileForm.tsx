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
import { Formik } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

function ProfileForm({ oldValues, push }: Props) {
  const styles = useStyles();

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
      <Formik
        initialValues={oldValues}
        validate={(values) => {
          const errors = {};
          if (
            values.email &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          saveUserData(oldValues.uid, values);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="displayName"
              label="Name"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.displayName}
            />
            {errors.displayName && touched.displayName && errors.displayName}
            <TextField
              id="dob"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.dob}
            />
            {errors.dob && touched.dob && errors.dob}
            <Autocomplete
              options={countries}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                if (value) {
                  setFieldValue('country', value.name);
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="Country" variant="outlined" />
              )}
            />
            {errors.country && touched.country && errors.country}
            <TextField
              name="phoneNumber"
              label="Phone Number (with Country Code)"
              variant="outlined"
              placeholder="+1 (123) 456-7890"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
            />
            {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
            <TextField
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <TextField
              type="url"
              name="youtubeLink"
              label="Youtube Link"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.youtubeLink}
            />
            {errors.youtubeLink && touched.youtubeLink && errors.youtubeLink}
            <TextField
              type="url"
              name="twitchLink"
              label="Twitch Link"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.twitchLink}
            />
            {errors.twitchLink && touched.twitchLink && errors.twitchLink}
            <TextField
              type="url"
              name="facebookLink"
              label="Facebook Link"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.facebookLink}
            />
            {errors.facebookLink && touched.facebookLink && errors.facebookLink}
            <TextField
              type="url"
              name="instagramLink"
              label="Instagram Link"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.instagramLink}
            />
            {errors.instagramLink &&
              touched.instagramLink &&
              errors.instagramLink}
            <TextField
              type="url"
              name="twitterLink"
              label="Twitter Link"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.twitterLink}
            />
            {errors.twitterLink && touched.twitterLink && errors.twitterLink}
            <TextField
              type="url"
              name="redditLink"
              label="Reddit Link"
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.redditLink}
            />
            {errors.redditLink && touched.redditLink && errors.redditLink}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className={styles.button}
            >
              <Typography variant="body1" className={styles.buttonText}>
                Save Changes
              </Typography>
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default ProfileForm;
