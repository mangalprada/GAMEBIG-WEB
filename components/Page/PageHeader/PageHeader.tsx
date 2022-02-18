import { FC } from 'react';
import { useRouter } from 'next/router';
import AboutPage from '../../../components/Page/AboutPage/AboutPage';
import { PageFormData } from '@/utilities/page/types';
import LocationIcon from '@/components/UI/Icons/EventIcons/LocationIcon';
import TextButton from '@/components/UI/Buttons/TextButton';
import { useAuth } from '@/context/authContext';
import EventCardAvatar from '@/components/UI/Avatar/EventCardAvatar';

type Props = {
  data: PageFormData;
};

const PageHeader: FC<Props> = ({ data }: Props) => {
  const router = useRouter();
  const {
    userData: { uid },
  } = useAuth();

  const TABS = [
    {
      label: 'Events',
      href: `/page/${data.id}/events`,
      pathName: '/page/[pageId]/events',
    },
    {
      label: 'About',
      href: `/page/${data.id}`,
      pathName: '/page/[pageId]',
    },
  ];

  function getVideoId(url: string) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }

  const isInExplore = router.pathname.split('/').includes('explore');

  function goToOrg() {
    if (router.pathname !== `/page/${data.id}/`)
      router.push(`/page/${data.id}/`);
  }

  return (
    <div className="bg-gray-900/95 w-11/12 xl:w-1/2 md:w-5/6 mx-auto my-1 md:my-2 rounded-md">
      <div className="flex flex-row px-6 pt-2 md:pt-4 justify-between">
        <div className="flex items-center">
          {/** Avatar Logo */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32">
            <EventCardAvatar content={data.name[0]} onclick={goToOrg} />
          </div>
          <div className="ml-1.5 md:ml-5">
            {/** Org Name */}
            <span
              className="text-gray-300 text-lg md:text-2xl cursor-pointer
              font-semibold font-sans ml-1 md:ml-2 hover:underline"
              onClick={goToOrg}
            >
              {data.name}
            </span>

            {/** Location */}
            <div className="flex flex-row md:mt-2">
              {data.location ? (
                <LocationIcon
                  size={22}
                  className={'fill-current text-indigo-400'}
                />
              ) : null}
              <span className="text-gray-400 text-sm md:text-lg ml-0.5 md:ml-2 font-sans">
                {data.location}
              </span>
            </div>
          </div>
        </div>
        {data.admins.includes(uid) ? (
          <TextButton
            name="EDIT"
            onClick={() => router.push(`/page/${data.id}/edit`)}
            type="normal"
          />
        ) : null}
      </div>
      <div className="flex flex-col md:flex-row sm:flex px-6 pb-2">
        <section className="flex flex-col mt-3 px-4">
          {data.about ? (
            <>
              <span className="font-semibold text-xs md:text-sm text-gray-500">
                About us
              </span>
              <span className="text-gray-100 tracking-wide text-xs md:text-sm">
                {data.about}
              </span>
            </>
          ) : null}
          <AboutPage pageId={data.id} />
        </section>
        {data.video ? (
          <iframe
            src={
              'https://www.youtube.com/embed/' +
              getVideoId(data.video) +
              '?mute=1' +
              (!isInExplore ? '&autoplay=1' : '')
            }
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            className="w-full h-auto md:w-1/2"
          />
        ) : null}
      </div>
    </div>
  );
};

export default PageHeader;
