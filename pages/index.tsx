import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner/Banner";
import { clsx } from "clsx";
import Card from "@/components/Card/Card";
import mockData from "../data/mockData.json";

export async function getStaticProps(context: any) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3boRbY72zaaGzGWe2QslhgNW7Xiyoq/KNJk/0BJ3uod0=",
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
          {restaurants.map((resto: any) => {
            const { name, imgUrl, fsq_id: id, websiteUrl: href } = resto;
            return (
              <Card
                key={id}
                name={name}
                imgUrl={imgUrl || "/static/restaurantDummyImage.jpg"}
                // href={`restaurant/${id}`}
                alt={`${name} restaurant`}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}
