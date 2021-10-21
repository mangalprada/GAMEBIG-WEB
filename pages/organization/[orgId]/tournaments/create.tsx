import Head from 'next/head';
import CreateTournamentForm from '../../../../components/Tournament/CreateTournament/CreateTournamentForm';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

export default function CreateTournament() {
  return (
    <Aux>
      <Head>
        <title>Create Tournament</title>
        <meta
          name="description"
          content="Create a custom room matches for BGMI, Call of Duty and Gerena Freefire"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <CreateTournamentForm />
    </Aux>
  );
}
