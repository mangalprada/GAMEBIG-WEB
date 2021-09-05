import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { EmojiEventsRounded } from '@material-ui/icons';
import Link from 'next/link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      marginBottom: 10,
      flexDirection: 'row-reverse',
    },
  })
);

export default function CreateTournament() {
  const styles = useStyles();
  let id = 1;
  return (
    <div className={styles.root}>
      <Link href={`/organization/${id}/tournaments/create`} passHref>
        <Button
          variant="contained"
          color="primary"
          endIcon={<EmojiEventsRounded fontSize="medium" />}
        >
          Start a Tournament / Custom
        </Button>
      </Link>
    </div>
  );
}
