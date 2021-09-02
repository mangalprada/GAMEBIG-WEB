import { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import * as yup from 'yup';
import Image from 'next/image';
import EditIcon from '@material-ui/icons/Edit';
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

const validationSchema = yup.object({
  ingamename: yup.string().required('In Game Name is required'),
  ingameid: yup.string().required('In Game Id is required'),
});

export default function GameItem({ game }: { game: GameData }) {
  const styles = useStyles();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });
  const { gameCode, ingameid, ingamename } = game;

  const handleClose = () => {
    setSnackbarData({ ...snackbarData, open: false });
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
          <EditIcon />
        </div>
      </div>
    </div>
  );
}
