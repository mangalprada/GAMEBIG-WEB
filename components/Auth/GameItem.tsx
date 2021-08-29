import { useRef } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { Formik } from 'formik';
import Image from 'next/image';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/config';

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
      alignItems: 'center',
      maxWidth: 1280,
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
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
    },
    imageCard: {
      position: 'relative',
      width: '168px',
      height: '168px',
      margin: 10,
    },
    button: {
      marginTop: 10,
      marginLeft: 20,
    },
  })
);

function AddGames({
  src,
  name,
  gameCode,
  increaseNumberOfGames,
}: {
  src: string;
  name: string;
  gameCode: string;
  increaseNumberOfGames: () => void;
}) {
  const styles = useStyles();
  const { user } = useAuth();

  const saveGame = async (game: {
    gameCode: string;
    inGameName: string;
    inGameId: string;
  }) => {
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('games')
        .doc(gameCode)
        .set(game);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div className={styles.root}>
      <Typography variant="body1" className={styles.header}>
        {name}
      </Typography>
      <div className={styles.flexRow}>
        <div className={styles.imageCard}>
          <Image
            src={src}
            alt="Picture of the author"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Formik
          initialValues={{ inGameName: '', inGameId: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.inGameName) {
              errors.inGameName = 'Required';
            }
            if (!values.inGameId) {
              errors.inGameId = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            increaseNumberOfGames();
            saveGame(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className={styles.flexColumn} onSubmit={handleSubmit}>
              <TextField
                type="text"
                name="inGameName"
                label="In Game Name"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.inGameName}
              />
              <TextField
                type="text"
                name="inGameId"
                label="In Game Id"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.inGameId}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                className={styles.button}
              >
                Add Game
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddGames;
