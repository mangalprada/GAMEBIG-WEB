import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import { db } from '../../firebase/firebaseClient';
import SnackbarAlert from '../UI/Snackbar/SnackBar';
import { GamerData } from '../../utilities/types';
import FixedButton from '../UI/Buttons/FixedButton';
import FormInput from '../UI/Inputs/FormInput';

const validationSchema = yup.object({
  ingamename: yup.string().required('In Game Name is required'),
  ingameid: yup.string().required('In Game Id is required'),
});

const emptyValues = {
  ingamename: '',
  ingameid: '',
};

function GameForm({
  isUpdating,
  username,
  game,
  oldValues,
  addToCurrentGames,
}: {
  isUpdating: boolean;
  username: string;
  game: {
    gameCode: string;
    name: string;
    imageSource: string;
  };
  oldValues?: GamerData;
  addToCurrentGames: (games: GamerData) => void;
}) {
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });

  const handleSnackbarClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const saveGame = async (gameData: {
    ingamename: string;
    ingameid: string;
  }) => {
    try {
      await db
        .collection('gamers')
        .add({ username: username, gameCode: game.gameCode, ...gameData });
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `${game.name} added!`,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const updateGame = async (gameData: {
    ingamename: string;
    ingameid: string;
  }) => {
    try {
      await db.collection('gamers').doc(oldValues?.docId).update(gameData);
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `${game.name} updated!`,
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
    onSubmit: (values, { setSubmitting, resetForm }) => {
      const { ingameid, ingamename } = values;
      setSubmitting(true);
      if (isUpdating) {
        updateGame({ ingameid, ingamename });
      } else {
        saveGame({ ingameid, ingamename });
      }
      addToCurrentGames(values);
      resetForm();
      setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col justify-center items-center text-gray-300 font-sans font-semibold">
      <span className="">{game.name}</span>
      <div className="flex justify-center items-center w-full">
        <div className="h-40 w-40 relative rounded-lg">
          <Image
            src={game.imageSource}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <form className="flex flex-col justify-center items-center w-full">
          <FormInput
            labelName="In Game Name"
            name="ingamename"
            value={formik.values.ingamename}
            onChangeHandler={formik.handleChange}
            error={Boolean(formik.errors.ingamename)}
            errorMessage={formik.errors.ingamename}
          />
          <FormInput
            labelName="In Game Id"
            name="ingameid"
            value={formik.values.ingameid}
            onChangeHandler={formik.handleChange}
            error={Boolean(formik.errors.ingameid)}
            errorMessage={formik.errors.ingameid}
          />
          <FixedButton name="Save" onClickHandler={formik.handleSubmit} />
        </form>
      </div>
      <SnackbarAlert
        vertical="bottom"
        horizontal="right"
        open={snackbarData.open}
        onClose={handleSnackbarClose}
        autoHideDuration={5000}
        message={snackbarData.message}
        severity={snackbarData.severity}
      />
    </div>
  );
}

export default GameForm;
