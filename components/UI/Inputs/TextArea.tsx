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
};

const TextArea: FC<Props> = ({
  labelName,
  name,
  value,
  placeHolder,
  onChangeHandler,
}: Props) => {
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-12/12 ">
        <div className="relative w-full mb-3">
          <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
            {labelName}
          </label>
          <textarea
            name={name}
            className={
              'border-0 px-3 py-3 font-sans ' +
              'rounded text-lg font-medium shadow w-full ' +
              'placeholder-gray-300 placeholder-opacity-40 ' +
              'ease-linear transition-all duration-150 ' +
              'bg-gray-700 text-gray-50 ' +
              'focus:outline-none focus:ring focus:ring-indigo-500 '
            }
            rows={4}
            placeholder={placeHolder}
            onChange={onChangeHandler}
            value={value}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
