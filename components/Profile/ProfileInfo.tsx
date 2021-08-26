import { useRouter } from 'next/router';
import Image from 'next/image';
import { Button, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import CakeIcon from '@material-ui/icons/Cake';
import { grey } from '@material-ui/core/colors';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useAuth } from '../../context/authContext';
import { db } from '../../firebase/config';
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
      //   maxWidth: 600,
    },
    header: {
      letterSpacing: 1,
      color: grey[700],
    },
    button: {
      marginTop: 15,
      width: '50%',
    },
    text: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
      marginTop: 10,
      marginLeft: 10,
    },
    cardContainer: {
      marginTop: 50,
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconRow: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 15,
    },
  })
);

export default function ProfileInfo({ userData }: { userData: UserData }) {
  const router = useRouter();
  const styles = useStyles();
  const { signout } = useAuth();
  return (
    <div className={styles.root}>
      {userData.photoURL ? (
        <Image
          src={userData.photoURL}
          width={100}
          height={100}
          alt="Picture of the user"
        />
      ) : null}
      {userData.displayName ? <h1>{userData.displayName}</h1> : null}
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
      <Button
        variant="contained"
        onClick={() =>
          router.push({
            pathname: `/profile/${userData.uid}/edit`,
            query: { ...userData },
          })
        }
        className={styles.button}
      >
        Edit Profile
      </Button>
      <h4 onClick={signout}>Sign Out</h4>
    </div>
  );
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          userId: 'Sdo3A6hPTUfQ63SaSqYMGyrqx093',
        },
      },
    ],
  };
}

export async function getStaticProps(context: { params: { userId: string } }) {
  const userId = context.params.userId;
  let userData = null;
  await db
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      userData = doc.data();
    })
    .catch((error) => {
      console.log('Error getting cached document:', error);
    });
  return {
    props: { userData },
    revalidate: 10,
  };
}
