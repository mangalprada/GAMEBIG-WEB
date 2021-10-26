import Head from 'next/head';
import React from 'react';
import OrganizationForm from '../../components/Organization/CreateOrganization/OrganizationForm';
import Aux from '../../hoc/Auxiliary/Auxiliary';

export default function create() {
  return (
    <Aux>
      <Head>
        <title>Create Organization</title>
        <meta
          name="description"
          content="Create an Organization and Start host custom room matches for BGMI, Call of Duty and Gerena Freefire"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <OrganizationForm />
    </Aux>
  );
}
