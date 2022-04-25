import Head from 'next/head';

import { Container } from '@mantine/core';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Todo: Dashboard page</h1>
      </Container>
    </>
  );
}
