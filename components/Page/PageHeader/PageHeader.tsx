import { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TabNavigator from '@/components/Navigation/TabNavigation/TabNavigator';
import AboutPage from '../../../components/Page/AboutPage/AboutPage';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { PageFormData } from '@/utilities/page/types';
import LocationIcon from '@/components/UI/Icons/EventIcons/LocationIcon';
import TextButton from '@/components/UI/Buttons/TextButton';
import { useAuth } from '@/context/authContext';

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

  return (
    <Aux>
      <Head>
        <title>{data.name}</title>
        <meta
          name="description"
          content={`${data.name} is located at ${data.location} Organizes events and mathces in COD, PUBG and freefire`}
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="bg-gray-900/70 w-11/12 xl:w-1/2 md:w-5/6 mx-auto mt-1 rounded-md">
        <div className="flex flex-row px-6 pt-2 md:pt-4 justify-between">
          <div className="flex items-center">
            {/** Avatar Logo */}
            <div className="flex w-12 h-12 md:w-16 md:h-16 bg-indigo-600 rounded-full items-center my-auto">
              <span className="self-center text-2xl md:text-4xl font-bold tracking-wide text-gray-900 font-sans m-auto">
                {data.name[0]}
              </span>
            </div>
            <div className="ml-1.5 md:ml-5">
              {/** Org Name */}
              <span className="text-gray-300 text-lg md:text-2xl font-semibold font-sans ml-1 md:ml-2">
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
            <span className="font-semibold text-xs md:text-sm text-gray-500">
              About us
            </span>
            <span className="text-gray-100 tracking-wide text-xs md:text-sm">
              {data.about}
            </span>
            <AboutPage data={data} />
          </section>
          {data.video ? (
            <div>
              <iframe
                src={
                  'https://www.youtube.com/embed/' +
                  getVideoId(data.video) +
                  '?autoplay=1&mute=1'
                }
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
            </div>
          ) : null}
        </div>
      </div>
    </Aux>
  );
};

export default PageHeader;
