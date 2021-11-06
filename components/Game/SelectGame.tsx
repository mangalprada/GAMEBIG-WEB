import { Dispatch, FC, SetStateAction } from 'react';
import { GAMES } from '../../assets/data/Games';
import FixedButton from '../UI/Buttons/FixedButton';
import SelectDropDown from '../UI/Select/SelectDropDown';

type Props = {
  updatePage: (page: number) => void;
  setGame: Dispatch<SetStateAction<string>>;
  gameCode: string;
};

const SelectGame: FC<Props> = ({ updatePage, setGame, gameCode }) => {
  function nextClickHandler() {
    updatePage(2);
  }

  return (
    <div className="bg-gray-800/70 w-11/12 md:w-3/4 h-80 mx-auto p-10 rounded-xl relative font-sans">
      <h4 className="text-xl text-gray-400 font-semibold tracking-wide mb-3">
        Select a Game
      </h4>
      <section className="xl:w-3/4">
        <SelectDropDown
          label=""
          handleChange={(item) => setGame(item.id)}
          menuItems={GAMES}
          propToShow="name"
        />
      </section>
      <section className="absolute bottom-3 right-8">
        <FixedButton
          name="Next"
          onClick={nextClickHandler}
          isDisabled={gameCode === ''}
        />
      </section>
      <p className="text-gray-500 mt-5 font-semibold">
        *Select a game and proceed to next.
      </p>
    </div>
  );
};

export default SelectGame;
