import { useState, useRef, useEffect } from 'react';
import DownArrow from '../Icons/TournamentIcons/DownArrow';
import RightArrow from '../Icons/TournamentIcons/RightArrow';
interface Props {
  name?: string;
  label: string;
  menuItems: any[];
  handleChange: (item: any) => void;
  propToShow?: string;
}

export default function SelectDropDown({
  label,
  handleChange,
  menuItems,
  propToShow,
}: Props) {
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedItem, setSelected] = useState('Select');
  const wrapperRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsListVisible(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [wrapperRef]);

  const toggleIsListVisible = () => {
    setIsListVisible(!isListVisible);
  };

  const listItems = menuItems.map((item: any) => (
    <li
      onMouseDown={() => {
        setSelected((propToShow && item[propToShow]) || item);
        setIsListVisible(false);
        handleChange(item);
      }}
      className="m-2 px-8 py-2 hover:bg-gray-900 rounded-md"
      key={item.id}
    >
      {(propToShow && item[propToShow]) || item}
    </li>
  ));
  return (
    <div className="font-sans font-semibold text-md text-gray-300">
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <div ref={wrapperRef} onMouseDown={toggleIsListVisible}>
        <div
          className={
            'flex justify-between bg-gray-700 w-full md:w-1/2  p-3.5 px-8 rounded-md tracking-wide ' +
            'text-sm font-bold font-sans focus:outline-none ' +
            (isListVisible ? 'ring ring-indigo-500' : '')
          }
        >
          {selectedItem}
          {isListVisible ? (
            <RightArrow />
          ) : (
            <DownArrow
              onMouseDown={(event: Event) => {
                event.stopPropagation();
                setIsListVisible(true);
              }}
            />
          )}
        </div>
        {isListVisible ? (
          <ul
            className="absolute mt-2 z-40 w-2/3 md:w-1/4 py-1 rounded-md h-auto max-h-52 overflow-y-auto
          font-sans font-semibold text-md text-gray-300 bg-gray-700 "
          >
            {listItems}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
