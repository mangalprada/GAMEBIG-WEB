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
import { TournamentData } from '../../../utilities/tournament/types';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '../../../utilities/functions/dateConvert';

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
  })
);

interface Props {
  data: TournamentData;
}

export default function DetailsAsParticipant({ data }: Props) {
  const classes = useStyles();

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
              {data.game}
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
      </div>
    </div>
  );
}
