import { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SnackbarAlert from '../UI/Snackbar/SnackBar';
import { db } from '../../firebase/firebaseClient';
import { TeamType } from '../../utilities/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > * + *': {
        marginLeft: theme.spacing(2),
      },
      '& .MuiTextField-root': {
        width: '100%',
        marginTop: 10,
      },
      width: '80%',
      maxWidth: '800px',
      background: theme.palette.background.paper,
    },

    flexColumn: { display: 'flex', flexDirection: 'column', marginTop: 20 },
    flexRow: { display: 'flex', flexDirection: 'row', marginTop: 20 },
    button: {
      width: '50%',
      margin: 10,
    },
    addButton: {
      width: '30%',
      marginTop: 10,
      marginLeft: 15,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    text: { marginLeft: '48%' },
    gamerItem: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: 10,
      marginTop: 10,
    },
    autoComplete: {
      width: '100%',
      marginTop: 10,
    },
    loader: { margin: 10 },
    gamerText: { marginLeft: 10, marginRight: 20 },
  })
);

const validationSchema = yup.object({
  teamName: yup.string().required('Team name is required'),
  username: yup.string(),
  inGameLead: yup.string().required('In Game Lead is required'),
});

type PropsType = {
  teamData?: TeamType;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
};

type SnackbarDataType = {
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error';
  message: string;
};

const emptyValues = {
  username: '',
  teamName: '',
  inGameLead: '',
};

const initialSnackbarData = {
  open: false,
  message: '',
  severity: 'warning' as const,
};

export default function CreateTeam({
  teamData,
  onCancel,
  handleSubmit,
}: PropsType) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [gamers, setgamers] = useState<Array<string>>(teamData?.gamers || []);
  const [snackbarData, setSnackbarData] =
    useState<SnackbarDataType>(initialSnackbarData);

  const formik = useFormik({
    initialValues: {
      ...emptyValues,
      teamName: teamData?.teamName,
      inGameLead: teamData?.teamName,
    },
    validationSchema: validationSchema,
    onSubmit: ({ teamName, inGameLead }, { setSubmitting }) => {
      setSubmitting(true);
      if (teamName && inGameLead) {
        saveTeam({ teamName, gamers, inGameLead });
        if (handleSubmit) handleSubmit({ teamName, gamers, inGameLead });
      }
      formik.resetForm();
      setSubmitting(false);
    },
  });

  const handleClose = () => {
    setSnackbarData(initialSnackbarData);
  };

  const saveTeam = async (team: TeamType) => {
    if (gamers.length !== 4) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `You need 4 gamers to create a Team!`,
        severity: 'warning' as const,
      });
      return;
    }
    if (!team.inGameLead) {
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `You need a In Game Lead to create a Team!`,
        severity: 'warning' as const,
      });
      return;
    }
    try {
      await db.collection('teams').add(team);
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `${team.teamName} added!`,
        severity: 'success' as const,
      });
      onCancel();
    } catch (err) {
      console.log('err', err);
    }
  };

  const isUserValid = async (username: string) =>
    await db
      .collection('users')
      .where('username', '==', username)
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.size > 0) {
          return true;
        }
        return false;
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });

  const addgamer = async () => {
    setLoading(true);
    const { username } = formik.values;
    if (username === '' || gamers.indexOf(username) !== -1) {
      formik.setFieldValue('username', '');
      setLoading(false);
      return;
    }
    const userValidity = await isUserValid(username);
    if (userValidity) {
      setgamers([...gamers, username]);
      formik.setFieldValue('username', '');
    } else {
      formik.setErrors({ username: 'No User exist with this username' });
    }
    setLoading(false);
  };

  const removegamer = (id: string) => {
    const newgamers = gamers.filter((gamer) => gamer !== id);
    setgamers(newgamers);
  };

  return (
    <div className={classes.root}>
      <form className={classes.flexColumn} onSubmit={formik.handleSubmit}>
        <h2>Create Your Dream Team</h2>
        <TextField
          type="text"
          name="teamName"
          label="Team Name"
          variant="outlined"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.teamName}
          error={formik.touched.teamName && Boolean(formik.errors.teamName)}
          helperText={formik.touched.teamName && formik.errors.teamName}
        />
        <div className={classes.flexRow}>
          <TextField
            type="text"
            name="username"
            label="DLord username"
            variant="outlined"
            placeholder="DLord username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          {!loading ? (
            <Button
              variant="contained"
              color="primary"
              disabled={formik.isSubmitting}
              className={classes.addButton}
              endIcon={<AddIcon />}
              onClick={addgamer}
            >
              <Typography variant="body1" className={classes.buttonText}>
                Add
              </Typography>
            </Button>
          ) : (
            <CircularProgress color="secondary" className={classes.loader} />
          )}
        </div>
        {gamers.map((username, index) => (
          <div key={index} className={classes.gamerItem}>
            <Typography variant="body1" className={classes.gamerText}>
              {index + 1}. {username}
            </Typography>
            <DeleteIcon
              onClick={() => {
                removegamer(username);
              }}
            />
          </div>
        ))}
        <Autocomplete
          id="combo-box-demo"
          options={gamers}
          getOptionLabel={(option) => option}
          onChange={(e, value) => {
            if (value) {
              formik.setFieldValue('inGameLead', value);
            }
          }}
          onBlur={formik.handleBlur}
          style={{ width: '100%', marginTop: 10 }}
          renderInput={(params) => (
            <TextField {...params} label="In Game Lead" variant="outlined" />
          )}
        />
        <div className={classes.flexRow}>
          <Button
            variant="contained"
            disabled={formik.isSubmitting}
            className={classes.button}
            onClick={onCancel}
          >
            <Typography variant="body1" className={classes.buttonText}>
              Cancel
            </Typography>
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            className={classes.button}
          >
            <Typography variant="body1" className={classes.buttonText}>
              Save
            </Typography>
          </Button>
        </div>
      </form>
      <SnackbarAlert
        vertical="bottom"
        horizontal="center"
        open={snackbarData.open}
        onClose={handleClose}
        autoHideDuration={5000}
        message={snackbarData.message}
        severity={snackbarData.severity}
      />
    </div>
  );
}
