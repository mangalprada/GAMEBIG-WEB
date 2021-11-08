import CheckCircle from '../Icons/EventIcons/CheckCircle';
interface Props {
  name: string;
  label: string;
  values: string[];
  propToShow: 'id' | 'name';
  items: { id: string; name: string }[];
  handleChange: (item: { id: string; name: string }) => void;
}

export default function MultiSelect({
  propToShow,
  label,
  values,
  handleChange,
  items,
}: Props) {
  const listItems = items.map((item) => (
    <li
      key={item.id}
      className={
        'flex justify-between w-11/12 md:w-2/3 p-3.5 my-2 mx-auto rounded-md cursor-pointer ' +
        'text-base text-gray-300 font-sans font-semibold ' +
        (values.includes(item[propToShow]) ? 'bg-green-500' : 'bg-gray-700')
      }
      onMouseDown={() => {
        handleChange(item);
      }}
    >
      {item.name}
      {values.includes(item[propToShow]) ? <CheckCircle /> : null}
    </li>
  ));

  return (
    <div className="w-full h-auto mx-auto">
      <label
        className={
          'block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide ' +
          'mb-2 md:w-2/3 w-11/12 mx-auto'
        }
      >
        {label}
      </label>
      <ul>{listItems}</ul>
    </div>
  );
}
