import Head from 'next/head';
import CreateEventForm from '../../../../components/Event/CreateEvent/CreateEventForm';
import Aux from '../../../../hoc/Auxiliary/Auxiliary';

export default function CreateEvent() {
  return (
    <Aux>
      <Head>
        <title>Create Event</title>
        <meta
          name="description"
          content="Create a custom room matches for BGMI, Call of Duty and Gerena Freefire"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <CreateEventForm />
    </Aux>
  );
}
