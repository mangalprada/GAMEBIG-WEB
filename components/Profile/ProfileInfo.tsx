import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CakeIcon from '@material-ui/icons/Cake';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useAuth } from '../../context/authContext';
import Twitch from '../../assets/Icons/Twitch';
import YouTube from '../../assets/Icons/YouTube';
import Instagram from '../../assets/Icons/Instagram';
import Facebook from '../../assets/Icons/Facebook';
import Twitter from '../../assets/Icons/Twitter';
import Reddit from '../../assets/Icons/Reddit';
import { UserData } from '../../utilities/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    header: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      marginBottom: 10,
    },
    button: {
      marginTop: 15,
      marginBottom: 20,
      width: '100%',
    },
    text: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      marginLeft: 20,
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
    },
    iconRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    imageCard: {
      position: 'relative',
      width: '200px',
      height: '200px',
    },
    image: {
      borderRadius: '4%',
      border: '5px solid #555',
    },
    infocard: {
      marginLeft: '8%',
    },
  })
);

export default function ProfileInfo({ userData }: { userData: UserData }) {
  const router = useRouter();
  const { user } = useAuth();
  const classes = useStyles();

  const goToEditPage = () => {
    if (userData) {
      const stringifiedUsedData: string = JSON.stringify(userData);
      router.push({
        pathname: `/profile/${userData.username}/edit`,
        query: { data: stringifiedUsedData },
      });
    }
  };

  return (
    <div className={classes.root}>
      <div>
        {userData.photoURL ? (
          <div className={classes.imageCard}>
            <Image
              src={userData.photoURL}
              alt="Picture of the user"
              className={classes.image}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : null}
        {userData.username === user.username ? (
          <Button
            variant="contained"
            onClick={goToEditPage}
            className={classes.button}
          >
            <Typography variant="body1" className={classes.buttonText}>
              Edit Profile
            </Typography>
          </Button>
        ) : null}
      </div>
      <div className={classes.infocard}>
        {userData.username ? (
          <Typography variant="body1" className={classes.header}>
            @{userData.username}
          </Typography>
        ) : null}
        {userData.name ? (
          <Typography variant="body1" className={classes.buttonText}>
            {userData.name}
          </Typography>
        ) : null}
        {userData.dob ? (
          <div className={classes.flexRow}>
            <CakeIcon />
            <Typography variant="body1" className={classes.text}>
              {userData.dob}
            </Typography>
          </div>
        ) : null}
        {userData.country ? (
          <div className={classes.flexRow}>
            <LocationOnIcon />
            <Typography variant="body1" className={classes.text}>
              {userData.country}
            </Typography>
          </div>
        ) : null}
        {userData.phoneNumber ? (
          <div className={classes.flexRow}>
            <SmartphoneIcon />
            <Typography variant="body1" className={classes.text}>
              {userData.phoneNumber}
            </Typography>
          </div>
        ) : null}
        {userData.email ? (
          <div className={classes.flexRow}>
            <EmailIcon />
            <Typography variant="body1" className={classes.text}>
              {userData.email}
            </Typography>
          </div>
        ) : null}
        <div className={classes.iconRow}>
          {userData.twitchLink ? (
            <Twitch
              size={30}
              onClick={() => window.open(userData.twitchLink, '_blank')}
            />
          ) : null}
          {userData.youtubeLink ? (
            <YouTube
              size={28}
              onClick={() => window.open(userData.youtubeLink, '_blank')}
            />
          ) : null}
          {userData.instagramLink ? (
            <Instagram
              size={36}
              onClick={() => window.open(userData.instagramLink, '_blank')}
            />
          ) : null}
          {userData.facebookLink ? (
            <Facebook
              size={40}
              onClick={() => window.open(userData.facebookLink, '_blank')}
            />
          ) : null}
          {userData.twitterLink ? (
            <Twitter
              size={30}
              onClick={() => window.open(userData.twitterLink, '_blank')}
            />
          ) : null}
          {userData.redditLink ? (
            <Reddit
              size={38}
              onClick={() => window.open(userData.redditLink, '_blank')}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
