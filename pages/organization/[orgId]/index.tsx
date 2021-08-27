import HeaderOrg from '../../../components/Organization/HeaderOrg/HeaderOrg';
import OrganizationProfile from '../../../components/Organization/OrganizationProfile/OrganizationProfile';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

export default function OrganizationAdmin() {
  const id = 1;

  return (
    <Aux>
      <HeaderOrg tabNumber={1} />
      <OrganizationProfile />
    </Aux>
  );
}
