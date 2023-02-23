import React from "react";
import styles from "../styles/Banner.module.css";

type BannerType = {
  handleOnClick: () => void;
};

const Banner = ({ handleOnClick }: BannerType) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Dine </span>
        <span className={styles.title2}>Madrid</span>
      </h1>
      <p className={styles.subTitle}>discover local must-try restaurants!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          View stores nearby
        </button>
      </div>
    </div>
  );
};

export default Banner;
