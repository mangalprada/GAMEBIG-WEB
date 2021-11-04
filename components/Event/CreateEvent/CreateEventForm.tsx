import { useState } from 'react';
import router from 'next/router';
import { useFormik } from 'formik';
import TimeDatePicker from '@/components/UI/Picker/TimeDatePicker';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { GAMES } from '../../../assets/data/Games';
import { MODES, SCREAMS } from '../../../assets/data/Utils';
import SelectDropDown from '@/components/UI/Select/SelectDropDown';
import SelectRadioButton from '@/components/UI/Select/SelectRadioButton';
import SliderSelect from '@/components/UI/Slider/SliderSelect';
import { addNewEvent } from '@/libs/createEvent';
import { useAuth } from '@/context/authContext';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import FormInput from '@/components/UI/Inputs/FormInput';
import TextArea from '@/components/UI/Inputs/TextArea';
import { validationSchema } from '@/utilities/eventItem/validator';
import { EventFormData } from '@/utilities/eventItem/types';

const INITIAL_STATE: EventFormData = {
  gameCode: 'bgmi-m',
  mode: 'Squad',
  type: 'Custom Room',
  tier: 'T3',
  noOfSlots: 25,
  startTime: new Date(),
  description: '',
  prize: '',
};

export default function CreateEventForm() {
  const {
    userData: { linkedOrganizationId, linkedOrganizationName },
  } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: validationSchema,
    onSubmit: async (value: EventFormData, { resetForm }) => {
      setIsModalOpen(true);
      if (linkedOrganizationId && linkedOrganizationName) {
        const tournId = await addNewEvent(
          linkedOrganizationId,
          linkedOrganizationName,
          value
        );
        if (tournId) {
          router.push(`/organization/${linkedOrganizationId}/events`);
        } else {
          router.push('/404');
        }
      }
      setIsModalOpen(false);
      resetForm();
    },
  });

  return (
    <Aux>
      <div
        className={
          'md:w-5/6 lg:w-2/3 mx-auto mt-6 ' +
          'relative flex flex-col mb-6 ' +
          'shadow-lg rounded-lg border-0'
        }
      >
        <div
          className={
            'rounded-t-lg bg-gradient-to-tl from-gray-900 to-black ' +
            'mb-0 md:px-7 px-4 py-6 text-center flex justify-between'
          }
        >
          <h6 className="text-white text-2xl font-semibold mt-5 opacity-60">
            Create Custom Room
          </h6>
          <FixedButton
            name="Cancel"
            isDangerous={true}
            onClick={() => router.back()}
          />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gradient-to-tr from-black to-gray-900">
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="false">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <SelectDropDown
                label="Game Name"
                handleChange={(item) => {
                  formik.setFieldValue('gameCode', item.id);
                }}
                menuItems={GAMES}
                propToShow="name"
              />
              <TimeDatePicker
                name="startTime"
                error={false}
                label="Date and Time"
                changeHandler={(date: Date) => {
                  formik.setFieldValue('startTime', date);
                }}
              />
              <SelectRadioButton
                label="Game Mode"
                name="mode"
                value={formik.values.mode}
                handleChange={(item) => {
                  formik.setFieldValue('mode', item.name);
                }}
                items={MODES}
              />
              <SelectRadioButton
                label="Tier"
                name="tier"
                value={formik.values.tier}
                handleChange={(item) => {
                  formik.setFieldValue('tier', item.name);
                }}
                items={SCREAMS}
              />
              <SliderSelect
                label="No of Slots"
                name="noOfSlots"
                value={formik.values.noOfSlots}
                min={2}
                max={formik.values.mode === 'Solo' ? 100 : 25}
                onSlide={(e) =>
                  formik.setFieldValue('noOfSlots', e.target.value)
                }
              />
              <FormInput
                labelName="Prize / Reward (Optional)"
                name="prize"
                placeHolder="100 rupees"
                value={formik.values.prize}
                onChangeHandler={formik.handleChange}
                error={Boolean(formik.errors.prize)}
                errorMessage={formik.errors.prize}
              />
            </div>
            <TextArea
              name="about"
              labelName="Rules for Matches"
              placeHolder="Describe your Rules and Point distribution here"
              value={formik.values.description}
              onChangeHandler={formik.handleChange}
            />
            <ResponsiveButton name="Save" onClick={formik.handleSubmit} />
          </form>
        </div>
      </div>
    </Aux>
  );
}

// todo: show error for textarea for description
