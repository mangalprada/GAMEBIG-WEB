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
    buttonContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      paddingInline: 10,
      marginBottom: 15,
    },
    chipContainer: {
      display: 'flex',
      marginBottom: 10,
      marginInline: 20,
    },
  })
);

type Props = {
  title?: string;
  date?: string;
  content?: string[];
};

export default function RecipeReviewCard({ title }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
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
          label="25 Slots available"
          variant="outlined"
          icon={<HomeRounded fontSize="small" />}
        />
      </div>
      <div className={classes.buttonContainer}>
        <Button>Details</Button>
        <Button variant="contained" color="primary">
          Register
        </Button>
      </div>
    </Card>
  );
}
