import "todomvc-app-css/index.css";
import "todomvc-common/base.css";

import Head from "next/head";

export default function TodosPage() {
  return (
    <>
      <Head>
        <title>Next.js Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="main">
        <ul>
          <li>
            <a href="./todo">Todo</a>
          </li>
        </ul>
      </section>

      <footer className="info">
        {/* Change this out with your name and url ↓ */}
        <p>
          Created with <a href="http://edgedb.com">EdgeDB</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}
