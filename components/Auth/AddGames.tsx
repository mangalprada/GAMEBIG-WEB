import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import SnackbarAlert from '../Snackbar';
import { useAuth } from '../../context/authContext';
import GameForm from './GameForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      width: '100%',
      background: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '50%',
      marginLeft: 10,
      marginRight: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    text: { marginLeft: '48%' },
  })
);

function AddGames() {
  const styles = useStyles();
  const { setAuthPageNumber } = useAuth();
  const [numberOfGames, setNumberOfGames] = useState(0);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const increaseNumberOfGames = () => {
    setNumberOfGames(numberOfGames + 1);
  };

  const handleClose = () => {
    setShowError(false);
  };

  const handleFinish = () => {
    if (numberOfGames > 0) router.push('/');
    else setShowError(true);
  };

  return (
    <div className={styles.root}>
      <GameForm
        src="https://play-lh.googleusercontent.com/jwL7aqLp7v_7owPxf30e41MCggN-ot3MeP3zxbIMVKdiGkUs33jmGW7c7QmYxMFamHSj=s180-rw"
        name="Battlegrounds Mobile India"
        gameCode="bgmi-m"
        increaseNumberOfGames={increaseNumberOfGames}
      />
      <GameForm
        src="https://play-lh.googleusercontent.com/r42Js__Kw3TM5-vAG-1LdGZWjJD9-K52i32aXp92SCddIklg0XP5eAisge-pG0qRPkfk=s180-rw"
        name="Call of Duty: Mobile"
        gameCode="cod-m"
        increaseNumberOfGames={increaseNumberOfGames}
      />
      <GameForm
        src="https://play-lh.googleusercontent.com/k9mpwqPYChfePRtUlTSEkX73TCDnwyvSkD5AvsdUTAQ4H0c2OAIEiiiUwrVEd7_k1E8=s180-rw"
        name="Garena Free Fire"
        gameCode="gff-m"
        increaseNumberOfGames={increaseNumberOfGames}
      />
      <div className={styles.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          className={styles.button}
          onClick={() => setAuthPageNumber(2)}
        >
          <Typography variant="body1" className={styles.buttonText}>
            Previous
          </Typography>
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.button}
          onClick={handleFinish}
        >
          <Typography variant="body1" className={styles.buttonText}>
            Finish
          </Typography>
        </Button>
      </div>
      <h4 className={styles.text}>2/2</h4>
      <SnackbarAlert
        vertical="bottom"
        horizontal="center"
        open={showError}
        onClose={handleClose}
        autoHideDuration={5000}
        message="Please Add Atleast 1 Game!"
        severity="warning"
      />
    </div>
  );
}

export default AddGames;
