import { ChangeEvent } from 'react';
interface Props {
  name: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onSlide: (event: ChangeEvent<{ value: unknown }>) => void;
}

export default function SliderSelect({
  min,
  max,
  label,
  value,
  onSlide,
}: Props) {
  return (
    <div>
      <label className="block uppercase text-gray-500 text-sm font-bold font-sans tracking-wide mb-2">
        {label}
      </label>
      <div className="flex items-center">
        <input
          id="x"
          type="range"
          className="range"
          value={value}
          min={min}
          max={max}
          onChange={onSlide}
        />
        <span className="text-gray-300 text-lg font-bold font-sans tracking-wide m-5">
          {value}
        </span>
      </div>
    </div>
  );
}
