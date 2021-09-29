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

export default function ParticipantList() {
  const classes = useStyles();

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
