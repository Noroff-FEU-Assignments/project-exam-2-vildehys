import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

export default function ProfileUnfollow() {
  let { name } = useParams();

  const axios = useAxios();

  async function setUnfollow() {
    try {
      const response = await axios.put(`profiles/${name}/unfollow`);
      console.log(response);
    } catch (error) {
      console.log("error", error);
    } finally {
      window.location.reload();
    }
  }
  return (
    <button onClick={setUnfollow} className="cta2">
      Unfollow
    </button>
  );
}
