import { useRouter } from "next/router";
import Link from "next/link";
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
  return {
    paths: [{ params: { slug: "0" } }, { params: { slug: "1" } }],
    fallback: false,
  };
}

const Restaurant = ({ data }: any) => {
  console.log("props: ", data);
  const router = useRouter();
  return (
    <div>
      <Link href="/" scroll={false}>
        Back to Home
      </Link>
      <h1>Restaurant Name</h1>
      <h2>restaurant Address</h2>
      <span>reviews</span>
      <p>{data.address}</p>
    </div>
  );
};

export default Restaurant;
