import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import SnackbarAlert from '../UI/Snackbar/SnackBar';
import { useAuth } from '../../context/authContext';
import { UserData } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import { isUsernameTaken, saveUser } from '@/libs/user';

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
  const { updateAuthPageNumber } = useAuth();
  const [showError, setShowError] = useState(false);

  const formik = useFormik({
    initialValues: userData,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      const isTaken = await isUsernameTaken(values.username, userData.uid);
      if (isTaken) {
        setErrors({ username: 'This username is taken!' });
      } else {
        setUserData(values);
        saveUser(values);
        updateAuthPageNumber(3);
      }
      setSubmitting(false);
    },
  });

  const handleClose = () => {
    setShowError(false);
  };

  return (
    <div
      className={
        'flex flex-col mb-10 px-10 md:px-32  md:w-3/5 pt-20 font-san font-semibold ' +
        'rounded-lg bg-gradient-to-tl from-gray-900 via-black to-gray-900'
      }
    >
      <form className="flex justify-center ">
        <FormInput
          labelName="username"
          name="username"
          value={formik.values.username}
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.username)}
          errorMessage={formik.errors.username}
        />
      </form>
      <div className="flex justify-center">
        <FixedButton onClick={formik.handleSubmit} name="Continue" />
      </div>
      <SnackbarAlert
        open={showError}
        onClose={handleClose}
        autoHideDuration={5000}
        message={{ label: 'Taken!', message: 'username is taken' }}
        type="warning"
      />
    </div>
  );
}

export default BasicForm;
