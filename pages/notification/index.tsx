import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getDecoratedTime } from '../../utilities/functions/dateConvert';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import SnackbarAlert from '../../components/UI/Snackbar/SnackBar';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [showInfo, setShowInfo] = useState(false);
  const [message, setMessage] = useState({ label: '', message: '' });

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
      <div className="">
        {notices.map(function (notice, index) {
          const { roomId, password, linkedOrgName, startTime } = notice;
          const readableStartTime = getDecoratedTime(startTime);
          return (
            <div key={index} className="">
              <h2>
                Details of match by {linkedOrgName} at {readableStartTime} are :
                RoomId:{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    setMessage({
                      label: 'Copied!',
                      message: 'Room Id copied to clipboard',
                    });
                    setShowInfo(true);
                  }}
                  className=""
                >
                  {roomId}
                </span>
                Password:{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(password);
                    setMessage({
                      label: 'Copied',
                      message: 'Password copied to clipboard',
                    });
                    setShowInfo(true);
                  }}
                  className=""
                >
                  {password}
                </span>
              </h2>
            </div>
          );
        })}
        <SnackbarAlert
          open={showInfo}
          onClose={handleClose}
          autoHideDuration={3000}
          message={message}
          type="info"
        />
      </div>
    </Aux>
  );
}
