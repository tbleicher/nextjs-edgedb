import { Container } from "@mantine/core";
import Head from "next/head";
import { Layout } from "../components/Layout/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <h1>Todo: Dashboard page</h1>
      </Container>
    </Layout>
  );
}
