import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase/firebaseClient';
import { EventData } from '../../../utilities/eventItem/types';
import HourglassIcon from '@/components/UI/Icons/EventIcons/HourglassIcon';
import EventCardAvatar from '@/components/UI/Avatar/EventCardAvatar';
import LocationIcon from '@/components/UI/Icons/EventIcons/LocationIcon';
import EsportsIcon from '@/components/UI/Icons/EventIcons/EsportsIcon';
import TrophyIcon from '@/components/UI/Icons/EventIcons/TrophyIcon';
import EventIcon from '@/components/UI/Icons/EventIcons/EventIcon';
import AccessTimeIcon from '@/components/UI/Icons/EventIcons/AccessTimeIcon';
import MoneyIcon from '@/components/UI/Icons/EventIcons/MoneyIcon';
import RoomEntryIcon from '@/components/UI/Icons/EventIcons/RoomEntryIcon';
import TextButton from '@/components/UI/Buttons/TextButton';
import FixedButton from '@/components/UI/Buttons/FixedButton';
import EventCardRowItem from './EventCardRowItem';
import { useAuth } from '@/context/authContext';
import { games } from '@/utilities/GameList';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '@/utilities/functions/dateConvert';

type Props = {
  data: EventData;
  isOrganizer: boolean;
};

const EventCard: FC<Props> = ({ data, isOrganizer }: Props) => {
  const router = useRouter();

  const { userData } = useAuth();

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    if (data.id && userData.uid) {
      db.collection('events')
        .doc(data.id)
        .collection('teams')
        .where('uids', 'array-contains', userData.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data()) {
              setIsRegistered(true);
            }
          });
        });
    }
  }, [data.id, userData.uid]);

  const onForwardAction = () => {
    if (userData.uid === '' || userData.uid === undefined) {
      router.push('/auth');
    } else {
      router.push(`/organization/${data.linkedOrgId}/events/${data.id}/`);
    }
  };

  return (
    <div
      className={
        'h-auto md:w-2/3 xl:w-1/2 rounded-lg my-3 md:mx-auto mx-4 ' +
        'bg-gray-900 transform hover:scale-105 hover:-translate-y-1 ' +
        'transition duration-500 ease-in-out cursor-pointer'
      }
      onClick={onForwardAction}
    >
      <div className="flex flex-nowrap justify-between px-8 content-center py-5">
        <div className="flex flex-row">
          <EventCardAvatar content={data.linkedOrgName[0]} />
          <span className="text-gray-300 text-xl font-semibold font-sans tracking-wide self-center mx-3">
            {data.linkedOrgName}
          </span>
        </div>
        <div className="flex self-center">
          <LocationIcon className={'fill-current text-indigo-500'} size={24} />
          <span className="text-gray-300 text-base font-semibold font-sans ml-1">
            India
          </span>
        </div>
      </div>
      <div className="mx-6 md:mx-16">
        <div className="flex flex-wrap justify-between">
          <EventCardRowItem
            content={`${games[data.gameCode].shortName} - ${data.mode}`}
          >
            <EsportsIcon styles={'fill-current text-purple-700'} />
          </EventCardRowItem>
          <EventCardRowItem content={`Daily Custom - ${data.tier}`}>
            <TrophyIcon styles={'fill-current text-yellow-500'} />
          </EventCardRowItem>
        </div>
        <div className="flex flex-wrap justify-between">
          <EventCardRowItem content={`${getDecoratedDate(data.startTime)}`}>
            <EventIcon styles={'fill-current text-indigo-400'} />
          </EventCardRowItem>
          <EventCardRowItem
            content={`${getDecoratedTime(data.startTime)} - 
            ${getDecoratedTime(data.startTime, 30)}`}
          >
            <AccessTimeIcon styles={'fill-current text-blue-500'} />
          </EventCardRowItem>
        </div>
        <div className="flex flex-wrap justify-between">
          <EventCardRowItem
            content={`${data.prize ? data.prize + ' ₹' : 'No Prize'}`}
          >
            <MoneyIcon styles={'fill-current text-green-600'} />
          </EventCardRowItem>
          <EventCardRowItem content={`${data.noOfSlots} slots available`}>
            <RoomEntryIcon styles={'fill-current text-gray-600'} />
          </EventCardRowItem>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-3 mx-3">
        <HourglassIcon styles={'fill-current text-red-300'} />
        <span className="text-gray-300 text-lg font-sans font-semibold ml-3 text-center">
          {`Registration open till 
          ${getDecoratedDate(data.startTime)}, 
          ${getDecoratedTime(data.startTime, -30)}`}
        </span>
      </div>
      <div className="flex flex-row justify-between md:mx-20 mx-8">
        <TextButton
          name="DETAILS"
          type="normal"
          onClick={() =>
            router.push(`/organization/${data.linkedOrgId}/events/${data.id}/`)
          }
        />

        {!isOrganizer && (
          <>
            {isRegistered ? (
              <TextButton
                name="REGISTERED"
                type="success"
                onClick={() =>
                  router.push(
                    `/organization/${data.linkedOrgId}/events/${data.id}/#register`
                  )
                }
              />
            ) : (
              <FixedButton name="REGISTER" onClick={onForwardAction} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
