import { FC } from 'react';
import { EventData } from '@/utilities/eventItem/types';
import OrganizeCustomRoom from '../Organize/OrganizeCustomRoom';
import OrganizeTournament from '../Organize/OrganizeTournament';

type Props = {
  eventData: EventData;
};

const RespondToEvent: FC<Props> = ({ eventData }) => {
  return (
    <div className="bg-slate-900 rounded-md w-11/12 mx-auto pb-4">
      {
        {
          'Classic Tournament': <OrganizeTournament eventData={eventData} />,
          'Custom Room': <OrganizeCustomRoom eventData={eventData} />,
        }[eventData.type]
      }
    </div>
  );
};

export default RespondToEvent;
