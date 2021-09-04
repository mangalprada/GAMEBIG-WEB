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

  const handleClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
  };

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
        <Typography variant="body1" className={styles.header}>
          {games[gameCode].name}
        </Typography>
      ) : null}
      <div className={styles.flexRow}>
        {gameCode ? (
          <div className={styles.imageCard}>
            <Image
              className={styles.image}
              src={games[gameCode].imageSource}
              alt="Picture of the author"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : null}
        <div className={styles.flexColumn}>
          <Typography variant="body1" className={styles.header}>
            In Game Name: {ingamename}
          </Typography>
          <Typography variant="body1" className={styles.header}>
            In Game Id: {ingameid}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<EditIcon />}
            onClick={() => setBackdrop(true)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={deleteGame}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
