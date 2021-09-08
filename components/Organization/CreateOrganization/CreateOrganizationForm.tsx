import { useState } from 'react';
import Link from 'next/link';
import router from 'next/router';
import {
  Backdrop,
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';
import { useFormik } from 'formik';
import { OrgFormData } from '../../../utilities/organization/types';
import { validationSchema } from '../../../utilities/organization/validator';
import {
  addOrganization,
  addOrganizationIdtoAdminUser,
} from '../../../lib/addOrganization';
import { useAuth } from '../../../context/authContext';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

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
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
);

function CreateOrganizationForm() {
  const classes = useStyles();
  const { user, updateOrgId } = useAuth();

  const [isBackDropOpen, setIsBackDropOpen] = useState<boolean>(false);

  const initialValues: OrgFormData = {
    name: '',
    about: '',
    location: '',
    email: '',
    phone: '',
    website: '',
    youtube: '',
    discord: '',
    twitch: '',
    facebook: '',
    instagram: '',
    twitter: '',
    reddit: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value, { resetForm }) => {
      setIsBackDropOpen(true);
      const orgId = await addOrganization(value);
      if (orgId) {
        updateOrgId(orgId);
        await addOrganizationIdtoAdminUser(user.uid, orgId);
        router.push(`/organization/${orgId}`);
      }
      setIsBackDropOpen(false);
      resetForm();
    },
  });

  return (
    <form
      className={classes.root}
      onSubmit={formik.handleSubmit}
      noValidate
      autoComplete="false"
    >
      <Link href="/organization" passHref>
        <Button
          color="primary"
          startIcon={<ArrowBackRounded color="primary" />}
        >
          Go Back
        </Button>
      </Link>
      <Typography variant="h5" className={classes.header}>
        Create Organization
      </Typography>
      <TextField
        id="name"
        label="Organization Name*"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        id="about"
        label="About"
        multiline
        rows={4}
        placeholder="A brief description about your organization/community"
        variant="outlined"
        value={formik.values.about}
        onChange={formik.handleChange}
      />
      <TextField
        id="location"
        label="Location*"
        variant="outlined"
        value={formik.values.location}
        onChange={formik.handleChange}
        error={formik.touched.location && Boolean(formik.errors.location)}
        helperText={formik.touched.location && formik.errors.location}
      />
      <TextField
        id="email"
        label="Official email*"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        id="phone"
        label="Mobile no*"
        variant="outlined"
        value={formik.values.phone}
        onChange={formik.handleChange}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />
      <Typography variant="h6" className={classes.header} color="textPrimary">
        Social Links
      </Typography>
      <TextField
        id="website"
        label="Website Link"
        variant="outlined"
        value={formik.values.website}
        onChange={formik.handleChange}
        error={formik.touched.website && Boolean(formik.errors.website)}
        helperText={formik.touched.website && formik.errors.website}
      />
      <TextField
        id="youtube"
        label="YouTube Channel Link"
        variant="outlined"
        value={formik.values.youtube}
        onChange={formik.handleChange}
        error={formik.touched.youtube && Boolean(formik.errors.youtube)}
        helperText={formik.touched.youtube && formik.errors.youtube}
      />
      <TextField
        id="facebook"
        label="Facebook Page Link"
        variant="outlined"
        value={formik.values.facebook}
        onChange={formik.handleChange}
        error={formik.touched.facebook && Boolean(formik.errors.facebook)}
        helperText={formik.touched.facebook && formik.errors.facebook}
      />
      <TextField
        id="instagram"
        label="Instagram Page Link"
        variant="outlined"
        value={formik.values.instagram}
        onChange={formik.handleChange}
        error={formik.touched.instagram && Boolean(formik.errors.instagram)}
        helperText={formik.touched.instagram && formik.errors.instagram}
      />
      <TextField
        id="twitter"
        label="Twitter Page Link"
        variant="outlined"
        value={formik.values.twitter}
        onChange={formik.handleChange}
        error={formik.touched.twitter && Boolean(formik.errors.twitter)}
        helperText={formik.touched.twitter && formik.errors.twitter}
      />
      <TextField
        id="discord"
        label="Discord Channel Link"
        variant="outlined"
        value={formik.values.discord}
        onChange={formik.handleChange}
        error={formik.touched.discord && Boolean(formik.errors.discord)}
        helperText={formik.touched.discord && formik.errors.discord}
      />
      <TextField
        id="twitch"
        label="Twitch Channel Link"
        variant="outlined"
        value={formik.values.twitch}
        onChange={formik.handleChange}
        error={formik.touched.twitch && Boolean(formik.errors.twitch)}
        helperText={formik.touched.twitch && formik.errors.twitch}
      />
      <TextField
        id="reddit"
        label="Reddit Page Link"
        variant="outlined"
        value={formik.values.reddit}
        onChange={formik.handleChange}
        error={formik.touched.reddit && Boolean(formik.errors.reddit)}
        helperText={formik.touched.reddit && formik.errors.reddit}
      />
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          type="submit"
          onClick={() => scrollToTop()}
        >
          <Typography variant="body1" className={classes.buttonText}>
            Create
          </Typography>
        </Button>
      </div>
      <Backdrop className={classes.backdrop} open={isBackDropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </form>
  );
}

export default CreateOrganizationForm;
