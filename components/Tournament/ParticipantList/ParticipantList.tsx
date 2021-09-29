import { useEffect, useState } from 'react';
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
import { useCallback } from 'react-transition-group/node_modules/@types/react';

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

  return (
    <div className={classes.root}>
      <Typography variant="h5" color="textSecondary">
        Participant List
      </Typography>
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
          <TableBody>
            <TableCell>Garuda</TableCell>
            <TableCell align="center">{'happy, eren, armin, mikasa'}</TableCell>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
