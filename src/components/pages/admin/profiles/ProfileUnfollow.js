import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

export default function ProfileUnfollow() {
  let { name } = useParams();

  const axios = useAxios();

  async function profileUnfollow() {
    try {
      const response = await axios.put(`profiles/${name}/unfollow`);
      console.log(response);
    } catch (error) {}
  }
  return (
    <button onClick={profileUnfollow} className="cta2">
      Unfollow
    </button>
  );
}
