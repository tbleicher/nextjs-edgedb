import Head from 'next/head';

import { Container } from '@mantine/core';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Todo: About page</h1>
      </Container>
    </>
  );
}
