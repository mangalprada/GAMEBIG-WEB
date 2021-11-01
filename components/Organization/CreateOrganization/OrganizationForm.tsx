import router from 'next/router';
import { useFormik } from 'formik';
import { OrgFormData } from '@/utilities/organization/types';
import { validationSchema } from '@/utilities/organization/validator';
import {
  addOrganization,
  addOrganizationIdtoAdminUser,
  updateOrganization,
} from '@/libs/addOrganization';
import { useAuth } from '@/context/authContext';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import FormInput from '@/components/UI/Inputs/FormInput';
import TextArea from '@/components/UI/Inputs/TextArea';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

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

type Props = {
  organizationData?: OrgFormData;
};

function CreateOrganizationForm({ organizationData }: Props) {
  const { userData, updateOrgId, updateOrgName } = useAuth();

  const formik = useFormik({
    initialValues: organizationData || initialValues,
    validationSchema: validationSchema,
    onSubmit: async (value, { resetForm }) => {
      if (organizationData && organizationData.id) {
        updateOrganization(value, organizationData.id);
        if (userData.linkedOrganizationName !== value.name) {
          updateOrgName(value.name);
          await addOrganizationIdtoAdminUser(
            userData.docId,
            value.name,
            organizationData.id
          );
        }
        router.push(`/organization/${organizationData.id}`);
      } else {
        const orgId = await addOrganization(value);
        if (orgId) {
          updateOrgId(orgId);
          if (userData.docId) updateOrgName(value.name);
          await addOrganizationIdtoAdminUser(userData.docId, value.name, orgId);
          router.push(`/organization/${orgId}`);
        }

        router.push(`/organization/${orgId}`);
      }
      resetForm();
    },
  });

  return (
    <div
      className={
        'xl:w-2/3 md:w-5/6 mx-auto mt-6 px-4 md:px-10' +
        'relative flex flex-col min-w-0 break-words mb-6 ' +
        'shadow-lg rounded-lg border-0'
      }
    >
      <div className="rounded-t-lg bg-gradient-to-tl from-gray-900 to-black mb-0 md:px-7 px-4 py-6 text-center flex justify-between">
        <h6 className="text-white text-2xl font-semibold mt-5 opacity-60">
          {organizationData ? 'Update Organization' : 'Create Organization'}
        </h6>
        <FixedButton
          name="Cancel"
          isDangerous={true}
          onClick={() => router.back()}
        />
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gradient-to-tr from-black to-gray-900">
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="false">
          <h6 className="text-gray-400 md:text-sm mt-3 mb-6 font-bold uppercase">
            Basic Information
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            placeHolder="We organize awsome matches and events."
            value={formik.values.about}
            onChangeHandler={formik.handleChange}
          />
          <h6 className="text-gray-400 md:text-sm mt-10 mb-6 font-bold uppercase">
            Social Links
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div>
            <ResponsiveButton
              name={organizationData ? 'Update' : 'Create'}
              type="submit"
              isDisabled={formik.isSubmitting}
              onClick={() => scrollToTop()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateOrganizationForm;
