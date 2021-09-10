import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      marginTop: 15,
      width: '50%',
    },
  })
);

export default function TeamIntro({
  openBackdrop,
}: {
  openBackdrop: () => void;
}) {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h5" color="textPrimary">
        Create a Team And Participate in Tournaments
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={openBackdrop}
        className={classes.button}
      >
        Create Team
      </Button>
    </div>
  );
}
