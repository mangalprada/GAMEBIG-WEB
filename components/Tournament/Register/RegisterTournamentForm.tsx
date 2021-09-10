import { useState, useEffect } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  TextField,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Backdrop from '@material-ui/core/Backdrop';
import { db } from '../../../firebase/config';
import { GamerData, TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Profile/createTeam';
import GamerDetails from './GamerDetails';
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
      alignItems: 'center',
      maxWidth: 800,
      marginBottom: 20,
      marginTop: 20,
    },
    text: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#555',
    },
    button: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      width: '100%',
      background: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default function RegisterTournamentForm() {
  const classes = useStyles();
  const { user } = useAuth();
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTeams = () => {
      const teams: Array<TeamType> = [];
      db.collection('teams')
        .where('gamers', 'array-contains-any', [user.username])
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { teamName, gamers, inGameLead } = doc.data();
            teams.push({ teamName, gamers, inGameLead, docId: doc.id });
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
      return teams;
    };
    const unsubscribe = () => {
      const teams: TeamType[] = getTeams();
      setTeams(teams);
    };
    return () => unsubscribe();
  }, [user.username]);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  const handleCreateTeam = (team: TeamType) => {
    setSelectedTeam(team);
    setTeams([team, ...teams]);
  };
  //TODO: Add game code from tournament
  return (
    <div className={classes.root}>
      <Autocomplete
        id="combo-box-demo"
        options={teams}
        getOptionLabel={(option) => option.teamName}
        onChange={(e, value) => {
          if (value) {
            setSelectedTeam(value);
            openBackdrop();
          }
        }}
        style={{ width: '100%', marginTop: 10 }}
        renderInput={(params) => (
          <TextField {...params} label="Select A Team" variant="outlined" />
        )}
      />
      <Typography variant="h6" className={classes.text}>
        OR
      </Typography>
      {!open ? (
        <Button
          variant="contained"
          color="primary"
          onClick={openBackdrop}
          className={classes.button}
          endIcon={<AddIcon />}
        >
          <Typography variant="h6" className={classes.text}>
            Create Your New Team
          </Typography>
        </Button>
      ) : null}
      <Backdrop className={classes.backdrop} open={open}>
        {selectedTeam ? (
          <GamerDetails
            onCancel={closeBackdrop}
            team={selectedTeam}
            gameCode={'bgmi'}
          />
        ) : (
          <CreateTeam onCancel={closeBackdrop} onSubmit={handleCreateTeam} />
        )}
      </Backdrop>
    </div>
  );
}
