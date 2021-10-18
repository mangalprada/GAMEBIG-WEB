interface Props {
  name: string;
  label: string;
  value: Date | null;
  handleDateChange: (date: Date | null) => void;
}

export default function DatePicker({
  name,
  value,
  label,
  handleDateChange,
}: Props) {
  return <div>Datepicker</div>;
}
