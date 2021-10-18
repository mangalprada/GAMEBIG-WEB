import { FC, ChangeEvent } from 'react';

type Props = {
  name: string;
  value: string | undefined;
  placeHolder: string;
  onChangeHandler: {
    (e: ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(field: T_1): T_1 extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  error?: boolean;
  errorMessage?: string | undefined;
};

const NormalInput: FC<Props> = ({
  name,
  value,
  placeHolder,
  onChangeHandler,
  error,
  errorMessage,
}: Props) => {
  return (
    <div className="w-full px-4">
      <div className="relative w-full mb-3">
        {/**Input Box */}
        <input
          name={name}
          type="text"
          className={
            'border-0 px-3 py-3 font-sans ' +
            'rounded text-lg font-medium shadow w-full ' +
            'placeholder-gray-300 placeholder-opacity-40 ' +
            'ease-linear transition-all duration-150 ' +
            'bg-gray-700 text-gray-50 ' +
            (error
              ? 'focus:outline-none ring ring-red-500'
              : 'focus:outline-none focus:ring focus:ring-indigo-500')
          }
          value={value}
          onChange={onChangeHandler}
          placeholder={placeHolder}
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

export default NormalInput;
