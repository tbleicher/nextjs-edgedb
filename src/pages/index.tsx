import { Footer } from "../components/Footer/Footer";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js Index</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <h1>Welcome to Next.js!</h1>

      <section className="main">
        <ul>
          <li>
            <Link href="./todo">
              <a>Todo</a>
            </Link>
          </li>
          <li>
            <Link href="./movies">
              <a>Movies</a>
            </Link>
          </li>
          <li>
            <Link href="./about">
              <a>About</a>
            </Link>
          </li>
        </ul>
      </section>

      <Footer />
    </>
  );
}
