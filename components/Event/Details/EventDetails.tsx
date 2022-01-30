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
    <div className="font-sans mb-10">
      {/**Back Button */}
      <div className="flex justify-start">
        <TextButton
          name="Go Back"
          type="normal"
          onClick={() => router.back()}
        />
      </div>

      <div className="flex flex-row justify-between space-x-5 mx-3">
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

      <div className="grid grid-cols-2 mx-5 mt-8 gap-3">
        {/** Game Name */}
        <section>
          <h2 className="font-semibold text-gray-500">Game</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {games[data.gameCode]?.shortName}
          </span>
        </section>
        {/** Game Mode */}
        <section>
          <h2 className="font-semibold text-gray-500">Mode</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.mode}
          </span>
        </section>

        {/** Tier / Scream */}
        <section>
          <h2 className="font-semibold text-gray-500">Tier</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.tier}
          </span>
        </section>
        {/** Prize Money */}
        <section>
          <h2 className="font-semibold text-gray-500">Prize</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.prize ? '₹ ' + data.prize : 'No Prize'}
          </span>
        </section>
        {/** Match Start Time */}
        <section>
          <h2 className="font-semibold text-gray-500">Match date &#38; time</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {getDecoratedTime(data.startTime)} {' - '}
            {getDecoratedTime(data.startTime, 30)}
          </span>
        </section>
        {/** Registration Open Till */}
        <section>
          <h2 className="font-semibold text-gray-500">
            Registration open till
          </h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {getDecoratedTime(data.startTime, -30)},{' '}
            {getDecoratedDate(data.startTime)}
          </span>
        </section>
        <section>
          <h2 className="font-semibold text-gray-500">Max Slots Available</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            {data.noOfSlots}
          </span>
        </section>
        <section className="col-span-2">
          <h2 className="font-semibold text-gray-500">Details/ Rules</h2>
          <span className="text-gray-200 font-semibold tracking-wide">
            <Editor value={JSON.parse(data.description)} isReadOnly />
          </span>
        </section>
      </div>
      {isPageOwner || isUserRegistered ? (
        <div className="grid grid-cols-2 mx-5 mt-8 gap-3">
          <section>
            <h2 className="font-semibold text-gray-500">Room Id</h2>
            <span
              className="text-gray-200 text-center font-semibold tracking-wide bg-slate-800 px-4 py-0.5 rounded-md"
              onMouseDown={() => {
                if (data.roomId) {
                  navigator.clipboard.writeText(data.roomId);
                  openSnackBar({
                    label: 'Copied!',
                    message: 'Room ID copied to clipboard',
                    type: 'warning',
                  });
                }
              }}
            >
              {data.roomId || 'Will be available before the match starts'}
            </span>
          </section>
          <section>
            <h2 className="font-semibold text-gray-500">Password</h2>
            <span
              className="text-gray-200 text-center font-semibold tracking-wide bg-slate-800 px-4 py-0.5 rounded-md"
              onMouseDown={() => {
                if (data.roomId) {
                  navigator.clipboard.writeText(data.roomId);
                  openSnackBar({
                    label: 'Copied!',
                    message: 'Password copied to clipboard',
                    type: 'warning',
                  });
                }
              }}
            >
              {data.password || 'Will be available before the match starts'}
            </span>
          </section>
        </div>
      ) : null}
    </div>
  );
}
