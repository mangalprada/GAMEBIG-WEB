import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CakeIcon from '@material-ui/icons/Cake';
import { grey } from '@material-ui/core/colors';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
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
  const styles = useStyles();

  const goToEditPage = () => {
    if (userData) {
      const stringifiedUsedData: string = JSON.stringify(userData);
      router.push({
        pathname: `/profile/${userData.uid}/edit`,
        query: { data: stringifiedUsedData },
      });
    }
  };

  return (
    <div className={styles.root}>
      <div>
        {userData.photoURL ? (
          <div className={styles.imageCard}>
            <Image
              src={userData.photoURL}
              alt="Picture of the user"
              className={styles.image}
              layout="fill"
              objectFit="contain"
            />
          </div>
        ) : null}
        <Button
          variant="contained"
          onClick={goToEditPage}
          className={styles.button}
        >
          <Typography variant="body1" className={styles.buttonText}>
            Edit Profile
          </Typography>
        </Button>
      </div>
      <div className={styles.infocard}>
        {userData.username ? (
          <Typography variant="body1" className={styles.header}>
            @{userData.username}
          </Typography>
        ) : null}
        {userData.displayName ? (
          <Typography variant="body1" className={styles.buttonText}>
            {userData.displayName}
          </Typography>
        ) : null}
        {userData.dob ? (
          <div className={styles.flexRow}>
            <CakeIcon />
            <Typography variant="body1" className={styles.text}>
              {userData.dob}
            </Typography>
          </div>
        ) : null}
        {userData.country ? (
          <div className={styles.flexRow}>
            <LocationOnIcon />
            <Typography variant="body1" className={styles.text}>
              {userData.country}
            </Typography>
          </div>
        ) : null}
        {userData.phoneNumber ? (
          <div className={styles.flexRow}>
            <SmartphoneIcon />
            <Typography variant="body1" className={styles.text}>
              {userData.phoneNumber}
            </Typography>
          </div>
        ) : null}
        {userData.email ? (
          <div className={styles.flexRow}>
            <EmailIcon />
            <Typography variant="body1" className={styles.text}>
              {userData.email}
            </Typography>
          </div>
        ) : null}
        <div className={styles.iconRow}>
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
