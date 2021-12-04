import { Dispatch, FC, SetStateAction } from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import ResponsiveButton from '../UI/Buttons/ResponsiveButton';
import TextButton from '../UI/Buttons/TextButton';
import FormInput from '../UI/Inputs/FormInput';
import TextArea from '../UI/Inputs/TextArea';
import { games } from '@/utilities/GameList';
import { GamerData } from '@/utilities/types';
import { saveGamerData } from '@/libs/gamerData';
import router from 'next/router';
import { useAuth } from '@/context/authContext';
import { useUI } from '@/context/uiContext';
import { addGamesforms } from '@/utilities/AddGameForm';
import SelectDropDown from '../UI/Select/SelectDropDown';

type Props = {
  updatePage: (page: number) => void;
  gameCode: string;
  setGame: Dispatch<SetStateAction<string>>;
  gameData: GamerData;
  closeModal: () => void;
};

const GameDetails: FC<Props> = ({
  updatePage,
  gameCode,
  setGame,
  gameData,
  closeModal,
}) => {
  const {
    userData: { username, uid },
  } = useAuth();

  const { openSnackBar } = useUI();

  const formik = useFormik({
    initialValues: { ...addGamesforms[gameCode].initialValues, ...gameData },
    onSubmit: (values) => {
      saveGamerData(values, gameCode, uid);
    },
  });

  function backClicked() {
    updatePage(1);
    setGame('');
  }

  function onSaveHandler() {
    formik.handleSubmit();
    closeModal();
    router.push(`/profile/${username}`);
    openSnackBar({
      type: 'success',
      label: 'Saved',
      message: 'Game data saved successfully!',
    });
  }

  const formInputComponents = addGamesforms[gameCode].forms.map(
    (input: Record<string, any>, index: number) => {
      switch (input.formType) {
        case 'formInput':
          return (
            <section key={index.toString()}>
              <FormInput
                labelName={input.labelName}
                name={input.name}
                value={formik.values[input.name]}
                onChangeHandler={formik.handleChange}
                placeHolder={input.placeholder}
              />
            </section>
          );
        case 'textArea':
          return (
            <section key={index.toString()} className="sm:col-span-2">
              <TextArea
                labelName={input.labelName}
                placeHolder={input.placeholder}
                name={input.name}
                value={formik.values[input.name]}
                onChangeHandler={formik.handleChange}
              />
            </section>
          );
        case 'dropDown':
          return (
            <section key={index.toString()}>
              <SelectDropDown
                label={input.labelName}
                menuItems={input.dropDownOptions}
                name={input.name}
                handleChange={(item) => formik.setFieldValue(input.name, item)}
              />
            </section>
          );
        default:
          return <></>;
      }
    }
  );

  return (
    <div className="relative w-11/12 mx-auto mb-10">
      <section className="flex justify-start absolute -top-20 md:left-5">
        <TextButton name="Back" type="fail" onClick={backClicked} />
      </section>
      <div className="w-5/6 mx-auto">
        {/** Game Name and Icon */}
        <div className="flex flex-row space-x-8">
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

        {/** Form Input */}
        <p className="font-semibold text-gray-600 mt-7 mb-5 cursor-default">
          Fill the details below and let others know how cool you are 😎
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:gap-x-10 gap-x-5">
          {formInputComponents}
        </section>
      </div>

      {/** Submit Button */}
      <section className="bottom-5 w-5/6 mx-auto">
        <ResponsiveButton name="Save" onClick={onSaveHandler} type="button" />
      </section>
    </div>
  );
};

export default GameDetails;
