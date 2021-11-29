import { useAuth } from '@/context/authContext';
import { BasicUserType } from '@/utilities/types';
import HorizontalProfile from '../Profile/HorizontalProfile';

interface Props {
  gamers: BasicUserType[];
  handleItemClick: (gamer: BasicUserType) => void;
  header: string;
  buttonText: string;
  highLightButton: boolean;
}

const GamersList = ({
  gamers,
  handleItemClick,
  header,
  buttonText,
  highLightButton,
}: Props) => {
  const { userData } = useAuth();
  if (gamers.length === 0) return null;
  return (
    <div className="w-full flex flex-col">
      <span>{header}</span>
      {gamers.map((gamer, index) => (
        <div
          key={index}
          className="w-full flex items-center justify-between my-1 md:pr-4 rounded-md bg-gray-800"
        >
          <HorizontalProfile user={gamer} />
          {gamer.uid !== userData.uid ? (
            <span
              className={
                'py-2 px-4 rounded ' +
                (highLightButton
                  ? 'bg-indigo-600 hover:bg-indigo-700'
                  : 'bg-gray-800 hover:bg-gray-700')
              }
              onClick={() => {
                handleItemClick(gamer);
              }}
            >
              {buttonText}
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default GamersList;
