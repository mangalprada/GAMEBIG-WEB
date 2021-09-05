import router from 'next/router';
import { useEffect } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function CreatingPage() {
  useEffect(() => {
    setTimeout(() => {
      router.push('/organization/1');
    }, 5000);
  }, []);

  return (
    <Aux>
      <div>We are creating your page</div>
    </Aux>
  );
}
