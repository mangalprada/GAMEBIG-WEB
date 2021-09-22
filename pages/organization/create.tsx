import Head from 'next/head';
import React from 'react';
import CreateOrganizationForm from '../../components/Organization/CreateOrganization/CreateOrganizationForm';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function create() {
  return (
    <Aux>
      <Head>
        <title>Create Organization</title>
        <meta name="description" content="Create Organization" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <CreateOrganizationForm />
    </Aux>
  );
}
