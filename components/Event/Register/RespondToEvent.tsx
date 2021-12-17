import {
  useState,
  useEffect,
  useCallback,
  Dispatch,
  FC,
  SetStateAction,
} from 'react';
import { useAuth } from '@/context/authContext';
import SendNotification from '../Notification/SendNotification';
import ParticipantList from '../ParticipantList/ParticipantList';
import RegisterEventForm from './RegisterEventForm';
import SoloRegistrationForm from './SoloRegistrationForm';
import { EventData } from '@/utilities/eventItem/types';
import { db } from 'firebase/firebaseClient';
import router from 'next/router';
import { TeamType } from '@/utilities/types';
import { fetchParticipatedTeams } from '@/libs/getEventData';
import EventResultForm from '../Result/EventResultForm';

type Props = {
  pageId: string;
  eventData: EventData;
  isRegistered: boolean;
  setIsRegistered: (val: boolean) => void;
  teamId: string;
  setTeamId: Dispatch<SetStateAction<string>>;
};

const RespondToEvent: FC<Props> = ({
  pageId,
  eventData,
  isRegistered,
  setIsRegistered,
  teamId,
  setTeamId,
}) => {
  const {
    userData: { linkedPageId, uid },
  } = useAuth();
  const [participants, setParticipants] = useState<TeamType[]>([]);
  let isPageOwner = linkedPageId === pageId ? true : false;

  const unregisterHandler = () => {
    db.collection('events')
      .doc(eventData.id)
      .collection('participants')
      .doc(teamId)
      .delete();
    router.push('/');
  };

  const teamsArr = useCallback(async () => {
    const teams = await fetchParticipatedTeams(eventData.id);
    setParticipants(teams);
  }, [eventData.id]);

  useEffect(() => {
    teamsArr();
  }, [teamsArr]);

  return (
    <div>
      {isPageOwner ? (
        <div>
          <SendNotification eventData={eventData} />
          <EventResultForm eventId={eventData.id} participants={participants} />
          <ParticipantList participants={participants} />
        </div>
      ) : null}

      {!isRegistered ? (
        {
          Squad: (
            <RegisterEventForm
              eventData={eventData}
              teamSize={4}
              setTeamId={setTeamId}
              setIsRegistered={setIsRegistered}
            />
          ),
          Duo: (
            <RegisterEventForm
              eventData={eventData}
              teamSize={2}
              setTeamId={setTeamId}
              setIsRegistered={setIsRegistered}
            />
          ),
          Solo: (
            <SoloRegistrationForm
              eventData={eventData}
              setIsRegistered={setIsRegistered}
            />
          ),
        }[eventData.mode]
      ) : (
        <div
          className={
            'py-10 px-4 flex flex-col gap-4 font-sans text-green-400 ' +
            'font-semibold text-xl text-center sm:text-left'
          }
        >
          <span>You have registered for this event!</span>
          <span>
            {`Room Id and Password will be available here when 
            ${eventData.linkedPageName}
            shares them.`}
          </span>
          {/* <span
            onClick={unregisterHandler}
            className={
              'text-gray-500 px-3 py-2 w-max text-lg rounded-md ' +
              'cursor-pointer hover:bg-red-400 hover:text-white active:bg-red-600'
            }
          >
            UNREGISTER
          </span> */}
        </div>
      )}
    </div>
  );
};

export default RespondToEvent;
