import { useState, useCallback } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import SnackbarAlert from '../Snackbar';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAuth } from '../../context/authContext';
import { countries } from '../../utilities/CountryData';
import { debounce } from '../../utilities/functions';

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

function BasicUserData({ userData, setUserData }) {
  const styles = useStyles();
  const { setAuthPageNumber, createUser, isUserNameTaken } = useAuth();
  // useUseformik hook and pass values.username
  const debounceOnChange = useCallback(debounce(isUserNameTaken, 300), []);
  const [showError, setShowError] = useState(false);

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <div className={styles.root}>
      <Formik
        initialValues={userData}
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
          createUser(values);
          setUserData(values);
          resetForm();
          setAuthPageNumber(3);
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
          <form className={styles.form} onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="userName"
              label="UserName"
              variant="outlined"
              onChange={(e) => {
                handleChange(e);
                const isTaken = debounceOnChange(e.target.value);
                // if (isTaken) setShowError(true);
              }}
              onBlur={handleBlur}
              value={values.userName}
            />
            {errors.userName && touched.userName && errors.userName}
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
              defaultValue={values.country}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className={styles.button}
            >
              <Typography variant="body1" className={styles.buttonText}>
                Save and Continue
              </Typography>
            </Button>
          </form>
        )}
      </Formik>
      <h3 className={styles.text}>1/2</h3>
      <SnackbarAlert
        vertical="bottom"
        horizontal="center"
        open={showError}
        onClose={handleClose}
        autoHideDuration={5000}
        message="UserName is taken!"
        severity="warning"
      />
    </div>
  );
}

export default BasicUserData;
