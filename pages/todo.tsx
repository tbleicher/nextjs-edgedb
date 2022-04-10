import Head from "next/head";

import { ReactQueryDevtools } from "react-query/devtools";

import { TodosApp } from "../components/Todos/TodosApp";

export default function TodosPage() {
  return (
    <>
      <Head>
        <title>Todos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TodosApp />

      <footer className="info">
        <p>
          Created with <a href="http://edgedb.com">EdgeDB</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>

      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
