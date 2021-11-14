import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getDecoratedTime } from '../../utilities/functions/dateConvert';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import { useUI } from '@/context/uiContext';

export default function Home() {
  const { openSnackBar } = useUI();

  const [notices, setNotices] = useState([]);

  useEffect(() => {
    let notices = [];
    let stringifiedNotices = localStorage.getItem('notices');
    if (stringifiedNotices) {
      notices = JSON.parse(stringifiedNotices);
    }
    setNotices(notices);
  }, []);

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
          const { roomId, password, linkedPageName, startTime } = notice;
          const readableStartTime = getDecoratedTime(startTime);
          return (
            <div key={index} className="">
              <h2>
                Details of match by {linkedPageName} at {readableStartTime} are
                : RoomId:{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(roomId);
                    openSnackBar({
                      label: 'Copied!',
                      message: 'Room Id copied to clipboard',
                      type: 'info',
                    });
                  }}
                  className=""
                >
                  {roomId}
                </span>
                Password:{' '}
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(password);
                    openSnackBar({
                      label: 'Copied',
                      message: 'Password copied to clipboard',
                      type: 'info',
                    });
                  }}
                  className=""
                >
                  {password}
                </span>
              </h2>
            </div>
          );
        })}
      </div>
    </Aux>
  );
}
