import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../../common/ErrorMessage";
import Heading from "../../../layout/Heading";

const schema = yup.object().shape({
  title: yup.string().required("Add title to your post"),
  body: yup.string().required("Add text to your post"),
  image: yup.string().required("Add an image URL for your post"),
});

export default function NewPost() {
  const [, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const axios = useAxios();

  async function postComment(data) {
    setSubmitting(true);
    setPostError(null);
    console.log(data);

    const title = data.title;
    const message = data.body;
    const image = data.image;

    const formData = {
      title: title,
      body: message,
      media: image,
    };

    try {
      const response = await axios.post(`posts`, JSON.stringify(formData));
      console.log(response.data);
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(postComment)} className="mt-5">
        <Heading title="Create a new post" />
        {postError && <ErrorMessage>{postError}</ErrorMessage>}
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" {...register("title")} />
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="body">Message:</label>
          <textarea id="body" {...register("body")} rows={6}></textarea>
          {errors.boddy && <ErrorMessage>{errors.body.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor="media">Image Url:</label>
          <input id="media" {...register("image")} />
          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </div>
        <button className="cta">Post</button>
      </form>
    </>
  );
}
