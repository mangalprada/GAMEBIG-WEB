import { FC } from 'react';
import PeopleConnect from './PeopleConnect';
import Opening from './Opening';
import ParticipateEvent from './ParticipateEvent';
import PageOrganize from './PageOrganize';
import ProfileContent from './ProfileContent';

const FeaturesComponent: FC = () => {
  return (
    <div className="container mx-auto px-6 md:px-12 relative z-10 py-10 xl:py-20">
      <PeopleConnect />
      <Opening />
      <ParticipateEvent />
      <PageOrganize />
      <ProfileContent />
    </div>
  );
};

export default FeaturesComponent;
