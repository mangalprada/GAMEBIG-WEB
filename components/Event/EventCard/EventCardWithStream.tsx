import { useState, useEffect } from 'react';
import EventCardAvatar from '@/components/UI/Avatar/EventCardAvatar';
import LocationIcon from '@/components/UI/Icons/EventIcons/LocationIcon';
import ShareEventLink from '@/components/UI/Share/ShareEventLink';
import { EventData } from '@/utilities/eventItem/types';
import { useRouter } from 'next/router';
import { games } from '@/utilities/GameList';
import Image from 'next/image';
import TextButton from '@/components/UI/Buttons/TextButton';
import { useAuth } from '@/context/authContext';
import axios from 'axios';

const EventCardWithStream = ({ event }: { event: EventData }) => {
  const {
    userData: { uid },
  } = useAuth();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [slotNumber, setSlotNumber] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    const checkRegistration = async () => {
      if (event._id && uid) {
        const response = await axios.get(
          `${process.env.BASE_URL}/api/participants`,
          {
            params: {
              eventId: event._id,
              uid,
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
  }, [event._id, uid]);
  function openLinkedpage(pageId: string) {
    router.push(`/page/${pageId}/`);
  }

  function getVideoId(url: string) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }
  return (
    <div className="my-1 w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto bg-slate-900 rounded-md border-4 md:border-8 border-slate-900">
      <div className="flex flex-nowrap justify-between px-8 content-center py-5">
        <div className="flex flex-row">
          <EventCardAvatar
            content={event.pageName[0]}
            onclick={() => openLinkedpage(event.pageId)}
          />
          <div>
            <span
              className="text-gray-300  text-xs sm:text-lg font-semibold font-sans tracking-wide mx-3 hover:underline cursor-pointer"
              onClick={() => openLinkedpage(event.pageId)}
            >
              {event.pageName}
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
          link={`https://gamebig.in/page/${event.pageId}/events/${event._id}`}
          game={games[event.gameCode].shortName}
        />
      </div>
      {event.streamLink ? (
        <iframe
          src={'https://www.youtube.com/embed/' + getVideoId(event.streamLink)}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="video"
          className="mx-auto h-96 w-full"
        />
      ) : null}
      <div className="flex items-center justify-between px-4">
        <section className="flex flex-row gap-x-2 py-2 sm:gap-x-3 items-center ml-[1.25rem] md:ml-[2.15rem]">
          {event.gameCode ? (
            <span className="h-8 w-8 relative">
              <Image
                src={games[event.gameCode].imageSource}
                alt=""
                objectFit="contain"
                layout="fill"
                className="rounded-md"
              />
            </span>
          ) : null}
          <span
            className={
              'text-gray-300 text-sm sm:text-lg h-10 font-semibold ' +
              'flex flex-col justify-center '
            }
          >
            {`${games[event.gameCode].shortName} - ${event.type}`}
          </span>
        </section>
        <TextButton
          name="DETAILS"
          type="normal"
          onClick={() =>
            router.push(`/page/${event.pageId}/events/${event._id}/`)
          }
        />
      </div>
      <div className="flex justify-end px-4 items-start">
        {isRegistered ? (
          <TextButton
            name={slotNumber ? `Slot #${slotNumber} Booked` : 'Booked'}
            type="success"
            onClick={() =>
              router.push(`/page/${event.pageId}/events/${event._id}/#register`)
            }
          />
        ) : null}
      </div>
    </div>
  );
};

export default EventCardWithStream;
