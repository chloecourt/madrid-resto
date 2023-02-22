import Head from "next/head";
// import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Dine Madrid</title>
        <meta
          name="description"
          content="find and rate restaurants in Madrid, Spain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Banner
          handleOnClick={() => {
            console.log("clicked");
          }}
        />
      </main>
    </>
  );
}
