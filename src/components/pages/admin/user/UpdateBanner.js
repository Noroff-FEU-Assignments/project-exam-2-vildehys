import useAxios from "../../../../hooks/useAxios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  banner: yup.string().required(),
});

export default function UpdateBanner({ name }) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const axios = useAxios();
  async function updateBanner(data) {
    try {
      const response = await axios.put(`profiles/${name}/media`, data);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form onSubmit={handleSubmit(updateBanner)}>
      <div>
        <label htmlFor="banner">Paste a link to your chosen banner</label>
        <input {...register("banner")} id="banner" />
      </div>
      <button className="cta">Update</button>
    </form>
  );
}
