import { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormInput from '@/components/UI/Inputs/FormInput';
import SelectDropDown from '@/components/UI/Select/SelectDropDown';
import { TeamType } from '@/utilities/types';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import { db } from 'firebase/firebaseClient';
import axios from 'axios';

interface Props {
  participants: TeamType[];
  eventId: string;
}

const positions = [
  { name: 'Rank 1', id: 1 },
  { name: 'Rank 2', id: 2 },
  { name: 'Rank 3', id: 3 },
  { name: 'Rank 4', id: 4 },
  { name: 'Rank 5', id: 5 },
  { name: 'Rank 6', id: 6 },
  { name: 'Rank 7', id: 7 },
  { name: 'Rank 8', id: 8 },
  { name: 'Rank 9', id: 9 },
  { name: 'Rank 10', id: 10 },
];

const INITIAL_STATE = {
  winner: null,
  prize: '',
  position: null,
};

export const validationSchema = yup.object({
  prize: yup.string(),
});

const EventResultForm = ({ participants, eventId }: Props) => {
  const saveResults = async ({ position, prize, winner }: any) => {
    axios.put(`${process.env.BASE_URL}/api/events`, {
      data: { $push: { winners: winner } },
    });
  };

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: validationSchema,
    onSubmit: async (value, { resetForm }) => {
      const { position, winner, prize } = value;
      console.log({ position, winner, prize });

      if (position && winner) {
        resetForm();
      }
    },
  });

  return (
    <div>
      <h5 className="text-xl font-medium tracking-wide text-gray-400 ml-3">
        Announce The Winners
      </h5>
      <div className="grid md:grid-cols-2 md:gap-4 mx-6">
        <SelectDropDown
          name="position"
          label="Position"
          menuItems={positions}
          propToShow="name"
          handleChange={(item) => {
            formik.setFieldValue('position', item);
          }}
        />
        <SelectDropDown
          name="winner"
          label="Winner"
          menuItems={participants}
          propToShow="teamName"
          handleChange={(item) => {
            formik.setFieldValue('winner', item);
          }}
        />
        <div className="w-full">
          <FormInput
            name="prize"
            labelName="Prize"
            onChangeHandler={(e: ChangeEvent) => {
              const target = e.target as HTMLInputElement;
              formik.setFieldValue('prize', target.value);
            }}
            value={formik.values.prize}
          />
        </div>
      </div>
      <div className="mx-8">
        <FixedButton
          name="Announce"
          type="submit"
          onClick={formik.handleSubmit}
        />
      </div>
    </div>
  );
};

export default EventResultForm;
