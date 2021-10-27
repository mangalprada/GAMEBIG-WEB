import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { db } from '../../../firebase/firebaseClient';
import { GamerData } from '../../../utilities/types';
import FormInput from '../../UI/Inputs/FormInput';

const validationSchema = yup.object({
  ingamename: yup.string().required('In Game Name is required'),
  ingameid: yup.string().required('In Game Id is required'),
});

const emptyValues = {
  ingamename: '',
  ingameid: '',
};

interface Props {
  username: string;
  gameCode: string;
  serialNo: number;
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
              const { ingamename, ingameid } = doc.data();
              if (ingamename && ingameid)
                gamerArray.push({ ingamename, ingameid, docId: doc.id });
            });
          })
          .catch((error) => {
            console.log('Error getting documents: ', error);
          });
      }
      const gamer = gamerArray[0];
      if (gamer && gamer.ingamename && gamer.ingameid) {
        const { ingamename, ingameid } = gamer;
        formik.setValues({ ingameid, ingamename });
      }
    };
    getDetails();
    console.log('GamerItem: useEffect');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameCode, username]);

  useEffect(() => {
    const { ingamename, ingameid } = formik.values;
    if (ingamename && ingameid) {
      updateGamer(username, { ingamename, ingameid });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.ingameid, formik.values.ingamename, username]);

  return (
    <div className="font-sans text-gray-300">
      <span className="text-xl text-indigo-600 py-4">Player {serialNo}</span>
      <FormInput
        labelName="GameBig username"
        name="username"
        isDisabled={true}
        value={username}
        onChangeHandler={formik.handleChange}
      />
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
    </div>
  );
};

export default GamerItem;
