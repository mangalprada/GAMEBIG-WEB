import CheckCircle from '../Icons/EventIcons/CheckCircle';
interface Props {
  name: string;
  label: string;
  value: string;
  items: string[];
  handleChange: (item: string) => void;
}

export default function SelectRadioButton({
  name,
  label,
  value,
  handleChange,
  items,
}: Props) {
  const listItems = items.map((item) => (
    <li
      key={item}
      className={
        'flex justify-between w-full md:w-1/2 p-3.5 my-2 ml-0 rounded-md cursor-pointer ' +
        'text-base text-gray-300 font-sans font-semibold ' +
        (item === value ? 'bg-green-500' : 'bg-gray-700')
      }
      onMouseDown={() => handleChange(item)}
    >
      {item}
      {item === value ? <CheckCircle /> : null}
    </li>
  ));

  return (
    <div>
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <ul>{listItems}</ul>
    </div>
  );
}
