import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <Head>
        <title>{slug}</title>
      </Head>
      <Link href="/" scroll={false}>
        Back to Home
      </Link>
      <h3> this is the slug: {slug}</h3>
    </div>
  );
};

export default Post;
