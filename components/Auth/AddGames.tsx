import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { useAuth } from '../../context/authContext';
import { games } from '../../utilities/GameList';
import { GamerData } from '../../utilities/types';
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

function AddGames({
  username,
  isUpdating,
}: {
  username: string;
  isUpdating: boolean;
}) {
  const classes = useStyles();
  const { updateAuthPageNumber } = useAuth();
  const [currentGames, setCurrentGames] = useState<Array<GamerData>>([]);
  const router = useRouter();

  const addToCurrentGames = (game: GamerData) => {
    setCurrentGames([...currentGames, game]);
  };

  const handleFinish = () => {
    router.push('/');
    updateAuthPageNumber(1);
  };

  return (
    <div className={classes.root}>
      {Object.keys(games).map(function (key, index) {
        return (
          <GameForm
            isUpdating={isUpdating}
            username={username}
            game={games[key]}
            addToCurrentGames={addToCurrentGames}
            key={index}
          />
        );
      })}
      <div className={classes.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          className={classes.button}
          onClick={() => updateAuthPageNumber(2)}
        >
          <Typography variant="body1" className={classes.buttonText}>
            Previous
          </Typography>
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleFinish}
        >
          <Typography variant="body1" className={classes.buttonText}>
            {currentGames.length === 0 ? 'Skip' : 'Finish'}
          </Typography>
        </Button>
      </div>
      <h4 className={classes.text}>2/2</h4>
    </div>
  );
}

export default AddGames;
