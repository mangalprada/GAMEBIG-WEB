import { useState } from 'react';
import {
  Button,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { db } from '../../firebase/firebaseClient';
import { TeamType } from '../../utilities/types';

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
    button: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
  })
);

export default function TeamItem({
  team,
  removeTeam,
  openBackdrop,
  setSelectedTeam,
}: {
  team: TeamType;
  removeTeam: (id: string) => void;
  openBackdrop: (open: boolean) => void;
  setSelectedTeam: (team: TeamType) => void;
}) {
  const classes = useStyles();
  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: '',
    severity: 'success' as const,
  });

  const deleteTeam = async () => {
    try {
      await db.collection('teams').doc(team.docId).delete();
      setSnackbarData({
        ...snackbarData,
        open: true,
        message: `${team.teamName} Deleted!`,
      });
      if (team.docId) removeTeam(team.docId);
    } catch (err) {
      console.log('err', err);
    }
  };

  const handleEdit = () => {
    setSelectedTeam(team);
    openBackdrop(true);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.header}>
        {team.teamName}
      </Typography>
      <Typography variant="body1" className={classes.header}>
        {team.inGameLead}
      </Typography>
      <div className={classes.flexColumn}>
        {team.gamers.map((gamer, index) => (
          <Typography key={gamer} variant="body1" className={classes.header}>
            {index + 1}. {gamer}
          </Typography>
        ))}
      </div>
      <div className={classes.flexRow}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={handleEdit}
          className={classes.button}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={deleteTeam}
          className={classes.button}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
