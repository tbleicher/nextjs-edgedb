import Head from 'next/head';

import { Container } from '@mantine/core';

export default function MoviesPage() {
  return (
    <>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Todo: Movies page</h1>
      </Container>
    </>
  );
}
