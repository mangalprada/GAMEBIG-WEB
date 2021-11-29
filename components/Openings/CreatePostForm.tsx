import { FC } from 'react';
import { useFormik } from 'formik';
import { GAMES } from 'assets/data/Games';
import SelectDropDown from '../UI/Select/SelectDropDown';
import FormInput from '../UI/Inputs/FormInput';
import TextArea from '../UI/Inputs/TextArea';
import ResponsiveButton from '../UI/Buttons/ResponsiveButton';
import { validationSchema } from '@/utilities/join/teamUpPostFormValidator';
import { TeamUpSchemaType } from '@/utilities/join/teamUpTypes';
import { createNewPost } from '@/libs/teamupQueries';
import { useUI } from '@/context/uiContext';
import { useAuth } from '@/context/authContext';

type Props = {
  closeModal: () => void;
};

const MODES = [
  { mode: 'tpp', name: 'TPP' },
  { mode: 'fpp', name: 'FPP' },
];

const CreatePostForm: FC<Props> = ({ closeModal }) => {
  const initialValues: TeamUpSchemaType = {
    gameCode: '',
    mode: '',
    kd: '',
    averageDamage: '',
    age: '',
    experience: '',
    role: '',
    purpose: '',
    timeAvailability: '',
    language: '',
    description: '',
  };

  const { openSnackBar } = useUI();
  const { userData } = useAuth();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const isCreated = await createNewPost(values, userData);
      if (isCreated) {
        openSnackBar({
          type: 'success',
          label: 'Created',
          message: "New 'Join Me' post created!",
        });
      } else {
        openSnackBar({
          type: 'error',
          label: 'Error',
          message: 'Please try after sometime!',
        });
      }
      closeModal();
    },
  });

  return (
    <div className="w-11/12 mx-auto bg-gray-800 px-5 py-5 mb-10 rounded-lg">
      <div className="text-indigo-600 font-semibold tracking-wide text-xl uppercase pl-5 mb-8">
        Fill up the details
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:pl-10 lg:pl-16">
        <section className="mb-2">
          <SelectDropDown
            label="Game Name"
            menuItems={GAMES}
            handleChange={(item) => formik.setFieldValue('gameCode', item.id)}
            propToShow="name"
          />
          {Boolean(formik.errors.gameCode) ? (
            <span className="text-sm text-red-500 font-semibold tracking-wide ml-2">
              {formik.errors.gameCode}
            </span>
          ) : (
            <span className="h-7 block"></span>
          )}
        </section>
        <section className="mb-2">
          <SelectDropDown
            label="Mode"
            menuItems={MODES}
            propToShow="name"
            handleChange={(item) => formik.setFieldValue('mode', item.mode)}
          />
          {Boolean(formik.errors.mode) ? (
            <span className="text-sm text-red-500 font-semibold tracking-wide ml-2">
              {formik.errors.mode}
            </span>
          ) : (
            <span className="h-7 block"></span>
          )}
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="kd"
            labelName="Preferred K/D"
            value={formik.values.kd}
            onChangeHandler={formik.handleChange}
            placeHolder="e.g. - More than 2.5"
            error={Boolean(formik.errors.kd)}
            errorMessage={formik.errors.kd}
          />
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="averageDamage"
            labelName="Preferred Avg. Damage"
            value={formik.values.averageDamage}
            onChangeHandler={formik.handleChange}
            placeHolder="e.g. - More than 800"
            error={Boolean(formik.errors.averageDamage)}
            errorMessage={formik.errors.averageDamage}
          />
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="age"
            labelName="Age (More than)"
            value={formik.values.age}
            onChangeHandler={formik.handleChange}
            placeHolder="e.g. - 21"
            error={Boolean(formik.errors.age)}
            errorMessage={formik.errors.age}
          />
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="experience"
            labelName="Preferred Experience"
            value={formik.values.experience}
            onChangeHandler={formik.handleChange}
            placeHolder="e.g. - 1 year"
            error={Boolean(formik.errors.experience)}
            errorMessage={formik.errors.experience}
          />
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="role"
            labelName="Preferred Role"
            value={formik.values.role}
            onChangeHandler={formik.handleChange}
            placeHolder="e.g. - IGL, Fragger, etc.."
          />
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="timeAvailability"
            labelName="Time Avalability"
            value={formik.values.timeAvailability}
            onChangeHandler={formik.handleChange}
            placeHolder="e.g. - 1:00PM - 10:00PM"
          />
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="language"
            labelName="Preferred Language"
            value={formik.values.language}
            onChangeHandler={formik.handleChange}
            placeHolder="e.g. English, Hindi, Tamil, etc."
          />
        </section>
        <section className="md:w-5/6">
          <FormInput
            name="purpose"
            labelName="Purpose"
            value={formik.values.purpose}
            onChangeHandler={formik.handleChange}
            placeHolder="for rank push, clan, etc.."
          />
        </section>
        <section className="md:w-11/12 md:col-span-2">
          <TextArea
            name="description"
            labelName="Description"
            value={formik.values.description}
            onChangeHandler={formik.handleChange}
            placeHolder={
              'Write something about yourself and, some skills ' +
              '/ quality you want from your team-mate.'
            }
          />
        </section>
      </div>
      <section className="mx-auto w-5/6">
        <ResponsiveButton
          name="Create Post"
          type="button"
          onClick={formik.handleSubmit}
        />
      </section>
    </div>
  );
};

export default CreatePostForm;
