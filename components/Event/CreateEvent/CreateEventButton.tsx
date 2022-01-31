import FixedButton from '../../UI/Buttons/FixedButton';
interface Props {
  onClick: () => void;
}

export default function CreateEvent({ onClick }: Props) {
  return (
    <div className={'flex xl:w-1/2 md:w-5/6 mx-auto justify-end px-4 md:px-0'}>
      <FixedButton name="Host an Event" onClick={onClick} />
    </div>
  );
}
