import { FC } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import SelectDropDown from '../UI/Select/SelectDropDown';
import FormInput from '../UI/Inputs/FormInput';
import TextArea from '../UI/Inputs/TextArea';
import ResponsiveButton from '../UI/Buttons/ResponsiveButton';
import { createNewPost } from '@/libs/teamupQueries';
import { useUI } from '@/context/uiContext';
import { useAuth } from '@/context/authContext';
import { games } from '@/utilities/GameList';
import { teamOpeningsForm } from '@/utilities/TeamOpeningsForm';

type Props = {
  closeModal: () => void;
  gameCode: string;
};

const CreateTeamUpPostForm: FC<Props> = ({ closeModal, gameCode }) => {
  const { openSnackBar } = useUI();
  const { userData } = useAuth();

  const formik = useFormik({
    initialValues: teamOpeningsForm[gameCode].initialValues,
    validationSchema: teamOpeningsForm[gameCode].validationSchema,
    onSubmit: async (values) => {
      const isCreated = await createNewPost({ gameCode, ...values }, userData);
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

  const formInputComponents = teamOpeningsForm[gameCode].forms.map(
    (input: Record<string, any>, index: number) => {
      switch (input.formType) {
        case 'formInput':
          return (
            <section key={index.toString()} className="md:w-5/6">
              <FormInput
                labelName={input.label}
                name={input.name}
                value={formik.values[input.name]}
                onChangeHandler={formik.handleChange}
                placeHolder={input.placeholder}
                error={Boolean(formik.errors[input.name])}
                errorMessage={formik.errors[input.name]}
              />
            </section>
          );
        case 'textArea':
          return (
            <section
              key={index.toString()}
              className="md:w-11/12 md:col-span-2"
            >
              <TextArea
                labelName={input.label}
                placeHolder={input.placeholder}
                name={input.name}
                value={formik.values[input.name]}
                onChangeHandler={formik.handleChange}
              />
            </section>
          );
        case 'dropDown':
          return (
            <section key={index.toString()} className="mb-2 md:w-5/6">
              <SelectDropDown
                label={input.label}
                menuItems={input.dropDownOptions}
                name={input.name}
                handleChange={(item) => formik.setFieldValue(input.name, item)}
              />
              {Boolean(formik.errors[input.name]) ? (
                <span className="text-sm text-red-500 font-semibold tracking-wide ml-2">
                  {formik.errors[input.name]}
                </span>
              ) : (
                <span className="h-7 block"></span>
              )}
            </section>
          );
        default:
          return <></>;
      }
    }
  );

  return (
    <div className="w-11/12 mx-auto bg-gray-800 px-5 py-5 mb-10 rounded-lg">
      <div className="text-indigo-600 font-semibold tracking-wide text-xl uppercase pl-5 mb-8">
        Fill up the details
      </div>
      {/** Game Name and Icon */}
      <div className="flex flex-row space-x-8 w-5/6 mx-auto mb-5">
        <section className="h-16 w-16 md:h-12 md:w-12 relative rounded-lg overflow-hidden">
          <Image
            src={games[gameCode].imageSource}
            alt="Game Logo"
            layout="fill"
            objectFit="contain"
          />
        </section>
        <h5 className="text-indigo-500 text-xl font-semibold tracking-wide my-auto cursor-default">
          {games[gameCode].name}
        </h5>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 md:pl-10 lg:pl-16">
        {/* Dynamic Forms */}
        {formInputComponents}
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

export default CreateTeamUpPostForm;
