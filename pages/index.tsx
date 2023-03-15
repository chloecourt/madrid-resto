import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner/Banner";
import { clsx } from "clsx";
import Card from "@/components/Card/Card";
// import mockData from "../data/mockData.json";

// getStaticProps is only visible on server side therefore any env variables need to be in the next config
export async function getStaticProps(context: any) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY!,
    },
  };
  try {
    const response = await fetch(
      "https://api.foursquare.com/v3/places/search?query=restaurants&near=Madrid%2C%20Spain&sort=RELEVANCE&limit=10",
      options
    );
    const fourSquareData = await response.json();
    const { results } = fourSquareData;

    if (!results) {
      throw console.error();
    }
    return {
      props: {
        restaurants: results,
      },
    };
  } catch (err) {
    console.error(err);
  }
}

export default function Home({ restaurants }: any) {
  console.log({ restaurants });
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
            const { name, imgUrl, fsq_id: id } = restaurant;
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
