import { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/config';
import SnackbarAlert from '../Snackbar';
import { GameData } from '../../utilities/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginTop: 10,
        marginLeft: 20,
      },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 800,
      marginBottom: 10,
    },
    header: {
      marginLeft: 20,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#555',
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
      width: '70%',
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    imageCard: {
      position: 'relative',
      width: '168px',
      height: '168px',
      margin: 10,
    },
    image: {
      borderRadius: '6%',
      border: '5px solid #555',
    },
    button: {
      marginTop: 10,
      marginLeft: 20,
    },
  })
);

const validationSchema = yup.object({
  ingamename: yup.string().required('In Game Name is required'),
  ingameid: yup.string().required('In Game Id is required'),
});

function GameForm({
  game,
  increaseNumberOfGames,
}: {
  game: {
    gameCode: string;
    name: string;
    imageSource: string;
  };
  increaseNumberOfGames: () => void;
}) {
  const styles = useStyles();
  const { user } = useAuth();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });
  const { gameCode, imageSource, name } = game;

  const handleClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

  const saveGame = async (game: { ingamename: string; ingameid: string }) => {
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('games')
        .add({ gameCode, ...game });
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `${name} added!`,
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  const formik = useFormik({
    initialValues: {
      ingamename: '',
      ingameid: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      increaseNumberOfGames();
      saveGame(values);
      setSubmitting(false);
    },
  });

  return (
    <div className={styles.root}>
      <Typography variant="body1" className={styles.header}>
        {name}
      </Typography>
      <div className={styles.flexRow}>
        <div className={styles.imageCard}>
          <Image
            className={styles.image}
            src={imageSource}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <form className={styles.flexColumn} onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            name="ingamename"
            label="In Game Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ingamename}
            error={
              formik.touched.ingamename && Boolean(formik.errors.ingamename)
            }
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
          <Button
            type="submit"
            variant="contained"
            disabled={formik.isSubmitting}
            className={styles.button}
            color="secondary"
          >
            Save Game
          </Button>
        </form>
      </div>
      <SnackbarAlert
        vertical="bottom"
        horizontal="center"
        open={snackbarData.open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={snackbarData.message}
        severity={snackbarData.severity}
      />
    </div>
  );
}

export default GameForm;
