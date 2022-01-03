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
import ShareEventLink from '@/components/UI/Share/ShareEventLink';

type Props = {
  data: EventData;
  isPageOwner: boolean;
};

const EventCard: FC<Props> = ({ data, isPageOwner }: Props) => {
  const router = useRouter();

  const { userData } = useAuth();

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  useEffect(() => {
    if (data.id && userData.uid) {
      db.collection('events')
        .doc(data.id)
        .collection('participants')
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
    router.push(`/page/${data.linkedPageId}/events/${data.id}/`);
  };

  function openLinkedpage() {
    router.push(`/page/${data.linkedPageId}/`);
  }

  return (
    <div
      className={
        'h-auto md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-3 md:mx-auto mx-4 ' +
        'bg-gray-900 transform sm:hover:scale-[1.03] lg:hover:scale-[1.02] ' +
        'hover:-translate-y-0.5 md:hover:-translate-y-1 transition duration-500 ease-in-out'
      }
    >
      {/** Header */}
      <div className="flex flex-nowrap justify-between px-8 content-center py-5">
        <div className="flex flex-row">
          <EventCardAvatar
            content={data.linkedPageName[0]}
            onclick={openLinkedpage}
          />
          <div>
            <span
              className="text-gray-300 text-lg font-semibold font-sans tracking-wide mx-3 hover:underline cursor-pointer"
              onClick={openLinkedpage}
            >
              {data.linkedPageName}
            </span>
            <section className="flex flex-row mx-2 items-center mt-0.5">
              <LocationIcon
                className={'fill-current text-indigo-500'}
                size={15}
              />
              <span className="text-gray-300 text-sm font-semibold font-sans ml-1">
                India
              </span>
            </section>
          </div>
        </div>

        {/** Share Event */}
        <ShareEventLink
          link={`https://gamebig.in/page/${data.linkedPageId}/events/${data.id}`}
          game={games[data.gameCode].shortName}
        />
      </div>

      {/** Event Contents */}
      <div
        className={
          'grid sm:grid-cols-2 grid-cols-1 justify-items-center md:mx-5 gap-y-4 cursor-pointer'
        }
        onClick={onForwardAction}
      >
        <EventCardRowItem
          content={`${games[data.gameCode].shortName} - ${data.mode}`}
          label="Game"
          image={games[data.gameCode].imageSource}
        >
          <EsportsIcon styles={'fill-current text-purple-700'} />
        </EventCardRowItem>

        <EventCardRowItem content={`Daily Custom - ${data.tier}`} label="Tier">
          <TrophyIcon styles={'fill-current text-yellow-500'} />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${getDecoratedDate(data.startTime)}`}
          label="Event Date"
        >
          <EventIcon styles={'fill-current text-indigo-400'} />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${getDecoratedTime(data.startTime)} - 
            ${getDecoratedTime(data.startTime, 30)}`}
          label="Event Time"
        >
          <AccessTimeIcon styles={'fill-current text-blue-500'} />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${data.prize ? '₹ ' + data.prize : 'No Prize'}`}
          label="Prize"
          highlight={Boolean(data.prize)}
        >
          <MoneyIcon styles={'fill-current text-green-600'} />
        </EventCardRowItem>

        <EventCardRowItem content={`${data.noOfSlots} available`} label="Slots">
          <RoomEntryIcon styles={'fill-current text-gray-600'} />
        </EventCardRowItem>

        {/** Registration Close by */}
        <section className="sm:col-span-2 col-span-1 flex flex-wrap justify-center mt-3 mx-3">
          <HourglassIcon styles={'fill-current text-red-300'} />
          <span className="text-gray-300 text-lg font-sans font-semibold ml-3 text-center">
            {`Registration open till      
          ${getDecoratedTime(data.startTime, -30)}, ${getDecoratedDate(
              data.startTime
            )}`}
          </span>
        </section>
      </div>
      <div className="flex flex-row justify-between items-center md:mx-20 mx-8">
        <TextButton
          name="DETAILS"
          type="normal"
          onClick={() =>
            router.push(`/page/${data.linkedPageId}/events/${data.id}/`)
          }
        />

        {isPageOwner ? null : (
          <>
            {isRegistered ? (
              <TextButton
                name="REGISTERED"
                type="success"
                onClick={() =>
                  router.push(
                    `/page/${data.linkedPageId}/events/${data.id}/#register`
                  )
                }
              />
            ) : (
              <FixedButton name="PARTICIPATE NOW" onClick={onForwardAction} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
