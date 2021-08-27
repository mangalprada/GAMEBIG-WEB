import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { countries } from '../../utilities/CountryData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
      },
      width: '50%',
      maxWidth: '100%',
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
  })
);

function BasicUserData({
  setPageNumber,
}: {
  setPageNumber: (pageNumber: number) => void;
}) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Formik
        initialValues={{
          userName: '',
          email: '',
          country: '',
          dob: new Date('2014-08-18T21:11:54'),
          phoneNumber: '',
        }}
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
          //   saveUserData(oldValues.uid, values);
          resetForm();
          setPageNumber(2);
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.userName}
            />
            {errors.userName && touched.userName && errors.userName}
            {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date picker dialog"
              format="MM/dd/yyyy"
              value={values.dob}
              onChange={handleChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            {/* </MuiPickersUtilsProvider> */}
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className={styles.button}
            >
              <Typography variant="body1" className={styles.buttonText}>
                Next
              </Typography>
            </Button>
          </form>
        )}
      </Formik>
      <h3>1/2</h3>
    </div>
  );
}

export default BasicUserData;
