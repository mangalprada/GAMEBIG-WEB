import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Typography } from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CreateTeam from './createTeam';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 400,
    },
    button: {
      marginTop: 15,
      width: '50%',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      width: '100%',
      background: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export default function TeamIntro() {
  const router = useRouter();
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div className={styles.root}>
      <h1>Create a Team to Participate in Tournaments</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleToggle}
        className={styles.button}
      >
        Create Team
      </Button>
      <Backdrop className={styles.backdrop} open={open}>
        <CreateTeam handleBackdropClose={handleClose} />
      </Backdrop>
    </div>
  );
}
