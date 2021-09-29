import { useEffect, useState, useCallback } from 'react';
import {
  createStyles,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Typography,
} from '@material-ui/core';
import { fetchParticipatedTeams } from '../../../lib/getTournamentData';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlock: 50,
    },
    table: {
      marginTop: 10,
    },
    head: {
      fontWeight: 750,
      fontSize: 17,
    },
  })
);

interface Props {
  tId: string;
}

export default function ParticipantList({ tId }: Props) {
  const classes = useStyles();
  const [participants, setParticipants] = useState<Record<string, any>[] | []>(
    []
  );

  const teamsArr = useCallback(async () => {
    const teams = await fetchParticipatedTeams(tId);
    console.log(teams);

    setParticipants(teams);
  }, [tId]);

  useEffect(() => {
    teamsArr();
  }, [teamsArr]);

  const tableCell = participants.map((team) => {
    const teamMates =
      team.players[0] +
      ', ' +
      team.players[1] +
      ', ' +
      team.players[2] +
      ', ' +
      team.players[3];
    return (
      <TableBody key={team.leader}>
        <TableCell>{team.teamName}</TableCell>
        <TableCell align="center">{teamMates}</TableCell>
      </TableBody>
    );
  });

  return (
    <div className={classes.root}>
      <Typography variant="h5" color="textSecondary">
        Participant List
      </Typography>
      {participants.length === 0 ? (
        <Typography variant="body1" color="textPrimary">
          No Teams registered yet
        </Typography>
      ) : (
        <TableContainer className={classes.table} component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>Team Name</TableCell>
                <TableCell className={classes.head} align="center">
                  Player IDs
                </TableCell>
              </TableRow>
            </TableHead>
            {tableCell}
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
