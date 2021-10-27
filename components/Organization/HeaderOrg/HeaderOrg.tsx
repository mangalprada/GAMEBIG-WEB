import { FC } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import TabNavigator from '../../Navigation/TabNavigation/TabNavigator';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { useAuth } from '../../../context/authContext';
import { OrgFormData } from '../../../utilities/organization/types';
import LocationIcon from '../../UI/Icons/EventIcons/LocationIcon';

type Props = {
  data: OrgFormData;
};

const HeaderOrg: FC<Props> = ({ data }: Props) => {
  const {
    userData: { linkedOrganizationId },
  } = useAuth();
  const router = useRouter();

  const TABS = [
    {
      label: 'Events',
      href: `/organization/${linkedOrganizationId}/events`,
      pathName: '/organization/[orgId]/events',
    },
    {
      label: 'About',
      href: `/organization/${linkedOrganizationId}`,
      pathName: '/organization/[orgId]',
    },
  ];

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
      <div className="flex flex-row xl:w-2/3 md:w-5/6 mx-auto px-6 my-8 justify-between items-center">
        <div className="flex items-center">
          <div className="flex w-16 h-16 bg-indigo-600 rounded-full items-center my-auto">
            <span className="self-center text-5xl font-bold tracking-wide text-gray-900 font-sans m-auto">
              {data.name[0]}
            </span>
          </div>
          <div className="ml-5">
            <span className="text-gray-300 text-2xl font-semibold font-sans ml-2">
              {data.name}
            </span>
            <div className="flex flex-row mt-4">
              <LocationIcon
                size={25}
                className={'fill-current text-indigo-400'}
              />
              <span className="text-gray-400 text-lg ml-2 font-sans">
                {data.location}
              </span>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            console.log('dataid', data.id);

            router.push(`/organization/${data.id}/edit`);
          }}
          className="text-gray-300 text-lg font-semibold font-sans hover:bg-gray-900 p-3 rounded-md"
        >
          EDIT
        </div>
      </div>
      <TabNavigator tabs={TABS} />
    </Aux>
  );
};

export default HeaderOrg;
