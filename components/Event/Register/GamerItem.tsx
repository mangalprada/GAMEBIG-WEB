import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { db } from '../../../firebase/firebaseClient';
import { GamerData } from '../../../utilities/types';
import FormInput from '../../UI/Inputs/FormInput';

const validationSchema = yup.object({
  inGameName: yup.string().required('In Game Name is required'),
  inGameId: yup.string().required('In Game Id is required'),
});

const emptyValues = {
  inGameName: '',
  inGameId: '',
};

interface Props {
  username: string;
  gameCode: string;
  serialNo?: number;
  updateGamer: (username: string, gameData: GamerData) => void;
}

const GamerItem = ({ username, gameCode, updateGamer, serialNo }: Props) => {
  const formik = useFormik({
    initialValues: emptyValues,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    const getDetails = async () => {
      const gamerArray: GamerData[] = [];
      if (username && gameCode) {
        await db
          .collection('gamers')
          .where('username', '==', username)
          .where('gameCode', '==', gameCode)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const { inGameName, inGameId } = doc.data();
              if (inGameName && inGameId)
                gamerArray.push({ inGameName, inGameId, docId: doc.id });
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      }
      const gamer = gamerArray[0];
      if (gamer && gamer.inGameName && gamer.inGameId) {
        const { inGameName, inGameId } = gamer;
        formik.setValues({ inGameId, inGameName });
      }
    };
    getDetails();
    console.log('GamerItem: useEffect');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCode, username]);

  useEffect(() => {
    const { inGameName, inGameId } = formik.values;
    if (inGameName && inGameId) {
      updateGamer(username, { inGameName, inGameId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.inGameId, formik.values.inGameName, username]);

  return (
    <div className="font-sans text-gray-300">
      {serialNo ? (
        <span className="text-xl text-indigo-600 py-4">Player {serialNo}</span>
      ) : null}
      <FormInput
        labelName="GameBig username"
        name="username"
        isDisabled={true}
        value={username}
        onChangeHandler={formik.handleChange}
      />
      <FormInput
        labelName="In Game Name"
        name="inGameName"
        value={formik.values.inGameName}
        onChangeHandler={formik.handleChange}
        error={Boolean(formik.errors.inGameName)}
        errorMessage={formik.errors.inGameName}
      />
      <FormInput
        labelName="In Game Id"
        name="inGameId"
        value={formik.values.inGameId}
        onChangeHandler={formik.handleChange}
        error={Boolean(formik.errors.inGameId)}
        errorMessage={formik.errors.inGameId}
      />
    </div>
  );
};

export default GamerItem;
