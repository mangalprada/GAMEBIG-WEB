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

interface Props {
  orgId: string;
}

export default function CreateTournament({ orgId }: Props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link href={`/organization/${orgId}/tournaments/create`} passHref>
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
