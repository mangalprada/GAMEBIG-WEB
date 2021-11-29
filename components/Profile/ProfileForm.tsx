import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../../context/authContext';
import { UserData } from '../../utilities/types';
import { db } from '../../firebase/firebaseClient';
import ResponsiveButton from '../UI/Buttons/ResponsiveButton';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import { isUsernameTaken } from '@/libs/user';
import DateOnlyPicker from '../UI/Picker/DateOnlyPicker';
import TextArea from '../UI/Inputs/TextArea';
import EditAvatar from '../UI/Avatar/EditAvatar';

type Props = {
  oldValues: UserData;
  push: (path: string) => void;
};

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const usernameRegExp = /^[a-zA-Z0-9-_]{0,40}$/;

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email'),
  username: yup
    .string()
    .matches(usernameRegExp, 'username can only contain letters and numbers')
    .required('Username is required'),
  name: yup.string().required('Name can not be empty'),
  dob: yup.date().required('Date of Birth is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .length(10, 'Phone number must be 10 digits long'),
  location: yup.string().optional(),
  youtubeLink: yup.string().url('Enter a valid URL'),
  twitchLink: yup.string().url('Enter a valid URL'),
  facebookLink: yup.string().url('Enter a valid URL'),
  instagramLink: yup.string().url('Enter a valid URL'),
  twitterLink: yup.string().url('Enter a valid URL'),
  redditLink: yup.string().url('Enter a valid URL'),
});

function ProfileForm({ oldValues, push }: Props) {
  const { userData } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: oldValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      setSubmitting(true);
      const isTaken = await isUsernameTaken(values.username, userData.uid);
      if (isTaken) {
        setErrors({ username: 'This username is taken!' });
      } else {
        saveUserData(oldValues.username, values);
        resetForm();
      }
      setSubmitting(false);
    },
  });

  const saveUserData = async (username: string, userData: UserData) => {
    try {
      await db.collection('users').doc(oldValues.docId).update(userData);
    } catch (err) {
      console.log('err', err);
    } finally {
      push(`/profile/${username}`);
    }
  };

  const onImageUpload = (url: string) => {
    try {
      db.collection('users').doc(userData.uid).update({
        photoURL: url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={
        'md:w-5/6 xl:w-2/3 mx-auto mt-6 ' +
        'relative flex flex-col min-w-0 break-words mb-6 ' +
        'shadow-lg rounded-lg border-0'
      }
    >
      <div className="rounded-t-lg bg-gradient-to-tl from-gray-900 to-black mb-0 md:px-7 px-4 py-6 text-center flex justify-between">
        <h6 className="text-white text-2xl font-semibold mt-5 opacity-60">
          Edit Profile
        </h6>
        <FixedButton
          name="Cancel"
          isDangerous={true}
          onClick={() => router.back()}
        />
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0 bg-gradient-to-tr from-black to-gray-900">
        <EditAvatar onUpload={onImageUpload} />
        <form onSubmit={formik.handleSubmit}>
          <h6 className="text-gray-400 md:text-sm mt-3 mb-6 font-bold uppercase">
            User Information
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-10">
            <FormInput
              isDisabled={true}
              labelName="username"
              name="username"
              value={formik.values.username}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.username)}
              errorMessage={formik.errors.username}
            />
            <FormInput
              labelName="Name"
              name="name"
              value={formik.values.name}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.name)}
              errorMessage={formik.errors.name}
            />
            <FormInput
              labelName="Email"
              name="email"
              value={formik.values.email}
              placeHolder="abc@xyz.com"
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.email)}
              errorMessage={formik.errors.email}
            />
            <FormInput
              labelName="Phone Number"
              name="phoneNumber"
              value={formik.values.phoneNumber}
              placeHolder="10 digit e.g. - 9876543210"
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.phoneNumber)}
              errorMessage={formik.errors.phoneNumber}
            />
            <FormInput
              labelName="Location"
              name="location"
              value={formik.values.location}
              onChangeHandler={formik.handleChange}
              placeHolder="City, Country"
            />
            <DateOnlyPicker
              name="dob"
              label="Date of Birth"
              value={
                formik.values.dob ? new Date(formik.values.dob) : new Date()
              }
              changeHandler={(date: Date) => formik.setFieldValue('dob', date)}
              error={Boolean(formik.errors.dob)}
              errorMessage={formik.errors.dob}
            />
            <section className="md:col-span-2 col-span-1">
              <TextArea
                labelName="About me"
                name="about"
                value={formik.values.about}
                onChangeHandler={formik.handleChange}
                placeHolder="I'm a professional esports player 😎"
              />
            </section>
          </div>
          <h6 className="text-gray-400 md:text-sm mt-10 mb-6 font-bold uppercase">
            Social Links
          </h6>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-10">
            <FormInput
              labelName="Youtube"
              name="youtubeLink"
              placeHolder="link to your YouTube channel"
              value={formik.values.youtubeLink}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.youtubeLink)}
              errorMessage={formik.errors.youtubeLink}
            />
            <FormInput
              labelName="Twitch"
              name="twitchLink"
              placeHolder="link to your twitch channel"
              value={formik.values.twitchLink}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.twitchLink)}
              errorMessage={formik.errors.twitchLink}
            />
            <FormInput
              labelName="Facebook"
              name="facebookLink"
              placeHolder="link to your facebook profile"
              value={formik.values.facebookLink}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.facebookLink)}
              errorMessage={formik.errors.facebookLink}
            />
            <FormInput
              labelName="Instagram"
              name="instagramLink"
              placeHolder="link to your Instagram profile"
              value={formik.values.instagramLink}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.instagramLink)}
              errorMessage={formik.errors.instagramLink}
            />
            <FormInput
              labelName="Twitter"
              name="twitterLink"
              placeHolder="link to your Twitter page"
              value={formik.values.twitterLink}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.twitterLink)}
              errorMessage={formik.errors.twitterLink}
            />
            <FormInput
              labelName="Reddit"
              name="redditLink"
              placeHolder="link to your reddit profile"
              value={formik.values.redditLink}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.redditLink)}
              errorMessage={formik.errors.redditLink}
            />
          </div>
          <ResponsiveButton
            name="Save Changes"
            type="submit"
            isDisabled={formik.isSubmitting}
          />
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
