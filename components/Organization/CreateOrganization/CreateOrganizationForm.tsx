import Link from 'next/link';
import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        width: '100%',
        marginTop: 10,
        marginBottom: 10,
      },
    },
    header: {
      marginTop: 15,
      marginBottom: 15,
    },
    buttonContainer: {
      marginTop: 50,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
  })
);

function CreateOrganizationForm() {
  const styles = useStyles();
  return (
    <form className={styles.root} noValidate autoComplete="false">
      <Link href="/organization" passHref>
        <Button
          color="primary"
          startIcon={<ArrowBackRounded color="primary" />}
        >
          Go Back
        </Button>
      </Link>
      <Typography variant="h5" className={styles.header}>
        Create Organization
      </Typography>
      <div>
        <TextField
          id="single-static-name"
          label="Organization Name"
          helperText="Your company name"
          variant="outlined"
        />
        <TextField
          id="outlined-multiline-static"
          label="About"
          multiline
          rows={4}
          helperText="A brief description about your org."
          variant="outlined"
        />
        <TextField
          id="single-static-location"
          label="Location"
          variant="outlined"
          helperText="Where is your org. operating from?"
        />
        <TextField
          id="single-static-email"
          label="Email"
          variant="outlined"
          helperText="Your Admin's Email"
        />
        <TextField
          id="single-static-phone"
          label="Contact no"
          variant="outlined"
          helperText="Your Admin's Mobile/Telephone number"
        />
        <Typography variant="h6" className={styles.header} color="textPrimary">
          Social Links
        </Typography>
        <TextField
          id="single-static-website"
          label="Website"
          variant="outlined"
        />
        <TextField
          id="single-static-youtube"
          label="YouTube Channel"
          variant="outlined"
        />
        <TextField
          id="single-static-facebook"
          label="Facebook Page"
          variant="outlined"
        />
        <TextField
          id="single-static-discord"
          label="Discord Channel"
          variant="outlined"
        />
        <TextField
          id="single-static-twitch"
          label="Twitch Channel"
          variant="outlined"
        />
        <TextField
          id="single-static-reddit"
          label="Reddit Page"
          variant="outlined"
        />
        <div className={styles.buttonContainer}>
          <Button variant="contained" color="primary" fullWidth={true}>
            <Typography variant="body1" className={styles.buttonText}>
              Create
            </Typography>
          </Button>
        </div>
      </div>
    </form>
  );
}

export default CreateOrganizationForm;
