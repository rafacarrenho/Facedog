import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { COMMENT_POST } from "../../Api";
import Error from "../Helper/Error";
import { ReactComponent as Enviar } from "../../Assets/enviar.svg";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoCommentsForm.module.css";

type Comment = {
  comment_ID: string;
  comment_author: string;
  comment_content: string;
};

type PhotoCommentsFormProps = {
  id: string;
  setComments: Dispatch<SetStateAction<Comment[]>>;
  single?: boolean;
};

type requestResponse = {
  response?: {
    ok: boolean;
  };
  json: Comment[];
};

const PhotoCommentsForm = ({
  id,
  setComments,
  single,
}: PhotoCommentsFormProps) => {
  const { request, error } = useFetch();
  const [comment, setComment] = useState("");

  async function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json }: requestResponse = await request(url, options);
    if (response?.ok) {
      // setComments((comments) => [...comments, json]);
      setComments(json);
    }
  }
  return (
    <form
      className={`${styles.form} ${single ? styles.single : ""}`}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles.textarea}
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        name="comment"
        id="comment"
        placeholder="Comente..."
      ></textarea>
      <button className={styles.button}>
        <Enviar />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
