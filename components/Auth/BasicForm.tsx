import { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SnackbarAlert from '../Snackbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAuth } from '../../context/authContext';
import { countries } from '../../utilities/CountryList';
import { UserData } from '../../utilities/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
      },
      width: '100%',
      maxWidth: '800px',
      background: theme.palette.background.paper,
    },
    form: { display: 'flex', flexDirection: 'column' },
    button: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    text: { marginLeft: '48%' },
  })
);

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
    .matches(usernameRegExp, 'username can contain only letters and numbers')
    .required('username is required'),
  dob: yup
    .date()
    .default(function () {
      return new Date();
    })
    .required('Date of Birth is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .length(10, 'Phone number must be 10 digits long')
    .required('Phone number is required'),
  country: yup.string().required('Country is required'),
});

type Props = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

function BasicForm({ userData, setUserData }: Props) {
  const styles = useStyles();
  const {
    user,
    updateAuthPageNumber,
    updateDisplayName,
    createUser,
    updateUser,
    isUsernameTaken,
  } = useAuth();
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      const isTaken = await isUsernameTaken(values.username);
      if (isTaken) {
        setErrors({ username: 'This username is taken!' });
      } else {
        updateUser({ ...user, username: values.username });
        createUser(values);
        setUserData(values);
        updateDisplayName(values.username);
        updateAuthPageNumber(3);
      }
      setSubmitting(false);
    },
  });

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
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
          label="Phone Number"
          variant="outlined"
          placeholder="123-456-7890"
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          className={styles.button}
        >
          <Typography variant="body1" className={styles.buttonText}>
            Save and Continue
          </Typography>
        </Button>
      </form>
      <h3 className={styles.text}>1/2</h3>
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

export default BasicForm;
