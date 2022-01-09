import { Dispatch, SetStateAction } from 'react';
import { useAuth } from '../../../context/authContext';
import * as yup from 'yup';
import { EventData } from '@/utilities/eventItem/types';
import FormInput from '@/components/UI/Inputs/FormInput';
import { useFormik } from 'formik';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import axios from 'axios';
const { BASE_URL } = process.env;

interface Props {
  teamSize: number;
  eventData: EventData;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
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

export default function BasicEventRegistrationForm({
  eventData,
  setIsRegistered,
}: Props) {
  const {
    userData: { uid, name, photoURL, username },
  } = useAuth();
  const formik = useFormik({
    initialValues: { phoneNumber: '', teamName: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { teamName, phoneNumber } = values;

      axios.post(`${BASE_URL}/api/participants`, {
        data: {
          createdAt: new Date(),
          eventId: eventData._id,
          teamName,
          phoneNumber,
          users: [{ uid, name, photoURL, username }],
        },
      });
      axios.put(`${BASE_URL}/api/events`, {
        _id: eventData._id,
        data: { $inc: { noOfSlots: -1 } },
      });
      setIsRegistered(true);
    },
  });

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
