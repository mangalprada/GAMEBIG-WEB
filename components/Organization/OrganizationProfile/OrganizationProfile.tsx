import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: 20,
    },
    contactContainer: {
      maxWidth: 600,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBlock: 10,
    },
    contacts: {
      marginBlock: 10,
    },
    socialLinkContainer: {
      maxWidth: 620,
    },
    socialLinkRow: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    social: {
      marginTop: 5,
      width: 250,
    },
  })
);

export default function OrganizationProfile() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Typography variant="subtitle2">About us</Typography>
        <Typography variant="body1" color="textPrimary">
          We organize tournaments for T1 &amp; T2 tiers for BGMI, COD and Free
          Fire. Seven Esports has a large community of more that 16k followers
          in youtube and 8k members on it’s Discord chanel.
        </Typography>
      </div>
      <div className={styles.contactContainer}>
        <div className={styles.contacts}>
          <Typography variant="subtitle2">
            Admin&apos;s email address
          </Typography>
          <Typography variant="body1" color="textPrimary">
            seven.esports@gmail.com
          </Typography>
        </div>
        <div className={styles.contacts}>
          <Typography variant="subtitle2">
            Admin&apos;s contact number
          </Typography>
          <Typography variant="body1" color="textPrimary">
            +91 9988776655
          </Typography>
        </div>
      </div>
      <div className={styles.socialLinkContainer}>
        <Typography variant="h6">Social Links</Typography>
        <div className={styles.socialLinkRow}>
          <div className={styles.social}>
            <Typography variant="subtitle2">Facebook</Typography>
            <Typography variant="body1" color="textPrimary">
              facebook.com/sevenesports
            </Typography>
          </div>
          <div className={styles.social}>
            <Typography variant="subtitle2">Twitter</Typography>
            <Typography variant="body1" color="textPrimary">
              twitter.com/sevenesports
            </Typography>
          </div>
        </div>
        <div className={styles.socialLinkRow}>
          <div className={styles.social}>
            <Typography variant="subtitle2">Discord</Typography>
            <Typography variant="body1" color="textPrimary">
              discord.gg/sevenesports
            </Typography>
          </div>
          <div className={styles.social}>
            <Typography variant="subtitle2">Youtube</Typography>
            <Typography variant="body1" color="textPrimary">
              youtube.com/sevenesports
            </Typography>
          </div>
        </div>
        <div className={styles.socialLinkRow}>
          <div className={styles.social}>
            <Typography variant="subtitle2">Twitch</Typography>
            <Typography variant="body1" color="textPrimary">
              twitch.com/sevenesports
            </Typography>
          </div>
          <div className={styles.social}>
            <Typography variant="subtitle2">Reddit</Typography>
            <Typography variant="body1" color="textPrimary">
              reddit.com/sevenesports
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
