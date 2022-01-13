import { Dispatch, FC, SetStateAction } from 'react';
import BasicEventRegistrationForm from './BasicEventRegistrationForm';
import { EventData } from '@/utilities/eventItem/types';
import { useAuth } from '@/context/authContext';

type Props = {
  eventData: EventData;
  isRegistered: boolean;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
  bookedSlotNumber?: number;
};

const RespondToEvent: FC<Props> = ({
  eventData,
  isRegistered,
  setIsRegistered,
  setTeamId,
  bookedSlotNumber,
}) => {
  const { userData } = useAuth();

  if (!userData.uid) {
    return (
      <span className="text-gray-100 font-sans text-xl md:text-lg">
        Sign in to register for this event
      </span>
    );
  }
  return (
    <div>
      {!isRegistered ? (
        eventData.noOfSlots > 0 ? (
          <BasicEventRegistrationForm
            eventData={eventData}
            teamSize={4}
            setTeamId={setTeamId}
            setIsRegistered={setIsRegistered}
          />
        ) : (
          <div className="my-12 px-4 flex flex-col gap-4 font-sans font-semibold text-center ">
            <span className="text-gray-100 font-sans text-xl md:text-lg">
              This event is fully Booked. Check some other event.
            </span>
          </div>
        )
      ) : (
        <div
          className={
            'py-10 px-4 flex flex-col gap-4 font-sans text-gray-50 ' +
            'font-semibold text-xl text-center sm:text-left'
          }
        >
          <div className="flex mx-auto">
            <span className=" text-center">{"My Team's slot number is"}</span>
            <div className="flex flex-col items-center justify-center rounded-md cursor-pointer bg-green-500 w-8 h-8 ml-2">
              <span className="text-lg  font-bold">{bookedSlotNumber}</span>
            </div>
          </div>

          {/* <span>
            {`Room Id and Password will be available here when 
            ${eventData.linkedPageName}
            shares them.`}
          </span> */}
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
