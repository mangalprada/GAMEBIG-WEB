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
import { games } from '../../utilities/GameList';
import { GameData } from '../../utilities/types';
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
  const [currentGames, setCurrentGames] = useState<Array<GameData>>([]);
  const [showError, setShowError] = useState(false);
  const router = useRouter();

  const addToCurrentGames = (game: GameData) => {
    setCurrentGames([...currentGames, game]);
  };

  const handleClose = () => {
    setShowError(false);
  };

  const handleFinish = () => {
    if (currentGames.length > 0) {
      router.push('/');
      setAuthPageNumber(1);
    } else setShowError(true);
  };

  return (
    <div className={styles.root}>
      {Object.keys(games).map(function (key, index) {
        return (
          <GameForm
            game={games[key]}
            addToCurrentGames={addToCurrentGames}
            key={index}
          />
        );
      })}
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
