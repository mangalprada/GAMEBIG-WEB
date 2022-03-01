import { Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import { useAuth } from '../../../context/authContext';
import { searchUser } from '@/libs/algolia';
import debounce from '@/libs/debounce';
import * as yup from 'yup';
import { EventData } from '@/utilities/eventItem/types';
import FormInput from '@/components/UI/Inputs/FormInput';
import { useFormik } from 'formik';
import ResponsiveButton from '@/components/UI/Buttons/ResponsiveButton';
import GamersList from '@/components/Team/GamersList';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import axios from 'axios';
import { useUI } from '@/context/uiContext';
import { BasicUserType, GamerType } from '@/utilities/types';
import { db } from 'firebase/firebaseClient';
import GamersInfoList from './GamerInfoList';
import HorizontalProfile from '@/components/Profile/HorizontalProfile';

const { BASE_URL } = process.env;

interface Props {
  teamSize: number;
  eventData: EventData;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
  setBookingdetails: Dispatch<SetStateAction<any>>;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  teamName: yup.string().required('Team Name is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Only add your 10 digit mobile number')
    .length(10, 'Phone number must be 10 digits long')
    .required('Phone Number can not be empty'),
});

export default function CustomRoomRegistrationForm({
  eventData,
  setIsRegistered,
  setBookingdetails,
}: Props) {
  const {
    userData: { uid, name, photoURL, username },
  } = useAuth();
  const { openSnackBar } = useUI();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchresults] = useState<BasicUserType[]>([]);
  const [currentUser, setCurrentUser] = useState<GamerType>({} as GamerType);
  const [selectedUsers, setSelectedUsers] = useState<GamerType[]>([]);

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      teamName: '',
      inGameName: '',
      inGameId: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (selectedUsers.length < 4) return;
      const { teamName, phoneNumber } = values;
      const data = {
        createdAt: new Date(),
        eventId: eventData._id,
        phoneNumber,
        teamName,
        users: selectedUsers,
      };
      axios.post(`${BASE_URL}/api/participants/bookSlotForClassicTournament`, {
        data,
      });
      setBookingdetails(data);
      setIsRegistered(true);
    },
  });

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setQuery(target.value);
    const debouncedGetSearch = debounce(async () => {
      const users: BasicUserType[] = await searchUser(target.value);
      if (users.length > 0) setSearchresults(users);
    }, 500);
    if (target.value.trim() !== '') {
      debouncedGetSearch();
    } else {
      setSearchresults([]);
    }
  };

  const getDetails = async (gameCode: string, user: BasicUserType) => {
    if (user.uid && gameCode) {
      await db
        .collection('gamers')
        .where('uid', '==', user.uid)
        .where('gameCode', '==', gameCode)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const { inGameName, inGameId } = doc.data();
            if (inGameName && inGameId)
              setCurrentUser({ ...user, inGameName, inGameId } as GamerType);
            else {
              setCurrentUser({
                ...user,
                inGameName: '',
                inGameId: '',
              } as GamerType);
              openSnackBar({
                message: 'Please Add In Game Details in profile',
                label: 'No In Game Details Found',
                type: 'warning',
              });
            }
          });
        })
        .catch((error) => {
          console.log('Error getting documents: ', error);
        });
    }
  };
  const addPlayer = () => {
    if (
      !currentUser.name ||
      !currentUser.username ||
      !currentUser.uid ||
      !currentUser.photoURL ||
      !currentUser.inGameId ||
      !currentUser.inGameName
    ) {
      openSnackBar({
        message: 'Please Add In Game Details',
        label: 'No In Game Details Found',
        type: 'warning',
      });
      return;
    }
    var index = selectedUsers.findIndex(
      (x) => x.username == currentUser.username
    );
    if (index === -1 && query !== '') {
      setSelectedUsers([...selectedUsers, currentUser]);
      setQuery('');
    } else {
      openSnackBar({
        message: 'Player already added',
        label: 'Try a different username',
        type: 'warning',
      });
    }
    setCurrentUser({ inGameId: '', inGameName: '' } as GamerType);
  };

  return (
    <div
      id="register"
      className="flex flex-col font-sans font-semibold text-gray-300 px-4 mx-auto w-11/12 md:w-2/3"
    >
      <label className="font-sans font-semibold text-2xl text-indigo-600 py-5">
        Book a slot To Partcipate
      </label>
      <FormInput
        labelName="Team Name"
        name="teamName"
        value={formik.values.teamName}
        onChangeHandler={formik.handleChange}
        error={Boolean(formik.errors.teamName)}
        errorMessage={formik.errors.teamName}
      />
      <FormInput
        labelName="Phone Number(WhatsApp)"
        name="phoneNumber"
        value={formik.values.phoneNumber}
        placeHolder="10 digit e.g. - 9876543210"
        onChangeHandler={formik.handleChange}
        error={Boolean(formik.errors.phoneNumber)}
        errorMessage={formik.errors.phoneNumber}
      />
      <span className="text-xl text-gray-200 my-4">
        Add atleast 4 players to book
      </span>
      <div className="rounded-lg w-full h-full text-gray-300 font-sans font-semibold flex flex-col">
        <FormInput
          labelName="Search for player"
          name="username"
          placeHolder="search username or name"
          value={query}
          onChangeHandler={(e: ChangeEvent) => handleChange(e)}
        />
        {query.trim() !== '' ? (
          <GamersList
            header="Search results"
            gamers={searchResults}
            handleItemClick={(user) => {
              setSearchresults([]);
              setCurrentUser(user as GamerType);
              getDetails(eventData.gameCode, user);
              setQuery(user.username);
            }}
            condition={true}
            buttonText="Select"
            highLightButton={true}
          />
        ) : null}
        <div className="bg-slate-800 px-5 rounded-md my-2 py-4">
          {currentUser.username ? (
            <HorizontalProfile
              user={{
                username: currentUser.username,
                name: currentUser.name,
                photoURL: currentUser.photoURL,
                uid: currentUser.uid,
              }}
              isTransparent
            />
          ) : null}
          <FormInput
            labelName="IN GAME NAME"
            name="inGameName"
            placeHolder=""
            value={currentUser.inGameName}
            onChangeHandler={(e: ChangeEvent) => {
              const target = e.target as HTMLInputElement;
              setCurrentUser({ ...currentUser, inGameName: target.value });
            }}
          />
          <FormInput
            labelName="IN GAME ID"
            name="inGameId"
            placeHolder=""
            value={currentUser.inGameId}
            onChangeHandler={(e: ChangeEvent) => {
              const target = e.target as HTMLInputElement;
              setCurrentUser({ ...currentUser, inGameId: target.value });
            }}
          />
          <div className="flex justify-end">
            <FixedButton name="Add Player" onClick={addPlayer} />
          </div>
        </div>
      </div>
      <span className="text-base text-gray-200 my-4">
        {`${selectedUsers.length} Players Added. `}
        {selectedUsers.length < 4
          ? `Add ${4 - selectedUsers.length} more Players`
          : ''}
      </span>
      <GamersInfoList
        gamers={selectedUsers}
        removeItem={(username) => {
          const temp = selectedUsers.filter((y) => y.username !== username);
          setSelectedUsers(temp);
        }}
      />
      <ResponsiveButton
        name="Book A Slot"
        type="submit"
        isDisabled={selectedUsers.length < 4}
        onClick={formik.handleSubmit}
      />
    </div>
  );
}
