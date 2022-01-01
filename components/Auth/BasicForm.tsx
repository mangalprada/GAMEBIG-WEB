import { useFormik } from 'formik';
import * as yup from 'yup';
import localforage from 'localforage';
import { useAuth } from '../../context/authContext';
import { UserData } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import { useUI } from '@/context/uiContext';
import { isUsernameTaken, createUser } from '@/libs/user';
import EditAvatar from '../UI/Avatar/EditAvatar';
import { db } from 'firebase/firebaseClient';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const usernameRegExp = /^[a-zA-Z0-9-_]{0,40}$/;
const validationSchema = yup.object({
  username: yup
    .string()
    .matches(usernameRegExp, 'username can contain only letters and numbers')
    .required('username is required'),
  name: yup.string().required('Name is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .length(10, 'Only Add your 10 digit phone number'),
});

type Props = {
  setData: (userData: UserData) => void;
};

function BasicForm({ setData }: Props) {
  const { updateAuthPageNumber, setUserData, userData } = useAuth();
  const { openSnackBar } = useUI();

  const formik = useFormik({
    initialValues: { ...userData, phoneNumber: userData.phoneNumber || '' },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      const isTaken = await isUsernameTaken(values.username, userData.uid);
      if (isTaken) {
        setErrors({ username: 'This username is taken!' });
        openSnackBar({
          label: 'Taken!',
          message: 'username is taken',
          type: 'warning',
        });
      } else {
        const data = { ...userData, ...values };
        setUserData(data);
        setData(data);
        createUser(data);
        updateAuthPageNumber(3);
        localforage.setItem('user', {
          uid: userData.uid,
          username: values.username,
        });
      }
      setSubmitting(false);
    },
  });

  return (
    <div
      className={
        'mb-16 px-10 md:px-32 md:w-1/2 pt-5 font-san font-semibold ' +
        'rounded-lg bg-gradient-to-tl from-gray-900 via-black to-gray-900'
      }
    >
      <div className="flex justify-center">
        <EditAvatar />
      </div>
      <form className="flex flex-col justify-center ">
        <FormInput
          labelName="username"
          name="username"
          value={formik.values.username}
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.username)}
          errorMessage={formik.errors.username}
        />
        <FormInput
          labelName="Full Name"
          name="name"
          value={formik.values.name}
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.name)}
          errorMessage={formik.errors.name}
        />
      </form>
      <FormInput
        labelName="Phone Number(Optional)"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        placeHolder="10 digit e.g. - 9876543210"
        onChangeHandler={formik.handleChange}
        error={Boolean(formik.errors.phoneNumber)}
        errorMessage={formik.errors.phoneNumber}
      />
      <div className="flex justify-center">
        <FixedButton
          onClick={formik.handleSubmit}
          type="submit"
          name="Continue"
        />
      </div>
    </div>
  );
}

export default BasicForm;
