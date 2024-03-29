import React from "react";
import { Link } from "react-router-dom";
import styles from "./PhotoContent.module.css";
import PhotoComments from "./PhotoComments";
import { Data, UserContext } from "../../UserContext";
import PhotoDelete from "./PhotoDelete";
import Image from "../Helper/Image";

type PhotoContentProps = {
  data: Data;
  single?: boolean;
};

const PhotoContent = ({ data, single }: PhotoContentProps) => {
  const user = React.useContext(UserContext);
  const { photo, comments } = data;
  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className={styles.details}>
        <p className={styles.author}>
          {user.data && user.data.username === photo.author ? (
            <PhotoDelete id={photo.id} />
          ) : (
            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
          )}

          <span className={styles.visualizacao}>{photo.acessos}</span>
        </p>
        <h1 className="title">
          <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
        </h1>
        <ul className={styles.attributes}>
          <li>{photo.peso} kg</li>
          <li>{photo.idade} anos</li>
        </ul>
      </div>
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
