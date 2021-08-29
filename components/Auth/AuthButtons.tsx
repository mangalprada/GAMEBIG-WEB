import React from 'react';
import { Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useAuth } from '../../context/authContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      width: '100%',
      marginTop: 10,
      marginBottom: 10,
    },
  })
);

function AuthButtons() {
  const styles = useStyles();
  const { signInByFacebook, signInByGoogle } = useAuth();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={signInByFacebook}
        className={styles.button}
      >
        <h3>Continue with Facebook</h3>
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={signInByGoogle}
        className={styles.button}
      >
        <h3>Continue With Google</h3>
      </Button>
    </div>
  );
}

export default AuthButtons;
