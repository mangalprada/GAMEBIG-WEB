import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { db } from '../../../firebase/firebaseClient';
import { TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Team/createTeam';
import GamerDetails from './GamerDetails';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import FixedButton from '../../UI/Buttons/FixedButton';
import Modal from '@/components/UI/Modal/Modal';
import { useUI } from '@/context/uiContext';
import * as yup from 'yup';
import { EventData } from '@/utilities/eventItem/types';
import FormInput from '@/components/UI/Inputs/FormInput';
import { useFormik } from 'formik';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';

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
  teamSize,
  setIsRegistered,
  setTeamId,
}: Props) {
  const {
    userData: { uid },
  } = useAuth();
  const formik = useFormik({
    initialValues: { phoneNumber: '', teamName: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { teamName, phoneNumber } = values;
      await db
        .collection('events')
        .doc(eventData.id)
        .collection('participants')
        .add({
          teamName,
          phoneNumber,
          uids: [uid],
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
          labelName="Phone Number"
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
