import { Dispatch, FC, SetStateAction } from 'react';
import BasicEventRegistrationForm from './BasicEventRegistrationForm';
import UserBookingDetails from './UserBookingDetails';
import { EventData } from '@/utilities/eventItem/types';
import { useAuth } from '@/context/authContext';
import PromptToAuth from '@/components/Auth/PromptToAuth';

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

  if (!userData.uid)
    return <PromptToAuth message="Sign in or Sign up to Register" />;

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
        <UserBookingDetails bookingDetails={bookingDetails} />
      )}
    </div>
  );
};

export default RespondToEvent;
