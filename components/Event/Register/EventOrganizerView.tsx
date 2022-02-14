import { FC } from 'react';
import SendNotification from '../Organize/SendNotification';
import UpdateBookingPassword from '../Organize/UpdateBookingPassword';
import AddStreaming from '../Organize/AddStreaming';
import { EventData } from '@/utilities/eventItem/types';

type Props = {
  eventData: EventData;
};

const RespondToEvent: FC<Props> = ({ eventData }) => {
  return (
    <div className="bg-slate-900 rounded-md w-11/12 mx-auto pb-4">
      <SendNotification eventData={eventData} />
      <UpdateBookingPassword eventData={eventData} />
      <AddStreaming eventData={eventData} />
    </div>
  );
};

export default RespondToEvent;
