import Head from 'next/head';
import React from 'react';
import PageForm from '../../components/Page/CreatePage/PageForm';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function create() {
  return (
    <Aux>
      <Head>
        <title>Create Page</title>
        <meta
          name="description"
          content="Create an Page and Start host custom room matches for BGMI, Call of Duty and Gerena Freefire"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <PageForm />
    </Aux>
  );
}
