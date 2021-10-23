import { useState } from 'react';
import router from 'next/router';
import { useFormik } from 'formik';
import DatePicker from '../../UI/Picker/DatePicker';
import TimePicker from '../../UI/Picker/TimePicker';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { GAMES } from '../../../assets/data/Games';
import { MODES, SCREAMS } from '../../../assets/data/Utils';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import SelectRadioButton from '../../UI/Select/SelectRadioButton';
import SliderSelect from '../../UI/Slider/SliderSelect';
import { TournamentFormData } from '../../../utilities/tournament/types';
import { validationSchema } from '../../../utilities/tournament/validator';
import { addNewTournament } from '../../../lib/createTournament';
import { useAuth } from '../../../context/authContext';
import FixedButton from '../../UI/Buttons/FixedButton';
import ResponsiveButton from '../../UI/Buttons/ResponsiveButton';
import FormInput from '../../UI/Inputs/FormInput';
import TextArea from '../../UI/Inputs/TextArea';

const INITIAL_STATE: TournamentFormData = {
  gameCode: 'bgmi-m',
  mode: 'Squad',
  type: 'Custom Room',
  tier: 'T3',
  noOfSlots: 10,
  date: new Date(),
  startTime: '',
  description: '',
  prize: '',
};

export default function CreateTournamentForm() {
  const {
    userData: { linkedOrganizationId, linkedOrganizationName },
  } = useAuth();
  const [isBackDropOpen, setIsBackDropOpen] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: INITIAL_STATE,
    validationSchema: validationSchema,
    onSubmit: async (value: TournamentFormData, { resetForm }) => {
      console.log(value, 'id:', linkedOrganizationId, linkedOrganizationName);
      setIsBackDropOpen(true);
      if (linkedOrganizationId && linkedOrganizationName) {
        const tournId = await addNewTournament(
          linkedOrganizationId,
          linkedOrganizationName,
          value
        );
        if (tournId) {
          router.push(`/organization/${linkedOrganizationId}/tournaments`);
        } else {
          router.push('/404');
        }
      }
      setIsBackDropOpen(false);
      resetForm();
    },
  });

  return (
    <Aux>
      <div
        className={
          'w-full mx-auto mt-6 ' +
          'relative flex flex-col min-w-0 break-words w-full mb-6 ' +
          'shadow-lg rounded-lg border-0'
        }
      >
        <div className="rounded-t-lg bg-gradient-to-tl from-gray-900 to-black mb-0 md:px-7 px-4 py-6 text-center flex justify-between">
          <h6 className="text-white text-2xl font-semibold mt-5 opacity-60">
            Create Custom Room
          </h6>
          <FixedButton
            name="Cancel"
            isDangerous={true}
            onClickHandler={() => router.back()}
          />
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gradient-to-tr from-black to-gray-900">
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="false">
            <div className="mb-6 md:mb-12 w-full md:w-1/2">
              <SelectDropDown
                label="Game Name"
                handleChange={(item) => {
                  formik.setFieldValue('gameCode', item.id);
                }}
                menuItems={GAMES}
                propToShow="name"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <DatePicker
                handleChange={(date: Date) => {
                  formik.setFieldValue('date', date);
                }}
              />
              <TimePicker
                handleChange={(val: string) => {
                  formik.setFieldValue('startTime', val);
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
                max={25}
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
            <ResponsiveButton
              name="Save"
              onClickHandler={formik.handleSubmit}
            />
          </form>
        </div>
      </div>
    </Aux>
  );
}

// todo: show error for textarea for description
