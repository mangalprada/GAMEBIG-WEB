import { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { db } from '../../../firebase/config';
import { GamerData } from '../../../utilities/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      maxWidth: '500px',
    },
  })
);

const emptyValues = {
  ingamename: '',
  ingameid: '',
};

export default function GamerItem({
  username,
  gameCode,
  onSubmit,
  updateParentMethod,
}: {
  username: string;
  gameCode: string;
  onSubmit: (gameData: GamerData) => void;
  updateParentMethod: (func: () => void) => void;
}) {
  const classes = useStyles();
  const [gamer, setGamer] = useState<GamerData>(emptyValues);

  useEffect(() => {
    const getTeams = () => {
      const gamer: GamerData[] = [];
      db.collection('gamers')
        .where('username', '==', username)
        .where('gameCode', '==', gameCode)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { ingamename, ingameid } = doc.data();
            gamer.push({ ingamename, ingameid, docId: doc.id });
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      return gamer[0];
    };
    const unsubscribe = () => {
      const gamer: GamerData = getTeams();
      setGamer(gamer);
    };
    return () => unsubscribe();
  }, [gameCode, username]);

  useEffect(() => {
    updateParentMethod(formik.submitForm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validationSchema = yup.object({
    ingamename: yup.string().required('In Game Name is required'),
    ingameid: yup.string().required('In Game Id is required'),
  });

  const formik = useFormik({
    initialValues: {
      ...gamer,
    },
    validationSchema: validationSchema,
    onSubmit: ({ ingamename, ingameid }, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      onSubmit({ ingamename, ingameid });
      resetForm();
      setSubmitting(false);
    },
  });

  return (
    <div className={classes.root}>
      <TextField
        disabled
        type="text"
        name="DLord Username"
        label="In Game Id"
        variant="outlined"
        value={username}
      />
      <TextField
        type="text"
        name="ingamename"
        label="In Game Id"
        variant="outlined"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ingamename}
        error={formik.touched.ingamename && Boolean(formik.errors.ingamename)}
        helperText={formik.touched.ingamename && formik.errors.ingamename}
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
    </div>
  );
}
