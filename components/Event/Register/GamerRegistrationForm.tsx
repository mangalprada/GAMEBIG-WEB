import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { db } from '../../../firebase/firebaseClient';
import { BasicUserType, GamerData } from '../../../utilities/types';
import FormInput from '../../UI/Inputs/FormInput';
import HorizontalProfile from '@/components/Profile/HorizontalProfile';

const validationSchema = yup.object({
  inGameName: yup.string().required('In Game Name is required'),
  inGameId: yup.string().required('In Game Id is required'),
});

const emptyValues = {
  inGameName: '',
  inGameId: '',
};

interface Props {
  gamer: BasicUserType;
  gameCode: string;
  serialNo?: number;
  updateGamer: (username: string, gameData: GamerData) => void;
}

const GamerRegistrationForm = ({
  gamer,
  gameCode,
  updateGamer,
  serialNo,
}: Props) => {
  const { uid, username, name, photoURL } = gamer;
  const formik = useFormik({
    initialValues: emptyValues,
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    const getDetails = async () => {
      const gamerArray: GamerData[] = [];
      if (uid && gameCode) {
        await db
          .collection('gamers')
          .where('uid', '==', uid)
          .where('gameCode', '==', gameCode)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const { inGameName, inGameId } = doc.data();
              if (inGameName && inGameId)
                gamerArray.push({ uid, inGameName, inGameId, docId: doc.id });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCode]);

  useEffect(() => {
    const { inGameName, inGameId } = formik.values;
    if (inGameName && inGameId) {
      updateGamer(uid, { uid, username, name, photoURL, inGameName, inGameId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.inGameId, formik.values.inGameName]);

  return (
    <div className="flex flex-col gap-2 font-sans text-gray-300">
      {serialNo ? (
        <span className="text-xl text-indigo-600">Player {serialNo}</span>
      ) : null}
      <HorizontalProfile user={gamer} />
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

export default GamerRegistrationForm;
