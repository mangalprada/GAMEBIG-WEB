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
  const initialValues = {
    inGameId: '',
    inGameName: '',
    kd: '',
    highestTier: '',
    damage: '',
    kills: '',
    about: '',
  };

  const {
    userData: { username, uid },
  } = useAuth();

  const { openSnackBar } = useUI();

  const formik = useFormik({
    initialValues: { ...initialValues, ...gameData },
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
          <FormInput
            labelName="In Game ID [REQUIRED]"
            name="inGameId"
            value={formik.values.inGameId}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="In Game Name [REQUIRED]"
            name="inGameName"
            value={formik.values.inGameName}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="K/D [OPTIONAL]"
            name="kd"
            placeHolder="3.2"
            value={formik.values.kd}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="Highest Tier Reached [OPTIONAL]"
            name="highestTier"
            value={formik.values.highestTier}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="Highest Damage [OPTIONAL]"
            name="damage"
            placeHolder="1234"
            value={formik.values.damage}
            onChangeHandler={formik.handleChange}
          />
          <FormInput
            labelName="Highest Kills [OPTIONAL]"
            name="kills"
            placeHolder="10"
            value={formik.values.kills}
            onChangeHandler={formik.handleChange}
          />
          <div className="sm:col-span-2">
            <TextArea
              labelName="Your achievements / speciality"
              placeHolder={
                'e.g -\n' +
                "I'm a Sniperer with decent mid-combat skills and excellent in throwables." +
                '\nOwn 2019 PUBGM global championship squad mode, by playing with Awsome Esports.'
              }
              name="about"
              value={formik.values.about}
              onChangeHandler={formik.handleChange}
            />
          </div>
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
