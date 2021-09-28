import { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Button,
  Chip,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {
  AccessTimeRounded,
  AvTimerRounded,
  EmojiEventsRounded,
  HomeRounded,
  LocationOnRounded,
  MoneyRounded,
  SportsEsportsRounded,
} from '@material-ui/icons';
import Link from 'next/link';
import { db } from '../../../firebase/firebaseClient';
import { useAuth } from '../../../context/authContext';
import { TournamentData } from '../../../utilities/tournament/types';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '../../../utilities/functions/dateConvert';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1000,
      marginBottom: 20,
      paddingInline: 20,
    },
    avatar: {
      backgroundColor: red[500],
    },
    title: {
      fontWeight: 'bold',
    },
    cardContentContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginInline: 5,
    },
    element: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 5,
      marginTop: 5,
      width: 200,
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
    chipContainer: {
      display: 'flex',
      marginBottom: 10,
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    chipElement: {
      marginBlock: 5,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      flexDirection: 'row-reverse',
      paddingInline: 10,
      marginBottom: 15,
    },
  })
);

type Props = {
  data: TournamentData;
  isOrganizer: boolean;
};

export default function TournamentCard({ isOrganizer, data }: Props) {
  const classes = useStyles();
  const { user } = useAuth();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

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

  const goToTournamentPage = () => {
    router.push(`/organization/${data.linkedOrgId}/tournaments/${data.id}/`);
  };

  return (
    <Card className={classes.root} elevation={3} onClick={goToTournamentPage}>
      <CardHeader
        classes={{ title: classes.title }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.linkedOrgName[0]}
          </Avatar>
        }
        action={
          <div className={classes.headerElement}>
            <LocationOnRounded fontSize="small" />
            <Typography
              variant="body1"
              color="textSecondary"
              component="body"
              display="inline"
              className={classes.content}
            >
              India
            </Typography>
          </div>
        }
        title={data.linkedOrgName}
        subheader={getDecoratedDate(data.createdAt)}
      />
      <CardContent className={classes.cardContentContainer}>
        <div className={classes.element}>
          <SportsEsportsRounded fontSize="small" />
          <Typography
            variant="body1"
            color="textSecondary"
            component="body"
            display="inline"
            className={classes.content}
          >
            {data.game} - {data.mode}
          </Typography>
        </div>
        <div className={classes.element}>
          <AccessTimeRounded fontSize="small" />
          <Typography
            variant="body1"
            color="textSecondary"
            component="body"
            display="inline"
            className={classes.content}
          >
            {getDecoratedTime(data.startTime)} {' - '}
            {getDecoratedTime(data.startTime, 30)}
          </Typography>
        </div>
        <div className={classes.element}>
          <EmojiEventsRounded fontSize="small" />
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            display="inline"
            className={classes.content}
          >
            {data.tier} Screams
          </Typography>
        </div>
        <div className={classes.element}>
          <MoneyRounded fontSize="small" />
          <Typography
            variant="body1"
            color="textSecondary"
            component="p"
            display="inline"
            className={classes.content}
          >
            {data.prize ? data.prize + ' ₹' : 'No Prize'}
          </Typography>
        </div>
      </CardContent>
      <div className={classes.chipContainer}>
        <Chip
          className={classes.chipElement}
          label={`${data.noOfSlots} Slots available`}
          variant="outlined"
          icon={<HomeRounded fontSize="small" />}
        />
        <Chip
          className={classes.chipElement}
          label={`Registration open till 
          ${getDecoratedDate(data.startTime)}, 
          ${getDecoratedTime(data.startTime)}`}
          variant="outlined"
          icon={<AvTimerRounded fontSize="small" />}
        />
      </div>
      <div className={classes.buttonContainer}>
        {!isOrganizer && (
          <Link
            href={`/organization/${data.linkedOrgId}/tournaments/${data.id}/#register`}
            passHref
          >
            {isRegistered ? (
              <Typography variant="body1">Already Registered</Typography>
            ) : (
              <Button variant="contained" color="primary">
                Register
              </Button>
            )}
          </Link>
        )}
        <Link
          href={`/organization/${data.linkedOrgId}/tournaments/${data.id}/`}
          passHref
        >
          <Button color="primary">Details</Button>
        </Link>
      </div>
    </Card>
  );
}
