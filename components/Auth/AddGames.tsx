import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import { ArrowBackRounded } from '@material-ui/icons';
import { Formik } from 'formik';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { UserData } from '../../utilities/types';
import GameItem from './GameItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
      },
      width: '50%',
      maxWidth: '100%',
      background: theme.palette.background.paper,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: '30%',
      //   margin: '0 auto',
      margin: 10,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
  })
);

function AddGames({
  setPageNumber,
}: {
  setPageNumber: (pageNumber: number) => void;
}) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <GameItem />
      <GameItem />
      <GameItem />
      <div className={styles.buttonContainer}>
        <Button
          type="submit"
          variant="contained"
          className={styles.button}
          onClick={() => setPageNumber(1)}
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
        >
          <Typography variant="body1" className={styles.buttonText}>
            Save
          </Typography>
        </Button>
      </div>
    </div>
  );
}

export default AddGames;
