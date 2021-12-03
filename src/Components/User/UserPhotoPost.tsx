import React, { ChangeEvent, useState } from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Button from "../Forms/Button";
import Error from "../Helper/Error";
import { PHOTO_POST } from "../../Api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

type Img = {
  raw: File;
  preview: string;
};

const UserPhotoPost = () => {
  const nome = useForm();
  const peso = useForm("numero");
  const idade = useForm("numero");
  const [img, setImg] = useState<Img>({} as Img);
  const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) navigate("/conta");
  }, [data, navigate]);

  function handleSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", nome.value);
    formData.append("peso", peso.value);
    formData.append("idade", idade.value);

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token!);

    request(url, options);
  }

  function handleImgChange(image: ChangeEvent<HTMLInputElement>) {
    if (!image.target.files) return;
    setImg({
      preview: URL.createObjectURL(image.target.files[0]),
      raw: image.target.files[0],
    });
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <Head title="Poste sua foto" />
      <form onSubmit={handleSubmit}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />
        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />
        {loading ? (
          <Button disabled>Enviando...</Button>
        ) : (
          <Button>Enviar</Button>
        )}
        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default UserPhotoPost;
