import Head from 'next/head';

import { Container } from '@mantine/core';

import { TodosApp } from '../components/Todos/TodosApp';

export default function TodosPage() {
  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container size="xs">
        <h1>Todos</h1>
        <TodosApp />
      </Container>
    </>
  );
}
