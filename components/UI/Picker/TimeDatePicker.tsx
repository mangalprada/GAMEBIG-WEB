import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewDatePicker = ({
  error,
  label,
  changeHandler,
  initialTime,
}: {
  error: boolean;
  label: string;
  name: string;
  changeHandler: (date: Date) => void;
  initialTime?: Date;
}) => {
  const [startDate, setStartDate] = useState(
    new Date(initialTime as Date) || new Date()
  );

  return (
    <div>
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <DatePicker
        className="bg-gray-700 text-gray-50 font-semibold focus:outline-none w-full rounded-md h-12 px-3 focus:ring focus:ring-indigo-500"
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        selected={startDate}
        timeIntervals={initialTime ? 1 : 30}
        onChange={(date) => {
          changeHandler(date as Date);
          setStartDate(date as Date);
        }}
      />
    </div>
  );
};

export default NewDatePicker;
