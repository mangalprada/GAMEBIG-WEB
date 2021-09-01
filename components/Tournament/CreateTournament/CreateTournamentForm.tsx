import { Button } from '@material-ui/core';
import { ArrowBackIosRounded } from '@material-ui/icons';
import router from 'next/router';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

export default function CreateTournamentForm() {
  return (
    <Aux>
      <Button
        color="primary"
        startIcon={<ArrowBackIosRounded color="primary" />}
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </Aux>
  );
}
