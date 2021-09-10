import { useState } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { db } from '../../../firebase/config';
import { GamerData, TeamType } from '../../../utilities/types';
import GamerItem from './GamerItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: 15,
      width: '50%',
    },
  })
);

export default function GamerDetails({
  team,
  gameCode,
  onCancel,
}: {
  team: TeamType;
  gameCode: string;
  onCancel: () => void;
}) {
  const classes = useStyles();
  const [gamers, setGamers] = useState<GamerData[]>([]);

  let getGamer = () => {};

  const updateGetGamer = (newMethod: () => void) => {
    getGamer = newMethod;
  };

  const handleRegister = async () => {
    //TODO: add docId
    await getGamer();
    db.collection('tournaments')
      .doc()
      .collection('teams')
      .add({
        inGameLead: team.inGameLead,
        gamers: gamers,
        teamName: team.teamName,
      })
      .then(() => {
        console.log('Team added');
      })
      .catch((error) => {
        console.log('Error adding documents: ', error);
      });
  };

  const updateGamer = (gamer: GamerData) => {
    setGamers([...gamers, gamer]);
  };

  return (
    <div>
      {team.gamers.map((gamer) => (
        <GamerItem
          key={gamer}
          username={gamer}
          gameCode={gameCode}
          onSubmit={updateGamer}
          updateParentMethod={updateGetGamer}
        />
      ))}
      ;
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
  );
}
