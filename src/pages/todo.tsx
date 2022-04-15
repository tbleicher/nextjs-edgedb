import { Container } from "@mantine/core";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";
import { TodosApp } from "../components/Todos/TodosApp";

export default function TodosPage() {
  return (
    <Layout>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container size="xs">
        <h1>Todos</h1>
        <TodosApp />
      </Container>
    </Layout>
  );
}
