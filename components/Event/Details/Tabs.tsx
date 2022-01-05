type TabItem = {
  tabKey: number;
  label: string;
  isActive: boolean;
  changeTab: (key: number) => void;
};

const Tab = ({ tabKey, label, isActive, changeTab }: TabItem) => {
  return (
    <li
      className={
        'py-4 md:px-6 px-4 block rounded-t-lg ' +
        'cursor-pointer hover:bg-gray-900 ' +
        'font-semibold text-base font-sans tracking-wider ' +
        (isActive
          ? 'border-b-4 border-indigo-600 text-gray-300'
          : 'text-gray-500')
      }
      onClick={() => changeTab(tabKey)}
    >
      {label}
    </li>
  );
};

const Tabs = ({
  tabs,
  currentTab,
  changeTab,
}: {
  tabs: { key: number; label: string }[];
  currentTab: number;
  changeTab: (tab: number) => void;
}) => {
  return (
    <nav className="xl:w-1/2 md:w-5/6 mx-auto px-4 md:px-0 overflow-auto">
      <ul className="flex flex-row">
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            tabKey={tab.key}
            label={tab.label}
            isActive={currentTab === tab.key}
            changeTab={changeTab}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Tabs;
