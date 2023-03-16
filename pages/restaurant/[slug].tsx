import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "../../styles/Restaurant.module.css";
import Image from "next/image";
import clsx from "clsx";
import { fetchRestaurants } from "@/lib/fetchRestaurants";

//first declare getStaticProps and then find the object with the identical id/ slug as the params. Thanks to useRouter we can access the params.
export async function getStaticProps({ params }: any) {
  const restaurants = await fetchRestaurants();
  return {
    props: {
      restaurants: restaurants.find(
        (data: any) => data.fsq_id.toString() === params.slug
      ),
    },
  };
} // allows you to pre-render paths specified below. You can dynamically state static path by mapping the data
export async function getStaticPaths() {
  const restaurants = await fetchRestaurants();
  const paths = restaurants.map((data: any) => {
    return {
      params: {
        slug: data.fsq_id.toString(),
      },
    };
  });
  return {
    // paths: [{ params: { slug: "0" } }, { params: { slug: "1" } }],
    paths,
    fallback: true,
    // if fallback is false, that means that if a dynamic router is not included in paths and you search for it you will get a 404. If fallback is true and you search for a dynamic route not listed in paths, the user will be able to request it from the server. However, to do so, you need to add an if statement to return a loading state the time that the server fetches these uncached files see line 27
  };
}

const handleUpvoteButton = () => {
  console.log("handleUpvoteButton was pressed");
};

const Restaurant = ({ restaurants }: any) => {
  const { name, address, neighbourhood, imgUrl } = restaurants;
  const router = useRouter();
  console.log({ router });

  // loading state when fetching from the server
  if (router.isFallback) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <Link href="/" scroll={false}>
            Back to Home
          </Link>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={imgUrl || "/static/restaurantDummyImage.jpg"}
            width={600}
            height={360}
            alt={name}
          />
        </div>
        <div className={clsx(styles.col2, "glass")}>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              alt="places icon"
              width="24"
              height="24"
            />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/nearMe.svg"
              alt="near me icon"
              width="24"
              height="24"
            />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/star.svg"
              alt="star"
              width="24"
              height="24"
            />
            <p className={styles.text}>1</p>
          </div>
          <p>{address}</p>
        </div>
        <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
          Up Vote{" "}
        </button>
      </div>
    </div>
  );
};

export default Restaurant;
