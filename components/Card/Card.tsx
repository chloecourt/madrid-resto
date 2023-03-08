import styles from "./Card.module.css";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

type CardProps = {
  name: string;
  imgUrl: string;
  href: string;
  alt: string;
  // className?: string;
};
const Card = ({ name, imgUrl, href, alt }: CardProps) => {
  return (
    <div className={styles.card}>
      <Link href={href}>
        <div className={styles.cardLink}>
          <div className={clsx(styles.container, "glass")}>
            <div className={styles.cardHeaderWrapper}>
              <h2 className={styles.cardHeader}>{name}</h2>
            </div>
            <div className={styles.cardImageWrapper}>
              <Image
                className={styles.cardImage}
                src={imgUrl}
                width={260}
                height={160}
                alt={alt}
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
