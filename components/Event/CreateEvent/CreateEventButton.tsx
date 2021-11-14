import { useRouter } from 'next/router';
import FixedButton from '../../UI/Buttons/FixedButton';

interface Props {
  pageId: string;
}

export default function CreateEvent({ pageId }: Props) {
  const router = useRouter();

  return (
    <div className={'flex xl:w-1/2 md:w-5/6 mx-auto justify-end px-4 md:px-0'}>
      <FixedButton
        name="Host a Custom Match"
        onClick={() => router.push(`/page/${pageId}/events/create`)}
      />
    </div>
  );
}
