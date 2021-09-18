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
import SnackbarAlert from '../UI/Snackbar/SnackBar';
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

const usernameRegExp = /^[a-zA-Z0-9-_]{0,40}$/;

const validationSchema = yup.object({
  username: yup
    .string()
    .matches(usernameRegExp, 'username can contain only letters and numbers')
    .required('username is required'),
});

type Props = {
  userData: UserData;
  setUserData: (userData: UserData) => void;
};

function BasicForm({ userData, setUserData }: Props) {
  const classes = useStyles();
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
    <div className={classes.root}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={formik.isSubmitting}
          className={classes.button}
        >
          <Typography variant="body1" className={classes.buttonText}>
            Save and Continue
          </Typography>
        </Button>
      </form>
      <h3 className={classes.text}>1/2</h3>
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
