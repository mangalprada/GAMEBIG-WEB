import { FC } from 'react';
import TabNavItem from './TabNavItem';
import { useRouter } from 'next/router';
type Props = {
  tabs: Array<{ label: string; href: string; pathName: string }>;
};

const TabNavigator: FC<Props> = ({ tabs }: Props) => {
  const router = useRouter();

  return (
    <nav className="xl:w-1/2 md:w-5/6 mx-auto px-4 md:px-0">
      <ul className="flex flex-row">
        {tabs.map((tab, index) => (
          <TabNavItem
            key={index}
            label={tab.label}
            isActive={router.pathname === tab.pathName}
            href={tab.href}
          />
        ))}
      </ul>
    </nav>
  );
};

export default TabNavigator;
