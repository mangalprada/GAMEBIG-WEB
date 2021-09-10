import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { OrgFormData } from '../../../utilities/organization/types';

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

interface Props {
  data: OrgFormData;
}

export default function OrganizationProfile({ data }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Typography variant="subtitle2">About us</Typography>
        <Typography variant="body1" color="textPrimary">
          {data.about}
        </Typography>
      </div>
      <div className={classes.contactContainer}>
        <div className={classes.contacts}>
          <Typography variant="subtitle2">
            Admin&apos;s email address
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {data.email}
          </Typography>
        </div>
        <div className={classes.contacts}>
          <Typography variant="subtitle2">
            Admin&apos;s contact number
          </Typography>
          <Typography variant="body1" color="textPrimary">
            +91 {data.phone}
          </Typography>
        </div>
        <div className={classes.contacts}>
          <Typography variant="subtitle2">Official Website</Typography>
          <Typography variant="body1" color="textPrimary">
            {data.website ? data.website : '-'}
          </Typography>
        </div>
      </div>
      <div className={classes.socialLinkContainer}>
        <Typography variant="h6">Social Links</Typography>
        <div className={classes.socialLinkRow}>
          <div className={classes.social}>
            <Typography variant="subtitle2">Facebook</Typography>
            <Typography variant="body1" color="textPrimary">
              {data.facebook ? data.facebook : '-'}
            </Typography>
          </div>
          <div className={classes.social}>
            <Typography variant="subtitle2">Twitter</Typography>
            <Typography variant="body1" color="textPrimary">
              {data.twitter ? data.twitter : '-'}
            </Typography>
          </div>
        </div>
        <div className={classes.socialLinkRow}>
          <div className={classes.social}>
            <Typography variant="subtitle2">Discord</Typography>
            <Typography variant="body1" color="textPrimary">
              {data.discord ? data.discord : '-'}
            </Typography>
          </div>
          <div className={classes.social}>
            <Typography variant="subtitle2">Youtube</Typography>
            <Typography variant="body1" color="textPrimary">
              {data.youtube ? data.youtube : '-'}
            </Typography>
          </div>
        </div>
        <div className={classes.socialLinkRow}>
          <div className={classes.social}>
            <Typography variant="subtitle2">Twitch</Typography>
            <Typography variant="body1" color="textPrimary">
              {data.twitch ? data.twitch : '-'}
            </Typography>
          </div>
          <div className={classes.social}>
            <Typography variant="subtitle2">Reddit</Typography>
            <Typography variant="body1" color="textPrimary">
              {data.reddit ? data.reddit : '-'}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
