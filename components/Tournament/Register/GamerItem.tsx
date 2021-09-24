import { useState, useEffect } from 'react';
import { TextField } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { db } from '../../../firebase/firebaseClient';
import { GamerData } from '../../../utilities/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginLeft: 10,
        marginRight: 10,
      },
      display: 'flex',
      flexDirection: 'row',
      marginTop: 15,
      width: '100%',
      maxWidth: '1000px',
    },
  })
);

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
  updateGamer: (username: string, gameData: GamerData) => void;
}

const GamerItem = ({ username, gameCode, updateGamer }: Props) => {
  const classes = useStyles();

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
    console.log('GamerItem: useEffect 22222222222');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.ingameid, formik.values.ingamename, username]);

  return (
    <div className={classes.root}>
      <TextField
        disabled
        type="text"
        name="DLord Username"
        label="UserName"
        variant="outlined"
        value={username}
      />
      <TextField
        type="text"
        name="ingamename"
        label="In Game Name"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ingamename}
        error={formik.touched.ingamename && Boolean(formik.errors.ingamename)}
        helperText={formik.touched.ingamename && formik.errors.ingamename}
      />
      <TextField
        type="text"
        name="ingameid"
        label="In Game Id"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ingameid}
        error={formik.touched.ingameid && Boolean(formik.errors.ingameid)}
        helperText={formik.touched.ingameid && formik.errors.ingameid}
      />
    </div>
  );
};

export default GamerItem;
