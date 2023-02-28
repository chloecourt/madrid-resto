import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner";
import { clsx } from "clsx";
import Card from "@/components/Card/Card";
import mockData from "../data/mockData.json";

export async function getStaticProps(context: any) {
  return {
    props: {
      mockData,
    },
  };
}
export default function Home(props: any) {
  console.log("props: ", props);
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
        {props.mockData.length && <h2>Justicia</h2>}
        <section className={styles.cardLayout}>
          {props.mockData.map((resto: any) => {
            const { name, imgUrl, id, websiteUrl: href } = resto;
            return (
              <Card
                key={id}
                name={name}
                imgUrl={imgUrl}
                href={`restaurant/${id}`}
                alt={`${name} restaurant`}
                // className={styles.card}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
