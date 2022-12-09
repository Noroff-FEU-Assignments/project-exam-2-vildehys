import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  avatar: yup.string().required(),
});

export default function UpdateBanner({ name }) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const axios = useAxios();
  async function updateAvatar(data) {
    try {
      const response = await axios.put(`profiles/${name}/media`, data);
      console.log("response", response.data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(updateAvatar)}>
      <div>
        <label htmlFor="avatar">Paste a link to your chosen avatar</label>
        <input {...register("avatar")} id="avatar" />
      </div>
      <button className="cta">Update</button>
    </form>
  );
}
