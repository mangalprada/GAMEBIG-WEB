import { useState } from 'react';
import router from 'next/router';
import { useFormik } from 'formik';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { GAMES } from '../../../assets/data/Games';
import { MODES, SCREAMS } from '../../../assets/data/Utils';
import SelectDropDown from '../../UI/Select/SelectDropDown';
import SelectRadioButton from '../../UI/Select/SelectRadioButton';
import TimePicker from '../../UI/Picker/TimePicker';
import SliderSelect from '../../UI/Slider/SliderSelect';
import { TournamentFormData } from '../../../utilities/tournament/types';
import { validationSchema } from '../../../utilities/tournament/validator';
import { addNewTournament } from '../../../lib/createTournament';
import { useAuth } from '../../../context/authContext';
import DatePicker from '../../UI/Picker/DatePicker';
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
  startTime: new Date(),
  description: '',
  prize: '',
};

// Todo: add a loading spinner with back drop

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SelectDropDown
                label="Game Name"
                handleChange={(item) => {
                  formik.setFieldValue('gameCode', item.id);
                }}
                menuItems={GAMES}
              />
              <div></div>
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
              <DatePicker
                name="startDate"
                value={formik.values.startTime}
                label="Match Date"
                handleDateChange={(date) =>
                  formik.setFieldValue('startTime', date)
                }
              />
              <TimePicker
                name="startTime"
                value={formik.values.startTime}
                label="Match Start Time"
                handleTimeChange={(date) =>
                  formik.setFieldValue('startTime', date)
                }
              />
              <SliderSelect
                name="noOfSlots"
                value={formik.values.noOfSlots}
                onSlide={(event, value) =>
                  formik.setFieldValue('noOfSlots', value)
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
