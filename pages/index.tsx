import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";
import { fetchRestaurants } from "@/lib/fetchRestaurants";
import useGeolocation from "@/hooks/useGeolocation";

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
  const [newRestaurants, setNewRestaurants] = useState("");
  const [newRestaurantsError, setNewRestaurantsError] = useState<string | null>(
    null
  );

  const { handleTrackLocation, latLong, locationErrorMsg, isLoadingLocation } =
    useGeolocation();

  console.log({ latLong, locationErrorMsg });

  useEffect(() => {
    (async () => {
      if (latLong) {
        try {
          const restos = await fetchRestaurants(latLong);
          console.log({ restos });
          // set restaurants
          setNewRestaurants(restos);
        } catch (error) {
          if (error instanceof Error) {
            setNewRestaurantsError(error.message);
          }
        }
      }
    })();
  }, [latLong]);

  // to create section with cards with either the default location or view nearby option
  const createCards = (restaurantInput: any) => {
    return (
      <>
        {restaurants.length && (
          <h2 className={styles.locationHeading}>
            {newRestaurants ? "restaurants near me" : "Justicia"}
          </h2>
        )}
        <section className={styles.cardLayout}>
          {restaurantInput.map((restaurant: any) => {
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
      </>
    );
  };

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
          buttonText={isLoadingLocation ? "loading..." : "view stores nearby"}
          handleOnClick={() => {
            console.log("location button clicked");
            handleTrackLocation();
          }}
          errorMsg={locationErrorMsg}
        />
        {newRestaurants ? createCards(newRestaurants) : null}
        {createCards(restaurants)}
      </main>
    </>
  );
}
