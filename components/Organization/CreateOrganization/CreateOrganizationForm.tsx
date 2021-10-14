import { useState } from 'react';
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
import { useFormik } from 'formik';
import { OrgFormData } from '../../../utilities/organization/types';
import { validationSchema } from '../../../utilities/organization/validator';
import {
  addOrganization,
  addOrganizationIdtoAdminUser,
} from '../../../lib/addOrganization';
import { useAuth } from '../../../context/authContext';
import FixedButton from '../../UI/Buttons/FixedButton';
import FormInput from '../../UI/Inputs/FormInput';
import ResponsiveButton from '../../UI/Buttons/ResponsiveButton';
import TextArea from '../../UI/Inputs/TextArea';

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
  const { userData, updateOrgId, updateOrgName } = useAuth();

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
        if (userData.docId) updateOrgName(value.name);
        await addOrganizationIdtoAdminUser(userData.docId, value.name, orgId);
        router.push(`/organization/${orgId}`);
      }
      setIsBackDropOpen(false);
      resetForm();
    },
  });

  return (
    <div
      className={
        'w-full mx-auto mt-6 ' +
        'relative flex flex-col min-w-0 break-words w-full mb-6 ' +
        'shadow-lg rounded-lg border-0'
      }
    >
      <div className="rounded-t-lg bg-gradient-to-tl from-gray-900 to-black mb-0 md:px-7 px-4 py-6 text-center flex justify-between">
        <h6 className="text-white text-2xl font-semibold mt-5 opacity-60">
          Create Organization
        </h6>
        <FixedButton
          name="Cancel"
          isDangerous={true}
          onClickHandler={() => router.back()}
        />
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gradient-to-tr from-black to-gray-900">
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="false">
          <h6 className="text-gray-400 md:text-sm mt-3 mb-6 font-bold uppercase">
            Basic Information
          </h6>
          <div className="flex flex-wrap">
            <FormInput
              labelName="Organization Name*"
              name="name"
              value={formik.values.name}
              placeHolder="Awsome Esports"
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.name)}
              errorMessage={formik.errors.name}
            />
            <FormInput
              labelName="Official Email*"
              name="email"
              value={formik.values.email}
              placeHolder="awsome@xyz.com"
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.email)}
              errorMessage={formik.errors.email}
            />
            <FormInput
              labelName="Phone Number*"
              name="phone"
              value={formik.values.phone}
              placeHolder="10 digit e.g. - 9876543210"
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.phone)}
              errorMessage={formik.errors.phone}
            />
            <FormInput
              labelName="Location"
              name="location"
              value={formik.values.location}
              placeHolder="India"
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.location)}
              errorMessage={formik.errors.location}
            />
          </div>
          <h6 className="text-gray-400 md:text-sm mt-10 mb-6 font-bold uppercase">
            About
          </h6>
          <TextArea
            name="about"
            labelName="About us"
            placeHolder="We organize awsome matches and tournaments."
            value={formik.values.about}
            onChangeHandler={formik.handleChange}
          />
          <h6 className="text-gray-400 md:text-sm mt-10 mb-6 font-bold uppercase">
            Social Links
          </h6>
          <div className="flex flex-wrap">
            <FormInput
              labelName="Website"
              name="website"
              placeHolder="link to your official website"
              value={formik.values.website}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.website)}
              errorMessage={formik.errors.website}
            />
            <FormInput
              labelName="Youtube"
              name="youtube"
              placeHolder="link to your YouTube channel"
              value={formik.values.youtube}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.youtube)}
              errorMessage={formik.errors.youtube}
            />
            <FormInput
              labelName="Discord"
              name="discord"
              placeHolder="link to your Discord channel"
              value={formik.values.discord}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.discord)}
              errorMessage={formik.errors.discord}
            />
            <FormInput
              labelName="Twitch"
              name="twitch"
              placeHolder="link to your twitch channel"
              value={formik.values.twitch}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.twitch)}
              errorMessage={formik.errors.twitch}
            />
            <FormInput
              labelName="Facebook"
              name="facebook"
              placeHolder="link to your facebook profile"
              value={formik.values.facebook}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.facebook)}
              errorMessage={formik.errors.facebook}
            />
            <FormInput
              labelName="Instagram"
              name="instagram"
              placeHolder="link to your Instagram profile"
              value={formik.values.instagram}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.instagram)}
              errorMessage={formik.errors.instagram}
            />
            <FormInput
              labelName="Twitter"
              name="twitter"
              placeHolder="link to your Twitter page"
              value={formik.values.twitter}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.twitter)}
              errorMessage={formik.errors.twitter}
            />
            <FormInput
              labelName="Reddit"
              name="reddit"
              placeHolder="link to your reddit profile"
              value={formik.values.reddit}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.reddit)}
              errorMessage={formik.errors.reddit}
            />
          </div>
          <div className={classes.buttonContainer}>
            <ResponsiveButton
              name="Create"
              type="submit"
              isDisabled={formik.isSubmitting}
              onClickHandler={() => scrollToTop()}
            />
          </div>
          <Backdrop className={classes.backdrop} open={isBackDropOpen}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </form>
      </div>
    </div>
  );
}

export default CreateOrganizationForm;
