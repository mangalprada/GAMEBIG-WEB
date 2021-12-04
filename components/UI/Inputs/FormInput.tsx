import { FormikErrors } from 'formik';
import { FC, ChangeEvent } from 'react';

type Props = {
  labelName: string;
  name: string;
  value: string | undefined;
  placeHolder?: string;
  onChangeHandler: {
    (e: ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(field: T_1): T_1 extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  isDisabled?: boolean;
  error?: boolean;
  errorMessage?:
    | string
    | string[]
    | undefined
    | FormikErrors<any>
    | FormikErrors<any>[];
};

const FormInput: FC<Props> = ({
  labelName,
  name,
  value,
  placeHolder,
  onChangeHandler,
  isDisabled,
  error,
  errorMessage,
}: Props) => {
  return (
    <div className="w-full">
      <div className="relative w-full mb-3">
        {/**Input Label */}
        <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
          {labelName}
        </label>
        {/**Input Box */}
        <input
          name={name}
          type="text"
          className={
            'border-0 px-3 py-3 font-sans ' +
            'rounded text-lg font-medium shadow w-full ' +
            'placeholder-gray-300 placeholder-opacity-40 ' +
            'ease-linear transition-all duration-150 ' +
            (isDisabled
              ? 'bg-gray-800 cursor-not-allowed text-gray-600'
              : 'bg-gray-700 text-gray-50 ' +
                (error
                  ? 'focus:outline-none ring ring-red-500'
                  : 'focus:outline-none focus:ring focus:ring-indigo-500'))
          }
          value={value}
          onChange={onChangeHandler}
          placeholder={placeHolder}
          disabled={isDisabled}
        />
        {/**Error Message */}
        {error ? (
          <div
            className="flex items-center font-medium font-sans tracking-wide text-red-500 
            text-sm mt-2 ml-2 h-4"
          >
            {errorMessage}
          </div>
        ) : (
          <div className="mt-2 h-4"></div>
        )}
      </div>
    </div>
  );
};

export default FormInput;
