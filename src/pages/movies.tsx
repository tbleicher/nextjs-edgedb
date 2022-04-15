import { Footer } from "../components/Footer/Footer";
import Head from "next/head";

export default function MoviesPage() {
  return (
    <>
      <Head>
        <title>Movies</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Todo: Movies page</h1>

      <Footer />
    </>
  );
}
