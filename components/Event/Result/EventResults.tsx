import { useState, useEffect } from 'react';
import { db } from 'firebase/firebaseClient';
import TeamItem from '@/components/Profile/TeamItem';

interface Props {
  eventId: string;
}

const EventResultForm = ({ eventId }: Props) => {
  const [winners, setWinners] = useState<any>();

  useEffect(() => {
    const getResults = async () => {
      await db
        .collection('events')
        .doc(eventId)
        .collection('winners')
        .get()
        .then((snapShots) => {
          const winners: any = [];
          snapShots.forEach((doc) => {
            winners.push(doc.data);
          });
          setWinners(winners);
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    };
    getResults();
  }, [eventId]);

  if (!winners) return null;

  return (
    <div className="w-1/2">
      <div className="flex flex-cols gap-4">
        {winners.map((winner: any) => (
          <div key={winner.position}>
            <span className="text-gray-300 text-lg font-sans">
              {winner.position}
            </span>
            <span className="text-gray-300 text-lg font-sans">
              Prize: {winner.prize}
            </span>
            <TeamItem team={winner.team} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventResultForm;
