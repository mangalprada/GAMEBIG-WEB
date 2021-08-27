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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
        marginTop: 10,
        marginLeft: 20,
      },
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 1280,
      marginTop: 20,
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
  })
);

function AddGames() {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div>
        <Image
          src="https://play-lh.googleusercontent.com/k9mpwqPYChfePRtUlTSEkX73TCDnwyvSkD5AvsdUTAQ4H0c2OAIEiiiUwrVEd7_k1E8=s180-rw"
          alt="Picture of the author"
          width={128}
          height={128}
        />
      </div>
      <div className={styles.flexColumn}>
        <Typography variant="body1" className={styles.header}>
          Game Name
        </Typography>
        <TextField
          type="text"
          name="inGameName"
          label="In Game Name"
          variant="outlined"
        />
        <TextField
          type="text"
          name="inGameId"
          label="In Game Id"
          variant="outlined"
        />
      </div>
    </div>
  );
}

export default AddGames;
