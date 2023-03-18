import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner/Banner";
import { clsx } from "clsx";
import Card from "@/components/Card/Card";
import { fetchRestaurants } from "@/lib/fetchRestaurants";
// import mockData from "../data/mockData.json";

// getStaticProps is only visible on server side therefore any env variables need to be in the next config
export async function getStaticProps(context: any) {
  const restaurants = await fetchRestaurants();
  return {
    props: {
      restaurants,
    },
  };
}

export default function Home({ restaurants }: any) {
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
        {restaurants.length && (
          <h2 className={styles.locationHeading}>Justicia</h2>
        )}
        <section className={styles.cardLayout}>
          {restaurants.map((restaurant: any) => {
            const { name, imgUrl, id } = restaurant;
            return (
              <Card
                key={id}
                name={name}
                imgUrl={imgUrl || "/static/restaurantDummyImage.jpg"}
                href={`/restaurant/${id}`}
                alt={name}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
