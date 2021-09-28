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
import { db } from '../../../firebase/firebaseClient';
import { TeamType } from '../../../utilities/types';
import { useAuth } from '../../../context/authContext';
import CreateTeam from '../../Profile/createTeam';
import GamerDetails from './GamerDetails';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        marginTop: 10,
      },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: 800,
      marginBottom: 20,
      marginTop: 60,
    },
    text: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#555',
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#fff',
    },
    unregister: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#555',
    },
    button: {
      margin: 20,
      maxWidth: 500,
      width: '100%',
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      width: '100%',
      background: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
    },
    footer: {
      height: 200,
      width: '100%',
    },
    divider: {
      border: '1px solid #ccc',
      backgroundColor: '#ccc',
      width: 140,
      marginBottom: 30,
      marginTop: 30,
      marginLeft: 15,
      marginRight: 15,
    },
  })
);

interface Props {
  tId: string;
  gameCode: string;
}

export default function RegisterTournamentForm({ tId, gameCode }: Props) {
  const classes = useStyles();
  const { user } = useAuth();
  const [teams, setTeams] = useState<TeamType[]>([]);
  const [backdropItem, setBackdropItem] = useState<number>(1);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [teamId, setTeamId] = useState<string>('');
  const [selectedTeam, setSelectedTeam] = useState<TeamType>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getTeams = () => {
      const teams: Array<TeamType> = [];
      if (user.username) {
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
      }
      return teams;
    };

    const teams: TeamType[] = getTeams();
    setTeams(teams);
  }, [user.username]);

  useEffect(() => {
    if (tId && user.username) {
      db.collection('tournaments')
        .doc(tId)
        .collection('teams')
        .where('usernames', 'array-contains', user.username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
              setTeamId(doc.id);
            }
          });
        });
    }
  }, [tId, user.username]);

  const closeBackdrop = () => {
    setOpen(false);
  };

  const openBackdrop = () => {
    setOpen(true);
  };

  const handleCreateTeam = (team: TeamType) => {
    setSelectedTeam(team);
    setTeams([team, ...teams]);
    setBackdropItem(2);
  };

  const unregister = () => {
    db.collection('tournaments').doc(tId).collection('teams').doc(teamId)
      .delete;
  };

  if (isRegistered)
    return (
      <div className={classes.root}>
        <Typography variant="h6" className={classes.text}>
          You have registered for this tournament.
        </Typography>
        <div className={classes.flexRow}>
          <Button
            variant="contained"
            onClick={unregister}
            className={classes.button}
          >
            <Typography variant="body1" className={classes.unregister}>
              Unregister
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              console.log('yoyo');
            }}
            className={classes.button}
          >
            <Typography variant="body1" className={classes.buttonText}>
              Update
            </Typography>
          </Button>
        </div>
      </div>
    );

  return (
    <div id="register" className={classes.root}>
      <Typography variant="h6" className={classes.text}>
        Register For Tournament
      </Typography>
      <Autocomplete
        id="combo-box-demo"
        options={teams}
        getOptionLabel={(option) => option.teamName}
        onChange={(e, value) => {
          if (value) {
            setSelectedTeam(value);
          }
        }}
        style={{ width: '100%', marginTop: 10 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select From Existing Teams"
            variant="outlined"
          />
        )}
      />
      <Button
        disabled={!selectedTeam}
        variant="contained"
        color="primary"
        onClick={() => {
          setBackdropItem(2);
          openBackdrop();
        }}
        className={classes.button}
      >
        <Typography variant="body1" className={classes.buttonText}>
          Register {selectedTeam?.teamName}
        </Typography>
      </Button>
      <div className={classes.flexRow}>
        <div className={classes.divider}></div>
        <Typography variant="h6" className={classes.text}>
          OR
        </Typography>
        <div className={classes.divider}></div>
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setBackdropItem(1);
          openBackdrop();
        }}
        className={classes.button}
        endIcon={<AddIcon />}
      >
        <Typography variant="body1" className={classes.buttonText}>
          Create Your New Team
        </Typography>
      </Button>
      <div className={classes.footer}></div>
      <Backdrop className={classes.backdrop} open={open}>
        {
          {
            1: (
              <CreateTeam
                onCancel={closeBackdrop}
                handleSubmit={handleCreateTeam}
              />
            ),
            2: (
              <GamerDetails
                tId={tId}
                onCancel={closeBackdrop}
                team={selectedTeam}
                gameCode={gameCode}
              />
            ),
          }[backdropItem]
        }
      </Backdrop>
    </div>
  );
}
