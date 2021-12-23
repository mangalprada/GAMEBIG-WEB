import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  onClick: () => void;
  value: string;
};

const NewDatePicker = ({
  error,
  label,
  changeHandler,
}: {
  error: boolean;
  label: string;
  name: string;
  changeHandler: (date: Date) => void;
}) => {
  const [startDate, setStartDate] = useState(new Date());

  const CustomInput = forwardRef<HTMLInputElement, Props>(
    ({ value, onClick }, ref) => (
      <input
        className={
          'border-0 px-3 py-3 font-sans cursor-pointer ' +
          'rounded text-lg font-medium shadow w-full ' +
          'placeholder-gray-300 placeholder-opacity-40 ' +
          'ease-linear transition-all duration-150 bg-gray-700 text-gray-50 ' +
          (error
            ? 'focus:outline-none ring ring-red-500'
            : 'focus:outline-none focus:ring focus:ring-indigo-500')
        }
        onClick={onClick}
        onChange={() => console.log('')}
        ref={ref}
        value={value}
        defaultValue={value}
      />
    )
  );
  CustomInput.displayName = 'CustomInput';

  return (
    <div>
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <DatePicker
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        selected={startDate}
        onChange={(date) => {
          changeHandler(date as Date);
          setStartDate(date as Date);
        }}
        customInput={
          <CustomInput
            onClick={() => {
              console.log('');
            }}
            value={''}
          />
        }
      />
    </div>
  );
};

export default NewDatePicker;
