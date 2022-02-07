import { Dispatch, FC, SetStateAction } from 'react';
import CustomRoomRegistrationForm from './CustomRoomRegistrationForm';
import TournamentRegistrationForm from './TournamentRegistrationForm';
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

  if (eventData.entryFee > 0)
    return (
      <div className="w-11/12 mt-6 flex justify-start">
        <h2 className="font-semibold mx-auto text-xl text-gray-500">
          PAID MATCHES FEATURES COMMING SOON. PLEASE CHECK BACK LATER.
        </h2>
      </div>
    );

  if (isRegistered)
    return (
      <UserBookingDetails
        bookingDetails={bookingDetails}
        setIsRegistered={setIsRegistered}
      />
    );

  if (eventData.noOfSlots === 0)
    return (
      <div className="my-12 px-4 flex flex-col gap-4 font-sans font-semibold text-center ">
        <span className="text-gray-100 font-sans text-xl md:text-lg">
          This event is fully Booked. Check some other event.
        </span>
      </div>
    );

  return (
    <div>
      {
        {
          'Custom Room': (
            <CustomRoomRegistrationForm
              eventData={eventData}
              teamSize={4}
              setTeamId={setTeamId}
              setIsRegistered={setIsRegistered}
              setBookingdetails={setBookingdetails}
            />
          ),
          'Classic Tournament': (
            <TournamentRegistrationForm
              eventData={eventData}
              teamSize={4}
              setTeamId={setTeamId}
              setIsRegistered={setIsRegistered}
              setBookingdetails={setBookingdetails}
            />
          ),
        }[eventData.type]
      }
    </div>
  );
};

export default RespondToEvent;
