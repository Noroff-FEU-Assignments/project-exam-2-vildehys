export default function ImagePost(props) {
  const imgHeight = "";
  const noImgHeight = "none";

  return (
    <>
      <img
        src={`${props.image}`}
        style={{
          display: `${
            props.image !== "" && props.image !== null ? imgHeight : noImgHeight
          }`,
        }}
        alt={`${props.image}`}
        className="background-image image-post"
      ></img>
    </>
  );
}
