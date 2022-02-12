import axios from 'axios';
import useSWR from 'swr';
import { EventData } from '@/utilities/eventItem/types';
import { TeamType } from '@/utilities/types';
import WhatsApp from '@/components/UI/Icons/SocialIcons/WhatsApp';

const { BASE_URL } = process.env;

type Props = {
  eventData: EventData;
  isPageOwner: boolean;
};

async function getData(arg: string) {
  const response = await axios.get(arg);
  return response.data.data as TeamType[];
}

export default function ParticipantList({ eventData, isPageOwner }: Props) {
  const { data: participants } = useSWR(
    `${BASE_URL}/api/participants/?eventId=${eventData._id}`,
    getData
  );

  if (!participants) return null;

  return (
    <div className="my-6 mx-2 rounded-md text-center">
      {participants.length === 0 ? (
        <span className="text-lg font-semibold text-gray-100">
          No Teams have registered yet
        </span>
      ) : (
        <div className="pb-6">
          <table className="table-auto border-collapse w-full text-gray-50">
            <thead className="text-center">
              <tr className="rounded-lg text-sm md:text-lg font-semibold text-indigo-500">
                <th>Team</th>
                <th>Slot</th>
                {isPageOwner ? <th>Phone</th> : null}
              </tr>
            </thead>
            <tbody className="text-lg font-sans text-gray-100 text-center">
              {participants.map((team, index) => {
                return (
                  <tr
                    className="bg-gray-700 table-row h-10 border-b-2 border-gray-600 rounded-md space-y-1"
                    key={index}
                  >
                    <td className="ml-6">{team.teamName}</td>
                    <td className="ml-6">{team.slotNumber || 'NA'}</td>
                    {isPageOwner ? (
                      <td>
                        <a
                          className="flex items-center gap-1 text-center ml-6 underline text-gray-50"
                          href={`https://api.whatsapp.com/send?phone=+91${team.phoneNumber}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {team.phoneNumber} <WhatsApp size={22} />
                        </a>
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
