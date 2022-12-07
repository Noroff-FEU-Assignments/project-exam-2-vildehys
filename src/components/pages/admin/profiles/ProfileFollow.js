import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

export default function ProfileFollow() {
  let { name } = useParams();

  const axios = useAxios();

  async function profileFollow() {
    try {
      const response = await axios.put(`profiles/${name}/follow`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button onClick={profileFollow} className="cta-follow">
      Follow
    </button>
  );
}
