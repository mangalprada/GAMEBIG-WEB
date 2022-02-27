import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useAuth } from '../../../context/authContext';
import * as yup from 'yup';
import FormInput from '@/components/UI/Inputs/FormInput';
import { useFormik } from 'formik';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import axios from 'axios';
import { useUI } from '@/context/uiContext';
import LoadingLottie from '@/components/UI/Loaders/Dots';

const { BASE_URL } = process.env;

interface Props {
  teamSize: number;
  eventId: string;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
  setBookingdetails: Dispatch<SetStateAction<any>>;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  teamName: yup.string().required('Team Name is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Only add your 10 digit mobile number')
    .length(10, 'Phone number must be 10 digits long')
    .required('Phone Number can not be empty'),
});

export default function TdmRegistrationForm({
  eventId,
  setIsRegistered,
  setBookingdetails,
}: Props) {
  const {
    userData: { uid, name, photoURL, username },
  } = useAuth();

  const { openSnackBar } = useUI();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      teamName: '',
      inGameName: '',
      inGameId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const { teamName, phoneNumber } = values;
      const data = {
        createdAt: new Date(),
        eventId: eventId,
        phoneNumber,
        teamName,
        users: [{ uid, name, photoURL, username }],
      };
      const response: any = await axios.post(`${BASE_URL}/api/participants`, {
        data,
      });
      openSnackBar({
        label: `${response.data.message}`,
        message: '',
        type: response.data.success ? 'success' : 'error',
      });
      setIsLoading(false);
      if (response.data.success) {
        setBookingdetails(data);
        setIsRegistered(true);
        if (Notification.permission !== 'granted') {
          openSnackBar({
            label: 'Notification Permission Required',
            message:
              'Please allow notifications to receive ROOM ID and PASSWORD',
            type: 'warning',
          });
        }
      }
    },
  });

  if (isLoading) {
    return (
      <div className="my-4 md:my-16">
        <LoadingLottie height={100} width={200} />
      </div>
    );
  }

  return (
    <div
      id="register"
      className="flex flex-col font-sans font-semibold text-gray-300 px-4 mx-auto w-11/12 md:w-2/3"
    >
      <label className="font-sans font-semibold text-2xl text-indigo-600 py-5">
        Book a slot To Partcipate
      </label>
      <form className="flex flex-col justify-center ">
        <FormInput
          labelName="Team Name"
          name="teamName"
          value={formik.values.teamName}
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.teamName)}
          errorMessage={formik.errors.teamName}
        />
        <FormInput
          labelName="Phone Number(WhatsApp)"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          placeHolder="10 digit e.g. - 9876543210"
          onChangeHandler={formik.handleChange}
          error={Boolean(formik.errors.phoneNumber)}
          errorMessage={formik.errors.phoneNumber}
        />
      </form>
      <ResponsiveButton
        name="Book My Slot"
        type="submit"
        isDisabled={formik.isSubmitting}
        onClick={formik.handleSubmit}
      />
    </div>
  );
}
