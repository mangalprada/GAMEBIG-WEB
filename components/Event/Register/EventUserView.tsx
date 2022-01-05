import { Dispatch, FC, SetStateAction } from 'react';
import BasicEventRegistrationForm from './BasicEventRegistrationForm';
import { EventData } from '@/utilities/eventItem/types';

type Props = {
  eventData: EventData;
  isRegistered: boolean;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
};

const RespondToEvent: FC<Props> = ({
  eventData,
  isRegistered,
  setIsRegistered,
  setTeamId,
}) => {
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
            'py-10 px-4 flex flex-col gap-4 font-sans text-green-600 ' +
            'font-semibold text-xl text-center sm:text-left'
          }
        >
          <span className=" text-center">
            You have booked a slot for your Team!
          </span>

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
