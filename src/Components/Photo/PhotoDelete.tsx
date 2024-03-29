import React from "react";
import { PHOTO_DELETE } from "../../Api";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

type PhotoDeleteProps = {
  id: string;
};

type RequestResponse = {
  response?: {
    ok: boolean;
  };
};

const PhotoDelete = ({ id }: PhotoDeleteProps) => {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm("Tem certeza que deseja deletar?");
    if (confirm) {
      const { url, options } = PHOTO_DELETE(id);
      const { response }: RequestResponse = await request(url, options);
      if (response?.ok) window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button className={styles.delete} onClick={handleClick}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
