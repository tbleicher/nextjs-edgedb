import Head from 'next/head';

import { Container, Text } from '@mantine/core';

import { Layout } from '../components/Layout/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Index</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Container>
        <h1>Welcome to Next.js!</h1>

        <section className="main">
          <Text>Todo: index page</Text>
        </section>
      </Container>
    </>
  );
}
