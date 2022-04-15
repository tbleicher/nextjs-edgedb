import { Container } from "@mantine/core";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";

export default function MoviesPage() {
  return (
    <Layout>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Todo: Movies page</h1>
      </Container>
    </Layout>
  );
}
