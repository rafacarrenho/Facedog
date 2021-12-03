import React from "react";
import styles from "./Image.module.css";

type ImageProps = {
  alt: string;
  src: string;
};

const Image = ({ alt, ...props }: ImageProps) => {
  const [skeleton, setSkeleton] = React.useState(true);

  function handleLoad(event: React.ChangeEvent<HTMLImageElement>) {
    event.target.style.opacity = "1";
    setSkeleton(false);
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} alt={alt} {...props} />
    </div>
  );
};

export default Image;
