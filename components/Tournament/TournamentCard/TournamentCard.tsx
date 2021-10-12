import { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../../../firebase/firebaseClient';
import { TournamentData } from '../../../utilities/tournament/types';
import TournamentCardAvatar from '../../UI/Avatar/TournamentCardAvatar';
import LocationIcon from '../../UI/Icons/LocationIcon';
import TrophyIcon from '../../UI/Icons/TrophyIcon';
import EsportsIcon from '../../UI/Icons/EsportsIcon';
import MoneyIcon from '../../UI/Icons/MoneyIcon';
import AccessTimeIcon from '../../UI/Icons/AccessTimeIcon';
import TextButton from '../../UI/Buttons/TextButton';
import FixedButton from '../../UI/Buttons/FixedButton';
import EventIcon from '../../UI/Icons/EventIcon';
import HourglassIcon from '../../UI/Icons/HourglassIcon';
import RoomEntryIcon from '../../UI/Icons/RoomEntryIcon';
import TournamentCardRowItem from './TournamentCardRowItem';
import { useAuth } from '../../../context/authContext';
import { games } from '../../../utilities/GameList';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '../../../utilities/functions/dateConvert';

type Props = {
  data: TournamentData;
  isOrganizer: boolean;
};

const TournamentCard: FC<Props> = ({ data, isOrganizer }: Props) => {
  const router = useRouter();

  const { user } = useAuth();

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    if (data.id && user.username) {
      db.collection('tournaments')
        .doc(data.id)
        .collection('teams')
        .where('usernames', 'array-contains', user.username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
            }
          });
        });
    }
  }, [data.id, user.username]);

  const goToTournamentPage = () => {
    router.push(`/organization/${data.linkedOrgId}/tournaments/${data.id}/`);
  };

  return (
    <div
      className={
        'h-auto md:w-5/6 xl:w-4/6 rounded-lg my-3 md:mx-auto mx-4 ' +
        'bg-gray-900 transform hover:scale-105 hover:-translate-y-1 ' +
        'transition duration-500 ease-in-out cursor-pointer'
      }
      onClick={goToTournamentPage}
    >
      <div className="flex flex-nowrap justify-between px-8 content-center py-5">
        <div className="flex flex-row">
          <TournamentCardAvatar content={data.linkedOrgName[0]} />
          <span className="text-gray-300 text-xl font-semibold font-sans tracking-wide self-center mx-3">
            {data.linkedOrgName}
          </span>
        </div>
        <div className="flex self-center">
          <LocationIcon styles={'fill-current text-indigo-500'} />
          <span className="text-gray-300 text-base font-semibold font-sans ml-1">
            India
          </span>
        </div>
      </div>
      <div className="mx-6 md:mx-16">
        <div className="flex flex-wrap justify-between">
          <TournamentCardRowItem
            content={`${games[data.gameCode].shortName} - ${data.mode}`}
          >
            <EsportsIcon styles={'fill-current text-purple-700'} />
          </TournamentCardRowItem>
          <TournamentCardRowItem content={`Daily Custom - ${data.tier}`}>
            <TrophyIcon styles={'fill-current text-yellow-500'} />
          </TournamentCardRowItem>
        </div>
        <div className="flex flex-wrap justify-between">
          <TournamentCardRowItem
            content={`${getDecoratedDate(data.startTime)}`}
          >
            <EventIcon styles={'fill-current text-indigo-400'} />
          </TournamentCardRowItem>
          <TournamentCardRowItem
            content={`${getDecoratedTime(data.startTime)} - 
            ${getDecoratedTime(data.startTime, 30)}`}
          >
            <AccessTimeIcon styles={'fill-current text-blue-500'} />
          </TournamentCardRowItem>
        </div>
        <div className="flex flex-wrap justify-between">
          <TournamentCardRowItem
            content={`${data.prize ? data.prize + ' ₹' : 'No Prize'}`}
          >
            <MoneyIcon styles={'fill-current text-green-600'} />
          </TournamentCardRowItem>
          <TournamentCardRowItem content={`${data.noOfSlots} slots available`}>
            <RoomEntryIcon styles={'fill-current text-gray-600'} />
          </TournamentCardRowItem>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-3 mx-3">
        <HourglassIcon styles={'fill-current text-red-300'} />
        <span className="text-gray-300 text-lg font-sans font-semibold ml-3 text-center">
          {`Registration open till 
          ${getDecoratedDate(data.startTime)}, 
          ${getDecoratedTime(data.startTime)}`}
        </span>
      </div>
      <div className="flex flex-row justify-between md:mx-20 mx-8">
        <Link
          href={`/organization/${data.linkedOrgId}/tournaments/${data.id}/`}
          passHref
        >
          <TextButton name="DETAILS" type="normal" />
        </Link>
        {!isOrganizer && (
          <Link
            href={`/organization/${data.linkedOrgId}/tournaments/${data.id}/#register`}
            passHref
          >
            {isRegistered ? (
              <TextButton name="REGISTERED" type="success" />
            ) : (
              <FixedButton name="REGISTER" />
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default TournamentCard;
