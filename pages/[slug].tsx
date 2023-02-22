import Link from "next/link";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  return (
    <div>
      <Link href="/" scroll={false}>
        Back to Home
      </Link>
      <h3> this is the slug: {router.query.slug}</h3>
    </div>
  );
};

export default Post;
