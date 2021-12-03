import React from "react";
import { Photo } from "../../UserContext";
import Image from "../Helper/Image";
import styles from "./FeedPhotosItem.module.css";

type FeedPhotosItemProps = {
  photo: Photo;
  setModalPhoto: (photo: Photo) => void;
};

const FeedPhotosItem = ({ photo, setModalPhoto }: FeedPhotosItemProps) => {
  function handleClick() {
    setModalPhoto(photo);
  }
  return (
    <li className={styles.photo} onClick={handleClick}>
      <Image src={photo.src} alt={photo.title} />

      <span className={styles.visualizacao}>{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotosItem;
