import { Footer } from "../components/Footer/Footer";
import Head from "next/head";
import { TodosApp } from "../components/Todos/TodosApp";

export default function TodosPage() {
  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodosApp />

      <Footer />
    </>
  );
}
