import { FC, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  label: string;
  name: string;
  value: Date | undefined;
  error?: boolean;
  errorMessage?: string;
  changeHandler: (date: Date) => void;
};

const DateOnlyPicker: FC<Props> = ({
  label,
  name,
  value,
  error,
  errorMessage,
  changeHandler,
}) => {
  const CustomInput = forwardRef<HTMLInputElement, any>(
    ({ value, onClick }, ref) => (
      <div className="relative">
        <input
          className={
            'border-0 px-3 py-3 font-sans cursor-pointer ' +
            'rounded text-lg font-medium shadow w-full ' +
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
        {/** SVG */}
        <section className="absolute -mt-10 right-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-300 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onClick}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
            />
          </svg>
        </section>
      </div>
    )
  );
  CustomInput.displayName = 'CustomInput';

  return (
    <div>
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <DatePicker
        name={name}
        selected={value}
        onChange={(date: Date) => changeHandler(date)}
        dateFormat="dd MMMM YYY"
        customInput={
          <CustomInput
            onClick={() => {
              console.log('');
            }}
            value={''}
          />
        }
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
      />
      {/**Error Message */}
      {error ? (
        <div
          className="flex items-center font-medium font-sans tracking-wide text-red-500 
            text-sm mt-2 ml-2 h-6"
        >
          {errorMessage}
        </div>
      ) : (
        <div className="mt-2 h-6"></div>
      )}
    </div>
  );
};

export default DateOnlyPicker;
