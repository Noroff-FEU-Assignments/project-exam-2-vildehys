import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

export default function FollowProfile() {
  let { name } = useParams();

  const axios = useAxios();

  async function setFollow() {
    try {
      const response = await axios.put(`profiles/${name}/follow`);
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    } finally {
      window.location.reload();
    }
  }
  return (
    <button onClick={setFollow} className="cta-follow">
      Follow
    </button>
  );
}
