import { useState, useRef, useEffect } from 'react';
import DownArrow from '../Icons/EventIcons/DownArrow';
import RightArrow from '../Icons/EventIcons/RightArrow';
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
      className="mx-2 px-8 py-3 hover:bg-black rounded-md cursor-pointer "
      key={item.id}
    >
      {(propToShow && item[propToShow]) || item}
    </li>
  ));
  return (
    <div className="relative">
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <div ref={wrapperRef} onMouseDown={toggleIsListVisible}>
        <section
          className={
            'flex justify-between bg-gray-700 w-full md:w-1/2 py-3 px-8 rounded-md tracking-wider ' +
            'text-lg font-semibold font-sans focus:outline-none text-md text-gray-300 cursor-pointer ' +
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
        </section>
        {isListVisible ? (
          <ul
            className={
              'mt-2 z-40 w-full md:w-1/2 py-2 rounded-md h-auto max-h-52 overflow-y-auto ' +
              'font-sans font-semibold text-base text-gray-300 bg-gray-900 absolute '
            }
          >
            {listItems}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
