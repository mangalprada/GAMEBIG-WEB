import { Avatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: red[500],
      height: theme.spacing(15),
      width: theme.spacing(15),
      marginLeft: theme.spacing(4),
    },
  })
);

export default function OrganizationProfile() {
  const styles = useStyles();

  return (
    <div>
      <Avatar alt="SE" className={styles.avatar}>
        SE
      </Avatar>
    </div>
  );
}
