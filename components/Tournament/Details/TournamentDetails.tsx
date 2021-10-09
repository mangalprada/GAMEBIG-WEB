import { useEffect, useState } from 'react';
import router from 'next/router';
import {
  Avatar,
  Button,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowBackIosRounded } from '@material-ui/icons';
import { grey, red } from '@material-ui/core/colors';
import { useAuth } from '../../../context/authContext';
import SnackbarAlert from '../../UI/Snackbar/SnackBar';
import { TournamentData } from '../../../utilities/tournament/types';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '../../../utilities/functions/dateConvert';
import { games } from '../../../utilities/GameList';
import { db } from '../../../firebase/firebaseClient';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginLeft: 15,
    },
    rowContainer: {
      width: 200,
    },
    columnContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBlock: 10,
      maxWidth: 600,
    },
    textData: {
      fontWeight: 'bold',
    },
    header: {
      marginLeft: -20,
    },
    heading: {
      fontWeight: 600,
      color: grey[500],
    },
    title: {
      fontWeight: 600,
      fontSize: 20,
    },
    headerElement: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5,
    },
    content: {
      marginLeft: 7,
    },
    avatar: {
      backgroundColor: red[500],
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

interface Props {
  data: TournamentData;
  isOrganizer: boolean;
}

export default function DetailsAsParticipant({ data, isOrganizer }: Props) {
  const classes = useStyles();
  const { user } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (data.id && user.username) {
      db.collection('tournaments')
        .doc(data.id)
        .collection('teams')
        .where('usernames', 'array-contains', user.username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
            }
          });
        });
    }
  }, [data.id, user.username]);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <div>
      <Button
        color="primary"
        startIcon={<ArrowBackIosRounded color="primary" />}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
      <div className={classes.root}>
        <div className={classes.header}>
          <CardHeader
            classes={{ title: classes.title }}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {data?.linkedOrgName[0]}
              </Avatar>
            }
            title={data.linkedOrgName}
          />
        </div>
        <div className={classes.columnContainer}>
          {/** Game Name */}
          <div className={classes.rowContainer}>
            <Typography variant="overline" className={classes.heading}>
              Game
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {games[data.gameCode].shortName}
            </Typography>
          </div>
          {/** Game Mode */}
          <div className={classes.rowContainer}>
            <Typography variant="overline" className={classes.heading}>
              Mode
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {data.mode}
            </Typography>
          </div>
        </div>
        <div className={classes.columnContainer}>
          {/** Tier / Scream */}
          <div className={classes.rowContainer}>
            <Typography variant="overline" className={classes.heading}>
              Tier
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {data.tier}
            </Typography>
          </div>
          <div className={classes.rowContainer}>
            {/** Prize Money */}
            <Typography variant="overline" className={classes.heading}>
              Prize Money
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {data.prize ? data.prize + ' ₹' : 'No Prize'}
            </Typography>
          </div>
        </div>
        <div className={classes.columnContainer}>
          {/** Match Start Time */}
          <div className={classes.rowContainer}>
            <Typography variant="overline" className={classes.heading}>
              Match Date and Time
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {getDecoratedTime(data.startTime)} {' - '}
              {getDecoratedTime(data.startTime, 30)}
            </Typography>
          </div>
          <div className={classes.rowContainer}>
            {/** Registration Open Till */}
            <Typography variant="overline" className={classes.heading}>
              Registration Open till
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {getDecoratedDate(data.startTime)}{' '}
              {getDecoratedTime(data.startTime)}
            </Typography>
          </div>
        </div>
        <div className={classes.columnContainer}>
          <div className={classes.rowContainer}>
            <Typography variant="overline" className={classes.heading}>
              Maximum Slots Available
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {data.noOfSlots}
            </Typography>
          </div>
        </div>
        <div className={classes.columnContainer}>
          <div>
            <Typography variant="overline" className={classes.heading}>
              Details / Rules
            </Typography>
            <Typography
              variant="body1"
              color="textPrimary"
              className={classes.textData}
            >
              {data.description}
            </Typography>
          </div>
        </div>
        {isOrganizer || isRegistered ? (
          <div className={classes.columnContainer}>
            {data.roomId && (
              <div>
                <Typography variant="overline" className={classes.heading}>
                  Room Id :
                  <span
                    onClick={() => {
                      if (data.roomId) {
                        navigator.clipboard.writeText(data.roomId);
                        setMessage('Room Id Copied !');
                        setShowInfo(true);
                      }
                    }}
                    className={classes.span}
                  >
                    {data.roomId}
                  </span>
                </Typography>
              </div>
            )}
            {data.password && (
              <div>
                <Typography variant="overline" className={classes.heading}>
                  Password :
                  <span
                    onClick={() => {
                      if (data.password) {
                        navigator.clipboard.writeText(data.password);
                        setMessage('Password Copied !');
                        setShowInfo(true);
                      }
                    }}
                    className={classes.span}
                  >
                    {data.password}
                  </span>
                </Typography>
              </div>
            )}
          </div>
        ) : null}
      </div>
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
  );
}
