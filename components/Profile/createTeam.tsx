import { useState } from 'react';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as yup from 'yup';
import { db } from '../../firebase/firebaseClient';
import { BasicUserType, TeamType } from '../../utilities/types';
import FormInput from '../UI/Inputs/FormInput';
import FixedButton from '../UI/Buttons/FixedButton';
import SelectDropDown from '../UI/Select/SelectDropDown';
import LoadingLottie from '../UI/Loaders/Dots';
import { useUI } from '@/context/uiContext';
import { getUserByUsername } from '@/libs/user';
import { useAuth } from '@/context/authContext';
import HorizontalProfile from './HorizontalProfile';

const validationSchema = yup.object({
  teamName: yup.string().required('Team name is required'),
  username: yup.string(),
  inGameLead: yup.string().required('In Game Lead is required'),
});

type PropsType = {
  teamData?: TeamType;
  teamSize?: number;
  onCancel: () => void;
  handleSubmit?: (teamData: TeamType) => void;
};

const emptyValues = {
  username: '',
  teamName: '',
  inGameLead: '',
};

export default function CreateTeam({
  teamData,
  teamSize,
  onCancel,
  handleSubmit,
}: PropsType) {
  const { userData } = useAuth();
  const { openSnackBar } = useUI();

  const [loading, setLoading] = useState(false);
  const [gamers, setgamers] = useState<BasicUserType[]>(
    teamData?.gamers || [
      {
        uid: userData.uid,
        username: userData.username,
        name: userData.name,
        photoURL: userData.photoURL,
      },
    ]
  );

  const formik = useFormik({
    initialValues: {
      ...emptyValues,
      teamName: teamData?.teamName,
      inGameLead: teamData?.teamName,
    },
    validationSchema: validationSchema,
    onSubmit: ({ teamName, inGameLead }, { setSubmitting }) => {
      setSubmitting(true);
      if (teamName && inGameLead) {
        const uids = gamers.map((gamer) => gamer.uid);
        const team: TeamType = { teamName, uids, gamers, inGameLead };
        saveTeam(team);
        if (handleSubmit) handleSubmit(team);
      }
      formik.resetForm();
      setSubmitting(false);
    },
  });

  const saveTeam = async (team: TeamType) => {
    if (teamSize && gamers.length !== teamSize) {
      openSnackBar({
        label: 'Oops!',
        message: `You need to have ${teamSize} gamers to create a Team`,
        type: 'warning',
      });
      return;
    }
    if (!team.inGameLead) {
      openSnackBar({
        label: 'Oh Oh!',
        message: `You need a In Game Lead to create a Team!`,
        type: 'warning',
      });
      return;
    }
    try {
      await db.collection('teams').add(team);
      openSnackBar({
        label: 'Yay!',
        message: `${team.teamName} added!`,
        type: 'success',
      });
      onCancel();
    } catch (err) {
      console.log('err', err);
    }
  };

  const addgamer = async () => {
    setLoading(true);
    const { username } = formik.values;
    if (
      username === '' ||
      gamers.find((o) => (o.username === username ? true : false))
    ) {
      formik.setFieldValue('username', '');
      setLoading(false);
      return;
    }
    const user = await getUserByUsername(username);
    if (user) {
      const { username, name, uid, photoURL } = user;
      setgamers([...gamers, { username, name, uid, photoURL }]);
      formik.setFieldValue('username', '');
    } else {
      formik.setErrors({ username: 'No User exist with this username' });
    }
    setLoading(false);
  };

  const removegamer = (uid: string) => {
    const newgamers = gamers.filter((gamer) => gamer.uid !== uid);
    setgamers(newgamers);
  };

  return (
    <div className="bg-gray-900 rounded-lg w-full text-gray-300 font-sans font-semibold m-auto py-10">
      <span className="text-2xl py-6 ml-2 md:ml-10">Create Your Team</span>
      <div className="grid grid-cols-1 md:grid-cols-2 px-3 gap-8">
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
          <FormInput
            labelName="Team Name"
            name="teamName"
            value={formik.values.teamName}
            placeHolder="Awsome Team"
            onChangeHandler={formik.handleChange}
            error={Boolean(formik.errors.teamName)}
            errorMessage={formik.errors.teamName}
          />
          <div className="flex items-center gap-4">
            <FormInput
              labelName="username"
              name="username"
              value={formik.values.username}
              onChangeHandler={formik.handleChange}
              error={Boolean(formik.errors.username)}
              errorMessage={formik.errors.username}
            />
            {!loading ? (
              <FixedButton
                name="Add"
                isDisabled={formik.isSubmitting}
                onClick={addgamer}
              />
            ) : (
              <LoadingLottie height={40} width={80} />
            )}
          </div>
          <SelectDropDown
            label="IGL (In Game Lead)"
            handleChange={(item) => {
              formik.setFieldValue('inGameLead', item.username);
            }}
            name="inGameLead"
            menuItems={gamers}
            propToShow="username"
          />
        </form>
        <div className="w-full flex flex-col">
          {gamers.map((gamer, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between my-1 md:pr-4 rounded-md bg-gray-800"
            >
              <HorizontalProfile user={gamer} />
              {gamer.username === formik.values.inGameLead ? (
                <div className="bg-red-400 rounded-md px-2 ml-2">
                  <span className="text-sm text-black font-bold">IGL</span>
                </div>
              ) : null}
              {gamer.uid !== userData.uid ? (
                <span
                  className="hover:bg-gray-700 py-2 px-4 rounded"
                  onClick={() => {
                    removegamer(gamer.uid);
                  }}
                >
                  Remove
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-evenly pt-8">
        <FixedButton
          name="Cancel"
          isDisabled={formik.isSubmitting}
          onClick={onCancel}
        />
        <FixedButton
          type="submit"
          name="Save"
          isDisabled={formik.isSubmitting}
          onClick={formik.handleSubmit}
        />
      </div>
    </div>
  );
}
