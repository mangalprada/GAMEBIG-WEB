import { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FormInput from '@/components/UI/Inputs/FormInput';
import SelectDropDown from '@/components/UI/Select/SelectDropDown';
import { TeamType } from '@/utilities/types';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import { db } from 'firebase/firebaseClient';

interface Props {
  participants: TeamType[];
  eventId: string;
}

const positions = [
  { name: 'First', id: 1 },
  { name: 'Second', id: 2 },
  { name: 'Third', id: 3 },
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
    await db
      .collection('events')
      .doc(eventId)
      .collection('winners')
      .doc(position.id)
      .set({ team: winner, prize, position: position.name });
  };

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: validationSchema,
    onSubmit: async (value, { resetForm }) => {
      const { position, winner, prize } = value;
      if (position && winner && prize) {
        saveResults({ position, winner, prize });
        resetForm();
      }
    },
  });

  return (
    <div>
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
          name="Declare Winners"
          type="submit"
          onClick={formik.handleSubmit}
        />
      </div>
    </div>
  );
};

export default EventResultForm;
