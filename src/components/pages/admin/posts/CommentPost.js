import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useStore from "../../../../context/PostContext";
import useAxios from "../../../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "../../../common/ErrorMessage";

const schema = yup.object().shape({
  message: yup.string().required("Please enter your message"),
});

export default function CommentOnPost() {
  const [, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  let { id } = useParams();
  const { addComment } = useStore();

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

    const message = data.message;

    const formData = {
      body: message,
    };

    try {
      const response = await axios.post(
        `posts/${id}/comment`,
        JSON.stringify(formData)
      );
      if (response.ok) {
        addComment(response.data);
      }
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitting(false);
      window.location.reload();
    }
  }

  return (
    <form onSubmit={handleSubmit(postComment)} className="comment-form">
      {postError && <ErrorMessage>{postError}</ErrorMessage>}
      <div>
        <textarea id="message" {...register("message")}></textarea>
        {errors.message && (
          <ErrorMessage>{errors.message.message}</ErrorMessage>
        )}
      </div>
      <button className="cta">Send</button>
    </form>
  );
}
