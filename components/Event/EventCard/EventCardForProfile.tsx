import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import EventCardRowItem from './EventCardRowItem';
import { games } from '@/utilities/GameList';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '@/utilities/functions/dateConvert';
import ShareEventLink from '@/components/UI/Share/ShareEventLink';
import axios from 'axios';

type Props = {
  eventId: string;
  slotNumber: string;
};

const EventCard: FC<Props> = ({ eventId, slotNumber }: Props) => {
  const router = useRouter();

  const [event, setEvent] = useState<EventData>();

  useEffect(() => {
    async function fetchEventById() {
      const eventData = await axios.get(`${process.env.BASE_URL}/api/events`, {
        params: { id: eventId },
      });
      setEvent(eventData.data.message[0]);
    }
    fetchEventById();
  }, [eventId]);

  const onForwardAction = () => {
    if (event) router.push(`/page/${event.pageId}/events/${event._id}/`);
  };

  function openLinkedpage() {
    if (event) router.push(`/page/${event.pageId}/`);
  }

  if (!event) return null;

  return (
    <div
      className={
        'h-auto md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg my-3 md:mx-auto mx-4 ' +
        'bg-slate-900 transform sm:hover:scale-[1.03] lg:hover:scale-[1.02] ' +
        'hover:-translate-y-0.5 md:hover:-translate-y-1 transition duration-500 ease-in-out'
      }
    >
      {/** Header */}
      <div className="flex flex-nowrap justify-between px-8 content-center py-5">
        <div className="flex flex-row">
          <EventCardAvatar
            content={event.pageName[0]}
            onclick={openLinkedpage}
          />
          <div>
            <span
              className="text-gray-300 text-lg font-semibold font-sans tracking-wide mx-3 hover:underline cursor-pointer"
              onClick={openLinkedpage}
            >
              {event.pageName}
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
          link={`https://gamebig.in/page/${event.pageId}/events/${event._id}`}
          game={games[event.gameCode].shortName}
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
          content={`${games[event.gameCode].shortName} - ${event.mode}`}
          label="Game"
          image={games[event.gameCode].imageSource}
        >
          <EsportsIcon styles={'fill-current text-purple-700'} />
        </EventCardRowItem>

        <EventCardRowItem content={`Daily Custom - ${event.tier}`} label="Tier">
          <BadgeIcon styles={'fill-current text-orange-800'} />
        </EventCardRowItem>

        {/* <EventCardRowItem
          content={`${getDecoratedDate(event.startTime)}`}
          label="Event Date"
        >
          <EventIcon styles={'fill-current text-indigo-400'} />
        </EventCardRowItem> */}

        <EventCardRowItem
          content={`${getDecoratedTime(event.startTime)}, ${getDecoratedDate(
            event.startTime
          )}`}
          label="Event Time"
        >
          <AccessTimeIcon styles={'fill-current text-blue-500'} />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${event.noOfSlots} available`}
          label="Slots"
        >
          <RoomEntryIcon styles={'fill-current text-cyan-900'} />
        </EventCardRowItem>

        <EventCardRowItem
          content={event.entryFee > 0 ? `₹ ${event.entryFee}` : 'No Fee'}
          label="Entry Fee"
        >
          <MoneyIcon styles={'fill-current text-green-600'} />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${event.prize ? '₹ ' + event.prize : 'No Prize'}`}
          label="Prize"
          highlight={Boolean(event.prize)}
        >
          <TrophyIcon styles={'fill-current text-yellow-500'} />
        </EventCardRowItem>
      </div>
      <div className="flex flex-row justify-between items-center md:mx-20 mx-8">
        <TextButton
          name="DETAILS"
          type="normal"
          onClick={() =>
            router.push(`/page/${event.pageId}/events/${event._id}/`)
          }
        />
        <TextButton
          name={`Slot #${slotNumber} Booked`}
          type="success"
          onClick={() =>
            router.push(`/page/${event.pageId}/events/${eventId}/#register`)
          }
        />
      </div>
    </div>
  );
};

export default EventCard;
