import { useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { db } from '../../../firebase/firebaseClient';
import { GamerData, TeamType } from '../../../utilities/types';
import GamerItem from './GamerItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: 15,
      width: '50%',
    },
    flexRow: { display: 'flex', flexDirection: 'row', marginTop: 40 },
    text: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      color: '#555',
    },
  })
);

interface Props {
  tId: string;
  team?: TeamType;
  gameCode: string;
  onCancel: () => void;
}

export default function GamerDetails({ tId, team, gameCode, onCancel }: Props) {
  const classes = useStyles();
  const [gamers, setGamers] = useState({} as Record<string, GamerData>);

  const updateGamer = (username: string, gamer: GamerData) => {
    gamers[username] = gamer;
  };

  const handleRegister = async () => {
    const gamersArray: GamerData[] = [];
    Object.keys(gamers).map(function (key) {
      gamersArray.push({ username: key, ...gamers[key] });
    });
    if (gamersArray.length > 3) {
      saveGamerDetails(gamersArray);
      setGamers({});
      onCancel();
    }
  };

  const saveGamerDetails = (gamersArray: GamerData[]) => {
    const usernames = gamersArray.map((gamer) => gamer.username);
    if (team && gamersArray) {
      db.collection('tournaments')
        .doc(tId)
        .collection('teams')
        .add({
          inGameLead: team.inGameLead,
          gamers: gamersArray,
          usernames,
          teamName: team.teamName,
        })
        .then(() => {
          console.log('Team added');
        })
        .catch((error) => {
          console.log('Error adding documents: ', error);
        });
    }
  };

  return (
    <div>
      <Typography variant="h6" className={classes.text}>
        Add Details
      </Typography>
      {team &&
        team.gamers.map((gamer) => (
          <GamerItem
            key={gamer}
            username={gamer}
            gameCode={gameCode}
            updateGamer={updateGamer}
          />
        ))}
      <div className={classes.flexRow}>
        <Button
          variant="contained"
          color="primary"
          onClick={onCancel}
          className={classes.button}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRegister}
          className={classes.button}
        >
          Register
        </Button>
      </div>
    </div>
  );
}
