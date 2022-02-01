import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EventData } from '../../../utilities/eventItem/types';
import HourglassIcon from '@/components/UI/Icons/EventIcons/HourglassIcon';
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
        'hover:-translate-y-0.5 md:hover:-translate-y-1 transition duration-500 ease-in-out'
      }
    >
      {/** Header */}
      <div className="flex flex-nowrap justify-between px-8 content-center py-5">
        <div className="flex flex-row">
          <EventCardAvatar
            content={data.pageName[0]}
            onclick={openLinkedpage}
          />
          <div>
            <span
              className="text-gray-300  text-xs sm:text-lg font-semibold font-sans tracking-wide mx-3 hover:underline cursor-pointer"
              onClick={openLinkedpage}
            >
              {data.pageName}
            </span>
            <section className="flex flex-row mx-2 items-center mt-0.5">
              <LocationIcon
                className={'fill-current text-indigo-500'}
                size={15}
              />
              <span className="text-gray-300 text-xs sm:text-sm font-semibold font-sans ml-1">
                India
              </span>
            </section>
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
          image={games[data.gameCode].imageSource}
        >
          <EsportsIcon
            styles={'fill-current text-purple-700 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        <EventCardRowItem content={`Daily Custom - ${data.tier}`} label="Tier">
          <BadgeIcon
            styles={'fill-current text-orange-800 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        {/* <EventCardRowItem
          content={`${getDecoratedDate(data.startTime)}`}
          label="Event Date"
        >
          <EventIcon styles={'fill-current text-indigo-400'} />
        </EventCardRowItem> */}

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

        {/** Registration Close by */}
        <section className="col-span-2 flex flex-wrap justify-center mx-3">
          <span
            className={
              'text-gray-300 text-sm font-sans font-medium ml-3 ' +
              'flex flex-col justify-center text-center tracking-wide'
            }
          >
            {`Registration open till      
          ${getDecoratedTime(data.startTime, -10)}, ${getDecoratedDate(
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
            router.push(`/page/${data.pageId}/events/${data._id}/`)
          }
        />

        {isPageOwner ? null : (
          <>
            {isRegistered ? (
              <TextButton
                name={`Slot #${slotNumber} Booked`}
                type="success"
                onClick={() =>
                  router.push(
                    `/page/${data.pageId}/events/${data._id}/#register`
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
