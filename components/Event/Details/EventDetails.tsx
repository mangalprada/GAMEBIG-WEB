import router from 'next/router';
import { EventData } from '../../../utilities/eventItem/types';
import {
  getDecoratedDate,
  getDecoratedTime,
} from '../../../utilities/functions/dateConvert';
import { games } from '../../../utilities/GameList';
import TextButton from '../../UI/Buttons/TextButton';
import EventCardAvatar from '../../UI/Avatar/EventCardAvatar';
import { useUI } from '@/context/uiContext';
import Editor from '@/components/UI/Inputs/Editor';
import EsportsIcon from '@/components/UI/Icons/EventIcons/EsportsIcon';
import TrophyIcon from '@/components/UI/Icons/EventIcons/TrophyIcon';
import BadgeIcon from '@/components/UI/Icons/EventIcons/BadgeIcon';
import AccessTimeIcon from '@/components/UI/Icons/EventIcons/AccessTimeIcon';
import MoneyIcon from '@/components/UI/Icons/EventIcons/MoneyIcon';
import RoomEntryIcon from '@/components/UI/Icons/EventIcons/RoomEntryIcon';
import EventCardRowItem from '../EventCard/EventCardRowItem';

interface Props {
  data: EventData;
  isPageOwner: boolean;
  openEditModal: () => void;
  isUserRegistered: boolean;
}

export default function DetailsAsParticipant({
  data,
  isPageOwner,
  openEditModal,
  isUserRegistered,
}: Props) {
  const { openSnackBar } = useUI();
  function openLinkedPage() {
    router.push(`/page/${data.pageId}/`);
  }

  return (
    <div className="font-sans mb=1 md:mb-4">
      {/**Back Button */}
      <div className="flex justify-start">
        <TextButton
          name="Go Back"
          type="normal"
          onClick={() => router.back()}
        />
      </div>

      <div className="flex flex-row justify-between space-x-5 mx-3 mb-2">
        <div className="flex flex-row items-center space-x-5 mx-3">
          <EventCardAvatar
            content={data?.pageName?.charAt(0)}
            onclick={openLinkedPage}
          />
          <h1
            className="text-indigo-600 text-xl font-semibold flex my-auto hover:underline cursor-pointer"
            onClick={openLinkedPage}
          >
            {data?.pageName}
          </h1>
        </div>
        {isPageOwner ? (
          <TextButton name="EDIT" type="normal" onClick={openEditModal} />
        ) : null}
      </div>
      <div className="flex justify-center mb-2">
        <span className="text-base md:text-xl font-semibold text-center text-green-500">
          {data.title}
        </span>
      </div>
      <div
        className={
          'grid grid-cols-2 justify-items-center md:mx-5 gap-y-4 cursor-pointer'
        }
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

        <EventCardRowItem content={data.type} label="Event">
          <BadgeIcon
            styles={'fill-current text-orange-800 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        <EventCardRowItem
          content={`${getDecoratedTime(data.startTime)}, ${getDecoratedDate(
            data.startTime
          )}`}
          label="Start Time"
        >
          <AccessTimeIcon
            styles={'fill-current text-blue-500 w-4 h-4 md:w-5 md:h-5'}
          />
        </EventCardRowItem>

        {data.idpTime ? (
          <EventCardRowItem
            content={getDecoratedTime(data.idpTime)}
            label="Room Id & Password"
          >
            <AccessTimeIcon
              styles={'fill-current text-blue-500 w-4 h-4 md:w-5 md:h-5'}
            />
          </EventCardRowItem>
        ) : null}

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
      <section className="col-span-2 mx-6">
        <h2 className="font-semibold text-gray-500">Details/ Rules</h2>
        <span className="text-gray-200 font-semibold tracking-wide">
          <Editor
            placeHolderText=" "
            value={JSON.parse(data.description)}
            isReadOnly
          />
        </span>
      </section>
      {isPageOwner || isUserRegistered ? (
        <div className="grid md:grid-cols-2 grid-cols-1 mx-5 gap-4 ring-2 ring-green-400 rounded-md p-3 mb-4">
          <section>
            <h2 className="font-semibold text-gray-500">Room Id</h2>
            <span
              className="text-gray-200 text-center font-semibold tracking-wide bg-slate-700 px-4 py-0.5 rounded-md"
              onMouseDown={() => {
                if (data.roomId) {
                  navigator.clipboard.writeText(data.roomId);
                  openSnackBar({
                    label: 'Copied!',
                    message: 'Room ID copied to clipboard',
                    type: 'success',
                  });
                }
              }}
            >
              {data.roomId || 'Will be available before the match'}
            </span>
          </section>
          <section>
            <h2 className="font-semibold text-gray-500">Password</h2>
            <span
              className="text-gray-200 text-center font-semibold tracking-wide bg-slate-700 px-4 py-0.5 rounded-md"
              onMouseDown={() => {
                if (data.roomId) {
                  navigator.clipboard.writeText(data.roomId);
                  openSnackBar({
                    label: 'Copied!',
                    message: 'Password copied to clipboard',
                    type: 'success',
                  });
                }
              }}
            >
              {data.password || 'Will be available before the match'}
            </span>
          </section>
        </div>
      ) : null}
    </div>
  );
}
