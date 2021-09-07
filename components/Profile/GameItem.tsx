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
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/config';
import { games } from '../../utilities/GameList';
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
  game: GameData;
  setBackdrop: (open: boolean) => void;
  removeGame: (docId: string) => void;
}) {
  const styles = useStyles();
  const { user } = useAuth();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });
  const { gameCode, ingameid, ingamename, docId } = game;

  const deleteGame = async () => {
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('games')
        .doc(docId)
        .delete();
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
    <div className={styles.root}>
      {gameCode ? (
        <Typography variant="h6" className={styles.header}>
          {games[gameCode].name}
        </Typography>
      ) : null}
      <div className={styles.flexRow}>
        {gameCode ? (
          <div className={styles.imageCard}>
            <Image
              className={styles.image}
              src={games[gameCode].imageSource}
              alt="Picture of the game"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : null}
        <div className={styles.flexColumn}>
          <Typography variant="body1" className={styles.text}>
            In Game Name: {ingamename}
          </Typography>
          <Typography variant="body1" className={styles.text}>
            In Game Id: {ingameid}
          </Typography>
          <div className={styles.flexRow}>
            <Button
              variant="contained"
              startIcon={<EditIcon />}
              onClick={() => setBackdrop(true)}
              className={styles.button}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={deleteGame}
              className={styles.button}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}