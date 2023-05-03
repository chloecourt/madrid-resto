import React from "react";
import styles from "./Banner.module.css";

type BannerType = {
  handleOnClick: () => void;
  buttonText: string;
  errorMsg?: string;
};

const Banner = ({ handleOnClick, buttonText, errorMsg }: BannerType) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Dine </span>
        <span className={styles.title2}>Madrid</span>
      </h1>
      <p className={styles.subTitle}>discover local must-try restaurants!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleOnClick}>
          {buttonText}
        </button>
        <div>{errorMsg ? errorMsg : ""}</div>
      </div>
    </div>
  );
};

export default Banner;
