import { Dispatch, FC, SetStateAction } from 'react';
import BasicEventRegistrationForm from './BasicEventRegistrationForm';
import UserBookingDetails from './UserBookingDetails';
import { EventData } from '@/utilities/eventItem/types';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';

type Props = {
  eventData: EventData;
  isRegistered: boolean;
  setIsRegistered: (val: boolean) => void;
  setTeamId: Dispatch<SetStateAction<string>>;
  bookingDetails: any;
  setBookingdetails: Dispatch<SetStateAction<any>>;
};

const RespondToEvent: FC<Props> = ({
  eventData,
  isRegistered,
  setIsRegistered,
  setTeamId,
  bookingDetails,
  setBookingdetails,
}) => {
  const { userData } = useAuth();
  const router = useRouter();

  if (!userData.uid) {
    return (
      <div className="mx-auto mt-16 w-11/12 md:w-1/2">
        <button
          className={
            'w-full rounded-md px-8 py-2 text-xl text-gray-300 font-semibold ' +
            'bg-gray-800/80 hover:bg-gray-900 active:bg-gray-900/50'
          }
          type="button"
          onClick={() => router.push('/')}
        >
          Sign in / Sign up to Register
        </button>
      </div>
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
            setBookingdetails={setBookingdetails}
          />
        ) : (
          <div className="my-12 px-4 flex flex-col gap-4 font-sans font-semibold text-center ">
            <span className="text-gray-100 font-sans text-xl md:text-lg">
              This event is fully Booked. Check some other event.
            </span>
          </div>
        )
      ) : (
        <div>
          <UserBookingDetails bookingDetails={bookingDetails} />
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
