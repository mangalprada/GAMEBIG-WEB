import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { EventData } from '../../../utilities/eventItem/types';
import EventCardAvatar from '@/components/UI/Avatar/EventCardAvatar';
import LocationIcon from '@/components/UI/Icons/EventIcons/LocationIcon';
import EsportsIcon from '@/components/UI/Icons/EventIcons/EsportsIcon';
import TrophyIcon from '@/components/UI/Icons/EventIcons/TrophyIcon';
import BadgeIcon from '@/components/UI/Icons/EventIcons/BadgeIcon';
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
import axios from 'axios';

type Props = {
  data: EventData;
  isPageOwner: boolean;
};

const EventCard: FC<Props> = ({ data, isPageOwner }: Props) => {
  const router = useRouter();

  const { userData } = useAuth();

  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [slotNumber, setSlotNumber] = useState<number>(0);

  const isPastEvent = data.startTime > new Date().toISOString();

  useEffect(() => {
    const checkRegistration = async () => {
      if (data._id && userData.uid) {
        const response = await axios.get(
          `${process.env.BASE_URL}/api/participants`,
          {
            params: {
              eventId: data._id,
              uid: userData.uid,
            },
          }
        );
        if (response.data.message.length > 0) {
          setIsRegistered(true);
          setSlotNumber(response.data.message[0].slotNumber);
        }
      }
    };
    checkRegistration();
  }, [data._id, userData.uid]);

  const onForwardAction = () => {
    router.push(`/page/${data.pageId}/events/${data._id}/`);
  };

  function openLinkedpage() {
    router.push(`/page/${data.pageId}/`);
  }
  return (
    <div
      className={
        'h-auto md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-1.5 md:my-3 md:mx-auto mx-4 ' +
        'bg-slate-900 transform sm:hover:scale-[1.03] lg:hover:scale-[1.02] ' +
        'hover:-translate-y-0.5 md:hover:-translate-y-1 transition duration-500 ease-in-out' +
        'pb-0.5 md:pb-1'
      }
    >
      {/** Header */}
      <div className="flex flex-nowrap justify-between items-center px-4 md:px-12 content-center py-5 mb-5 bg-indigo-600/10 rounded-t-md">
        <div className="flex">
          {games[data.gameCode].imageSource ? (
            <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <Image
                src={games[data.gameCode].imageSource}
                alt=""
                objectFit="cover"
                layout="fill"
                className="rounded-md"
              />
            </div>
          ) : null}
          <div className="flex flex-col justify-end md:gap-3 ml-2 mb-1">
            <span className="ml-1 text-xl md:text-3xl font-semibold text-center text-white">
              {data.title || data.type}
            </span>
            <div className="flex flex-row items-center">
              <EventCardAvatar
                photoURL={data.pageDisplayPicture}
                content={data.pageName[0]}
                onclick={openLinkedpage}
              />
              <div>
                <span
                  className="text-gray-300 text-xs sm:text-sm font-semibold font-sans tracking-wide mx-2 hover:underline cursor-pointer"
                  onClick={openLinkedpage}
                >
                  {data.pageName}
                </span>
                <section className="flex flex-row mx-1 items-center">
                  <LocationIcon
                    className={'fill-current text-indigo-500'}
                    size={15}
                  />
                  <span className="text-gray-300 text-xs font-semibold font-sans ml-1">
                    India
                  </span>
                </section>
              </div>
            </div>
          </div>
        </div>
        {/** Share Event */}
        <ShareEventLink
          link={`https://gamebig.in/page/${data.pageId}/events/${data._id}`}
          game={games[data.gameCode].shortName}
        />
      </div>
      {/** Event Contents */}
      <div
        className={
          'grid grid-cols-2 justify-items-center md:mx-5 gap-y-4 cursor-pointer'
        }
        onClick={onForwardAction}
      >
        <EventCardRowItem
          content={`${games[data.gameCode].shortName} - ${data.mode}`}
          label="Game"
        >
          <EsportsIcon
            styles={'fill-current text-purple-700 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        <EventCardRowItem content={data.type} label="Event">
          <BadgeIcon
            styles={'fill-current text-orange-800 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${getDecoratedTime(data.startTime)}, ${getDecoratedDate(
            data.startTime
          )}`}
          label="Event Time"
        >
          <AccessTimeIcon
            styles={'fill-current text-blue-500 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        <EventCardRowItem content={`${data.noOfSlots}`} label="Available Slots">
          <RoomEntryIcon
            styles={'fill-current text-cyan-900 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        <EventCardRowItem
          content={data.entryFee > 0 ? `₹ ${data.entryFee}` : 'No Fee'}
          label="Entry Fee"
        >
          <MoneyIcon
            styles={'fill-current text-green-600 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${data.prize ? '₹ ' + data.prize : 'No Prize'}`}
          label="Prize"
          highlight={Boolean(data.prize)}
        >
          <TrophyIcon
            styles={'fill-current text-yellow-500 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>
      </div>
      <div className="flex flex-row justify-between items-center md:mt-6 mt-4 mb-2 md:mx-20 sm:mx-10 mx-6">
        <TextButton
          name="DETAILS"
          type="normal"
          onClick={() =>
            router.push(`/page/${data.pageId}/events/${data._id}/`)
          }
        />

        {isPageOwner ? null : (
          <>
            {isRegistered ? (
              <TextButton
                name={slotNumber ? `Slot #${slotNumber} Booked` : 'Booked'}
                type="success"
                onClick={() =>
                  router.push(
                    `/page/${data.pageId}/events/${data._id}/#register`
                  )
                }
              />
            ) : (
              <>
                {isPastEvent ? (
                  <FixedButton name="REGISTER NOW" onClick={onForwardAction} />
                ) : null}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventCard;
