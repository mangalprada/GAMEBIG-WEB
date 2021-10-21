import { useEffect, useState } from 'react';
import Head from 'next/head';
import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import { getDecoratedTime } from '../../utilities/functions/dateConvert';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import SnackbarAlert from '../../components/UI/Snackbar/SnackBar';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    notice: {
      margin: 10,
    },
    span: {
      background: '#bbb',
      borderRadius: 3,
      marginLeft: 10,
      marginRight: 10,
      paddingLeft: 4,
      paddingRight: 4,
    },
  })
);

export default function Home() {
  const classes = useStyles();
  const [notices, setNotices] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    let notices = [];
    let stringifiedNotices = localStorage.getItem('notices');
    if (stringifiedNotices) {
      notices = JSON.parse(stringifiedNotices);
    }
    setNotices(notices);
  }, []);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <Aux>
      <Head>
        <title>Notification</title>
        <meta name="description" content="Notification About Upcoming events" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className={classes.container}>
        {notices.map(function (notice, index) {
          const { roomId, password, linkedOrgName, startTime } = notice;
          const readableStartTime = getDecoratedTime(startTime);
          return (
            <div key={index} className={classes.notice}>
              <h2>
                Details of match by {linkedOrgName} at {readableStartTime} are :
                RoomId:{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    setMessage('Room Id Copied !');
                    setShowInfo(true);
                  }}
                  className={classes.span}
                >
                  {roomId}
                </span>
                Password:{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(password);
                    setMessage('Password Copied !');
                    setShowInfo(true);
                  }}
                  className={classes.span}
                >
                  {password}
                </span>
              </h2>
            </div>
          );
        })}
        <SnackbarAlert
          vertical="bottom"
          horizontal="center"
          open={showInfo}
          onClose={handleClose}
          autoHideDuration={3000}
          message={message}
          severity="info"
        />
      </div>
    </Aux>
  );
}
