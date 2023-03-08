import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import mockData from "../../data/mockData.json";

export async function getStaticProps({ params }: any) {
  console.log("params: ", params);
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
  console.log("props.data: ", data);
  const { name, address, neighbourhood } = data;
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/" scroll={false}>
        Back to Home
      </Link>
      <h1>{name}</h1>
      <br></br>
      <p>{neighbourhood}</p>
      <br></br>
      <p>{address}</p>
    </div>
  );
};

export default Restaurant;
