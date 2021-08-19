import Link from 'next/link';
import {
  Button,
  CardContent,
  CardHeader,
  Container,
  ListItem,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { AddRounded } from '@material-ui/icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1000,
    },
    header: {
      letterSpacing: 1,
      color: grey[700],
    },
    buttonContainer: {
      marginTop: 50,
    },
    buttonText: {
      fontWeight: 'bold',
      letterSpacing: 0.5,
    },
    cardContainer: {
      marginTop: 50,
    },
  })
);

export default function NoOrganization() {
  const styles = useStyles();

  return (
    <Container className={styles.root}>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom
        className={styles.header}
      >
        Creating your organization page is just simple clicks away.
      </Typography>
      <div className={styles.buttonContainer}>
        <Link href="/organization/create" passHref>
          <Button
            variant="outlined"
            endIcon={<AddRounded color="primary" fontSize="large" />}
          >
            <Typography
              variant="body1"
              color="primary"
              className={styles.buttonText}
            >
              Create Your Organization Page
            </Typography>
          </Button>
        </Link>
      </div>
      <div className={styles.cardContainer}>
        <CardHeader title="Who is it for?" />
        <CardContent>
          <ListItem>
            <Typography variant="subtitle1" color="textPrimary">
              1. Are you organizing Custom room matches?
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="subtitle1" color="textPrimary">
              2. Are you a Tournament organizer?
            </Typography>
          </ListItem>
        </CardContent>
        <Typography variant="h6" color="textPrimary">
          Create your organization page and start registration of custom matches
          for
        </Typography>
        <ListItem>
          <Typography variant="button" color="textPrimary">
            1. Battle Grounds Mobile India / PUBG Mobile
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="button" color="textPrimary">
            2. Call of Duty Mobile
          </Typography>
        </ListItem>
        <ListItem>
          <Typography variant="button" color="textPrimary">
            3. Garena Free Fire
          </Typography>
        </ListItem>
        <br />
        <Typography variant="body1" color="textSecondary">
          We will be adding more games very soon.
        </Typography>
      </div>
    </Container>
  );
}
