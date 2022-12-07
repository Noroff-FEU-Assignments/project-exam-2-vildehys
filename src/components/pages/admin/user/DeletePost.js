import useAxios from "../../../../hooks/useAxios";

export default function DeletePost({ id }) {
  const axios = useAxios();

  async function deletePost() {
    try {
      const response = await axios.delete(`posts/${id}`);
      console.log("response", response);
    } catch (error) {
      console.log(error.toString());
    }
  }

  return (
    <>
      <button className="cta2" onClick={() => deletePost()}>
        Delete
      </button>
    </>
  );
}
