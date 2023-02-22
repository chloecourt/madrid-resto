import { useRouter } from "next/router";
import Link from "next/link";

const Restaurant = () => {
  const router = useRouter();
  return (
    <div>
      <Link href="/" scroll={false}>
        Back to Home
      </Link>
      <h1>Restaurant Name</h1>
      <h2>restaurant Address</h2>
      <span>reviews</span>
    </div>
  );
};

export default Restaurant;
