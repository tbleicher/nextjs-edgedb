import { Container } from "@mantine/core";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Todo: About page</h1>
      </Container>
    </Layout>
  );
}
