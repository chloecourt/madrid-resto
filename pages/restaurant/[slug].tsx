import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import mockData from "../../data/mockData.json";
import styles from "../../styles/Restaurant.module.css";
import Image from "next/image";

export async function getStaticProps({ params }: any) {
  return {
    props: {
      data: mockData.find((data: any) => data.id === Number(params.slug)),
    },
  };
}

export async function getStaticPaths() {
  const paths = mockData.map((data) => {
    return { params: { slug: String(data.id) } };
  });
  return {
    // paths: [{ params: { slug: "0" } }, { params: { slug: "1" } }],
    paths,
    fallback: true,
    // if fallback is false, that means that if a dynamic router is not included in paths and you search for it you will get a 404. If fallbakc is true and you search for a dynamic route not listed in paths, the user will be able to request it from the server. However, to do so, you need to add an if statement to return a loading state the time that the server fetches these uncached files see line 27
  };
}

const Restaurant = ({ data }: any) => {
  const { name, address, neighbourhood, imgUrl } = data;
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.col1}>
        <Link href="/" scroll={false}>
          Back to Home
        </Link>
        <h1>{name}</h1>
        <Image src={imgUrl} width={600} height={360} alt="restaurant image" />
      </div>
      <div className={styles.col2}>
        <p>{neighbourhood}</p>
        <br></br>
        <p>{address}</p>
      </div>
    </div>
  );
};

export default Restaurant;
