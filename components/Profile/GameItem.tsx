import { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from '../../firebase/firebaseClient';
import { games } from '../../utilities/GameList';
import { GamerData } from '../../utilities/types';

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
      maxWidth: 500,
      marginBottom: 20,
      marginTop: 20,
    },
    header: {
      marginBottom: 10,
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#555',
    },
    text: {
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
    },
    imageCard: {
      position: 'relative',
      width: '100px',
      height: '100px',
    },
    image: {
      borderRadius: '6%',
      border: '5px solid #555',
    },
    button: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
  })
);

export default function GameItem({
  game,
  setBackdrop,
  removeGame,
}: {
  game: GamerData;
  setBackdrop: (open: boolean) => void;
  removeGame: (docId: string) => void;
}) {
  const classes = useStyles();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });
  const { gameCode, ingameid, ingamename, docId } = game;

  const deleteGame = async () => {
    try {
      await db.collection('gamers').doc(docId).delete();
      if (gameCode)
        setSnackbarData({
          ...snackbarData,
          open: true,
          message: `${games[gameCode].name} Deleted!`,
        });
      if (docId) removeGame(docId);
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <div className={classes.root}>
      {gameCode ? (
        <Typography variant="h6" className={classes.header}>
          {games[gameCode].name}
        </Typography>
      ) : null}
      <div className={classes.flexRow}>
        {gameCode ? (
          <div className={classes.imageCard}>
            <Image
              className={classes.image}
              src={games[gameCode].imageSource}
              alt="Picture of the game"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : null}
        <div className={classes.flexColumn}>
          <Typography variant="body1" className={classes.text}>
            In Game Name: {ingamename}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            In Game Id: {ingameid}
          </Typography>
          <div className={classes.flexRow}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setBackdrop(true)}
              className={classes.button}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={deleteGame}
              className={classes.button}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
