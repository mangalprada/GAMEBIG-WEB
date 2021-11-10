import { useState, FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import { db } from '../../firebase/firebaseClient';
import { GamerData } from '../../utilities/types';
import FixedButton from '../UI/Buttons/FixedButton';
import NormalInput from '../UI/Inputs/NormalInput';
import { useUI } from '@/context/uiContext';
import { useAuth } from '@/context/authContext';

const validationSchema = yup.object({
  inGameName: yup.string().required('In Game Name is required'),
  inGameId: yup.string().required('In Game Id is required'),
});

const emptyValues = {
  inGameName: '',
  inGameId: '',
};

type Props = {
  username: string;
  game: {
    gameCode: string;
    name: string;
    imageSource: string;
  };
  oldValues?: GamerData;
  addToCurrentGames: (games: GamerData) => void;
};

const GameForm: FC<Props> = ({
  username,
  game,
  oldValues,
  addToCurrentGames,
}: Props) => {
  const { openSnackBar } = useUI();
  const {
    userData: { uid },
  } = useAuth();

  const saveGame = async (gameData: GamerData) => {
    try {
      await db
        .collection('gamers')
        .add({ username: username, gameCode: game.gameCode, ...gameData });
      openSnackBar({
        label: 'Saved',
        message: `${game.name} added!`,
        type: 'success',
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const updateGame = async (gameData: GamerData) => {
    try {
      await db.collection('gamers').doc(oldValues?.docId).update(gameData);
      openSnackBar({
        label: 'Updated',
        message: `${game.name} updated!`,
        type: 'success',
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      ...emptyValues,
      ...oldValues,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const { inGameId, inGameName } = values;
      setSubmitting(true);
      if (oldValues) {
        updateGame({ uid, inGameId, inGameName });
      } else {
        saveGame({ uid, inGameId, inGameName });
      }
      addToCurrentGames({ ...values, uid });
      setSubmitting(false);
    },
  });

  return (
    <div
      className={
        'flex flex-col items-center w-11/12 mx-auto ' +
        'text-gray-300 font-sans font-semibold my-5 '
      }
    >
      <div className="grid md:grid-cols-3 grid-cols-1 gap-5 w-full">
        <div className="flex flex-col justify-evenly">
          <div className="md:h-44 md:w-44 h-24 w-24 relative rounded-lg mx-auto">
            <Image
              src={game.imageSource}
              alt="Picture of Game"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div
            className={
              'mx-auto text-lg px-4 text-center font-semibold text-gray-300 tracking-wide'
            }
          >
            {game.name}
          </div>
        </div>
        <form className="col-span-2 md:pt-10">
          <div className="flex flex-col justify-around">
            <NormalInput
              name="inGameName"
              placeHolder="In Game Name"
              value={formik.values.inGameName}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.inGameName)}
              errorMessage={formik.errors.inGameName}
            />
            <NormalInput
              name="inGameId"
              placeHolder="In Game ID"
              value={formik.values.inGameId}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.inGameId)}
              errorMessage={formik.errors.inGameId}
            />
          </div>
          <div className="flex justify-end mt-2 mr-1 md:mr-8">
            <FixedButton name="Add Info" onClick={formik.handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
