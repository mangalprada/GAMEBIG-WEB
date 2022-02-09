import TextButton from '@/components/UI/Buttons/TextButton';
import FixedButton from '../../UI/Buttons/FixedButton';
import { useRouter } from 'next/router';
interface Props {
  onClick: () => void;
  pageId: string;
  isPageOwner: boolean;
}

export default function CreateEvent({ onClick, pageId, isPageOwner }: Props) {
  const router = useRouter();

  const isOld = router.pathname.split('/').includes('old');
  const route = () => {
    if (isOld) router.push(`/page/${pageId}`);
    else router.push(`/page/${pageId}/old`);
  };
  return (
    <div className={'flex w-11/12 xl:w-1/2 md:w-5/6 mx-auto justify-between'}>
      <TextButton
        name={isOld ? 'See New Events' : 'See Old Events'}
        onClick={route}
        type="normal"
      />
      {isPageOwner ? (
        <FixedButton name="Host an Event" onClick={onClick} />
      ) : null}
    </div>
  );
}
