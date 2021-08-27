import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
  title?: string;
  date?: string;
  content?: string[];
  isOrganizer: boolean;
};

export default function TournamentCard({ isOrganizer }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <CardHeader
        classes={{ title: classes.title }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
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
        title="Seven Esports"
        subheader="September 14, 2016"
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
            BGMI - Squad
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
            7:00 PM - 7:30 PM
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
            T2 Screams
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
            200 ₹
          </Typography>
        </div>
      </CardContent>
      <div className={classes.chipContainer}>
        <Chip
          className={classes.chipElement}
          label="25 Slots available"
          variant="outlined"
          icon={<HomeRounded fontSize="small" />}
        />
        <Chip
          className={classes.chipElement}
          label="Registration open till 31.08.2021, 8:00 PM"
          variant="outlined"
          icon={<AvTimerRounded fontSize="small" />}
        />
      </div>
      <div className={classes.buttonContainer}>
        {!isOrganizer && (
          <Button variant="contained" color="primary">
            Register
          </Button>
        )}
        <Button color="primary">Details</Button>
      </div>
    </Card>
  );
}
