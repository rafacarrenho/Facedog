import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../UserContext";
import PhotoCommentsForm from "./PhotoCommentsForm";
import styles from "./PhotoComments.module.css";

type Comment = {
  comment_ID: string;
  comment_author: string;
  comment_content: string;
};

type PhotoCommentsProps = {
  comments: Comment[];
  single?: boolean;
  id: string;
};

const PhotoComments = ({ comments, single, id }: PhotoCommentsProps) => {
  const [myComments, setMyComments] = useState(() => comments);
  const { login } = useContext(UserContext);

  const commentsSection = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!commentsSection.current) return;
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [myComments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${single ? styles.single : ""}`}
      >
        {comments &&
          comments.map((comment) => (
            <li key={comment.comment_ID}>
              <b>{comment.comment_author}: </b>
              <span>{comment.comment_content}</span>
            </li>
          ))}
      </ul>
      {login && (
        <PhotoCommentsForm
          single={single}
          id={id}
          setComments={setMyComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
